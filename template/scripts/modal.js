/* Modal windows */

jQuery(function($) {

	let wrapper = $('body');

	$('.button').click(function(e) {

		$('#modal').addClass('is_visible');

		wrapper.addClass('is_locked');

		return false;

	});

	$('.modal_box .close, .modal_box').click(function() {
		$('.modal_box').removeClass('is_visible');
		wrapper.removeClass('is_locked');
	});

	$('.modal_box .modal').click(function(e) {
		e.stopPropagation();
	});

	$(document).keyup(function(e) {
		if (e.which === 27) {
			$('.modal_box').removeClass('is_visible');
			wrapper.removeClass('is_locked');
		}
	});

});