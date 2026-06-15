Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "/login", to: "auth#login"
      post "/register", to: "auth#register"
      post "agent_test", to: "agent_test#create" 

      get "agent_logs", to: "agent_logs#index"

      resources :projects do
        resources :tasks, only: [:index, :create, :update, :destroy]
        resources :sprints, only: [:index, :create, :update, :destroy]
      end
    end
  end
end
