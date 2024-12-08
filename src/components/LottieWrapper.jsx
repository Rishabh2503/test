'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

const LottiePlayer = dynamic(() => import('lottie-react'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full animate-pulse bg-gray-200 rounded-lg" />
  ),
});

const LottieWrapper = ({ animationData, ...props }) => {
  const [isMounted, setIsMounted] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div ref={containerRef} className="w-full h-full animate-pulse bg-gray-200 rounded-lg" />;
  }

  return (
    <div ref={containerRef}>
      <LottiePlayer 
        animationData={animationData} 
        {...props} 
      />
    </div>
  );
};

export default LottieWrapper; 