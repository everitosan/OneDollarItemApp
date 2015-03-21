class DonatorController < ApplicationController
  #skip_before_action :verify_authenticity_token
  #protect_from_forgery with: :null_session

  def all
  	@items = Item.all
  	respond_to do |format|
  		format.html #all.html.erb
  		format.json { render json: @items}
  	end
  end

  def prepost
  	@dataUser_Id=params[:id]
  	@dataUser_email=params[:email]
  	render json: { status: :ok, owner: @dataUser_Id }
  end
end
