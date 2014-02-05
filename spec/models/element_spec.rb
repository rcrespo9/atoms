require 'spec_helper'

describe Element do 
	before :each do 
		@valid_name = "Hydrogen"
		@valid_symbol = "H"
		@valid_atomic_number = 1
		@valid_atomic_weight = "1.00794"
		@element = Element.create(name: @valid_name, symbol: @valid_symbol, atomic_number: @valid_atomic_number, atomic_weight: @valid_atomic_weight)
		
	end

	describe "Element#name" do 
		it "should return the correct name" do 
			@element.name.should eq(@valid_name)
		end
	end

	describe "Element#symbol" do 
		it "should return the correct symbol" do 
			@element.symbol.should eq(@valid_symbol)
		end
	end

	describe "Element#atomic_number" do 
		it "should return the correct atomic number" do 
			@element.atomic_number.should eq(@valid_atomic_number)
		end
	end

	describe "Element#atomic_weight" do 
		it "should return the correct atomic weight" do 
			@element.atomic_weight.should eq(@valid_atomic_weight)
		end
	end
end