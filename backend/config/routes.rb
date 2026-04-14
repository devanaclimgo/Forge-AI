Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "/login", to: "auth#login"
      post "/register", to: "auth#register"

      resources :projects
      resources :tasks
    end
  end
end
