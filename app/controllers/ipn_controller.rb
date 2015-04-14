class IpnController < ApplicationController
	protect_from_forgery :excet => [:newOwner]

	def newOwner
		status = params[:payment_status]
		owner = params[:payer_email]
		item = params[:item_name]
		
		
		setOwner(status, owner, item)
		

		render :nothing => true
	end

	def setOwner (status, owner, item)
		if status == "Complete"
			@currUser = User.find_by_emailPayment(owner)
		  	@currentItem = Item.find_by_description(item)
		  	
		  	
		  	@currentItem.amount = @currentItem.amount + 1
		  	@currentItem.user = @currUser
		  	@currentItem.save
		  	
		end
	end
end
