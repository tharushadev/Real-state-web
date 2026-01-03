import { useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { formatDate } from '../utils/searchUtils';

// Property details with tabs for Description, Floor Plan, and Map
function PropertyTabs({ description, bedrooms, bathrooms, type, dateAdded, floorPlan, coordinates, address }) {
    const [selectedTabIndex, setSelectedTabIndex] = useState(0);

    // Get embed URL for Google Maps
    const getMapEmbedUrl = () => {
        if (coordinates && coordinates.lat && coordinates.lng) {
            return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000!2d${coordinates.lng}!3d${coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zM!5e0!3m2!1sen!2sus!4v1609459200000!5m2!1sen!2sus`;
        }
        if (address) {
            return `https://www.google.com/maps/embed/v1/place?key=&q=${encodeURIComponent(address)}`;
        }
        return null;
    };

    const mapUrl = getMapEmbedUrl();

    // Key details grid
    const renderPropertyDetails = () => (
        <div className="property-details__specs">
            <h3 className="property-details__subheading">Property Details</h3>
            <div className="property-details__grid">
                <div className="property-details__item">
                    <span className="property-details__label">BEDROOM:</span>
                    <span className="property-details__value">{bedrooms}</span>
                </div>
                <div className="property-details__item">
                    <span className="property-details__label">BATHROOM:</span>
                    <span className="property-details__value">{bathrooms}</span>
                </div>
                <div className="property-details__item">
                    <span className="property-details__label">TYPE:</span>
                    <span className="property-details__value" style={{ textTransform: 'capitalize' }}>{type}</span>
                </div>
                <div className="property-details__item">
                    <span className="property-details__label">ADDED:</span>
                    <span className="property-details__value">{formatDate(dateAdded)}</span>
                </div>
            </div>
        </div>
    );

    // Floor plan tab
    const renderFloorPlan = () => (
        <div className="tab-content">
            {floorPlan ? (
                <div className="property-details__floorplan-container">
                    <img
                        src={floorPlan}
                        alt="Floor Plan"
                        className="property-details__floorplan-image"
                        onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                        }}
                    />
                    <div className="property-details__floorplan-fallback" style={{ display: 'none' }}>
                        <span className="property-details__floorplan-icon">📐</span>
                        <p>Floor plan image not available</p>
                    </div>
                </div>
            ) : (
                <div className="property-details__floorplan-fallback">
                    <span className="property-details__floorplan-icon">📐</span>
                    <p>Floor plan not available for this property</p>
                </div>
            )}
        </div>
    );

    // Map tab
    const renderMap = () => (
        <div className="tab-content">
            <div className="property-details__map-container">
                {address ? (
                    <>
                        <iframe
                            title="Property Location"
                            className="property-details__map-iframe"
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                            width="100%"
                            height="400"
                            style={{ border: 0 }}
                            allowFullScreen=""
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        />
                        {coordinates && (
                            <p className="property-details__address-text">
                                <span className="property-details__address-icon">📍</span>
                                {address}
                            </p>
                        )}
                    </>
                ) : (
                    <div className="property-details__map-fallback">
                        <span className="property-details__map-icon">📍</span>
                        <p>Map location not available</p>
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="property-details-view">
            <h2 className="property-details__heading">About this property</h2>
            <div className="property-details__description">
                <p>{description || "No description available."}</p>
            </div>

            {renderPropertyDetails()}

            <Tabs selectedIndex={selectedTabIndex} onSelect={(index) => setSelectedTabIndex(index)} className="property-tabs">
                <TabList className="property-tabs__list">
                    <Tab className="property-tabs__tab">Description</Tab>
                    <Tab className="property-tabs__tab">Floor Plan</Tab>
                    <Tab className="property-tabs__tab">Map</Tab>
                </TabList>

                <TabPanel className="property-tabs__panel">
                    <div className="tab-content">
                        <p className="property-details__description">
                            {description || "No additional description available."}
                        </p>
                    </div>
                </TabPanel>

                <TabPanel className="property-tabs__panel">
                    {renderFloorPlan()}
                </TabPanel>

                <TabPanel className="property-tabs__panel">
                    {renderMap()}
                </TabPanel>
            </Tabs>

            {/* Component Styles */}
            <style>{`
                .property-details-view {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                }
                
                .property-details__heading {
                    font-size: 1.5rem;
                    color: #262A56;
                    margin-bottom: 1.5rem;
                    border-bottom: 2px solid #f3f4f6;
                    padding-bottom: 0.5rem;
                }
                
                .property-details__description {
                    margin-bottom: 2rem;
                    line-height: 1.8;
                    color: #4b5563;
                    font-size: 1.1rem;
                }
                
                .property-details__specs {
                    margin-bottom: 2.5rem;
                }
                
                .property-details__subheading {
                    font-size: 1.25rem;
                    color: #262A56;
                    margin-bottom: 1rem;
                }
                
                .property-details__grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 1.5rem;
                    background: #f9fafb;
                    padding: 1.5rem;
                    border-radius: 8px;
                    border: 1px solid #e5e7eb;
                }
                
                .property-details__item {
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }
                
                .property-details__label {
                    font-size: 0.875rem;
                    font-weight: 700;
                    color: #6b7280;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }
                
                .property-details__value {
                    font-size: 1.125rem;
                    font-weight: 600;
                    color: #00ADB5;
                }
                
                /* React Tabs Styles */
                .property-tabs {
                    margin-top: 2rem;
                }
                
                .property-tabs__list {
                    display: flex;
                    gap: 0.5rem;
                    border-bottom: 2px solid #e5e7eb;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                    flex-wrap: wrap;
                }
                
                .property-tabs__tab {
                    padding: 1rem 1.5rem;
                    cursor: pointer;
                    border: none;
                    background: transparent;
                    color: #6b7280;
                    font-weight: 600;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    position: relative;
                    border-bottom: 3px solid transparent;
                    margin-bottom: -2px;
                }
                
                .property-tabs__tab:hover {
                    color: #00ADB5;
                }
                
                .property-tabs__tab.react-tabs__tab--selected {
                    color: #00ADB5;
                    border-bottom-color: #00ADB5;
                }
                
                .property-tabs__panel {
                    padding: 2rem 0;
                    animation: fadeIn 0.3s ease;
                }
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: translateY(10px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .tab-content {
                    animation: fadeIn 0.3s ease;
                }
                
                /* Floor Plan Styles */
                .property-details__floorplan-container {
                    background: #f9fafb;
                    border-radius: 12px;
                    overflow: hidden;
                    border: 1px solid #e5e7eb;
                }
                
                .property-details__floorplan-image {
                    width: 100%;
                    height: auto;
                    max-height: 600px;
                    object-fit: contain;
                    display: block;
                    cursor: zoom-in;
                    transition: transform 0.3s ease;
                }
                
                .property-details__floorplan-image:hover {
                    transform: scale(1.02);
                }
                
                .property-details__floorplan-fallback {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 3rem;
                    color: #6b7280;
                    min-height: 300px;
                    border-radius: 12px;
                    background: #f9fafb;
                    border: 1px solid #e5e7eb;
                }
                
                .property-details__floorplan-icon {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                }
                
                /* Location Map Styles */
                .property-details__map-container {
                    border-radius: 12px;
                    overflow: hidden;
                    border: 1px solid #e5e7eb;
                    background: #f9fafb;
                }
                
                .property-details__map-iframe {
                    display: block;
                    width: 100%;
                    min-height: 400px;
                    border: none;
                }
                
                .property-details__map-fallback {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 3rem;
                    color: #6b7280;
                    min-height: 300px;
                }
                
                .property-details__map-icon {
                    font-size: 3rem;
                    margin-bottom: 1rem;
                }
                
                .property-details__address-text {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    margin-top: 1rem;
                    padding: 1rem;
                    background: linear-gradient(135deg, #f0fdfa 0%, #e0f2fe 100%);
                    border-radius: 8px;
                    color: #262A56;
                    font-weight: 500;
                }
                
                .property-details__address-icon {
                    font-size: 1.25rem;
                }
                
                /* Responsive Design */
                @media (max-width: 768px) {
                    .property-tabs__list {
                        gap: 0.25rem;
                    }
                    
                    .property-tabs__tab {
                        padding: 0.75rem 1rem;
                        font-size: 0.9rem;
                    }
                    
                    .property-details__grid {
                        grid-template-columns: repeat(2, 1fr);
                        gap: 1rem;
                    }
                    
                    .property-details__floorplan-image {
                        max-height: 400px;
                    }
                }
            `}</style>
        </div>
    );
}

export default PropertyTabs;
