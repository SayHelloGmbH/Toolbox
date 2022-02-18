import { _x } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';

// Override metadata
import { resizeCornerNE as icon } from '@wordpress/icons';

import edit from './edit';
import save from './save';
import metadata from './block.json';

registerBlockType(metadata, {
    icon,
    edit,
    save,
});
