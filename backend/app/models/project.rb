class Project < ApplicationRecord
  belongs_to :user
  has_many :tasks, dependent: :destroy
  has_many :agent_logs, dependent: :destroy
  has_many :project_versions, dependent: :destroy
end
