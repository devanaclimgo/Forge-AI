class Project < ApplicationRecord
  belongs_to :user

  has_many :tasks
  has_many :sprints
  has_one :project_context
  has_many :agent_logs
end
