class IpnController < ApplicationController	
	protect_from_forgery :excet => [:newOwner]
	
	def newOwner
		setOwner(params[:payment_status], params[:item_name], params[:custom])
		render :nothing => true
	end

	def setOwner (status, item, user_id)
		if status == "Completed"

			user_id = user_id.to_i
			
		  	currentItem = Item.find_by_description(item)
			
			if !currentItem.nil?
				if currentItem.user.id == user_id
		  			currentItem.amount = increaseAmount(currentItem.amount)
		  			if currentItem.save
					  	logger.debug "/*********************** Solo el monto ********/"
		  			end
			  	else
					logger.debug '**////// es dueño diferente /////**'
			  		lastOwner = currentItem.user

		  			
		  			currentItem.user = User.find(user_id)
		  			currentItem.amount = increaseAmount(currentItem.amount)
		  			
		  			if currentItem.save

		  				logger.debug "/*********************** IPN Notification COMPLETED ********/"
					  	logger.debug currentItem.user.name
					  	logger.debug currentItem.description
					  	logger.debug lastOwner.name
		  				logger.debug "/*********************** IPN Notification COMPLETED ********/"
#=begin					  	
		  				mail = MailerController.new()
					  	mail.notifySteal(lastOwner.name, lastOwner.email, currentItem.name, currentItem.description)
					  	mail = nil
#=end
					  	
		  			end
			  	end
		  	else
		  		#error item not found
			end		
		  	
		end
	end
	def increaseAmount (amount)
		return amount + 1
	end
end
