/**
 * Generates an HTML FIGURE and IMAGE set based on
 * a valid image object returned from the WordPress REST API
 *
 * Pass in the classNameBase (which is used to construct the
 * CSS class names for the elements) and the image object.
 *
 * Usage:

{!!image.id && (
    <FigureWithImage classNameBase={classNameBase} image={image} />
)}

 * mark@sayhello.ch 1.2.2022
 */

export const FigureWithImage = ({ classNameBase, image }) => {
    if (!image.id) {
        return '';
    }

    const { org, srcset, attributes } = image;
    const { width, height, alt } = attributes;

    // Join all of the available sizes together to form a srcset string
    const srcSetAttribute = srcset => {
        return Object.entries(srcset)
            .map(([key, entry]) => `${entry} ${key}w`)
            .join(', ');
    };

    return (
        <figure className={`${classNameBase}__figure`}>
            <img
                src={org[0]}
                srcset={srcSetAttribute(srcset)}
                alt={alt}
                className={`${classNameBase}__image`}
                width={width}
                height={height}
                loading={'lazy'}
            />
        </figure>
    );
};

export default FigureWithImage;
