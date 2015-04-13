class ContactEmail < ApplicationMailer

  def message_email(name, email, message)
    @userName = name
    @userEmail = email
    @userMessage = message
    mail(to: "onedollaritem.project@gmail.com", subject: 'OneDollarItem')
  end

end
