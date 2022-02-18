import { useBlockProps } from '@wordpress/block-editor';

const edit = () => {
    const blockProps = useBlockProps();
    return (
        <div {...blockProps}>
            <div></div>
        </div>
    );
};

export default edit;
