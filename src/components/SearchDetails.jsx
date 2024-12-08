import { MessageCircle } from 'lucide-react';

const SearchDetails = ({ searchData }) => {
  // Default data structure that matches our schema
  const defaultData = {
    title: 'Hotels in Udaipur',
    activeSearches: '120+ searches today',
    priceRange: '₹2,000 - ₹50,000 per night',
    suggestions: [
      'The Oberoi Udaivilas',
      'Taj Lake Palace',
      'Radisson Blu Udaipur Palace'
    ]
  };

  // Use API data if available, otherwise use defaults
  const data = {
    title: searchData?.Title || defaultData.title,
    activeSearches: searchData?.activeSearches || defaultData.activeSearches,
    priceRange: searchData?.priceRange || defaultData.priceRange,
    suggestions: searchData?.suggestions || defaultData.suggestions
  };

  return (
    <>
      {/* Search Details Box */}
      <div className='bg-sky-50 rounded-xl p-6 mb-12 text-black'>
        <h2 className='text-2xl font-semibold mb-4'>Bino Search Details</h2>
        <div className='space-y-3'>
          <p className='flex items-center justify-between'>
            <span className='text-gray-600'>Searched for:</span>
            <span className='font-medium'>{data.title}</span>
          </p>
          <p className='flex items-center justify-between'>
            <span className='text-gray-600'>Active searches:</span>
            <span className='font-medium text-green-600'>
              {data.activeSearches}
            </span>
          </p>
          <p className='flex items-center justify-between'>
            <span className='text-gray-600'>Price range:</span>
            <span className='font-medium'>{data.priceRange}</span>
          </p>
        </div>
      </div>

      {/* Search Suggestions */}
      <div className='mb-12 text-black'>
        <h2 className='text-2xl font-semibold mb-4'>Search Suggestions</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {data.suggestions.map((suggestion) => (
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
    </>
  );
};

export default SearchDetails; 