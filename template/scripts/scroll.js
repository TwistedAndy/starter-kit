/* Smooth scroll */

jQuery(function($) {

	$('a[href*="#"]').click(function() {

		let href = this.href;

		let link = document.location.protocol + "//" + document.location.hostname + document.location.pathname;

		if (href && href.indexOf('#') !== false) {

			let parts = href.split('#');

			if (parts.length > 1 && link === parts[0]) {
				scrollTo($("#" + parts[1]));
				return false;
			} else if (parts.length === 1) {
				scrollTo($("#" + parts[0]));
				return false;
			}

		}

	});

	let location = document.location.href;

	if (location.indexOf('#') !== false) {

		location = location.split('#');

		if (location[1]) {

			scrollTo($('#' + location[1]));

		}

	}

	function scrollTo(element) {

		let $ = jQuery;

		if (element.length > 0) {

			let offset = element.offset().top - 60;

			$('html, body').stop().animate({
				'scrollTop': offset
			}, 1000);

		}

	}


});