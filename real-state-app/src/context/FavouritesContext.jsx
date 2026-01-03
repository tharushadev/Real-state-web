import { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Context for managing favourite properties
const FavouritesContext = createContext(null);
const STORAGE_KEY = 'propertyFinder_favourites';

// Provider component to wrap the app
export function FavouritesProvider({ children }) {
  // Load initial state from localStorage
  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync favourites to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites));
    } catch (error) {
      console.error('Failed to save favourites:', error);
    }
  }, [favourites]);

  // Add property if not already favourited
  const addFavourite = useCallback((property) => {
    let added = false;
    setFavourites((prev) => {
      if (prev.some((fav) => fav.id === property.id)) {
        return prev;
      }
      added = true;
      return [...prev, property];
    });
    return added;
  }, []);

  // Remove property from favourites
  const removeFavourite = useCallback((propertyId) => {
    setFavourites((prev) => prev.filter((fav) => fav.id !== propertyId));
  }, []);

  // Check if a property is favourited
  const isFavourite = useCallback((propertyId) => {
    return favourites.some((fav) => fav.id === propertyId);
  }, [favourites]);

  // Clear all favourites
  const clearFavourites = useCallback(() => {
    setFavourites([]);
  }, []);

  // Reorder favourites (used for drag-and-drop)
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

// Custom hook to use the context
export function useFavourites() {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
}

export default FavouritesContext;
