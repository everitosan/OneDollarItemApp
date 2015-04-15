class IpnController < ApplicationController
	protect_from_forgery :excet => [:newOwner]

	def newOwner
		logger.debug "/*********************** IPN Notification ********/"
		setOwner(params[:payment_status], params[:payer_email], params[:item_name], params[:paypal_secret])
		

		render :nothing => true
	end

	def setOwner (status, owner, item, secret)
		if status == "Completed" && secret == APP_CONFIG[:paypal_secret]
			logger.debug "/*********************** IPN Notification COMPLETED ********/"
			@currUser = User.find_by(emailPayment: owner)
		  	@currentItem = Item.find_by_description(item)
		  	
		  	
		  	@currentItem.amount +=  1
		  	@currentItem.user = @currUser
		  	@currentItem.save
		  	
		end
	end
end
