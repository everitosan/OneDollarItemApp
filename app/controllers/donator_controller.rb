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
  		@NewUser.emailPayment = params[:emailPayment]
  		@NewUser.save
  		@User = User.last
    else
      if @User.emailPayment != params[:emailPayment]
        @User.emailPayment = params[:emailPayment]
        @User.save
      end
  	end

  	render json: { status: :ok, owner: @User.name}

  end
end
