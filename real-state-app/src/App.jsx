import { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { FavouritesProvider } from './context/FavouritesContext';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import PropertyPage from './pages/PropertyPage';
import Footer from './components/Footer';

// Header component with navigation hooks
function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close mobile menu on route change
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

        {/* Desktop Navigation */}
        <nav className="header__nav" aria-label="Main navigation">

          <div className="header__nav-item">
            <Link to="/search" className="header__nav-link">Buy</Link>
            <div className="header__dropdown">
              <Link to="/search" className="header__dropdown-link">Property for sale</Link>
              <Link to="/search" className="header__dropdown-link">New homes for sale</Link>
            </div>
          </div>

          <div className="header__nav-item">
            <Link to="/search" className="header__nav-link">Rent</Link>
            <div className="header__dropdown">
              <Link to="/search" className="header__dropdown-link">Property to rent</Link>
              <Link to="/search" className="header__dropdown-link">Student accommodation</Link>
            </div>
          </div>

          <div className="header__nav-item">
            <Link to="/search" className="header__nav-link">House Prices</Link>
            <div className="header__dropdown">
              <Link to="/search" className="header__dropdown-link">Property valuation</Link>
              <Link to="/search" className="header__dropdown-link">Sold house prices</Link>
            </div>
          </div>

          <div className="header__nav-item">
            <Link to="/search" className="header__nav-link">Find Agent</Link>
            <div className="header__dropdown">
              <Link to="/search" className="header__dropdown-link">Estate agents</Link>
              <Link to="/search" className="header__dropdown-link">Letting agents</Link>
            </div>
          </div>

          <div className="header__nav-item">
            <Link to="/search" className="header__nav-link">Commercial</Link>
            <div className="header__dropdown">
              <Link to="/search" className="header__dropdown-link">Commercial for sale</Link>
              <Link to="/search" className="header__dropdown-link">Commercial to rent</Link>
            </div>
          </div>

          <div className="header__nav-item">
            <Link to="/search" className="header__nav-link">Inspire</Link>
            <div className="header__dropdown">
              <Link to="/search" className="header__dropdown-link">Property guides</Link>
              <Link to="/search" className="header__dropdown-link">Moving advice</Link>
            </div>
          </div>

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

          {/* Mobile Toggle */}
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

      {/* Mobile Navigation */}
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

// Layout wrapper to handle conditional rendering
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

// Root Application Component
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
