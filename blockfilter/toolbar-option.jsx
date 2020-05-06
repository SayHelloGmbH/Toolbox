// externals
import assign from 'lodash.assign';
import classnames from 'classnames';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl, Toolbar, Button } from '@wordpress/components';

// icon
const icon = () => {
	return <svg aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" class="dashicon dashicons-star-filled"><path d="M10 1l3 6 6 .75-4.12 4.62L16 19l-6-3-6 3 1.13-6.63L1 7.75 7 7z" fill="currentColor"></path></svg>;
}

// enable filters for blocks
const enableOnBlocks = {
	'core/paragraph': 'bold', // block: defaultFontWeight
}

/**
 * Add toolbar option control to BlockEdit
 *
 * @param {object} BlockEdit Current block edit component.
 *
 * @returns {object} Modified block block edit component.
 */
const addToolbarOptionControl = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		// if toolbar option is not enabled for this block
		if ( !( props.name in enableOnBlocks ) ) {
			return (
				<BlockEdit { ...props } />
			);
		}

		// set active state if props.attributes.className includes the special option class
		const isActive = () => {
			if ( props.attributes.className ) {
				let classes = props.attributes.className.trim().split( " " );

				if ( props.attributes.className.includes( 'has-special-option' ) ) {
					return true;
				}
			} else {
				return false;
			}
		};

		// set the special option class if isActive
		const onChange = () => {
			if ( props.attributes.className ) {
				let classes = props.attributes.className.trim().split( " " );

				if ( isActive() ) {
					classes = classes.filter( function ( value, index, arr ) { return value !== 'has-special-option' } );
					props.setAttributes( { className: classnames( classes ) } )
				} else {
					props.setAttributes( { className: classnames( props.attributes.className, 'has-special-option' ) } )
				}

			} else {
				if ( !isActive() ) {
					props.setAttributes( { className: classnames( 'has-special-option' ) } )
				}
			}
		}

		// return the blockedit with the extra option
		return (
			<Fragment>
				{
					<BlockControls>
						<div class="components-toolbar">
							<Button
								icon={icon}
								label={__('Spezial Option', 'sht')}
								isPressed={isActive()}
								onClick={onChange}
								style={isActive() ? {
									backgroundColor: '#555d66',
									color: 'white' ,
									border: 'white 2px solid',
									boxSizing: 'border-box',
									borderRadius: '6px',
									padding: '6px',
								} : {}}
							></Button>
						</div>
					</BlockControls>
				}
				<BlockEdit { ...props } />
			</Fragment>
		);
	};
}, 'addToolbarOptionControl' );

addFilter( 'editor.BlockEdit', 'sht/toolbar/special-option', addToolbarOptionControl );
