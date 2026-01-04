/**
 * Favourites Context Test Suite
 * 
 * Tests for the FavouritesContext provider and useFavourites hook.
 * Covers add, remove, duplicate prevention, and persistence.
 */

import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { FavouritesProvider, useFavourites } from '../context/FavouritesContext';

// Mock property for testing
const mockProperty = {
    id: 'prop-001',
    type: 'house',
    price: 450000,
    bedrooms: 4,
    address: '42 Victoria Road, Bromley, BR1 3PH',
    images: ['https://example.com/image.jpg'],
};

const mockProperty2 = {
    id: 'prop-002',
    type: 'flat',
    price: 275000,
    bedrooms: 2,
    address: 'Flat 15, Camden Heights, NW1 8AB',
    images: ['https://example.com/image2.jpg'],
};

// Test component to access context values
function TestComponent({ onMount }) {
    const context = useFavourites();
    React.useEffect(() => {
        if (onMount) onMount(context);
    }, [onMount, context]);
    return (
        <div>
            <span data-testid="count">{context.favouritesCount}</span>
            <button onClick={() => context.addFavourite(mockProperty)}>Add</button>
            <button onClick={() => context.addFavourite(mockProperty2)}>Add Second</button>
            <button onClick={() => context.removeFavourite(mockProperty.id)}>Remove</button>
            <button onClick={() => context.clearFavourites()}>Clear</button>
        </div>
    );
}

// Helper to render with provider
function renderWithProvider(ui) {
    return render(<FavouritesProvider>{ui}</FavouritesProvider>);
}

describe('FavouritesContext', () => {
    beforeEach(() => {
        localStorage.clear();
        jest.clearAllMocks();
    });

    // Test 1: Initial state
    test('should start with empty favourites array', () => {
        let contextValue;
        renderWithProvider(<TestComponent onMount={(ctx) => { contextValue = ctx; }} />);

        expect(screen.getByTestId('count').textContent).toBe('0');
        expect(contextValue.favourites).toEqual([]);
    });

    // Test 2: Add to favourites
    test('should add a property to favourites', async () => {
        renderWithProvider(<TestComponent />);

        expect(screen.getByTestId('count').textContent).toBe('0');

        await act(async () => {
            screen.getByText('Add').click();
        });

        expect(screen.getByTestId('count').textContent).toBe('1');
    });

    // Test 3: Prevent duplicate additions
    test('should prevent duplicate properties in favourites', async () => {
        renderWithProvider(<TestComponent />);

        await act(async () => {
            screen.getByText('Add').click();
        });
        expect(screen.getByTestId('count').textContent).toBe('1');

        await act(async () => {
            screen.getByText('Add').click(); // Try to add same property again
        });
        expect(screen.getByTestId('count').textContent).toBe('1'); // Should still be 1
    });

    // Test 4: Remove from favourites
    test('should remove a property from favourites', async () => {
        renderWithProvider(<TestComponent />);

        // Add property first
        await act(async () => {
            screen.getByText('Add').click();
        });
        expect(screen.getByTestId('count').textContent).toBe('1');

        // Remove property
        await act(async () => {
            screen.getByText('Remove').click();
        });
        expect(screen.getByTestId('count').textContent).toBe('0');
    });

    // Test 5: Clear all favourites
    test('should clear all favourites', async () => {
        renderWithProvider(<TestComponent />);

        // Add multiple properties
        await act(async () => {
            screen.getByText('Add').click();
            screen.getByText('Add Second').click();
        });
        expect(screen.getByTestId('count').textContent).toBe('2');

        // Clear all
        await act(async () => {
            screen.getByText('Clear').click();
        });
        expect(screen.getByTestId('count').textContent).toBe('0');
    });

    // Test 6: Check if property is favourited
    test('should correctly check if property is a favourite', async () => {
        let contextValue;
        renderWithProvider(<TestComponent onMount={(ctx) => { contextValue = ctx; }} />);

        expect(contextValue.isFavourite(mockProperty.id)).toBe(false);

        await act(async () => {
            screen.getByText('Add').click();
        });

        // Need to re-render to get updated context
        expect(contextValue.isFavourite(mockProperty.id)).toBe(true);
        expect(contextValue.isFavourite(mockProperty2.id)).toBe(false);
    });

    // Test 7: Persists to localStorage
    test('should save favourites to localStorage', async () => {
        renderWithProvider(<TestComponent />);

        await act(async () => {
            screen.getByText('Add').click();
        });

        expect(localStorage.setItem).toHaveBeenCalled();
    });

    // Test 8: Throws error when used outside provider
    test('should throw error when useFavourites is used outside provider', () => {
        // Suppress console.error for this test
        const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });

        expect(() => {
            render(<TestComponent />);
        }).toThrow('useFavourites must be used within a FavouritesProvider');

        consoleSpy.mockRestore();
    });
});
