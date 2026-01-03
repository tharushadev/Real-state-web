import { Droppable, Draggable } from '@hello-pangea/dnd';
import { Link } from 'react-router-dom';
import { useFavourites } from '../context/FavouritesContext';
import { formatPrice } from '../utils/searchUtils';

// Helper component for individual favourite item
function FavouriteItem({ favourite, index }) {
    const { removeFavourite } = useFavourites();

    return (
        <Draggable
            draggableId={`fav-${favourite.id}`}
            index={index}
        >
            {(provided, snapshot) => (
                <div
                    className={`favourite-item ${snapshot.isDragging ? 'favourite-item--dragging' : ''}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <img
                        src={favourite.images[0]}
                        alt={favourite.shortDescription}
                        className="favourite-item__image"
                    />
                    <div className="favourite-item__info">
                        <Link to={`/property/${favourite.id}`}>
                            <div className="favourite-item__price">
                                {formatPrice(favourite.price)}
                            </div>
                        </Link>
                        <div className="favourite-item__address">
                            {favourite.address}
                        </div>
                    </div>
                    <button
                        className="favourite-item__remove"
                        onClick={() => removeFavourite(favourite.id)}
                        aria-label={`Remove ${favourite.address} from favourites`}
                        title="Remove from favourites"
                    >
                        ✕
                    </button>
                </div>
            )}
        </Draggable>
    );
}

// Sidebar panel for favourites with drag-and-drop support
function FavouritesList({ isDropActive = false }) {
    const { favourites, clearFavourites, favouritesCount } = useFavourites();

    return (
        <aside className="favourites-panel">
            <header className="favourites-panel__header">
                <h3 className="favourites-panel__title">
                    <span role="img" aria-label="Favourites">❤️</span>
                    Favourites
                    {favouritesCount > 0 && (
                        <span className="favourites-panel__count">{favouritesCount}</span>
                    )}
                </h3>
                {favouritesCount > 0 && (
                    <button
                        className="favourites-panel__clear-btn"
                        onClick={clearFavourites}
                        aria-label="Clear all favourites"
                    >
                        Clear All
                    </button>
                )}
            </header>

            <Droppable droppableId="favourites">
                {(provided, snapshot) => (
                    <div
                        className={`favourites-panel__dropzone ${snapshot.isDraggingOver || isDropActive
                            ? 'favourites-panel__dropzone--active'
                            : ''
                            }`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {favourites.length === 0 ? (
                            <div className="favourites-panel__empty">
                                <div className="favourites-panel__empty-icon">📋</div>
                                <p>No favourites yet</p>
                                <small>Drag properties here or click the heart icon</small>
                            </div>
                        ) : (
                            <div className="favourites-panel__list">
                                {favourites.map((favourite, index) => (
                                    <FavouriteItem
                                        key={favourite.id}
                                        favourite={favourite}
                                        index={index}
                                    />
                                ))}
                            </div>
                        )}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </aside>
    );
}

export default FavouritesList;
