// externals
import assign from 'lodash.assign';
import classnames from 'classnames';
import { addFilter } from '@wordpress/hooks';
import { __ } from '@wordpress/i18n';
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment } from '@wordpress/element';
import { BlockControls, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, Button, ButtonGroup, Toolbar } from '@wordpress/components';

// icon
const icon = () => {
	return (
		<svg aria-hidden="true" role="img" focusable="false" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" fill-rule="evenodd"><path d="M18 2H6C4.89 2 4 2.9 4 4V20C4 21.11 4.89 22 6 22H18C19.11 22 20 21.11 20 20V4C20 2.9 19.11 2 18 2M18 20H6V16H18V20M18 8H6V4H18V8Z" fill="currentColor" fill-rule="nonzero"></path></g></svg>
	)
}

// enable filters for blocks
// block: defaultMargin
const enableOnBlocks = {
	'core/heading': 'standard',
	'core/paragraph': 'standard',
	'core/group': 'standard',
	'core/columns': 'standard',
}

const controlOptionsTop = [
	{
		label: __( '0', 'sht' ),
		title: __( 'Kein Aussenabstand oben', 'sht' ),
		value: 'none',
	},
	{
		label: __( 'S', 'sht' ),
		title: __( 'Klein', 'sht' ),
		value: 'small',
	},
	{
		label: __( 'R', 'sht' ),
		title: __( 'Normal', 'sht' ),
		value: 'standard',
	},
	{
		label: __( 'M', 'sht' ),
		title: __( 'Mittelgross', 'sht' ),
		value: 'medium',
	},
	{
		label: __( 'L', 'sht' ),
		title: __( 'Gross', 'sht' ),
		value: 'large',
	},
	{
		label: __( 'XL', 'sht' ),
		title: __( 'Extragross', 'sht' ),
		value: 'xlarge',
	},
];

const controlOptionsBottom = controlOptionsTop;

/**
 * Add shtMarginTop and shtMarginBottom attribute to block.
 *
 * @param {object} settings Current block settings.
 * @param {string} name Name of block.
 *
 * @returns {object} Modified block settings.
 */
const addMarginAttribute = ( settings, name ) => {
	// if block font size is enabled for this block

	let defaultSize = 'standard';

	if ( name in enableOnBlocks ) {
		defaultSize = enableOnBlocks[ name ];
	}

	// use lodash's assign to gracefully handle if attributes are undefined
	settings.attributes = assign( settings.attributes, {
		shtMarginTop: {
			type: 'string',
			default: defaultSize,
		},
		shtMarginBottom: {
			type: 'string',
			default: defaultSize,
		},
	} );

	return settings;
}

/**
 * Add font size options to BlockEdit
 *
 * @param {object} BlockEdit Current block edit component.
 *
 * @returns {object} Modified block block edit component.
 */
const addMarginControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {

		const { shtMarginTop, shtMarginBottom } = props.attributes;

		// remove all previous font size classes on props.attributes.className
		if ( props.attributes.className ) {
			let classes = props.attributes.className.trim().split(' ');

			Object.keys( controlOptionsTop ).map( key => {
				classes = classes.filter( function ( value, index, arr ) { return value !== 'has-block-margin-top--' + controlOptionsTop[ key ].value } );
			} );

			Object.keys( controlOptionsBottom ).map( key => {
				classes = classes.filter( function ( value, index, arr ) { return value !== 'has-block-margin-bottom--' + controlOptionsBottom[ key ].value } );
			} );

			props.attributes.className = classnames( classes );
		}

		let classNames = [];

		// add each classname from controlOptionsTop
		Object.keys( controlOptionsTop ).map( key => {
			classNames.push( {
				[ 'has-block-margin-top--' + controlOptionsTop[ key ].value ]: controlOptionsTop[ key ].value === shtMarginTop ? true : false
			} )
		} );

		// add each classname from controlOptionsBottom
		Object.keys( controlOptionsBottom ).map( key => {
			classNames.push( {
				[ 'has-block-margin-bottom--' + controlOptionsBottom[ key ].value ]: controlOptionsBottom[ key ].value === shtMarginBottom ? true : false
			} )
		} );

		props.attributes.className = classnames( props.attributes.className, classNames );

		// return the blockedit and a panel with font size settings
		return (
			<Fragment>
				<BlockEdit { ...props } />
				<InspectorControls>
					<PanelBody
						title={ __( 'Aussenabstände', 'sht' ) }
						initialOpen={ false }
					>
						<div className="components-base-control">
							<label class="components-base-control__label">{ __( 'Abstand oben ändern', 'sht' ) }</label>
							<ButtonGroup>
								{Object.keys( controlOptionsTop ).map( key => {
									return (
										<Button
											isSecondary={controlOptionsTop[key].value !== shtMarginTop}
											isPrimary={controlOptionsTop[key].value === shtMarginTop}
											onClick={() => {
												props.setAttributes( {
													shtMarginTop: controlOptionsTop[key].value,
												})
											}}
										>{controlOptionsTop[key].label}</Button>
									)
								} )}
							</ButtonGroup>
						</div>
						<div className="components-base-control">
							<label class="components-base-control__label">{ __( 'Abstand unten ändern', 'sht' ) }</label>
							<ButtonGroup>
								{Object.keys( controlOptionsBottom ).map( key => {
									return (
										<Button
											isSecondary={controlOptionsBottom[key].value !== shtMarginBottom}
											isPrimary={controlOptionsBottom[key].value === shtMarginBottom}
											onClick={() => {
												props.setAttributes( {
													shtMarginBottom: controlOptionsBottom[key].value,
												})
											}}
										>{controlOptionsBottom[key].label}</Button>
									)
								} )}
							</ButtonGroup>
						</div>
					</PanelBody>
				</InspectorControls>
			</Fragment>
		);
	};
}, 'addMarginControls' );

// font size filter
addFilter( 'blocks.registerBlockType', 'sht/attribute/block-margin', addMarginAttribute );
addFilter( 'editor.BlockEdit', 'sht/control/block-margin', addMarginControls );
