class OdiController < ApplicationController
	after_filter :set_csrf_cookie_for_ng
  #before_action :time
	before_action :languageConf

  caches_page :preview, :results

  def preview
    redirect_to action: 'tender'
  end

  def tender
    if request.base_url() == "https://one-dollar-item.herokuapp.com"
      redirect_to "http://www.onedollaritem.org"
    end

  	@items = Item.getAvaible()
  end

  def results
  end

  def time
    sections = request.original_url.split('/')
    
    if sections.at(sections.size - 1) != actionToGo()
      redirect_to action: actionToGo()
    end

  end

  def actionToGo
    date = Time.new

    if date.day < 16 && date.month <= 4 && date.year == 2015 # && sections.at(sections.size - 1) != "preview"
      return 'preview'
    elsif date.day >= 16 && date.day <= 26 &&  date.month == 4 && date.year == 2015# && sections.at(sections.size - 1) != "tender"
      return 'tender'
    else
      return 'tender'
      #return 'results'
    end    
  end

  def set_csrf_cookie_for_ng
		cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
	end

	def languageConf
		I18n.locale = params[:locale] || I18n.default_locale
		#I18n.locale = extract_locale_from_accept_language_header || I18n.default_locale
		logger.debug I18n.locale
	end

	private
  	def extract_locale_from_accept_language_header
    	request.env['HTTP_ACCEPT_LANGUAGE'].scan(/^[a-z]{2}/).first
  end

	protected
		def verified_request?
	    super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
	end


end
