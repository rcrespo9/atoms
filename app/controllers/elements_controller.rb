class ElementsController < ApplicationController

	def home
	end

	def playground
		@elements = Element.order('atomic_number ASC').all
	end
	
end
