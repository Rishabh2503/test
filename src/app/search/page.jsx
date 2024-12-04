'use client';
import React, { useEffect, useState } from 'react';
import { Card } from '@/components/Card';
import { CardContent } from '@/components/CardContent';
import { MessageCircle } from 'lucide-react';
import Container from '@/components/Container';
import SearchIntro from '@/components/SearchIntro';

import Bussiness from '@/components/Bussiness';
import Image from 'next/image';

const SearchPage = () => {
  const [pageData, setPageData] = useState(null); // State to store page data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track error status

  useEffect(() => {
    // Fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/search-pages?filters[slug][$eq]=hotels-in-udaipur`
        );
        const data = await response.json();
        console.log('Fetched Data:', data); // Log the API response for debugging

        if (data.data && data.data.length > 0) {
          setPageData(data.data[0]);
          console.log('Hotel Data:', data.data[0].hotels); // Log hotel data for debugging
        } else {
          setError('No data found');
        }
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Empty dependency array, so it runs only on mount
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // This will be true after the component mounts (only on the client side)
  }, []);

  if (!isClient) {
    return null; // Or render a loading state if you prefer
  }

  // If the data is still loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error, show the error message
  if (error) {
    return <div>{error}</div>;
  }

  // Sample hotel data (for fallback when API data is not available)
  const sampleHotels = [
    {
      name: 'Sample Hotel 1',
      description: 'Luxurious stay with beautiful views.',
      image: '/images/sample-hotel.jpg'
    },
    {
      name: 'Sample Hotel 2',
      description: 'A perfect blend of comfort and style.',
      image: '/images/sample-hotel.jpg'
    },
    {
      name: 'Sample Hotel 3',
      description: 'Exceptional service and amenities.',
      image: '/images/sample-hotel.jpg'
    },
    {
      name: 'Sample Hotel 4',
      description: 'Located in the heart of the city.',
      image: '/images/sample-hotel.jpg'
    }
  ];

  // Render the page content when data is available
  return (
    <div className='min-h-screen bg-white'>
      {/* SEO Schema */}
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TravelAction',
            name: pageData?.Title,
            description: pageData?.MetaDescription,
            url: `https://bino.bot/${pageData?.slug}`,
            potentialAction: {
              '@type': 'SearchAction',
              target: `https://bino.bot/search?q=${pageData?.slug}`,
              'query-input': 'required name=search_term'
            }
          })
        }}
      />
      <Container>
        {/* Title Section */}
        <SearchIntro
          title={pageData?.Title || 'Sample Search Page'}
          subtitle={pageData?.MetaDescription || 'Description not available'} // Optional subtitle
          centered={true}
        />

        {/* Hotel Cards */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 text-black '>
          {(pageData?.hotels || sampleHotels).map((hotel, index) => (
            <Card
              key={index}
              className='group relative overflow-hidden rounded-xl  bg-gray-100'>
              <div className='aspect-w-3 aspect-h-2'>
                <Image
                  src={hotel.image || '/src/images/Bino_logo.png'} // Use sample image or API image
                  alt={`Hotel Preview ${index + 1}`}
                  className='object-cover transition-transform group-hover:scale-110'
                  width={400}
                  height={300}
                />
              </div>
              <div className='absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity flex items-center justify-center p-4'>
                <h3 className='text-white text-lg font-semibold text-center'>
                  {hotel.name || `Luxury Hotel ${index + 1}`}
                </h3>
                <p className='text-white text-sm text-center'>
                  {hotel.description || 'No description available.'}
                </p>
              </div>
              <CardContent className='p-4'>
                <h3 className='font-semibold text-lg'>
                  {hotel.name || `Luxury Hotel ${index + 1}`}
                </h3>
                <p className='text-sm text-gray-600'>
                  Starting from ₹{2000 * (index + 1)}/night
                </p>
                <div className='mt-2 flex items-center gap-2'>
                  <span className='px-2 py-1 text-xs bg-sky-100 text-sky-800 rounded'>
                    4.5 ★
                  </span>
                  <span className='text-xs text-gray-500'>200+ reviews</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <Bussiness />

        {/* Bino Search Details */}
        <div className='bg-sky-50 rounded-xl p-6 mb-12 text-black'>
          <h2 className='text-2xl font-semibold mb-4 '>Bino Search Details</h2>
          <div className='space-y-3'>
            <p className='flex items-center justify-between'>
              <span className='text-gray-600'>Searched for:</span>
              <span className='font-medium'>
                {pageData?.Title || 'Hotels in Udaipur'}
              </span>
            </p>
            <p className='flex items-center justify-between'>
              <span className='text-gray-600'>Active searches:</span>
              <span className='font-medium text-green-600'>
                120+ searches today
              </span>
            </p>
            <p className='flex items-center justify-between'>
              <span className='text-gray-600'>Price range:</span>
              <span className='font-medium'>₹2,000 - ₹50,000 per night</span>
            </p>
          </div>
        </div>

        {/* Search Suggestions */}
        <div className='mb-12 text-black'>
          <h2 className='text-2xl font-semibold mb-4'>Search Suggestions</h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {[
              'The Oberoi Udaivilas',
              'Taj Lake Palace',
              'Radisson Blu Udaipur Palace'
            ].map((suggestion) => (
              <div
                key={suggestion}
                className='flex items-center justify-between p-4 bg-white border rounded-lg shadow-sm'>
                <span>{suggestion}</span>
                <button className='flex items-center gap-2 px-4 py-2 text-white bg-green-500 rounded-lg hover:bg-green-600'>
                  <MessageCircle className='w-5 h-5' />
                  Chat on WhatsApp
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Look Around Section */}
        <div className='bg-gray-50 rounded-xl p-6 text-black'>
          <h2 className='text-2xl font-semibold mb-4'>Look Around Udaipur</h2>
          {/* Render HTML content from the Body */}
          <div className='prose max-w-none'>
            {/* Use dangerouslySetInnerHTML to render HTML content */}
            <div
              dangerouslySetInnerHTML={{
                __html:
                  pageData?.Body ||
                  '<p>Learn more about the rich heritage and beautiful lake views of Udaipur!</p>'
              }}
            />
          </div>

          {/* Related Searches */}
          <div className='mt-8 space-y-6'>
            <div>
              <h3 className='font-semibold mb-3'>Made for You Searches</h3>
              <div className='flex flex-wrap gap-3'>
                {['Book your fort', 'Food streets of Udaipur'].map((search) => (
                  <div
                    key={search}
                    className='flex items-center gap-2'>
                    <a
                      href='#'
                      className='text-sky-600 hover:text-sky-800'>
                      {search}
                    </a>
                    <MessageCircle className='w-4 h-4 text-green-500 cursor-pointer' />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className='font-semibold mb-3 text-black'>
                Related Searches in Location
              </h3>
              <div className='flex flex-wrap gap-3'>
                {['Hotels in Jaipur', 'Hotels in Kota'].map((search) => (
                  <div
                    key={search}
                    className='flex items-center gap-2'>
                    <a
                      href='#'
                      className='text-sky-600 hover:text-sky-800'>
                      {search}
                    </a>
                    <MessageCircle className='w-4 h-4 text-green-500 cursor-pointer' />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default SearchPage;
