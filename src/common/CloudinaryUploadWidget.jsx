import { useEffect, useRef } from 'react';

/**
 * CloudinaryUploadWidget
 * A simple wrapper for the Cloudinary Upload Widget.
 * Note: Requires adding the script to index.html
 */
const CloudinaryUploadWidget = ({ onUploadSuccess }) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();

    useEffect(() => {
        if (window.cloudinary) {
            cloudinaryRef.current = window.cloudinary;
            widgetRef.current = cloudinaryRef.current.createUploadWidget(
                {
                    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
                    uploadPreset: 'ml_default', // You might need to create an unsigned preset named 'ml_default'
                    sources: ['local', 'url', 'camera'],
                    multiple: false,
                    cropping: true,
                    styles: {
                        palette: {
                            window: "#FFFFFF",
                            windowBorder: "#90A0B3",
                            tabIcon: "#203F9A",
                            menuIcons: "#5A616A",
                            textDark: "#000000",
                            textLight: "#FFFFFF",
                            link: "#203F9A",
                            action: "#E84797",
                            inactiveTabIcon: "#0E2F5A",
                            error: "#F44235",
                            inProgress: "#203F9A",
                            complete: "#203F9A",
                            sourceBg: "#E4EBF1"
                        }
                    }
                },
                (error, result) => {
                    if (!error && result && result.event === "success") {
                        console.log('Done! Here is the image info: ', result.info);
                        onUploadSuccess(result.info.secure_url, result.info.public_id);
                    }
                }
            );
        }
    }, [onUploadSuccess]);

    return (
        <button
            onClick={() => widgetRef.current.open()}
            className="btn-primary"
        >
            Upload Image
        </button>
    );
};

export default CloudinaryUploadWidget;
