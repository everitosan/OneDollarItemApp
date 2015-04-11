class ContactEmail < ApplicationMailer

  def message_email(name, email, message)
    @userName = name
    @userEmail = email
    @userMessage = message
    mail(to: ["everardo.ipn@gmail.com, onedollaritem.project@gmail.com","calido_92@hotmail.com","josemarioborda@gmail.com","r_monjaraz@live.com"], subject: 'OneDollarItem')
  end

end
