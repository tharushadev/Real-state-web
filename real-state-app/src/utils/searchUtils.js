/**
 * Search Utilities
 * Handles filtering and formatting for property search.
 */

// Format price to GBP
export function formatPrice(price) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(price);
}

// Format date to local string
export function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

// Filter properties based on provided criteria
export function filterProperties(properties, criteria) {
  if (!criteria || Object.keys(criteria).length === 0) {
    return properties;
  }

  return properties.filter((property) => {
    // Type match
    if (criteria.type && criteria.type !== 'any') {
      if (property.type.toLowerCase() !== criteria.type.toLowerCase()) {
        return false;
      }
    }

    // Min price
    if (criteria.minPrice !== undefined && criteria.minPrice !== null && criteria.minPrice !== '') {
      const minPrice = Number(criteria.minPrice);
      if (!isNaN(minPrice) && property.price < minPrice) {
        return false;
      }
    }

    // Max price
    if (criteria.maxPrice !== undefined && criteria.maxPrice !== null && criteria.maxPrice !== '') {
      const maxPrice = Number(criteria.maxPrice);
      if (!isNaN(maxPrice) && property.price > maxPrice) {
        return false;
      }
    }

    // Min bedrooms
    if (criteria.minBedrooms !== undefined && criteria.minBedrooms !== null && criteria.minBedrooms !== '') {
      const minBeds = Number(criteria.minBedrooms);
      if (!isNaN(minBeds) && property.bedrooms < minBeds) {
        return false;
      }
    }

    // Max bedrooms
    if (criteria.maxBedrooms !== undefined && criteria.maxBedrooms !== null && criteria.maxBedrooms !== '') {
      const maxBeds = Number(criteria.maxBedrooms);
      if (!isNaN(maxBeds) && property.bedrooms > maxBeds) {
        return false;
      }
    }

    // Date from
    if (criteria.dateFrom) {
      const fromDate = new Date(criteria.dateFrom);
      const propertyDate = new Date(property.dateAdded);
      if (propertyDate < fromDate) {
        return false;
      }
    }

    // Date to
    if (criteria.dateTo) {
      const toDate = new Date(criteria.dateTo);
      const propertyDate = new Date(property.dateAdded);
      if (propertyDate > toDate) {
        return false;
      }
    }

    // Postcode
    if (criteria.postcode && criteria.postcode.trim() !== '') {
      const searchPostcode = criteria.postcode.trim().toUpperCase();
      const propertyPostcode = property.postcode.toUpperCase();
      if (!propertyPostcode.startsWith(searchPostcode)) {
        return false;
      }
    }

    return true;
  });
}

// Get sorted unique postcode areas
export function getUniquePostcodes(properties) {
  const postcodes = [...new Set(properties.map((p) => p.postcode))];
  return postcodes.sort();
}

// Get min and max price from properties
export function getPriceRange(properties) {
  if (properties.length === 0) {
    return { min: 0, max: 1000000 };
  }
  const prices = properties.map((p) => p.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices),
  };
}

// Get min and max bedrooms from properties
export function getBedroomRange(properties) {
  if (properties.length === 0) {
    return { min: 1, max: 5 };
  }
  const bedrooms = properties.map((p) => p.bedrooms);
  return {
    min: Math.min(...bedrooms),
    max: Math.max(...bedrooms),
  };
}

// Count active filters
export function countActiveCriteria(criteria) {
  if (!criteria) return 0;

  let count = 0;
  if (criteria.type && criteria.type !== 'any') count++;
  if (criteria.minPrice || criteria.maxPrice) count++;
  if (criteria.minBedrooms || criteria.maxBedrooms) count++;
  if (criteria.dateFrom || criteria.dateTo) count++;
  if (criteria.postcode && criteria.postcode.trim() !== '') count++;

  return count;
}
