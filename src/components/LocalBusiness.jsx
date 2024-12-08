import Image from 'next/image';
import { Card } from './Card';
import { CardContent } from './CardContent';

const LocalBusiness = ({ businessData }) => {
  // Schema-compatible data structure for Local Business
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": businessData.name,
    "image": businessData.featured_image,
    "description": businessData.description,
    "@id": businessData.place_id,
    "url": businessData.website,
    "telephone": businessData.phone,
    "address": {
      "@type": "PostalAddress",
      ...businessData.detailed_address
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": businessData.coordinates.latitude,
      "longitude": businessData.coordinates.longitude
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": businessData.rating,
      "reviewCount": businessData.reviews
    },
    "review": businessData.featured_reviews?.map(review => ({
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating
      },
      "reviewBody": review.review_text,
      "datePublished": review.published_at_date
    }))
  };

  return (
    <>
      {/* Schema Metadata */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Visual Component */}
      <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-4">
          {/* Header with Business Info */}
          <div className="flex items-start gap-4">
            <div className="w-24 h-24 relative rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={businessData.featured_image}
                alt={businessData.name}
                fill
                className="object-cover"
              />
            </div>
            
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{businessData.name}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-yellow-400 font-bold">{businessData.rating}★</span>
                <span className="text-sm text-gray-600">({businessData.reviews} reviews)</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{businessData.main_category}</p>
            </div>
          </div>

          {/* Popular Keywords */}
          <div className="mt-4">
            <h4 className="text-sm font-semibold text-gray-700">Known For</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {businessData.review_keywords?.slice(0, 5).map((keyword) => (
                <span
                  key={keyword.keyword}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
                >
                  {keyword.keyword} ({keyword.count})
                </span>
              ))}
            </div>
          </div>

          {/* Contact & Location */}
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span>📍</span>
              <p>{businessData.address}</p>
            </div>
            {businessData.phone && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>📞</span>
                <p>{businessData.phone}</p>
              </div>
            )}
          </div>

          {/* Featured Review */}
          {businessData.featured_reviews?.[0] && (
            <div className="mt-4 border-t pt-4">
              <h4 className="text-sm font-semibold text-gray-700">Featured Review</h4>
              <div className="mt-2 bg-gray-50 p-3 rounded">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-yellow-400">
                    {'★'.repeat(businessData.featured_reviews[0].rating)}
                  </span>
                  <span className="text-xs text-gray-500">
                    {businessData.featured_reviews[0].published_at}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {businessData.featured_reviews[0].review_text}
                </p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="mt-4 flex gap-2">
            {businessData.website && (
              <a
                href={businessData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Visit Website
              </a>
            )}
            <button className="flex-1 px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition">
              Get Directions
            </button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default LocalBusiness; 