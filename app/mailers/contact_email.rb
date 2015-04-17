class ContactEmail < ApplicationMailer

  def message_email(name, email, message)
    @userName = name
    @userEmail = email
    @userMessage = message
    mail(to: "onedollaritem.project@gmail.com", subject: 'OneDollarItem')
  end

  def notify_email (owner_name, owner_email, item_name, item_des)
  	@owner_name = owner_name
    @item_name = item_name
    @item_des = item_des

  	mail(to: owner_email, subject: item_des )
  end

end
