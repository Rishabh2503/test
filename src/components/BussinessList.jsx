"use client";
import React from 'react';
import Image from 'next/image';
import FadeIn from './FadeIn';
import Link from 'next/link';

const BusinessList = ({ businesses }) => {
  return (
    <FadeIn className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {businesses.map((business) => (
        <div
          key={business.place_id}
          className="border rounded-lg shadow-lg overflow-hidden bg-white hover:shadow-xl transition-all"
        >
          <div className="relative h-48 w-full">
            <Image
              src={business.featured_image}
              alt={business.name}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-t-lg"
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-semibold text-gray-800">{business.name}</h2>
            <p className="text-sm text-gray-600 mt-2">{business.description}</p>
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-500">
                Rating: {business.rating}⭐
              </span>
              <Link
                href={business.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm"
              >
                Visit Website
              </Link>
            </div>
            <div className="flex justify-between mt-4">
              <span className="text-sm text-gray-500">
                Reviews: {business.reviews}
              </span>
              <span className="text-sm text-gray-500">{business.address}</span>
            </div>
          </div>
        </div>
      ))}
    </FadeIn>
  );
};

export default BusinessList;