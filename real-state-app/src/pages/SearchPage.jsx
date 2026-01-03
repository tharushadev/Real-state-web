/**
 * SearchPage Component
 * 
 * Main search page with:
 * - Search form with React widgets
 * - Property results grid
 * - Favourites sidebar (drag-drop enabled)
 * - Responsive layout
 */

import { useState, useMemo } from 'react';
import { DragDropContext, Droppable } from '@hello-pangea/dnd';
import SearchForm from '../components/SearchForm';
import PropertyGrid from '../components/PropertyGrid';
import FavouritesList from '../components/FavouritesList';
import { useFavourites } from '../context/FavouritesContext';
import { filterProperties, getUniquePostcodes } from '../utils/searchUtils';
import propertiesData from '../data/properties.json';

/**
 * SearchPage component
 */
function SearchPage() {
    const [searchCriteria, setSearchCriteria] = useState({});
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { addFavourite, favouritesCount } = useFavourites();

    // Get all properties from JSON
    const allProperties = propertiesData.properties;

    // Filter properties based on search criteria
    const filteredProperties = useMemo(() => {
        return filterProperties(allProperties, searchCriteria);
    }, [allProperties, searchCriteria]);

    // Get unique postcodes for the dropdown
    const postcodeOptions = useMemo(() => {
        return getUniquePostcodes(allProperties);
    }, [allProperties]);

    // Handle search form submission
    const handleSearch = (criteria) => {
        setSearchCriteria(criteria);
    };

    // Handle drag end for favourites
    const handleDragEnd = (result) => {
        const { source, destination, draggableId } = result;

        // Dropped outside any droppable
        if (!destination) {
            return;
        }

        // Dropped on favourites from properties
        if (
            source.droppableId === 'properties' &&
            destination.droppableId === 'favourites'
        ) {
            // Find the property that was dragged
            const property = allProperties.find((p) => p.id === draggableId);
            if (property) {
                addFavourite(property);
            }
        }
    };

    // Toggle mobile sidebar
    const toggleSidebar = () => {
        setSidebarOpen((prev) => !prev);
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd}>
            <div className="search-page">
                <main className="search-page__main">
                    {/* Search Form */}
                    <SearchForm
                        onSearch={handleSearch}
                        postcodeOptions={postcodeOptions}
                    />

                    {/* Results Header */}
                    <div className="results-header">
                        <h1 className="results-header__title">Properties for Sale</h1>
                        <span className="results-header__count">
                            {filteredProperties.length} {filteredProperties.length === 1 ? 'property' : 'properties'} found
                        </span>
                    </div>

                    {/* Property Grid */}
                    <Droppable droppableId="properties" isDropDisabled={true}>
                        {(provided) => (
                            <div ref={provided.innerRef} {...provided.droppableProps}>
                                <PropertyGrid properties={filteredProperties} />
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </main>

                {/* Favourites Sidebar */}
                <aside className={`search-page__sidebar ${sidebarOpen ? 'search-page__sidebar--open' : ''}`}>
                    <FavouritesList />
                </aside>

                {/* Mobile Favourites Toggle Button */}
                <button
                    className="favourites-toggle"
                    onClick={toggleSidebar}
                    aria-label={`${sidebarOpen ? 'Close' : 'Open'} favourites panel`}
                    aria-expanded={sidebarOpen}
                >
                    ❤️
                    {favouritesCount > 0 && (
                        <span className="favourites-toggle__count">{favouritesCount}</span>
                    )}
                </button>
            </div>
        </DragDropContext>
    );
}

export default SearchPage;
