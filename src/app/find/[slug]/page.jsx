'use client';

import React, { useEffect, useState } from 'react';
import { fetchSearchData } from '@/services/searchApi';
import { MessageCircle } from 'lucide-react';
import Container from '@/components/Container';
import SearchIntro from '@/components/SearchIntro';
import SchemaImageProduct from '@/components/ImageProductSchema';
import { HOTEL_DATA } from '@/constants/hotelData';
import LocalBusiness from '@/components/LocalBusiness';
import SearchDetails from '@/components/SearchDetails';
import LookAround from '@/components/LookAround';
import Loader from '@/components/Loader';


const generateDynamicSchema = (pageData, slug) => {
  if (!pageData) return null;

  // Base schema properties that all pages share
  const baseSchema = {
    '@context': 'https://schema.org',
    url: `https://bino.bot/search/${slug}`,
    name: pageData.Title || '',
    description: pageData.MetaDescription || ''
  };

  const detectPageType = () => {
    const slugLower = slug.toLowerCase();
    const titleLower =
      pageData && pageData.Title ? pageData.Title.toLowerCase() : '';

    if (slugLower.includes('hotel') || titleLower.includes('hotel')) {
      return 'hotel';
    } else if (
      slugLower.includes('restaurant') ||
      titleLower.includes('restaurant')
    ) {
      return 'restaurant';
    } else if (slugLower.includes('tour') || titleLower.includes('tour')) {
      return 'tour';
    } else if (
      slugLower.includes('destination') ||
      titleLower.includes('city')
    ) {
      return 'destination';
    }
    return 'general';
  };

  const pageType = detectPageType();

  // Generate schema based on page type
  switch (pageType) {
    case 'hotel':
      return {
        ...baseSchema,
        '@type': 'Hotel',
        priceRange: '₹2,000 - ₹50,000',
        amenityFeature:
          pageData.hotels && Array.isArray(pageData.hotels)
            ? pageData.hotels.map(hotel => ({
                '@type': 'LocationFeatureSpecification',
                name: hotel.amenities
              }))
            : [],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.5',
          reviewCount: '200'
        }
      };

    case 'restaurant':
      return {
        ...baseSchema,
        '@type': 'Restaurant',
        servesCuisine:
          pageData.cuisine && Array.isArray(pageData.cuisine)
            ? pageData.cuisine
            : ['Indian', 'Local'],
        priceRange: '₹₹',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.5',
          reviewCount: '200'
        }
      };

    case 'tour':
      return {
        ...baseSchema,
        '@type': 'TouristAttraction',
        touristType: ['Couples', 'Families', 'Adventure Seekers'],
        isAccessibleForFree: false,
        additionalType: 'Travel Package'
      };

    case 'destination':
      return {
        ...baseSchema,
        '@type': 'Place',
        additionalType: 'TouristDestination',
        touristType: ['Leisure', 'Culture', 'Adventure'],
        geo: {
          '@type': 'GeoCoordinates',
          latitude: pageData.latitude || '',
          longitude: pageData.longitude || ''
        }
      };

    default:
      return {
        ...baseSchema,
        '@type': 'WebPage',
        mainEntity: {
          '@type': 'SearchAction',
          target: `https://bino.bot/search?q=${slug}`,
          'query-input': 'required name=search_term'
        },
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.title', '.description']
        }
      };
  }
};

const SearchPage = ({ params }) => {
  const { slug } = params; // Get the dynamic slug from the route
  const [pageData, setPageData] = useState(null); // State to store page data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track error status
  const pageData2 = HOTEL_DATA;
  const displayedBusinesses = HOTEL_DATA.hotels.slice(0, 4);

  useEffect(
    () => {
      const loadData = async () => {
        const data = await fetchSearchData(slug);
        setPageData(data);
        setLoading(false);
      };

      loadData();
    },
    [slug]
  );

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div>
        {error}
      </div>
    );
  }

  // Render the page content when data is available
  return (
    <div className="min-h-screen bg-white">
      {/* SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateDynamicSchema(pageData, slug))
        }}
      />
      <Container>
        {/* Title Section */}
        <SearchIntro
          title={(pageData && pageData.Title) || 'Sample Search Page'}
          subtitle={
            (pageData && pageData.MetaDescription) ||
            'Description not available'
          }
          centered={true}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 text-black ">
          {pageData2.hotels.map(hotel =>
            <SchemaImageProduct key={hotel.place_id} hotelData={hotel} />
          )}
        </div>
        <div className="container mx-auto p-4 text-black">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Local Businesses</h2>
            <button className="text-sky-600 hover:text-sky-800">
              View All →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {displayedBusinesses.map(business =>
              <LocalBusiness key={business.place_id} businessData={business} />
            )}
          </div>
        </div>

        <SearchDetails searchData={pageData} />

        {/* Look Around Section */}
        <LookAround locationData={pageData} />
      </Container>
    </div>
  );
};

export default SearchPage;
