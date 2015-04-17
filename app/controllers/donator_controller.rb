class DonatorController < ApplicationController

  PAYPAL_CERT_PEM = File.read("#{Rails.root}/certs/paypal_deploy_cert.pem")
  APP_CERT_PEM = File.read("#{Rails.root}/certs/app_deploy_cert.pem")
  APP_KEY_PEM = File.read("#{Rails.root}/certs/app_deploy_key.pem")
  crypChain = ''

  def all
    @items = Item.all
    respond_to do |format|
      format.html #all.html.erb
      format.json { render json: @items}
    end
  end

  def prepost

    @User = User.find_by_fb_id(params[:id])

    if @User.nil?
      @NewUser = User.new
      @NewUser.fb_id = params[:id]
      @NewUser.name = params[:name]
      @NewUser.email = params[:email]
      @NewUser.first_n = params[:first_name]
      @NewUser.last_n = params[:last_name]
      @NewUser.locate = params[:locale]
      @NewUser.save
      @User = User.last
    end

    crypChain = paypal_encrypted(params[:item], @User.id)
    logger.debug "//********************PREPOSTINFO*************//"
    logger.debug "APP id: " 
    logger.debug @User.id
    logger.debug "Facebook id: " 
    logger.debug params[:id] 
    logger.debug "//********************PREPOSTINFO-ENDS*************//"
    logger.debug crypChain 

    render json: { status: :ok, owner: @User.id, item: params[:item], cryp: crypChain}

  end

  def paypal_encrypted(des_item, user_id) 
    values = {      
        :business => APP_CONFIG['paypal_email'],
        :cmd => '_donations',
        :upload => 1,
        :return => APP_CONFIG['return_url'],
        :amount => '1.36', 
        :item_name => des_item,
        :address_override => 1,
        :notify_url => APP_CONFIG['notify_url'],
        :paypal_secret =>  APP_CONFIG['paypal_secret'],
        :custom => user_id,
        :cert_id => APP_CONFIG['cert_id']
      }
   
    encrypt_for_paypal(values)
  end

  def encrypt_for_paypal(values)
    signed = OpenSSL::PKCS7::sign(OpenSSL::X509::Certificate.new(APP_CERT_PEM), OpenSSL::PKey::RSA.new(APP_KEY_PEM, ''), values.map { |k, v| "#{k}=#{v}" }.join("\n"), [], OpenSSL::PKCS7::BINARY)
    OpenSSL::PKCS7::encrypt([OpenSSL::X509::Certificate.new(PAYPAL_CERT_PEM)], signed.to_der, OpenSSL::Cipher::Cipher::new("DES3"), OpenSSL::PKCS7::BINARY).to_s.gsub("\n", "")
  end

end
