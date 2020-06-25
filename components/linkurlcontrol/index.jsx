/**
 * Link URL for Say Hello components
 * mark@sayhello.ch 25.6.2020
 *
 * Usage:
 * 1:
import LinkUrlControl from '../_components/linkurlcontrol.jsx';
 *
 * 2:
<LinkUrlControl
	className="o-link"
	attributes={attributes}
	setAttributes={setAttributes}
	label={ _x( 'Link definieren (optional)', 'Component label', 'sha' ) }
/>
 * 3:
 * Add attribute linkUrl (string) to the block
 *
 * 4:
 * In the save() function:
{
	!!attributes.text && !!attributes.linkUrl &&
	<LinkUrlControl.View
		className="o-link"
		attributes={attributes}
	/>
}
 */

import { Component } from '@wordpress/element';
import { URLInput, RichText } from '@wordpress/block-editor';
import { _x } from '@wordpress/i18n';

const LinkUrlControl = ( props ) => {

	const { attributes, className, setAttributes, label } = props;
	const class_name = className || 'o-link';

	return (
		<div>
			<div className="components-base-control">
				{ !!label &&
					<label class="components-base-control__label">{ label }</label>
				}
				<URLInput
					className='o-linkurlcontrol'
					value={attributes.linkUrl}
					onChange={(value) => {
						setAttributes({linkUrl: value.replace(/<\/?[^>]+(>|$)/g, '')});
					}}
				/>
			</div>
		</div>
	);
}

LinkUrlControl.View = ( props ) => {
	const class_name = props.className || 'o-link';
	const { attributes } = props;
	return (
		<RichText.Content
			className={class_name}
			value={attributes.text}
			tagName="a"
			href={attributes.linkUrl}
		/>
	)
}

export default LinkUrlControl;
