/**
 * Search Utilities Test Suite
 * 
 * Tests for the filterProperties function and helper utilities.
 * Covers all search criteria combinations.
 */

import {
  filterProperties,
  formatPrice,
  formatDate,
  getUniquePostcodes,
  getPriceRange,
  getBedroomRange,
  countActiveCriteria,
} from '../utils/searchUtils';

// Mock property data for testing
const mockProperties = [
  {
    id: 'prop-001',
    type: 'house',
    price: 450000,
    bedrooms: 4,
    dateAdded: '2025-12-01',
    postcode: 'BR1',
  },
  {
    id: 'prop-002',
    type: 'flat',
    price: 275000,
    bedrooms: 2,
    dateAdded: '2025-11-15',
    postcode: 'NW1',
  },
  {
    id: 'prop-003',
    type: 'house',
    price: 850000,
    bedrooms: 5,
    dateAdded: '2025-10-20',
    postcode: 'SW1',
  },
  {
    id: 'prop-004',
    type: 'flat',
    price: 195000,
    bedrooms: 1,
    dateAdded: '2025-12-15',
    postcode: 'E1',
  },
  {
    id: 'prop-005',
    type: 'house',
    price: 325000,
    bedrooms: 3,
    dateAdded: '2025-09-01',
    postcode: 'SE1',
  },
];

