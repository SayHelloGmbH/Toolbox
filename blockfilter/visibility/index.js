/**
 * Extending Gutenberg Core Blocks with Custom Attributes and Controls
 * Thanks Jeffrey Carandang
 * https://jeffreycarandang.com/extending-gutenberg-core-blocks-with-custom-attributes-and-controls/
 */

import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { Fragment } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import classnames from 'classnames';

//restrict to specific blocks
const allowedBlocks = ['core/paragraph', 'core/heading', 'core/buttons'];

/**
 * Add custom attribute for mobile visibility.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
function addAttributes(settings) {
    //check if object exists for old Gutenberg version compatibility
    //add allowedBlocks restriction
    if (typeof settings.attributes !== 'undefined' && allowedBlocks.includes(settings.name)) {
        settings.attributes = Object.assign(settings.attributes, {
            hiddenForMobile: {
                type: 'boolean',
                default: false,
            },
            hiddenForTablet: {
                type: 'boolean',
                default: false,
            },
            hiddenForDesktop: {
                type: 'boolean',
                default: false,
            },
        });
    }

    return settings;
}

/**
 * Add mobile visibility controls on Advanced Block Panel.
 *
 * @param {function} BlockEdit Block edit component.
 *
 * @return {function} BlockEdit Modified block edit component.
 */
const withAdvancedControls = createHigherOrderComponent(BlockEdit => {
    return props => {
        const { name, attributes, setAttributes, isSelected } = props;

        const { hiddenForMobile, hiddenForTablet, hiddenForDesktop } = attributes;

        return (
            <Fragment>
                <BlockEdit {...props} />
                {isSelected && allowedBlocks.includes(name) && (
                    <InspectorControls>
                        <PanelBody title={__('Sichtbarkeit', 'sht')} initialOpen={true}>
                            <ToggleControl
                                label={__('Auf Mobilgeräte verstecken')}
                                checked={!!hiddenForMobile}
                                onChange={() =>
                                    setAttributes({ hiddenForMobile: !hiddenForMobile })
                                }
                                help={
                                    !!hiddenForMobile
                                        ? __('Dieser Block ist versteckt auf Mobilgeräte.')
                                        : ''
                                }
                            />
                            <ToggleControl
                                label={__('Auf Tabletts verstecken')}
                                checked={!!hiddenForTablet}
                                onChange={() =>
                                    setAttributes({ hiddenForTablet: !hiddenForTablet })
                                }
                                help={
                                    !!hiddenForTablet
                                        ? __('Dieser Block ist versteckt auf Tabletts.')
                                        : ''
                                }
                            />
                            <ToggleControl
                                label={__('Auf Desktopcomputer verstecken')}
                                checked={!!hiddenForDesktop}
                                onChange={() =>
                                    setAttributes({ hiddenForDesktop: !hiddenForDesktop })
                                }
                                help={
                                    !!hiddenForDesktop
                                        ? __('Dieser Block ist versteckt auf Desktopcomputer.')
                                        : ''
                                }
                            />
                        </PanelBody>
                    </InspectorControls>
                )}
            </Fragment>
        );
    };
}, 'withAdvancedControls');

/**
 * Add custom element class in save element.
 *
 * @param {Object} extraProps     Block element.
 * @param {Object} blockType      Blocks object.
 * @param {Object} attributes     Blocks attributes.
 *
 * @return {Object} extraProps Modified block element.
 */
function applyExtraClass(extraProps, blockType, attributes) {
    const { hiddenForMobile, hiddenForTablet, hiddenForDesktop } = attributes;

    //check if attribute exists for old Gutenberg version compatibility
    //add class only when hiddenForMobile = false
    //add allowedBlocks restriction
    if (
        typeof hiddenForMobile !== 'undefined' &&
        allowedBlocks.includes(blockType.name) &&
        !!hiddenForMobile
    ) {
        extraProps.className = classnames(extraProps.className, 'hidden-for--mobile');
    }

    if (
        typeof hiddenForTablet !== 'undefined' &&
        allowedBlocks.includes(blockType.name) &&
        !!hiddenForTablet
    ) {
        extraProps.className = classnames(extraProps.className, 'hidden-for--tablet');
    }

    if (
        typeof hiddenForDesktop !== 'undefined' &&
        allowedBlocks.includes(blockType.name) &&
        !!hiddenForDesktop
    ) {
        extraProps.className = classnames(extraProps.className, 'hidden-for--desktop');
    }

    return extraProps;
}

//add filters

addFilter('blocks.registerBlockType', 'sht/custom-attributes', addAttributes);

addFilter('editor.BlockEdit', 'sht/custom-advanced-control', withAdvancedControls);

addFilter('blocks.getSaveContent.extraProps', 'sht/applyExtraClass', applyExtraClass);
