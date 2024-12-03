"use client";
import React from 'react';
import BusinessList from './BussinessList';

const businesses = [
  {
    place_id: "ChIJvQBATWblZzkR6UuJd-OjSE8",
    name: "Hotel Sarovar - A Boutique Lake Facing Hotel On Lake Pichola",
    description: "Relaxed rooms in an unfussy hotel on a lake, offering a scenic rooftop restaurant with palace views.",
    rating: 4,
    reviews: 1196,
    website: "http://www.hotelsarovar.com/",
    featured_image: "https://lh5.googleusercontent.com/p/AF1QipNXlCmtR3U5hfcJORFAhbCMEu2_CvgiHwkaRI8W=w408-h260-k-no",
    address: "Outside Chandpole, Hanuman Ghat, Pichola, Udaipur, Rajasthan 313001",
  },
  {
    place_id: "ChIJqT1F7cZGZTkRk1Oj1c4AKI0",
    name: "Lake Palace Hotel",
    description: "Luxurious hotel with scenic views, offering an unforgettable stay by the lake.",
    rating: 4.5,
    reviews: 2000,
    website: "http://www.lakepalaceudaipur.com/",
    featured_image: "https://lh5.googleusercontent.com/p/AF1QipOBZTt5DjkLwRlsyXgVt2sdq5kXl1otcD1ghXtE=w408-h260-k-no",
    address: "Lake Pichola, Udaipur, Rajasthan 313001",
  },
];

const Bussiness = () => {
  return (
    <div>
      <h2 className="text-center text-black text-3xl font-bold mt-8">
        Top Hotels in Udaipur
      </h2>
      <BusinessList businesses={businesses} />
    </div>
  );
  
};

export default Bussiness;