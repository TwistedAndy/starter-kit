const Twee = {

	modules: {},

	/**
	 * Initialize an app
	 */
	initApp: function() {

		window.addEventListener('load', Twee.initStyles);
		window.addEventListener('resize', Twee.initStyles);
		document.addEventListener('DOMContentLoaded', Twee.initStyles);

		window.addEventListener('load', Twee.initModules);
		window.addEventListener('rocket-load', Twee.initModules);
		document.addEventListener('rocket-DOMContentLoaded', Twee.initModules);
		document.addEventListener('DOMContentLoaded', Twee.initModules);

	},

	/**
	 * Initialize base styles
	 */
	initStyles: function() {

		let scrollbarWidth = parseInt(window.innerWidth - document.documentElement.clientWidth);

		if (isNaN(scrollbarWidth) || scrollbarWidth < 0) {
			scrollbarWidth = 0;
		}

		document.body.style.setProperty('--width-scrollbar', scrollbarWidth + 'px');

	},

	/**
	 * Initialize all modules
	 */
	initModules: function() {
		Object.keys(Twee.getModules()).map(function(key) {
			Twee.initModule(key, false);
		});
	},

	/**
	 * Initialize a module
	 *
	 * @param {string} key
	 * @param {HTMLElement|jQuery|string|boolean} elements
	 *
	 * @return {Object}
	 */
	initModule: function(key, elements) {

		let module = Twee.getModule(key),
			status = true;

		if (!module) {
			console.warn('Module not found: ' + key);
			return false;
		}

		if (elements === 'undefined' || elements === false) {
			elements = jQuery(module.selector);
		} else {
			elements = jQuery(elements);
		}

		if (elements.length === 0) {
			return status;
		}

		if (module.deps && module.deps.length > 0 && Array.isArray(module.deps)) {

			module.deps.forEach((dep) => {

				if (!status || !dep) {
					return;
				}

				const item = Twee.getModule(dep);

				if (item) {
					if (item.deps && item.deps.indexOf(key) !== -1) {
						console.warn('Dependency loop detected: ' + dep);
						return true;
					} else {
						status = Twee.initModule(dep);
					}
				} else if (typeof window[dep] === 'undefined') {
					status = false;
				}

			});

		}

		if (status) {
			elements.each(function() {
				Twee.runModule(this, key, module);
			});
		}

		return status;

	},

	/**
	 * Register a module
	 *
	 * A callback will be triggered once per element matching
	 * a selector once all dependencies are resolved
	 *
	 * @param {string}   key        A unique module key
	 * @param {string}   selector   Target element selector
	 * @param {function} callback   A function called on initialization
	 * @param {Array}    deps       An array with global variables or module keys
	 * @param {boolean}  multiple   Allow running a callback multiple times on the same element
	 */
	addModule: function(key, selector, callback, deps = [], multiple = false) {

		if (selector) {
			selector = selector.toString();
		} else {
			selector = 'html';
		}

		const modules = Twee.getModules();

		if (typeof modules[key] !== 'undefined') {
			console.warn('Module ' + key + ' is already added');
		}

		modules[key] = {
			key: key,
			multiple: multiple,
			selector: selector,
			callback: callback,
			deps: deps
		};

	},

	/**
	 * Get all registered modules
	 *
	 * @returns {Object}
	 */
	getModules: function() {
		return Twee.modules;
	},

	/**
	 *  Get a registered module
	 *
	 * @param {string} key
	 *
	 * @returns {Object|boolean}
	 */
	getModule: function(key) {

		const modules = Twee.getModules();

		if (typeof modules[key] === 'object' && modules[key].selector && typeof modules[key].callback === 'function') {
			return modules[key];
		} else {
			return false;
		}

	},

	/**
	 * Run all modules matching an element
	 *
	 * @param {HTMLElement|jQuery|string} selector
	 */
	runModules: function(selector) {

		Object.keys(Twee.getModules()).forEach(function(key) {

			const module = Twee.getModule(key);

			if (module && module.selector) {
				jQuery(selector).filter(module.selector).each(function() {
					Twee.initModule(key, this);
				});
			}

		});

	},

	/**
	 * Run a callback on an element
	 *
	 * @param {HTMLElement} element
	 * @param {string} key
	 * @param {Object} module
	 */
	runModule: function(element, key, module) {

		if (element instanceof HTMLElement && element.matches(module.selector) && (Twee.runOnce(element, key) || module.multiple)) {

			module.callback.call(element, jQuery, jQuery(element), module);

			setTimeout(function() {
				jQuery(element).trigger('twee_init_' + key, [key, module]);
			});

		}

	},

	/**
	 * Allow running code only once per element
	 *
	 * @param {HTMLElement} element
	 * @param {string}      slug
	 * @param {int}         timeout
	 *
	 * @returns {boolean}
	 */
	runOnce: function(element, slug, timeout = 0) {

		slug = slug || 'element';

		let key = 'tw_' + slug + '_loaded';

		if (timeout > 0) {
			setTimeout(function() {
				element[key] = false;
			}, timeout);
		}

		if (element[key]) {
			return false;
		} else {
			element[key] = true;
			return true;
		}

	},

	/**
	 * Run a function after a delay
	 *
	 * @param {function} callback
	 * @param {int}      delay
	 *
	 * @returns {function}
	 */
	debounce: function(callback, delay) {

		let timeout = false;

		return function() {
			clearTimeout(timeout);
			timeout = setTimeout(callback.apply.bind(callback, this, arguments), delay);
		};

	},

	/**
	 * Throttle the number of function calls
	 *
	 * @param {function} callback
	 * @param {int}      limit
	 *
	 * @returns {function}
	 */
	throttle: function(callback, limit) {

		let isThrottled = false,
			savedArgs = null,
			savedThis = null;

		function wrapper() {

			if (isThrottled) {
				savedArgs = arguments;
				savedThis = this;
				return;
			}

			callback.apply(this, arguments);

			isThrottled = true;

			setTimeout(function() {

				isThrottled = false;

				if (savedArgs) {
					wrapper.apply(savedThis, savedArgs);
					savedArgs = null;
					savedThis = null;
				}

			}, limit);

		}

		return wrapper;

	},

	/**
	 * Lock the screen scroll
	 */
	lockScroll: function() {
		document.body.classList.add('is_locked');
	},

	/**
	 * Unlock the screen scroll
	 */
	unlockScroll: function() {
		document.body.classList.remove('is_locked');
	},

	/**
	 * Set a cookie value
	 *
	 * @param {string}  name
	 * @param {string}  value
	 * @param {int}     expire
	 */
	setCookie: function(name, value, expire = 365) {

		let date = new Date();

		date.setTime(date.getTime() + (expire * 24 * 60 * 60 * 1000));

		document.cookie = name.toString() + '=' + value.toString() + ';expires=' + date.toUTCString() + ';path=/';

	},

	/**
	 * Get a cookie value
	 *
	 * @param {string} name
	 *
	 * @returns {string}
	 */
	getCookie: function(name) {

		name = name + '=';

		let decodedCookie = decodeURIComponent(document.cookie),
			parts = decodedCookie.split(';');

		for (let i = 0; i < parts.length; i++) {

			let part = parts[i];

			while (part.charAt(0) === ' ') {
				part = part.substring(1);
			}

			if (part.indexOf(name) === 0) {
				return part.substring(name.length, part.length);
			}

		}

		return '';

	}

};

Twee.initApp();