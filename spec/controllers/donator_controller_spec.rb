require 'rails_helper'

RSpec.describe DonatorController, type: :controller do

  describe "GET #all" do
    it "returns http success" do
      get :all
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #prepost" do
    it "returns http success" do
      get :prepost
      expect(response).to have_http_status(:success)
    end
  end

end
