class OdiController < ApplicationController
	after_filter :set_csrf_cookie_for_ng
  before_action :time


  def preview
  end

  def tender
  	@items = Item.all.order(:id)
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
    elsif date.day == 16 && date.month == 4 && date.year == 2015# && sections.at(sections.size - 1) != "tender"
      return 'tender'
    else
      return 'results'
    end    
  end

  def set_csrf_cookie_for_ng
		cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
	end

	protected
		def verified_request?
	    super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
		end

end
