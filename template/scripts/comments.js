Twee.addModule('comments', '.comments_box', function($, section) {

	var button = $('[data-comments]', section),
		data = button.data('comments') || {},
		wrapper = section.find('.comments'),
		increment = (data && data.page === data.pages) ? -1 : 1;

	data.action = 'comment_list';
	data.noncer = tw_template.nonce;

	wrapper.on('reset', function() {

		wrapper.children().remove();

		data.page = 1;

		button.trigger('click');

	});

	button.on('click', function() {

		data.page += increment;

		$.ajax(tw_template.ajaxurl, {
			type: 'post',
			dataType: 'html',
			data: data,
			beforeSend: function() {
				button.addClass('is_loading');
			}
		}).always(function() {
			button.removeClass('is_loading');
		}).done(function(response) {

			if (response) {

				var comments = $(response).find('.comments').html();

				if (comments) {

					wrapper.append($(comments));

					if (data.page < data.pages) {
						button.removeClass('is_hidden');
					} else {
						button.addClass('is_hidden');
					}

					section.trigger('init');

				} else {

					button.addClass('is_hidden');

				}

			} else {

				button.addClass('is_hidden');

			}

		});

	});

});