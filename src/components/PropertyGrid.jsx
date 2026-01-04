import { Draggable } from '@hello-pangea/dnd';
import PropertyCard from './PropertyCard';

// Displays a grid of draggable PropertyCards
function PropertyGrid({ properties, searchTerm = '' }) {
    // Show empty state if no properties
    if (!properties || properties.length === 0) {
        return (
            <div className="property-grid">
                <div className="property-grid__empty">
                    <div className="property-grid__empty-icon">🏠</div>
                    <h3>No properties found</h3>
                    <p>Try adjusting your search criteria to find more properties.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="property-grid">
            {properties.map((property, index) => (
                <Draggable
                    key={property.id}
                    draggableId={property.id}
                    index={index}
                >
                    {(provided, snapshot) => (
                        <PropertyCard
                            property={property}
                            isDragging={snapshot.isDragging}
                            dragHandleProps={provided.dragHandleProps}
                            draggableProps={provided.draggableProps}
                            innerRef={provided.innerRef}
                        />
                    )}
                </Draggable>
            ))}
        </div>
    );
}

export default PropertyGrid;
