class Task < ApplicationRecord
  belongs_to :project
  belongs_to :sprint, optional: true
end
