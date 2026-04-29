class Project < ApplicationRecord
  belongs_to :user
  has_many :tasks, dependent: :destroy
  has_many :sprints, dependent: :destroy
  has_one  :project_context, dependent: :destroy
  has_many :agent_logs, dependent: :destroy
end
