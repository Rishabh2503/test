// API service to fetch data based on slug
export const fetchSearchData = async (slug) => {
  try {
    // Extract category from slug (e.g., "hotels", "cars", etc.)
    const category = slug.split('-')[0];
    
    // Define API endpoints for different categories
    const endpoints = {
      hotels: '/api/finds/hotels',
      cars: '/api/finds/cars',
      restaurants: '/api/finds/restaurants',
      // Add more endpoints as needed
    };

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${endpoints[category] || '/api/finds'}?slug=${slug}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return normalizeSearchData(data, category);
  } catch (error) {
    console.error('Error fetching search data:', error);
    return null;
  }
};

// Normalize data to match our schema regardless of source
const normalizeSearchData = (data, category) => {
  // Base schema that all items should follow
  const baseSchema = {
    place_id: '',
    name: '',
    description: '',
    featured_image: '',
    rating: 0,
    reviews: 0,
    website: '',
    phone: '',
    address: '',
    coordinates: {
      latitude: 0,
      longitude: 0
    },
    detailed_address: {
      ward: '',
      city: '',
      state: '',
      country_code: ''
    },
    images: [],
    review_keywords: [],
    featured_reviews: []
  };

  // Map incoming data to our schema based on category
  switch (category) {
    case 'hotels':
      return data.map(item => ({
        ...baseSchema,
        ...item,
        main_category: 'Hotel'
      }));

    case 'cars':
      return data.map(item => ({
        ...baseSchema,
        place_id: item.id || item.car_id,
        name: item.title || item.name,
        description: item.description,
        featured_image: item.main_image || item.featured_image,
        main_category: 'Car Rental',
        // Map other car-specific fields
      }));

    case 'restaurants':
      return data.map(item => ({
        ...baseSchema,
        place_id: item.restaurant_id || item.id,
        name: item.restaurant_name || item.name,
        main_category: 'Restaurant',
        // Map restaurant-specific fields
      }));

    default:
      return data;
  }
}; 