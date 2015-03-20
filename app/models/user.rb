class User < ActiveRecord::Base
	has_many :items

	validates :name, 
			  presence: true
	validates :fb_id, 
			   presence: true, 
			   uniqueness: true
	validates :email, 
			   presence: true, 
			   uniqueness: true
end
