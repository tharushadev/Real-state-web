/**
 * App Component
 * 
 * Main application entry point with:
 * - React Router for navigation
 * - FavouritesProvider context
 * - Header with navigation
 * - All page routes
 */

import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FavouritesProvider } from './context/FavouritesContext';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import PropertyPage from './pages/PropertyPage';
import Footer from './components/Footer';

/**
 * Header component with navigation - Rightmove Replica
 */
function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">
          <span className="header__logo-text">PropX</span>
          <span className="header__logo-icon">🏠</span>
        </Link>

        {/* Desktop Navigation with Dropdowns */}
        <nav className="header__nav" aria-label="Main navigation">
          {/* Buy Dropdown */}
          <div className="header__nav-item">
            <Link to="/search" className="header__nav-link">Buy</Link>
            <div className="header__dropdown">
              <Link to="/search" className="header__dropdown-link">Property for sale</Link>
              <Link to="/search" className="header__dropdown-link">New homes for sale</Link>
            </div>
          </div>

          {/* Rent Dropdown */}
          <div className="header__nav-item">
            <Link to="/search" className="header__nav-link">Rent</Link>
            <div className="header__dropdown">
              <Link to="/search" className="header__dropdown-link">Property to rent</Link>
              <Link to="/search" className="header__dropdown-link">Student accommodation</Link>
            </div>
          </div>

          {/* House Prices Dropdown */}
          <div className="header__nav-item">
            <Link to="/search" className="header__nav-link">House Prices</Link>
            <div className="header__dropdown">
              <Link to="/search" className="header__dropdown-link">Property valuation</Link>
              <Link to="/search" className="header__dropdown-link">Sold house prices</Link>
            </div>
          </div>

          {/* Find Agent Dropdown */}
          <div className="header__nav-item">
            <Link to="/search" className="header__nav-link">Find Agent</Link>
            <div className="header__dropdown">
              <Link to="/search" className="header__dropdown-link">Estate agents</Link>
              <Link to="/search" className="header__dropdown-link">Letting agents</Link>
            </div>
          </div>

          {/* Commercial Dropdown */}
          <div className="header__nav-item">
            <Link to="/search" className="header__nav-link">Commercial</Link>
            <div className="header__dropdown">
              <Link to="/search" className="header__dropdown-link">Commercial for sale</Link>
              <Link to="/search" className="header__dropdown-link">Commercial to rent</Link>
            </div>
          </div>

          {/* Inspire Dropdown */}
          <div className="header__nav-item">
            <Link to="/search" className="header__nav-link">Inspire</Link>
            <div className="header__dropdown">
              <Link to="/search" className="header__dropdown-link">Property guides</Link>
              <Link to="/search" className="header__dropdown-link">Moving advice</Link>
            </div>
          </div>

          {/* Overseas Dropdown */}
          <div className="header__nav-item">
            <Link to="/search" className="header__nav-link">Overseas</Link>
            <div className="header__dropdown">
              <Link to="/search" className="header__dropdown-link">Property abroad</Link>
              <Link to="/search" className="header__dropdown-link">Investors</Link>
            </div>
          </div>
        </nav>

        <div className="header__right">
          <div className="header__user">
            <button className="header__signin">
              <span role="img" aria-label="user">👤</span> <span className="header__signin-text">Sign in</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="header__mobile-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? '✕' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <nav className="header__mobile-menu">
          <Link to="/search" className="header__mobile-link">Buy</Link>
          <Link to="/search" className="header__mobile-link">Rent</Link>
          <Link to="/search" className="header__mobile-link">Find agent</Link>
          <Link to="/search" className="header__mobile-link">House prices</Link>
          <Link to="/search" className="header__mobile-link">Commercial</Link>
          <Link to="/search" className="header__mobile-link">Inspire</Link>
          <Link to="/search" className="header__mobile-link">Overseas</Link>
          <div className="header__mobile-divider"></div>
          <Link to="/search" className="header__mobile-link">Sign in</Link>
        </nav>
      )}
    </header>
  );
}

/**
 * AppContent - Routes and layout
 */
function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="app">
      <Header />
      {isHomePage ? (
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      ) : (
        <main className="main-content">
          <Routes>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/property/:propertyId" element={<PropertyPage />} />
          </Routes>
        </main>
      )}
      <Footer />
    </div>
  );
}

/**
 * App - Main component with providers
 */
function App() {
  return (
    <FavouritesProvider>
      <Router>
        <AppContent />
      </Router>
    </FavouritesProvider>
  );
}

export default App;
