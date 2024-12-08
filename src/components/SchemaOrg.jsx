'use client';

import { useEffect } from 'react';

const SchemaOrg = ({ schema }) => {
  useEffect(() => {
    // Inject schema only on client-side
    const script = document.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [schema]);

  return null;
};

export default SchemaOrg; 