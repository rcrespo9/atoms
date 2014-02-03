require "spec_helper"

describe "routes to the elements controller" do |variable|
	it "routes to the root path" do
		expect(:get => root_path).
		to route_to(:controller => "elements", :action => "home")
	end

	it "routes to the playground path" do
		expect(:get => playground_path).
		to route_to(:controller => "elements", :action => "playground")
	end
end