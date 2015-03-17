class User < ActiveRecord::Base
	has_many :items
	validates_presence_of :name
	validates_presence_of :fb_id
end
