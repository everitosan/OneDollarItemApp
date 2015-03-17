class Item < ActiveRecord::Base
	belongs_to :condition
	belongs_to :user

	##validations
	validates :user, 
			   presence: true

	validates :description, 
		   presence: true

	validates :condition, 
		   presence: true


end
