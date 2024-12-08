'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

const DynamicSearchPage = ({ slug }) => {
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!slug) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/search-pages?filters[slug][$eq]=${slug}`
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch page data');
        }
        
        const data = await response.json();

        if (data.data && data.data.length > 0) {
          setPageData(data.data[0].attributes);
        } else {
          setError('Page not found');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600">{error}</div>;
  }

  const { Title, category, dynamic_data, Body } = pageData || {};

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{Title}</h1>
        
        {dynamic_data?.featured_image && (
          <div className="relative w-full h-64">
            <Image
              src={dynamic_data.featured_image}
              alt={Title || 'Featured Image'}
              fill
              className="object-cover rounded-lg"
              priority
            />
          </div>
        )}
      </header>

      {/* Body Content */}
      {Body && (
        <section 
          className="prose max-w-full"
          dangerouslySetInnerHTML={{ __html: Body }}
        />
      )}

      {/* Dynamic Content Based on Category */}
      {category === 'hotel' && dynamic_data && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Hotel Details</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p><strong>Description:</strong> {dynamic_data.description}</p>
              <p><strong>Address:</strong> {dynamic_data.address}</p>
              <p><strong>Rating:</strong> {dynamic_data.rating} ★</p>
            </div>
            <div>
              {dynamic_data.website && (
                <a 
                  href={dynamic_data.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Visit Hotel Website
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Related Images Section */}
      {dynamic_data?.images && dynamic_data.images.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {dynamic_data.images.map((img, index) => (
              <div key={index} className="relative h-48">
                <Image
                  src={img.link}
                  alt={img.about || `Image ${index + 1}`}
                  fill
                  className="object-cover rounded-lg"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Review Keywords */}
      {dynamic_data?.review_keywords && dynamic_data.review_keywords.length > 0 && (
        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Review Insights</h2>
          <div className="flex flex-wrap gap-2">
            {dynamic_data.review_keywords.map((keyword, index) => (
              <span 
                key={index} 
                className="bg-gray-100 px-3 py-1 rounded-full text-sm"
              >
                {keyword.keyword} ({keyword.count})
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default DynamicSearchPage;