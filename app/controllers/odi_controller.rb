class OdiController < ApplicationController
	after_filter :set_csrf_cookie_for_ng

  def preview
  end

  def tender
  	@items = Item.all
  end

  def results
  end

  def set_csrf_cookie_for_ng
		cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
	end

	protected
		def verified_request?
	    super || form_authenticity_token == request.headers['X-XSRF-TOKEN']
		end

end
