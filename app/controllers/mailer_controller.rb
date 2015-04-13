class MailerController < ApplicationController

	def contact
		ContactEmail.message_email(params[:name], params[:email], params[:message]).deliver_now
		render :nothing => true
	end

end
