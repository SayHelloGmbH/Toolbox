/**
 * LazyImage selector for Say Hello components
 * mark@sayhello.ch 24.3.2020
 *
 * This version uses the lazyImage logic and can be used if the
 * image is being rendered directly in the editor. The matching
 * attribute (e.g. 'image') must be an Object, not a Number.
 *
 * Use our ImageSelector component if you need to use the
 * component with a ServerSideRender component, in which case,
 * the matching attribute must be a Number, and contain the Media ID.
 *
 * Usage:
<LazyImageSelector
	attributes={attributes}
	setAttributes={setAttributes}
	attributeKey="image"
	allowedTypes={['image/jpg', 'image/jpeg']}
	imageFormat="full"
/>
 * OR
<LazyImageSelector
	attributes={attributes}
	setAttributes={setAttributes}
	attributeKey="image"
/>
 */

import { Button } from '@wordpress/components';
import { Component, Fragment } from '@wordpress/element';
import { MediaUploadCheck, MediaUpload } from '@wordpress/block-editor';
import { _x } from '@wordpress/i18n';

import { getLazySrcs } from './LazyImage.jsx';

export default class LazyImageSelector extends Component {

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

		const allowed_types = allowedTypes || [ 'image/jpg', 'image/jpeg' ];
		const attribute_key = attributeKey || 'image';
		const image_format = imageFormat || 'full';

		return (
			<Fragment>
				<div className="c-imageselector">
					<MediaUploadCheck>
						<MediaUpload
							onSelect={image => {
								getLazySrcs(image.id, image_format).then(image => setAttributes({[attribute_key]: image}));
							}}
							allowedTypes={allowed_types}
							value={[attribute_key].id}
							render={({open}) => {
								const image = attributes[attribute_key];
								return (
									<figure className={`c-imageselector__figure ${!image.id ? 'c-imageselector__figure--noimage' : ''}`}>
										{
											image.id &&
											<img
												className="c-imageselector__image"
												onClick={open}
												src={image.org[0]}
												alt={image.alt}
												/>
										}
										<div className="c-imageselector__buttons">
											{
												!image.id &&
												<Button
													onClick={open}
													isDefault
													isLarge
													isPrimary>
														{_x('Bild auswählen', 'Admin component button text', 'sha')}
												</Button>
											}
											{
												image.id &&
												<Fragment>
													<Button
														onClick={open}
														isDefault
														isLarge>
														{_x('Bild ersetzen', 'Admin component button text', 'sha')}
													</Button>
													<Button
														onClick={() => setAttributes({image: {id: false}})}
														isDefault
														isSmall>
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
