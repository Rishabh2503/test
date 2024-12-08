import Image from 'next/image';
import { Card } from './Card';
import { CardContent } from './CardContent';

const SchemaImageProduct = ({ hotelData }) => {
  // Schema-compatible data structure for SEO
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": hotelData.name,
    "image": [
      // Primary image
      hotelData.featured_image,
      // Additional images by category
      ...hotelData.images.map(img => ({
        "@type": "ImageObject",
        "contentUrl": img.link,
        "caption": img.about
      }))
    ],
    "description": hotelData.description,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": hotelData.rating,
      "reviewCount": hotelData.reviews,
      "bestRating": "5",
      "worstRating": "1"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "availability": "https://schema.org/InStock"
    },
    "address": {
      "@type": "PostalAddress",
      ...hotelData.detailed_address
    }
  };

  // Group images by category for UI display
  const groupedImages = hotelData.images.reduce((acc, img) => {
    if (!acc[img.about]) {
      acc[img.about] = [];
    }
    acc[img.about].push(img.link);
    return acc;
  }, {});

  return (
    <>
      {/* Schema Metadata for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Visual Component */}
      <Card className="group relative overflow-hidden rounded-xl bg-gray-100">
        {/* Main Image Section */}
        <div className="aspect-w-3 aspect-h-2 relative">
          <Image
            src={hotelData.featured_image}
            alt={hotelData.name}
            width={400}
            height={300}
            className="object-cover transition-transform group-hover:scale-110"
          />
          {hotelData.is_spending_on_ads && (
            <span className="absolute top-2 right-2 bg-yellow-400 text-xs px-2 py-1 rounded">
              Featured
            </span>
          )}
        </div>

        <CardContent className="p-4">
          {/* Hotel Name */}
          <h3 className="font-semibold text-lg">{hotelData.name}</h3>
          
          {/* Rating Section */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => (
                <span
                  key={index}
                  className={`text-lg ${
                    index < hotelData.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-sm text-gray-600">
              ({hotelData.reviews} reviews)
            </span>
          </div>

          {/* Image Gallery Preview */}
          <div className="mt-4">
            <div className="grid grid-cols-4 gap-2">
              {Object.entries(groupedImages).slice(0, 4).map(([category, images], index) => (
                <div key={category} className="relative group/image">
                  <Image
                    src={images[0]}
                    alt={`${category} view`}
                    width={80}
                    height={80}
                    className="rounded object-cover w-full h-16"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover/image:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white text-xs opacity-0 group-hover/image:opacity-100">
                      {category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Keywords/Tags */}
          <div className="mt-3 flex flex-wrap gap-2">
            {hotelData.review_keywords?.slice(0, 3).map((keyword, index) => (
              <span
                key={index}
                className="text-xs bg-sky-100 text-sky-800 px-2 py-1 rounded"
              >
                {keyword.keyword}
              </span>
            ))}
          </div>

          {/* Location */}
          <p className="text-sm text-gray-600 mt-2">
            {hotelData.detailed_address.ward}
          </p>

          {/* Additional Details */}
          <div className="mt-3 space-y-2">
            {/* Contact Info */}
            {hotelData.phone && (
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <span>📞</span>
                {hotelData.phone}
              </p>
            )}
            
            {/* Website */}
            {hotelData.website && (
              <a 
                href={hotelData.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-sky-600 hover:text-sky-800 flex items-center gap-2"
              >
                <span>🌐</span>
                Visit Website
              </a>
            )}
          </div>
        </CardContent>

        {/* Quick Preview Modal (optional) */}
        <div className="hidden group-hover:block absolute inset-0 bg-black bg-opacity-50 transition-opacity">
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <p className="text-sm">{hotelData.description}</p>
          </div>
        </div>
      </Card>
    </>
  );
};

export default SchemaImageProduct;