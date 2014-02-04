class Element
  include Mongoid::Document
  field :name, type: String
  field :symbol, type: String
  field :atomic_number, type: Integer
  field :atomic_weight, type: String
end
