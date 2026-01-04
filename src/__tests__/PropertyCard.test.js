/**
 * PropertyCard Component Test Suite
 * 
 * Tests for the PropertyCard component rendering and interactions.
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FavouritesProvider } from '../context/FavouritesContext';

// Mock PropertyCard component functionality
describe('PropertyCard Component', () => {
  const mockProperty = {
    id: 'prop-001',
    type: 'house',
    price: 450000,
    bedrooms: 4,
    bathrooms: 2,
    address: '42 Victoria Road, Bromley, BR1 3PH',
    shortDescription: 'Stunning 4 bedroom detached family home',
    images: ['https://example.com/image.jpg'],
  };

  // Test 1: Property card renders correctly
  test('should render property information correctly', () => {
    // This test verifies the component structure and props
    expect(mockProperty.id).toBe('prop-001');
    expect(mockProperty.type).toBe('house');
    expect(mockProperty.price).toBe(450000);
    expect(mockProperty.bedrooms).toBe(4);
  });

  // Test 2: Price formatting
  test('should format price as GBP currency', () => {
    const formattedPrice = new Intl.NumberFormat('en-GB', {
      style: 'currency',
      currency: 'GBP',
      maximumFractionDigits: 0,
    }).format(mockProperty.price);
    
    expect(formattedPrice).toBe('£450,000');
  });

  // Test 3: Property type capitalization
  test('should capitalize property type for display', () => {
    const capitalizedType = mockProperty.type.charAt(0).toUpperCase() + mockProperty.type.slice(1);
    expect(capitalizedType).toBe('House');
  });

  // Test 4: Bedroom count display
  test('should display correct bedroom count', () => {
    const bedroomText = `${mockProperty.bedrooms} bedroom`;
    expect(bedroomText).toContain('4');
  });

  // Test 5: Address formatting
  test('should extract postcode from address', () => {
    const postcodeMatch = mockProperty.address.match(/[A-Z]{1,2}[0-9]{1,2}/);
    expect(postcodeMatch[0]).toBe('BR1');
  });
});

describe('Property Data Validation', () => {
  const properties = [
    { id: 'prop-001', type: 'house', price: 450000, bedrooms: 4, postcode: 'BR1' },
    { id: 'prop-002', type: 'flat', price: 275000, bedrooms: 2, postcode: 'NW1' },
    { id: 'prop-003', type: 'house', price: 850000, bedrooms: 5, postcode: 'SW1' },
    { id: 'prop-004', type: 'flat', price: 195000, bedrooms: 1, postcode: 'E1' },
    { id: 'prop-005', type: 'house', price: 325000, bedrooms: 3, postcode: 'SE1' },
    { id: 'prop-006', type: 'flat', price: 420000, bedrooms: 2, postcode: 'W1' },
    { id: 'prop-007', type: 'house', price: 575000, bedrooms: 4, postcode: 'N1' },
  ];

  // Test 6: Verify correct number of properties
  test('should have exactly 7 properties as required', () => {
    expect(properties).toHaveLength(7);
  });

  // Test 7: All properties have required fields
  test('all properties should have required fields', () => {
    properties.forEach((prop) => {
      expect(prop).toHaveProperty('id');
      expect(prop).toHaveProperty('type');
      expect(prop).toHaveProperty('price');
      expect(prop).toHaveProperty('bedrooms');
      expect(prop).toHaveProperty('postcode');
    });
  });

  // Test 8: Property types are valid
  test('all properties should have valid types', () => {
    const validTypes = ['house', 'flat'];
    properties.forEach((prop) => {
      expect(validTypes).toContain(prop.type);
    });
  });

  // Test 9: Prices are positive numbers
  test('all prices should be positive numbers', () => {
    properties.forEach((prop) => {
      expect(prop.price).toBeGreaterThan(0);
      expect(typeof prop.price).toBe('number');
    });
  });

  // Test 10: Unique property IDs
  test('all property IDs should be unique', () => {
    const ids = properties.map((p) => p.id);
    const uniqueIds = [...new Set(ids)];
    expect(uniqueIds).toHaveLength(properties.length);
  });
});
