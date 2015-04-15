class Item < ActiveRecord::Base
	belongs_to :condition
	belongs_to :user

	##validations
	validates :user, 
			   presence: true

	validates :name,
		   presence: true

	validates :description, 
		   presence: true,
		   uniqueness: true

	validates :condition, 
		   presence: true

	def self.getAvaible
		return self.where(condition_id: 2)
	end
end
