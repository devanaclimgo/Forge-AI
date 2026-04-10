class Task < ApplicationRecord
  belongs_to :project

  t.jsonb :technical_details
end
