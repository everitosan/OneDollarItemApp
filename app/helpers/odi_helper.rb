module OdiHelper

	def paypal_encrypted(des_item) 
	values = {      
      :business => 'eve.smda-facilitator@gmail.com',
      :cmd => '_donations',
      :upload => 1,
      :return => 'https://www.onedollaritem.org/odi/tender',
      :amount => '1.34', 
      :item_name => des_item,
      :address_override => 1,
      :notify_url => 'https://www.onedollaritem.org/ipn/newOwner',
      :cert_id => 'NH9NSHZJQMDMY'
    }
   
    encrypt_for_paypal(values)
	end

  PAYPAL_CERT_PEM = File.read("#{Rails.root}/certs/paypal_cert.pem")
  APP_CERT_PEM = File.read("#{Rails.root}/certs/app_cert.pem")
  APP_KEY_PEM = File.read("#{Rails.root}/certs/app_key.pem")

  def encrypt_for_paypal(values)
    signed = OpenSSL::PKCS7::sign(OpenSSL::X509::Certificate.new(APP_CERT_PEM), OpenSSL::PKey::RSA.new(APP_KEY_PEM, ''), values.map { |k, v| "#{k}=#{v}" }.join("\n"), [], OpenSSL::PKCS7::BINARY)
    OpenSSL::PKCS7::encrypt([OpenSSL::X509::Certificate.new(PAYPAL_CERT_PEM)], signed.to_der, OpenSSL::Cipher::Cipher::new("DES3"), OpenSSL::PKCS7::BINARY).to_s.gsub("\n", "")
  end

end
