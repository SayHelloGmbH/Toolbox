import { useBlockProps } from '@wordpress/block-editor';

const save = () => {
    const blockProps = useBlockProps.save({
        'aria-hidden': 'true',
    });
    return (
        <div {...blockProps}>
            <div></div>
        </div>
    );
};

export default save;
