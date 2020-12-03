import { _x } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { InnerBlocks } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';

const blockName = 'sht/inner-blocks-example';

registerBlockType( blockName , {
	title: _x( 'InnerBlocks Example', 'Block title', 'sha' ),
	icon: 'list-view',
	category: 'widgets',
	keywords: [
		_x('Event', 'Block keyword', 'sha'),
	],
	supports: {
		mode: false,
		html: false
	},
	edit: class extends Component {
		constructor( props ) {
			super( ...arguments );
			this.props = props;
		}

		render({ className }) {

			return (
				<div className={className}>
					<InnerBlocks
						allowedBlocks={(['core/heading'], ['core/paragraph'])}
						templateLock={false}
						template={[
							[
								'core/heading',
								{
									level: 2,
									placeholder: _x('Geben Sie einen Titel ein', 'Default content', 'sha')
								}
							],
							[
								'core/paragraph',
								{
									content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
								}
							],
						]}
					/>
				</div>
			);
		}
	},
	save({ className }) {
		return (
			<div className={className}>
				<InnerBlocks.Content />
			</div>
		);
	}
} );
