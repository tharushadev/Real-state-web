/**
 * FavouritesContext - Manages favourite properties state
 * 
 * Features:
 * - Add/remove properties from favourites
 * - Prevent duplicate additions
 * - Persist to localStorage
 * - Clear all favourites
 */

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Create context for favourites management
const FavouritesContext = createContext(null);

// LocalStorage key for persistence
const STORAGE_KEY = 'propertyFinder_favourites';

/**
 * FavouritesProvider - Wraps app to provide favourites state
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components
 */
export function FavouritesProvider({ children }) {
  // Initialize state from localStorage
  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Persist to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch (error) {
      console.error('Failed to save favourites:', error);
    }
  }, [favourites]);

  /**
   * Add a property to favourites (prevents duplicates)
   * @param {Object} property - Property object to add
   * @returns {boolean} - True if added, false if already exists
   */
  const addFavourite = useCallback((property) => {
    let added = false;
    setFavourites((prev) => {
      // Check for duplicate
      if (prev.some((fav) => fav.id === property.id)) {
        return prev;
      }
      added = true;
      return [...prev, property];
    });
    return added;
  }, []);

  /**
   * Remove a property from favourites
   * @param {string} propertyId - ID of property to remove
   */
  const removeFavourite = useCallback((propertyId) => {
    setFavourites((prev) => prev.filter((fav) => fav.id !== propertyId));
  }, []);

  /**
   * Check if a property is in favourites
   * @param {string} propertyId - ID of property to check
   * @returns {boolean} - True if favourited
   */
  const isFavourite = useCallback((propertyId) => {
    return favourites.some((fav) => fav.id === propertyId);
  }, [favourites]);

  /**
   * Clear all favourites
   */
  const clearFavourites = useCallback(() => {
    setFavourites([]);
  }, []);

  /**
   * Reorder favourites (for drag-and-drop)
   * @param {number} fromIndex - Original index
   * @param {number} toIndex - New index
   */
  const reorderFavourites = useCallback((fromIndex, toIndex) => {
    setFavourites((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(fromIndex, 1);
      result.splice(toIndex, 0, removed);
      return result;
    });
  }, []);

  const value = {
    favourites,
    addFavourite,
    removeFavourite,
    isFavourite,
    clearFavourites,
    reorderFavourites,
    favouritesCount: favourites.length,
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}

/**
 * Hook to access favourites context
 * @returns {Object} Favourites context value
 * @throws {Error} If used outside FavouritesProvider
 */
export function useFavourites() {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
}

export default FavouritesContext;
