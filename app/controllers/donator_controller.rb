class DonatorController < ApplicationController

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
  	@idItem = params[:item_id]
  	
  	@CurrentItem = Item.find(@idItem)
  	@CurrentItem.user = @User
  	@CurrentItem.save


  	render json: { status: :ok, owner: @User.name}

  end
end
