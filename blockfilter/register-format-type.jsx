/**
 * Adds SUP and SUB format options to the text format control list
 * As of WordPress 5.5 (?) these actual values are NOT required as
 * they are delivered by Core.
 *
 * mark@sayhello.ch 2020
 */

import { _x } from '@wordpress/i18n';
import { createElement, Fragment } from '@wordpress/element';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { RichTextToolbarButton, RichTextShortcut } from '@wordpress/editor';

[
	{
		name: 'sup',
		title: _x( 'Hochstellen', 'Toolbar button text', 'sha' ),
		character: '.'
	},
	{
		name: 'sub',
		title: _x( 'Tiefstellen', 'Toolbar button text', 'sha' ),
		character: ','
	}
].forEach( ( { name, title, character, icon } ) => {
	const type = `advanced/${name}`;

	registerFormatType( type, {
		title,
		tagName: name,
		className: null,
		edit( { isActive, value, onChange } ) {
			const onToggle = () => onChange( toggleFormat( value, { type } ) );

			return createElement(
				Fragment,
				null,
				createElement( RichTextShortcut, {
					type: 'primary',
					character,
					onUse: onToggle
				} ),
				createElement( RichTextToolbarButton, {
					title,
					onClick: onToggle,
					isActive,
					shortcutType: 'primary',
					shortcutCharacter: character,
					className: `toolbar-button-with-text toolbar-button__advanced-${name}`
				} )
			);
		}
	} );
} );
