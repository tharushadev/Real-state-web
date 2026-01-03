import { useParams, Link, useNavigate } from 'react-router-dom';
import PropertyGallery from '../components/PropertyGallery';
import PropertyTabs from '../components/PropertyTabs';
import { useFavourites } from '../context/FavouritesContext';
import { formatPrice, formatDate } from '../utils/searchUtils';
import propertiesData from '../data/properties.json';

// Displays full details for a single property
function PropertyPage() {
    const { propertyId } = useParams();
    const navigate = useNavigate();
    const { addFavourite, removeFavourite, isFavourite } = useFavourites();

    // Find the property by ID
    const property = propertiesData.properties.find((p) => p.id === propertyId);

    // Handle property not found
    if (!property) {
        return (
            <div className="property-page">
                <div className="property-grid__empty">
                    <div className="property-grid__empty-icon">❌</div>
                    <h3>Property Not Found</h3>
                    <p>The property you're looking for doesn't exist.</p>
                    <Link to="/" className="btn btn--primary">
                        Back to Search
                    </Link>
                </div>
            </div>
        );
    }

    const favourited = isFavourite(property.id);

    // Toggle favourite status
    const handleFavouriteClick = () => {
        if (favourited) {
            removeFavourite(property.id);
        } else {
            addFavourite(property);
        }
    };

    return (
        <div className="property-page">
            {/* Back Navigation */}
            <button
                className="property-page__back"
                onClick={() => navigate(-1)}
                aria-label="Go back to search results"
            >
                ← Back to Results
            </button>

            <div className="property-page__grid">
                {/* Main Content */}
                <div className="property-page__main">
                    <PropertyGallery
                        images={property.images}
                        propertyName={property.shortDescription}
                    />

                    <PropertyTabs
                        description={property.longDescription}
                        bedrooms={property.bedrooms}
                        bathrooms={property.bathrooms}
                        type={property.type}
                        dateAdded={property.dateAdded}
                        address={property.address}
                        floorPlan={property.floorPlan}
                        coordinates={property.coordinates}
                    />
                </div>

                {/* Sidebar */}
                <aside className="property-page__sidebar">
                    <div className="property-info-card">
                        {/* Price */}
                        <div className="property-info-card__price">
                            {formatPrice(property.price)}
                        </div>

                        {/* Key Details */}
                        <div className="property-info-card__details">
                            <div className="property-info-card__detail">
                                <span className="property-info-card__detail-icon">🛏️</span>
                                <span className="property-info-card__detail-value">{property.bedrooms}</span>
                                <span className="property-info-card__detail-label">Bedrooms</span>
                            </div>
                            <div className="property-info-card__detail">
                                <span className="property-info-card__detail-icon">🚿</span>
                                <span className="property-info-card__detail-value">{property.bathrooms}</span>
                                <span className="property-info-card__detail-label">Bathrooms</span>
                            </div>
                            <div className="property-info-card__detail">
                                <span className="property-info-card__detail-icon">🏠</span>
                                <span className="property-info-card__detail-value" style={{ textTransform: 'capitalize' }}>
                                    {property.type}
                                </span>
                                <span className="property-info-card__detail-label">Type</span>
                            </div>
                        </div>

                        {/* Address */}
                        <div className="property-info-card__address">
                            <span>📍</span>
                            <span>{property.address}</span>
                        </div>

                        {/* Date Added */}
                        <p style={{
                            fontSize: '0.875rem',
                            color: '#6b7280',
                            marginBottom: '1.5rem'
                        }}>
                            Added: {formatDate(property.dateAdded)}
                        </p>

                        {/* Favourite Button */}
                        <button
                            className={`btn property-info-card__favourite-btn ${favourited ? 'btn--danger' : 'btn--primary'
                                }`}
                            onClick={handleFavouriteClick}
                            aria-pressed={favourited}
                        >
                            {favourited ? '❤️ Remove from Favourites' : '🤍 Add to Favourites'}
                        </button>
                    </div>
                </aside>
            </div>
        </div>
    );
}

export default PropertyPage;
