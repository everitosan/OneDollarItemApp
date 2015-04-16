class IpnController < ApplicationController
	protect_from_forgery :excet => [:newOwner]

	def newOwner
		logger.debug "/*********************** IPN Notification ********/"
		setOwner(params[:payment_status], params[:item_name], params[:paypal_secret], params[:custom])
		

		render :nothing => true
	end

	def setOwner (status, item, secret, user_id)
		if status == "Completed" && secret == APP_CONFIG[:paypal_secret]
			logger.debug "/*********************** IPN Notification COMPLETED ********/"
			logger.debug user_id
			@currUser = User.find(user_id)
		  	@currentItem = Item.find_by_description(item)
		  	
		  	@currentItem.user = @currUser
		  	@currentItem.save
		  	
		  	@currentItem.amount +=  1
		  	@currentItem.save
		  	
		end
	end
end
