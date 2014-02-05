var atomic_number = $('td.chemical').click(function(e) {
	e.stopPropagation();
	alert($(this).data('position'));
});