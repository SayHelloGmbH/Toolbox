import { _x } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { ServerSideRender } from '@wordpress/components';

import edit from './edit.jsx';

registerBlockType('mhm/post-header', {
	title: _x('Post or Page Header', 'Block title', 'picard'),
	description: _x('This block automatically shows the current post/page title and optional excerpt.', 'Block instructions', 'sha'),
	icon: 'slides',
	category: 'widgets',
	supports: {
		mode: false,
		html: false,
		multiple: false,
		reusable: false,
	},
	attributes: {
		alignment: {
			type: 'string',
			default: 'center',
		},
	},
	example: {
		attributes: {
			content: _x('Hello World', 'Example title', 'sha'),
			alignment: 'center',
		},
	},
	keywords: [
		_x('Excerpt',' Gutenberg block keyword', 'sha'),
		_x('Title',' Gutenberg block keyword', 'sha'),
		_x('Header',' Gutenberg block keyword', 'sha')
	],
	edit,
	save() {
		return null;
	},
});
