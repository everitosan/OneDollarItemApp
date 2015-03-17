require 'rails_helper'

RSpec.describe OdiController, type: :controller do

  describe "GET #preview" do
    it "returns http success" do
      get :preview
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #tender" do
    it "returns http success" do
      get :tender
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #results" do
    it "returns http success" do
      get :results
      expect(response).to have_http_status(:success)
    end
  end

end
