/**
 * Watch images and set dynamic sizes attribute.
 * Improves determining which image to load from an srcset
 *
 * Since 27.7.2022 mark@sayhello.ch
 *
 */
const images = document.querySelectorAll('.wp-block-sht-image-map__figure img');

if (images.length) {
	const debounce = (callback, wait) => {
		let timeoutId = null;
		return (...args) => {
			window.clearTimeout(timeoutId);
			timeoutId = window.setTimeout(() => {
				callback.apply(null, args);
			}, wait);
		};
	};

	const set = debounce(() => {
		images.forEach((image) => {
			if (!image.hasAttribute('srcset')) {
				return;
			}

			image.setAttribute(
				'sizes',
				`${image.getBoundingClientRect().width}px`
			);
		});
	}, 250);

	set();
	window.addEventListener('resize', set);
}
