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
  		@NewUser=User.create({:fb_id => params[:id], :name => params[:name], :first_n => params[:first_n],:last_n => params[:last_n], :locale => params[:locale], :email => params[:email]})
  		@NewUser.save
  		@User = User.last
  		render json: { status: :ok, owner: @NewUser}
  	end
  	@idItem = params[:item_id]
  	
  	@CurrentItem = Item.find(@idItem)
  	@CurrentItem.user = @User
  	@CurrentItem.save


  	render json: { status: :ok, owner: @User.name}

  end
end
