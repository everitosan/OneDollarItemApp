module OdiHelper

	def paypal_url(des_item, email_add) 
	values = {
      :business => 'eve.smda-facilitator@gmail.com',
      :cmd => '_donations',
      :upload => 1,
      :return => 'http://www.onedollaritem.org',
      :amount => '1.34',
      :item_name => des_item,
      :address_override => 0,
      :email => email_add
#      :notify_url => ''
    }
=begin
    line_items.each_with_index do |item, index|
      values.merge!({
        "amount_#{index+1}" => item.unit_price,
        "item_name_#{index+1}" => item.product.name,
        "item_number_#{index+1}" => item.id,
        "quantity_#{index+1}" => item.quantity
      })
    end
=end    
    "https://www.sandbox.paypal.com/cgi-bin/webscr?" + values.to_query
	end
end
