// periodic table and visualization click event
$('td.chemical').click(function() {
	var width = 960,
	    height = 500,
	    atomic_number = $(this).data('attribute'),
	    symbol = $(this).data('symbol'),
	    name = $(this).data('name'),
	    atomic_weight = $(this).data('weight');

	$('.tables').hide();
	$('.visualization').show();

	$('.big-element').append(
		$('.element-info').prepend(
			'<p class="details text-right" id="atomic_number">' + atomic_number + '</p>', 
			'<p class="details" id="symbol">' + symbol + '</p>',
			'<p class="details" id="name">' + name + '</p>',
			'<p class="details" id="atomic_weight">' + atomic_weight + '</p>'
		),
		'<button class="details text-center" id="new-element">New Element</button>'
	);


	d3.select('canvas').remove();

	var nodes = d3.range(atomic_number + 1).map(function() { return {radius: Math.random() * 12 + 4}; }),
	    root = nodes[0];

	root.radius = 0;
	root.fixed = true;

	var force = d3.layout.force()
	    .gravity(0.05)
	    .charge(function(d, i) { return i ? 0 : -2000; })
	    .nodes(nodes)
	    .size([width, height]);

	force.start();

	var canvas = d3.select(".atoms").append("canvas")
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
	  context.fillStyle = "#2d2c2c";
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

// new element button click event
$('.big-element').on('click', '#new-element', function() {
	$('.tables').show();
	$('.visualization').hide();
	d3.select('canvas').remove();
	$('.details').remove();
});


// chemical element hover events
$('td.chemical').hover(function() {
	$(this).toggleClass('animated pulse');
});

$('td').hover(function() {
	var animation = 'animated shake';
	var $this = $(this);
	
	if($this.attr('id') === 'acti') {
		$('.acti-series').toggleClass(animation);
	} 
	
	else if ($this.attr('id') === 'lant') {
		$('.lant-series').toggleClass(animation);
	}
});
