import { useState, useEffect, useCallback } from 'react';

// Image gallery with lightbox support
function PropertyGallery({ images = [], propertyName = 'Property' }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);

    // Next image
    const nextImage = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    // Previous image
    const prevImage = useCallback(() => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    // Keyboard navigation
    useEffect(() => {
        if (!isLightboxOpen) return;

        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'ArrowLeft':
                    prevImage();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
                case 'Escape':
                    setIsLightboxOpen(false);
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isLightboxOpen, nextImage, prevImage]);

    // Lock body scroll when lightbox is open
    useEffect(() => {
        if (isLightboxOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isLightboxOpen]);

    if (!images || images.length === 0) {
        return (
            <div className="property-gallery">
                <div className="property-gallery__empty">No images available</div>
            </div>
        );
    }

    return (
        <>
            <div className="property-gallery">
                {/* Main Image */}
                <div
                    className="property-gallery__main"
                    onClick={() => setIsLightboxOpen(true)}
                    role="button"
                    tabIndex={0}
                    aria-label="Open image gallery"
                    onKeyDown={(e) => e.key === 'Enter' && setIsLightboxOpen(true)}
                >
                    <img
                        src={images[currentIndex]}
                        alt={`${propertyName} - Image ${currentIndex + 1}`}
                        className="property-gallery__main-image"
                    />

                    {/* Navigation Buttons */}
                    {images.length > 1 && (
                        <>
                            <button
                                className="property-gallery__nav property-gallery__nav--prev"
                                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                                aria-label="Previous image"
                            >
                                ‹
                            </button>
                            <button
                                className="property-gallery__nav property-gallery__nav--next"
                                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                                aria-label="Next image"
                            >
                                ›
                            </button>
                        </>
                    )}

                    {/* Image Counter */}
                    <div className="property-gallery__counter">
                        {currentIndex + 1} / {images.length}
                    </div>
                </div>

                {/* Thumbnails */}
                <div className="property-gallery__thumbnails" role="list" aria-label="Image thumbnails">
                    {images.map((image, index) => (
                        <button
                            key={index}
                            className={`property-gallery__thumbnail ${index === currentIndex ? 'property-gallery__thumbnail--active' : ''
                                }`}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`View image ${index + 1}`}
                            aria-current={index === currentIndex ? 'true' : 'false'}
                        >
                            <img src={image} alt={`Thumbnail ${index + 1}`} />
                        </button>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            {isLightboxOpen && (
                <div
                    className="lightbox"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Image gallery lightbox"
                >
                    <button
                        className="lightbox__close"
                        onClick={() => setIsLightboxOpen(false)}
                        aria-label="Close lightbox"
                    >
                        ✕
                    </button>

                    <div className="lightbox__image-container">
                        <img
                            src={images[currentIndex]}
                            alt={`${propertyName} - Image ${currentIndex + 1}`}
                            className="lightbox__image"
                        />

                        {images.length > 1 && (
                            <>
                                <button
                                    className="lightbox__nav lightbox__nav--prev"
                                    onClick={prevImage}
                                    aria-label="Previous image"
                                >
                                    ‹
                                </button>
                                <button
                                    className="lightbox__nav lightbox__nav--next"
                                    onClick={nextImage}
                                    aria-label="Next image"
                                >
                                    ›
                                </button>
                            </>
                        )}
                    </div>

                    <div className="lightbox__counter">
                        {currentIndex + 1} / {images.length}
                    </div>
                </div>
            )}
        </>
    );
}

export default PropertyGallery;
