module OdiHelper

	def paypal_encrypted(des_item, fb_name) 
	values = {      
      :business => APP_CONFIG['paypal_email'],
      :cmd => '_donations',
      :upload => 1,
      :return => APP_CONFIG['return_url'],
      :amount => '1.34', 
      :item_name => des_item,
      :address_override => 1,
      :notify_url => APP_CONFIG['notify_url'],
      :paypal_secret =>  APP_CONFIG['paypal_secret'],
      :custom => fb_name,
      :cert_id => APP_CONFIG['cert_id']
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