describe('searchUtils', () => {
  // Test 1: Filter by property type
  describe('filterProperties - by type', () => {
    test('should filter properties by type "house"', () => {
      const result = filterProperties(mockProperties, { type: 'house' });
      expect(result).toHaveLength(3);
      expect(result.every((p) => p.type === 'house')).toBe(true);
    });

    test('should filter properties by type "flat"', () => {
      const result = filterProperties(mockProperties, { type: 'flat' });
      expect(result).toHaveLength(2);
      expect(result.every((p) => p.type === 'flat')).toBe(true);
    });

    test('should return all properties when type is "any"', () => {
      const result = filterProperties(mockProperties, { type: 'any' });
      expect(result).toHaveLength(5);
    });
  });

  // Test 2: Filter by price range
  describe('filterProperties - by price', () => {
    test('should filter properties with minimum price', () => {
      const result = filterProperties(mockProperties, { minPrice: 300000 });
      expect(result).toHaveLength(3);
      expect(result.every((p) => p.price >= 300000)).toBe(true);
    });

    test('should filter properties with maximum price', () => {
      const result = filterProperties(mockProperties, { maxPrice: 300000 });
      expect(result).toHaveLength(2);
      expect(result.every((p) => p.price <= 300000)).toBe(true);
    });

    test('should filter properties within price range', () => {
      const result = filterProperties(mockProperties, { minPrice: 200000, maxPrice: 500000 });
      expect(result).toHaveLength(3);
      expect(result.every((p) => p.price >= 200000 && p.price <= 500000)).toBe(true);
    });
  });

  // Test 3: Filter by bedroom count
  describe('filterProperties - by bedrooms', () => {
    test('should filter properties with minimum bedrooms', () => {
      const result = filterProperties(mockProperties, { minBedrooms: 3 });
      expect(result).toHaveLength(3);
      expect(result.every((p) => p.bedrooms >= 3)).toBe(true);
    });

    test('should filter properties with maximum bedrooms', () => {
      const result = filterProperties(mockProperties, { maxBedrooms: 2 });
      expect(result).toHaveLength(2);
      expect(result.every((p) => p.bedrooms <= 2)).toBe(true);
    });
  });

  // Test 4: Filter by date added
  describe('filterProperties - by date', () => {
    test('should filter properties added after a specific date', () => {
      const result = filterProperties(mockProperties, { dateFrom: new Date('2025-11-01') });
      expect(result).toHaveLength(3);
    });

    test('should filter properties added before a specific date', () => {
      const result = filterProperties(mockProperties, { dateTo: new Date('2025-10-31') });
      expect(result).toHaveLength(2);
    });

    test('should filter properties within date range', () => {
      const result = filterProperties(mockProperties, {
        dateFrom: new Date('2025-11-01'),
        dateTo: new Date('2025-12-01'),
      });
      expect(result).toHaveLength(2);
    });
  });

  // Test 5: Filter by postcode
  describe('filterProperties - by postcode', () => {
    test('should filter properties by postcode area', () => {
      const result = filterProperties(mockProperties, { postcode: 'BR1' });
      expect(result).toHaveLength(1);
      expect(result[0].postcode).toBe('BR1');
    });

    test('should be case-insensitive for postcode search', () => {
      const result = filterProperties(mockProperties, { postcode: 'nw1' });
      expect(result).toHaveLength(1);
      expect(result[0].postcode).toBe('NW1');
    });

    test('should handle partial postcode match', () => {
      const result = filterProperties(mockProperties, { postcode: 'S' });
      expect(result).toHaveLength(2); // SW1 and SE1
    });
  });

  // Test 6: Combined criteria search
  describe('filterProperties - combined criteria', () => {
    test('should filter with two criteria (type and price)', () => {
      const result = filterProperties(mockProperties, {
        type: 'house',
        maxPrice: 500000,
      });
      expect(result).toHaveLength(2);
    });

    test('should filter with three criteria', () => {
      const result = filterProperties(mockProperties, {
        type: 'house',
        minPrice: 300000,
        minBedrooms: 4,
      });
      expect(result).toHaveLength(2);
    });

    test('should filter with all five criteria', () => {
      const result = filterProperties(mockProperties, {
        type: 'house',
        minPrice: 300000,
        maxPrice: 900000,
        minBedrooms: 4,
        dateFrom: new Date('2025-10-01'),
      });
      expect(result).toHaveLength(2);
    });
  });

  // Test 7: Edge cases
  describe('filterProperties - edge cases', () => {
    test('should return all properties when no criteria specified', () => {
      const result = filterProperties(mockProperties, {});
      expect(result).toHaveLength(5);
    });

    test('should return all properties when criteria is null', () => {
      const result = filterProperties(mockProperties, null);
      expect(result).toHaveLength(5);
    });

    test('should return empty array when no matches found', () => {
      const result = filterProperties(mockProperties, {
        type: 'house',
        maxPrice: 100000,
      });
      expect(result).toHaveLength(0);
    });
  });

  // Test 8: Helper functions
  describe('helper functions', () => {
    test('formatPrice should format number as GBP currency', () => {
      expect(formatPrice(450000)).toBe('£450,000');
      expect(formatPrice(1250000)).toBe('£1,250,000');
    });

    test('formatDate should format date string correctly', () => {
      const result = formatDate('2025-12-01');
      expect(result).toContain('Dec');
      expect(result).toContain('2025');
    });

    test('getUniquePostcodes should return sorted unique postcodes', () => {
      const result = getUniquePostcodes(mockProperties);
      expect(result).toEqual(['BR1', 'E1', 'NW1', 'SE1', 'SW1']);
    });

    test('getPriceRange should return min and max prices', () => {
      const result = getPriceRange(mockProperties);
      expect(result.min).toBe(195000);
      expect(result.max).toBe(850000);
    });

    test('getBedroomRange should return min and max bedrooms', () => {
      const result = getBedroomRange(mockProperties);
      expect(result.min).toBe(1);
      expect(result.max).toBe(5);
    });

    test('countActiveCriteria should count number of active criteria', () => {
      expect(countActiveCriteria({ type: 'house' })).toBe(1);
      expect(countActiveCriteria({ type: 'house', minPrice: 100000 })).toBe(2);
      expect(countActiveCriteria({ type: 'any' })).toBe(0);
      expect(countActiveCriteria(null)).toBe(0);
    });
  });
});
