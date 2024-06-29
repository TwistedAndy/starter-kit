jQuery(document).on('tw_init', function(e, $) {

	if (runOnce(this, 'sticky')) {
		return;
	}

	var elements = [],
		header = $('.header_box').get(0);

	$('.header_box.is_sticky').each(function() {

		var styles = window.getComputedStyle(this, null),
			bottom = styles.getPropertyValue('bottom'),
			top = styles.getPropertyValue('top');

		if (top.indexOf('px') !== -1) {

			elements.push({
				target: this,
				type: 'top',
				value: parseInt(top.replace('px', ''))
			});

		} else if (bottom.indexOf('px') !== -1) {

			elements.push({
				target: this,
				type: 'bottom',
				value: parseInt(bottom.replace('px', ''))
			});

		}

	});

	function handleScroll() {

		var topBar = 0,
			bottomBar = 0;

		elements.forEach(function(element) {

			var isFixed = false,
				hasClass = element.target.classList.contains('is_fixed'),
				rect = element.target.getBoundingClientRect();

			if (element.type === 'top' && Math.abs(element.value - rect.top) < 1) {
				isFixed = true;
				topBar += rect.height;
			} else if (element.type === 'bottom' && Math.abs(window.innerHeight - rect.height - rect.top) < 1) {
				isFixed = true;
				bottomBar += rect.height;
			}

			if (isFixed && !hasClass) {
				element.target.classList.add('is_fixed');
			} else if (!isFixed && hasClass) {
				element.target.classList.remove('is_fixed');
			}

		});

		document.body.style.setProperty('--height-top', topBar + 'px');
		document.body.style.setProperty('--height-bottom', bottomBar + 'px');

		if (header) {

			var rect = header.getBoundingClientRect();

			if (rect.y > 0) {
				document.body.style.setProperty('--header-offset', rect.y + 'px');
			} else {
				document.body.style.setProperty('--header-offset', '0px');
			}

			document.body.style.setProperty('--header-shift', Math.round(rect.y + window.scrollY) + 'px');

		}

	}

	window.addEventListener('scroll', handleScroll);

	setTimeout(handleScroll, 100);

});