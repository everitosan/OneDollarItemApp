class Item < ActiveRecord::Base
	belongs_to :condition
	belongs_to :user

	validates_presence_of :user
	validates_presence_of :description
	validates_presence_of :condition
end
