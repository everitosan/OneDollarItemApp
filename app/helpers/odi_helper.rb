module OdiHelper

	def paypal_url(id_item, des_item) 
	values = {
      :business => 'eve-facilitator@bye.com',
      :cmd => '_donations',
      :upload => 1,
      :return => 'http://localhost:3000/',
      :amount => '1.3',
      :item_name => des_item
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
