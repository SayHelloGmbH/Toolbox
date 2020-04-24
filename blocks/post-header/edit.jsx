import { _x } from '@wordpress/i18n';
import { AlignmentToolbar, BlockControls } from '@wordpress/block-editor';
import { ServerSideRender } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';

export default class Edit extends Component {
	render() {
		const { attributes, setAttributes } = this.props;
		const { alignment } = attributes;

		const onChangeAlignment = ( newAlignment ) => {
			setAttributes({ alignment: newAlignment === undefined ? 'none' : newAlignment });
		};

		return (
			<Fragment>
				<BlockControls>
					<AlignmentToolbar
						value={ alignment }
						onChange={ onChangeAlignment }
					/>
				</BlockControls>
				<ServerSideRender
					block='mhm/post-header'
					attributes={{
						alignment: attributes.alignment
					}}
					/>
			</Fragment>
		);
	}
}
