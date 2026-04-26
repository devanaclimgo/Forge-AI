Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "/login", to: "auth#login"
      post "/register", to: "auth#register"
      post "agent_test", to: "agent_test#create" 

      resources :projects do
        resources :tasks
        resources :sprints, only: [:index, :create]
      end
    end
  end
end
