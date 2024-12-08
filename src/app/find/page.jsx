'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Container from '@/components/Container';
import Loader from '@/components/Loader';


const SearchPage = () => {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all available pages
    const fetchPages = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/finds`);
        const data = await response.json();

        if (data.data) {
          setPages(data.data);
        } else {
          setError('No pages found');
        }
      } catch (err) {
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <Container className="mt-24">
      <h1 className="text-3xl font-bold text-center mb-8 text-black">Explore Locations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-black">
        {pages.map((page) => (
          <Link
            key={page.id}
            href={`/find/${page.slug}`}
            className="border rounded-lg overflow-hidden group">
            <div>
              <Image
                src={page.featured_image || '/images/default.jpg'}
                alt={page.Title}
                width={400}
                height={300}
                className="object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg">{page.Title}</h3>
                <p className="text-sm text-gray-600">{page.MetaDescription}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default SearchPage;
