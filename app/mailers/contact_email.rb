class ContactEmail < ApplicationMailer

  def menssage_email()
    mail(to: "sadik.monjaraz@gmail.com", subject: 'No somos viagra')
  end

end
