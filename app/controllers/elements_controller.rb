class ElementsController < ApplicationController

	def home
	end

	def playground
		@elements = Element.all
	end
	
end
