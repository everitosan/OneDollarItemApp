class IpnController < ApplicationController
	protect_from_forgery :excet => [:newOwner]

	def newOwner
		logger.debug params[:payment_notification]
		render :nothing => true
	end
end
