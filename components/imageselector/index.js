/**
 * Image selector for Say Hello components
 * mark@sayhello.ch 24.3.2020
 *
 * This version uses the core data store and should be used if the
 * image is being rendered via ServerSideRender.
 *
 * The matching attribute (e.g. 'image') must be an Number, not an Object.
 *
 * Use our LazyImageImageSelector component if you need to use the
 * component with rednering in the editor. In that case,
 * the matching attribute must be an Object.
 *
 * Usage:
<ImageSelector
	attributes={attributes}
	setAttributes={setAttributes}
	attributeKey="image"
	allowedTypes={['image/jpg', 'image/jpeg']}
	imageFormat="full"
/>
 * OR
<ImageSelector
	attributes={attributes}
	setAttributes={setAttributes}
/>
 */

import { Button } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import { MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { _x } from '@wordpress/i18n';
import { select } from '@wordpress/data';

// Get the image data using the core data store
function PreviewImage( { image } ) {
	const imageData = select( 'core' ).getMedia( image );
	return (
		<Fragment>
			{
				!!imageData &&
				<img
					src={imageData.media_details.sizes.medium.source_url}
					alt={imageData.alt_text}
					/>
			}
		</Fragment>
	);
}

export default class ImageSelector extends Component {

	constructor( props ) {
		super( ...arguments );
		this.props = props;
	}

	render() {

		const {
			allowedTypes,
			attributes,
			attributeKey,
			imageFormat,
			setAttributes
		} = this.props;

		const allowed_types = allowedTypes || [ 'image' ];
		const attribute_key = attributeKey || 'image';
		const image_format = imageFormat || 'full';

		return (
			<Fragment>
				<div className="c-imageselector">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={media => {
								setAttributes({ [attribute_key]: media.id });
							}}
							allowedTypes={allowed_types}
							value={attributes[attribute_key].id}
							render={({open}) => {

								const image = attributes[attribute_key];

								return (
									<figure className={`c-imageselector__figure ${!image ? 'c-imageselector__figure--noimage' : ''}`}>
										{
											!!image &&
											<PreviewImage image={ image } />
										}
										<div className="c-imageselector__buttons">
											{
												!image &&
												<Button
													onClick={open}
													isDefault
													isLarge
													isPrimary>
														{_x('Bild auswählen', 'Admin component button text', 'sha')}
												</Button>
											}
											{
												!!image &&
												<Fragment>
													<Button
														onClick={open}
														isDefault
														isLarge>
														{_x('Bild ersetzen', 'Admin component button text', 'sha')}
													</Button>
													<Button
														onClick={() => setAttributes({image: 0})}
														isLink
														isDestructive>
														{_x('Bild entfernen', 'Admin component button text', 'sha')}
													</Button>
												</Fragment>
											}
										</div>
									</figure>
								);
							}}
						/>
					</MediaUploadCheck>
				</div>
			</Fragment>
		);
	}
}
