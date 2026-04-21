class Api::V1::AuthController < ApplicationController
  skip_before_action :authorize_request, only: [:login, :register]

  def register
    user = User.create!(user_params)

    token = Auth::JsonWebToken.encode(user_id: user.id)

    render json: { user: user, token: token }
  end

  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      token = Auth::JsonWebToken.encode(user_id: user.id)
      render json: { user: user, token: token }
    else
      render json: { error: "Invalid credentials" }, status: :unauthorized
    end
  end

  private

  def user_params
    params.permit(:name, :email, :password)
  end
end