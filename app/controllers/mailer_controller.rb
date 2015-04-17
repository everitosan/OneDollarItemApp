class MailerController < ApplicationController

	def contact
		ContactEmail.message_email(params[:name], params[:email], params[:message]).deliver_now
		render :nothing => true
	end

	def notifySteal (owner_name, owner_email, item_name, item_des)
		ContactEmail.notify_email(owner_name, owner_email, item_name, item_des).deliver_later
		render :nothing =>true
	 end

end
