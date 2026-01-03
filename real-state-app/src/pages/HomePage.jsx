import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Landing page with hero search and featured content
function HomePage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('sale');
    const [searchLocation, setSearchLocation] = useState('');

    // Handle initial search from hero
    const handleSearch = (e) => {
        e.preventDefault();
        const params = new URLSearchParams();
        if (searchLocation) params.set('location', searchLocation);
        navigate(`/search?${params.toString()}`);
    };

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero">
                <div className="hero__overlay"></div>

                <div className="hero__content">
                    <h1 className="hero__title">
                        <span className="hero__title-teal">believe</span> in finding it
                    </h1>
                    <p className="hero__subtitle">with the UK's largest choice of homes</p>

                    <div className="hero__search-box">
                        <div className="hero__tabs">
                            <button
                                className={`hero__tab ${activeTab === 'sale' ? 'hero__tab--active' : ''}`}
                                onClick={() => setActiveTab('sale')}
                            >
                                For Sale
                            </button>
                            <button
                                className={`hero__tab ${activeTab === 'rent' ? 'hero__tab--active' : ''}`}
                                onClick={() => setActiveTab('rent')}
                            >
                                To Rent
                            </button>
                            <button
                                className={`hero__tab ${activeTab === 'sold' ? 'hero__tab--active' : ''}`}
                                onClick={() => setActiveTab('sold')}
                            >
                                Sold STC
                            </button>
                        </div>

                        <form className="hero__form" onSubmit={handleSearch}>
                            <input
                                type="text"
                                className="hero__input"
                                placeholder="e.g. London, BR1, Victoria Road"
                                value={searchLocation}
                                onChange={(e) => setSearchLocation(e.target.value)}
                                aria-label="Search location"
                            />
                            <button type="submit" className="hero__search-btn">
                                {activeTab === 'sale' ? 'For Sale' : activeTab === 'rent' ? 'To Rent' : 'Sold STC'}
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="home-features">
                <div className="home-features__grid">
                    <article className="home-feature">
                        <h3 className="home-feature__title">Free home valuation</h3>
                        <p className="home-feature__text">
                            Find out how much your home is worth from an expert.
                        </p>
                        <button onClick={() => navigate('/search')} className="home-feature__link">
                            Get a free agent valuation →
                        </button>
                    </article>

                    <article className="home-feature">
                        <h3 className="home-feature__title">Are our homes really getting greener?</h3>
                        <p className="home-feature__text">
                            Review the progress we've made towards more sustainable homes.
                        </p>
                        <button onClick={() => navigate('/search')} className="home-feature__link">
                            Take a look →
                        </button>
                    </article>

                    <article className="home-feature">
                        <h3 className="home-feature__title">Our 2026 house price predictions</h3>
                        <p className="home-feature__text">
                            What could the housing market have in store for buyers and sellers in 2026?
                        </p>
                        <button onClick={() => navigate('/search')} className="home-feature__link">
                            Take a look →
                        </button>
                    </article>
                </div>
            </section>

            {/* Services Section */}
            <section className="home-services">
                <div className="home-services__grid">
                    <div className="home-service">
                        <div className="home-service__icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                        <h4>Overseas property</h4>
                        <p>Search homes for sale overseas to find your next move</p>
                        <button className="home-service__link" onClick={() => navigate('/search')}>Search now</button>
                    </div>
                    <div className="home-service">
                        <div className="home-service__icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
                                <line x1="9" y1="22" x2="9" y2="22"></line>
                                <line x1="15" y1="22" x2="15" y2="22"></line>
                                <line x1="12" y1="22" x2="12" y2="22"></line>
                                <rect x="8" y="6" width="2" height="2" fill="currentColor"></rect>
                                <rect x="14" y="6" width="2" height="2" fill="currentColor"></rect>
                                <rect x="8" y="10" width="2" height="2" fill="currentColor"></rect>
                                <rect x="14" y="10" width="2" height="2" fill="currentColor"></rect>
                                <rect x="8" y="14" width="2" height="2" fill="currentColor"></rect>
                                <rect x="14" y="14" width="2" height="2" fill="currentColor"></rect>
                            </svg>
                        </div>
                        <h4>Commercial property</h4>
                        <p>Search commercial properties for sale and to rent in the UK</p>
                        <button className="home-service__link" onClick={() => navigate('/search')}>Search now</button>
                    </div>
                    <div className="home-service">
                        <div className="home-service__icon">
                            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M9 18h6"></path>
                                <path d="M10 22h4"></path>
                                <path d="M12 2v1"></path>
                                <path d="M12 7a5 5 0 1 0-4 10.5 5 5 0 0 0 8 0 5 5 0 1 0-4-10.5"></path>
                            </svg>
                        </div>
                        <h4>Energy efficiency</h4>
                        <p>Learn about going greener at home, and tips for reducing your energy bill</p>
                        <button className="home-service__link" onClick={() => navigate('/search')}>Find out more</button>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default HomePage;
