'use client';

import Lottie from 'lottie-react';

const ClientLottie = ({ animationData, ...props }) => {
  return (
    <Lottie 
      animationData={animationData}
      {...props}
    />
  );
};

export default ClientLottie; 