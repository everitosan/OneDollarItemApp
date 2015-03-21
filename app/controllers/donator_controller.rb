class DonatorController < ApplicationController

  def all
  	@items = Item.all
  	respond_to do |format|
  		format.html #all.html.erb
  		format.json { render json: @items}
  	end
  end

  def prepost
  	
  	@data_name=params[:name]
  	@data_first_N=params[:first_n]
  	@data_last_n=params[:last_n]
  	@data_locale=params[:locale]
  	@data_email=params[:email]

  	@User = User.find_by_fb_id(params[:id])

  	render json: { status: :ok, owner: @User }
  end
end
