/**
 * Add custom padding control to specified blocks
 *
 * Updated 10.3.2022 mark@sayhello.ch
 */

import { __ } from '@wordpress/i18n';
import { addFilter } from '@wordpress/hooks';
import { Fragment } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';
import {
    PanelBody,
    __experimentalToggleGroupControl as ToggleGroupControl,
    __experimentalToggleGroupControlOption as ToggleGroupControlOption,
} from '@wordpress/components';
import { InspectorControls } from '@wordpress/block-editor';

import classnames from 'classnames';

/**
 * Restrict to specific blocks
 */
const allowedBlocks = ['core/group'];

const paddingControlOptions = [
    {
        label: __('0', 'sha'),
        value: 'none',
    },
    {
        label: __('S', 'sha'),
        value: 'small',
    },
    {
        label: __('M', 'sha'),
        value: 'standard',
    },
    {
        label: __('L', 'sha'),
        value: 'large',
    },
];

/**
 * Add custom attribute to the block.
 */
addFilter('blocks.registerBlockType', 'sha/group-padding-attributes', settings => {
    if (typeof settings.attributes !== 'undefined' && allowedBlocks.includes(settings.name)) {
        settings.attributes = Object.assign(settings.attributes, {
            padding: {
                type: 'string',
                default: 'standard',
            },
        });
    }

    return settings;
});

/**
 * Add Toggle Control
 */
addFilter(
    'editor.BlockEdit',
    'sha/group-padding-control',
    createHigherOrderComponent(BlockEdit => {
        return props => {
            const { name, attributes, setAttributes, isSelected } = props;

            const { padding } = attributes;

            return (
                <Fragment>
                    <BlockEdit {...props} />
                    {isSelected && allowedBlocks.includes(name) && (
                        <InspectorControls>
                            <PanelBody title={__('Innenabstand', 'sha')} initialOpen={true}>
                                <ToggleGroupControl
                                    value={padding}
                                    onChange={padding => setAttributes({ padding })}
                                    label={__(
                                        'Wählen Sie einen alternativen Innenabstand aus. (M ist die Standardgrösse.)'
                                    )}
                                    isBlock
                                >
                                    {Object.keys(paddingControlOptions).map(key => {
                                        return (
                                            <ToggleGroupControlOption
                                                value={paddingControlOptions[key].value}
                                                label={paddingControlOptions[key].label}
                                            />
                                        );
                                    })}
                                </ToggleGroupControl>
                            </PanelBody>
                        </InspectorControls>
                    )}
                </Fragment>
            );
        };
    })
);

/**
 * Adds custom class name to the block in the saved element
 * if the toggled option is true
 */
addFilter(
    'blocks.getSaveContent.extraProps',
    'sha/group-padding-save-class-name',
    (extraProps, blockType, attributes) => {
        const { className, padding } = attributes;

        if (typeof padding !== 'undefined' && allowedBlocks.includes(blockType.name) && !!padding) {
            extraProps = Object.assign({}, extraProps, {
                className: classnames(className, {
                    [`with-padding--${padding}`]: !!padding && padding !== 'standard',
                }),
            });
        }

        return extraProps;
    }
);

/**
 * Adds custom class name to the block in the editor
 * if the toggled option is true
 */
addFilter(
    'editor.BlockListBlock',
    'sha/group-padding-edit-class-name',
    createHigherOrderComponent(BlockListBlock => {
        return props => {
            const { attributes, name } = props,
                { className, padding } = attributes;

            if (allowedBlocks.includes(name) && !!padding) {
                props = Object.assign({}, props, {
                    className: classnames(className, {
                        [`with-padding--${padding}`]: !!padding && padding !== 'standard',
                    }),
                });
            }

            return <BlockListBlock {...props} />;
        };
    })
);
