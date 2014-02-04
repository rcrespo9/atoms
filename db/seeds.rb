# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Element.delete_all

require 'json'
require 'httparty'

elements = JSON.parse HTTParty.get('http://www.pnathan.com/static/elements.json').response.body

i = 0
while i < 118 do
		Element.create(name: elements.keys[i], symbol: elements.values[i]["symbol"], atomic_number: elements.values[i]["atomic_number"], atomic_weight: elements.values[i]["atomic_weight"])
	i += 1
end