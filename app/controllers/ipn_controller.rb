class IpnController < ApplicationController	
	protect_from_forgery :excet => [:newOwner]
	
	def newOwner
		logger.debug "/*********************** IPN Notification ********/"
		setOwner(params[:payment_status], params[:item_name], params[:paypal_secret], params[:custom])
		

		#render :nothing => true
	end

	def setOwner (status, item, secret, user_id)
		if status == "Completed" && secret == APP_CONFIG[:paypal_secret]
			
			@currUser = User.find(user_id)
		  	@currentItem = Item.find_by_description(item)
		  	@lastOwner = @currentItem.user

			logger.debug "/*********************** IPN Notification COMPLETED ********/"
		  	logger.debug @currUser.name
		  	logger.debug @currentItem.description
		  	
		  	@currentItem.user = @currUser
		  	@currentItem.save

		  	@currentItem.amount +=  1
		  	@currentItem.save

		  	mail = MailerController.new()
		  	mail.notifySteal(@lastOwner.name, @lastOwner.email, @currentItem.name, @currentItem.description)
		  	mail = nilu
		end
	end
end
