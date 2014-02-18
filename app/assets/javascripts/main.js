var playground = (function() {
	
	var $element = $('td.chemical');
	var $tables = $('.tables');
	var	$viz = $('.visualization');
	var	$elementInfo = $('.element-info');
	var	$newElement = $('#new-element');

	// initialize visualization	onclick
	var visualization = $element.click(function() {
		var width = 650;
		var height = 339;
		var $atomic_number = $(this).data('attribute');
		var $symbol = $(this).data('symbol');
		var $name = $(this).data('name');
		var $atomic_weight = $(this).data('weight');
		var $elementColor = $(this).css('background-color');
		var $elementBorder = $(this).css('border');

		$tables.hide();
		$viz.show();

		$elementInfo.append(
			'<p class="details text-left" id="atomic_number">' + $atomic_number + '</p>', 
			'<p class="details" id="symbol">' + $symbol + '</p>',
			'<p class="details" id="name">' + $name + '</p>',
			'<p class="details" id="atomic_weight">' + $atomic_weight + '</p>'
		);

		$elementInfo.css('background-color', $elementColor);
		$elementInfo.css('border', $elementBorder);


		var nodes = d3.range($atomic_number + 1).map(function() { return {radius: Math.random() * 12 + 4}; }),
		    root = nodes[0];

		root.radius = 0;
		root.fixed = true;

		var force = d3.layout.force()
		    .gravity(0.05)
		    .charge(function(d, i) { return i ? 0 : -2000; })
		    .nodes(nodes)
		    .size([width, height]);

		force.start();

		var canvas = d3.select('.atoms').append('canvas')
		    .attr("width", width)
		    .attr("height", height);

		var context = canvas.node().getContext("2d");

		force.on("tick", function(e) {
		  var q = d3.geom.quadtree(nodes),
		      i,
		      d,
		      n = nodes.length;

		  for (i = 1; i < n; ++i) q.visit(collide(nodes[i]));

		  context.clearRect(0, 0, width, height);
		  context.fillStyle = $elementColor;
		  context.beginPath();
		  for (i = 1; i < n; ++i) {
		    d = nodes[i];
		    context.moveTo(d.x, d.y);
		    context.arc(d.x, d.y, d.radius, 0, 2 * Math.PI);
		  }
		  context.fill();
		});

		canvas.on("mousemove", function() {
		  var p1 = d3.mouse(this);
		  root.px = p1[0];
		  root.py = p1[1];
		  force.resume();
		});

		function collide(node) {
		  var r = node.radius + 16,
		      nx1 = node.x - r,
		      nx2 = node.x + r,
		      ny1 = node.y - r,
		      ny2 = node.y + r;
		  return function(quad, x1, y1, x2, y2) {
		    if (quad.point && (quad.point !== node)) {
		      var x = node.x - quad.point.x,
		          y = node.y - quad.point.y,
		          l = Math.sqrt(x * x + y * y),
		          r = node.radius + quad.point.radius;
		      if (l < r) {
		        l = (l - r) / l * .5;
		        node.x -= x *= l;
		        node.y -= y *= l;
		        quad.point.x += x;
		        quad.point.y += y;
		      }
		    }
		    return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1;
		  };
		}
	});
	
	// new element button hides viz and displays tables
	var elementButton = $newElement.click(function() {
		var $elementDetails = $('.details'); 

		$viz.hide();
		d3.select('canvas').remove();
		$elementDetails.remove();		
		$tables.show();
	});

	// element hover events
	var seriesHover = $('td').hover(function() {
		var $shake = 'animated shake';
		var $this = $(this);
		var $actiSeries = $('.acti-series');
		var $lantSeries = $('.lant-series');

		if($this.attr('id') === 'acti') {
			$actiSeries.toggleClass($shake);
		} 
		
		else if ($this.attr('id') === 'lant') {
			$lantSeries.toggleClass($shake);
		}
	});

	var bigElementHover = $elementInfo.hover(function() {
		var $bounce = 'animated bounce';
		var $this = $(this);

		$this.toggleClass($bounce);
	});

	return {
		visualization: visualization,
		elementButton: elementButton,
		seriesHover: seriesHover,
		bigElementHover: bigElementHover
	};
})();

playground.visualization;
playground.elementButton;
playground.seriesHover;
playground.bigElementHover;



