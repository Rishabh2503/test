import { MessageCircle } from 'lucide-react';

const LookAround = ({ locationData }) => {
  // Default data structure that matches our schema
  const defaultData = {
    city: 'Udaipur',
    description: '<p>Learn more about the rich heritage and beautiful lake views of Udaipur!</p>',
    madeForYou: ['Book your fort', 'Food streets of Udaipur'],
    relatedSearches: ['Hotels in Jaipur', 'Hotels in Kota']
  };

  // Use API data if available, otherwise use defaults
  const data = {
    city: locationData?.city || defaultData.city,
    description: locationData?.Body || defaultData.description,
    madeForYou: locationData?.madeForYou || defaultData.madeForYou,
    relatedSearches: locationData?.relatedSearches || defaultData.relatedSearches
  };

  return (
    <div className='bg-gray-50 rounded-xl p-6 text-black'>
      <h2 className='text-2xl font-semibold mb-4'>Look Around {data.city}</h2>
      
      {/* Description Content */}
      <div className='prose max-w-none'>
        <div
          dangerouslySetInnerHTML={{
            __html: data.description
          }}
        />
      </div>

      {/* Related Searches */}
      <div className='mt-8 space-y-6'>
        {/* Made for You Searches */}
        <div>
          <h3 className='font-semibold mb-3'>Made for You Searches</h3>
          <div className='flex flex-wrap gap-3'>
            {data.madeForYou.map((search) => (
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

        {/* Related Searches in Location */}
        <div>
          <h3 className='font-semibold mb-3 text-black'>
            Related Searches in Location
          </h3>
          <div className='flex flex-wrap gap-3'>
            {data.relatedSearches.map((search) => (
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
  );
};

export default LookAround;