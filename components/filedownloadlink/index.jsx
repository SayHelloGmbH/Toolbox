/**
 * Creates a download link for a file.
 * Pass file (the file ID) and classNameBase (a string)
 * in as component properties.
 *
 * The data source_url and title.rendered are pulled
 * in from the REST API using data select. Intended
 * for use in the Gutenberg Editor.
 *
 * Since 3.12.2020 mark@sayhello.ch
 *
 */

import { withSelect } from '@wordpress/data';
import { Fragment } from '@wordpress/element';
import { sprintf, _x } from '@wordpress/i18n';

let FileDownloadLink = ( { classNameBase, file, fileData } ) => {

	if(!file || !fileData){
		return null;
	}

	let linktext = fileData.title.rendered ?? 'Download';

	return (
		<Fragment>
			{
				!!fileData.source_url &&
				<a href={fileData.source_url}
					download={true}
					className={`${classNameBase}__imagelink`}
					>{ linktext }</a>
			}
		</Fragment>
	);
};

FileDownloadLink = withSelect( ( select, props ) => {
	let data = {};
	if(!!props.file){
		data.fileData = select( 'core' ).getMedia( props.file );
	}
	return data;
})( FileDownloadLink );

export default FileDownloadLink;
