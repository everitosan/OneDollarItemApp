class IpnController < ApplicationController
	protect_from_forgery :excet => [:newOwner]

	def newOwner
		logger.debug "/*********************** IPN Notification ********/"
		setOwner(params[:payment_status], params[:payer_email], params[:item_name])
		

		render :nothing => true
	end

	def setOwner (status, owner, item)
		if status == "Completed"
			logger.debug "/*********************** IPN Notification COMPLETED ********/"
			@currUser = User.find_by(emailPayment: owner)
		  	@currentItem = Item.find_by_description(item)
		  	
		  	
		  	@currentItem.amount +=  1
		  	@currentItem.user = @currUser
		  	@currentItem.save
		  	
		end
	end
end
