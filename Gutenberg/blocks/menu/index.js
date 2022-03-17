import { _x } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import ServerSideRender from '@wordpress/server-side-render';
import { menu as icon } from '@wordpress/icons';
import { InspectorControls } from '@wordpress/block-editor';
import { SelectControl, PanelBody } from '@wordpress/components';
import { withSelect } from '@wordpress/data';

const blockName = 'sht/menu';

registerBlockType(blockName, {
    title: _x('Predefined menu', 'Block title', 'sha'),
    description: _x('Adds a pre-defined navigation menu to the page.', 'Block title', 'sha'),
    icon,
    category: 'common',
    supports: {
        align: false,
        mode: false,
        html: false,
        multiple: true,
        reusable: true,
        inserter: true,
    },
    attributes: {
        menu: {
            type: 'string',
        },
    },
    edit: withSelect(select => {
        const menus = select('sht/menu-positions').getEntries();

        if (!menus || !Object.keys(menus).length) {
            return { menus: [] };
        }

        let menu_selection = [
            {
                label: _x('Keine Auswahl', 'Default selector label', 'sha'),
                value: '',
            },
        ];

        menus.map(menu => {
            menu_selection.push({ value: menu.id, label: menu.title });
        });

        return {
            menus: menu_selection,
        };
    })(({ attributes, menus, setAttributes }) => {
        const { menu } = attributes;

        return [
            <InspectorControls>
                <PanelBody
                    title={_x('Block-Optionen', 'PanelBody Title', 'sha')}
                    initialOpen={true}
                >
                    <SelectControl
                        label={_x(
                            'Vordefinierte Navigation auswählen',
                            'Select control label',
                            'sha'
                        )}
                        value={menu}
                        onChange={menu => setAttributes({ menu })}
                        options={menus}
                    />
                </PanelBody>
            </InspectorControls>,
            <ServerSideRender block={blockName} attributes={attributes} />,
        ];
    }),
    save() {
        return null;
    },
});
