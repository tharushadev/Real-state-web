import { Link } from 'react-router-dom';
import { useFavourites } from '../context/FavouritesContext';
import { formatPrice } from '../utils/searchUtils';

// Displays a property card with image, details, and favourite button
function PropertyCard({
    property,
    isDragging = false,
    dragHandleProps = {},
    draggableProps = {},
    innerRef = null
}) {
    const { addFavourite, removeFavourite, isFavourite } = useFavourites();
    const favourited = isFavourite(property.id);

    // Toggle favourite status
    const handleFavouriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (favourited) {
            removeFavourite(property.id);
        } else {
            addFavourite(property);
        }
    };

    return (
        <article
            className={`property-card ${isDragging ? 'property-card--dragging' : ''}`}
            ref={innerRef}
            {...draggableProps}
            {...dragHandleProps}
        >
            <div className="property-card__image-container">
                <img
                    src={property.images[0]}
                    alt={property.shortDescription}
                    className="property-card__image"
                    loading="lazy"
                />
                <span className="property-card__type-badge">
                    {property.type}
                </span>
                <button
                    className={`property-card__favourite-btn ${favourited ? 'property-card__favourite-btn--active' : ''}`}
                    onClick={handleFavouriteClick}
                    aria-label={favourited ? 'Remove from favourites' : 'Add to favourites'}
                    title={favourited ? 'Remove from favourites' : 'Add to favourites'}
                >
                    {favourited ? '❤️' : '🤍'}
                </button>
            </div>

            <div className="property-card__content">
                <div className="property-card__price">
                    {formatPrice(property.price)}
                </div>

                <div className="property-card__details">
                    <span className="property-card__detail">
                        <span role="img" aria-label="Bedrooms">🛏️</span>
                        {property.bedrooms} bed
                    </span>
                    <span className="property-card__detail">
                        <span role="img" aria-label="Bathrooms">🚿</span>
                        {property.bathrooms} bath
                    </span>
                    <span className="property-card__detail">
                        <span role="img" aria-label="Property type">🏠</span>
                        {property.type}
                    </span>
                </div>

                <p className="property-card__address">
                    📍 {property.address}
                </p>

                <p className="property-card__description">
                    {property.shortDescription}
                </p>

                <Link
                    to={`/property/${property.id}`}
                    className="property-card__link"
                >
                    View Details <span aria-hidden="true">→</span>
                </Link>
            </div>
        </article>
    );
}

export default PropertyCard;
