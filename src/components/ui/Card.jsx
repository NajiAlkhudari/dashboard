'use client';
import React from 'react';

const Card = ({ children, className, title, subTitle }) => {
  return (
    <div className={`bg-white dark:bg-darkContent rounded-xl shadow-lg  ${className}`}>
      {title && (
        <h1 className="text-xl font-semibold text-center text-gray-800 dark:text-gray-50 mb-2">
          {title}
        </h1>
      )}

      {subTitle && (
        <h3 className="text-md font-medium text-center text-gray-600 dark:text-white mb-4">
          {subTitle}
        </h3>
      )}

      <div className="content space-y-2">{children}</div>
    </div>
  );
};

export default Card;
