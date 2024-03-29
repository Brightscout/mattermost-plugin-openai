export type ImageProps = {

    // Timestamp of the image when it is generated by the API
    createdAt?: string;

    // Source of the image
    src: string;

    // Size of the image
    size?: string;

    // Alt text for the image
    alt: string;

    // Track if any error occurred while loading images
    isImageLoadingError: boolean

    // Handle if any error occurred while loading images
    handleSetIsImageLoadingError: (value: boolean) => void
};
