var atomic_number = $('td.chemical').click(function(e) {
	alert($(this).data('position'));
	e.stopPropagation();
});