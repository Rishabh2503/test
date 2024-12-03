// components/ui/card.js

import React from 'react';

export const Card = ({ children, className = '', ...props }) => {
  return (
    <div
      className={`bg-white shadow-lg rounded-lg overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
