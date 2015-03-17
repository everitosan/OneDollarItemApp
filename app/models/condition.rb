class Condition < ActiveRecord::Base
	has_many :items

	validates :description,
			   presence: true
end
