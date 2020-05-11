/**
 * Customize the ACF color picker with the
 * colours from the Theme. (Runs in the Editor
 * only if this script is used in blocks.js.)
 * mhm March 2020
 */

import domReady from '@wordpress/dom-ready';
import { select } from '@wordpress/data';

domReady(() => {
	acf.add_filter('color_picker_args', function( args, field ){
		let palette = [];
		select('core/editor').getEditorSettings().colors.forEach(color => {
			palette.push(color.color);
		});
		if(palette.length){
			args.palettes = palette;
		}
		return args;
	});
});
