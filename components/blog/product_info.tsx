// components/product_info.tsx
"use client";

import React from 'react';

interface ProductInfoProps {
  status?: string;
  salesCount?: number;
  rating?: number;
  reviewCount?: number;
}

const StarIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="14" 
    viewBox="0 0 16 14" 
    fill="none"
  >
    <path 
      d="M3.06 14L4.36 8.82368L0 5.34211L5.76 4.88158L8 0L10.24 4.88158L16 5.34211L11.64 8.82368L12.94 14L8 11.2553L3.06 14Z" 
      fill="#FCD704"
    />
  </svg>
);

const ProductInfo: React.FC<ProductInfoProps> = ({ 
  status = "Nuevo", 
  salesCount = 0, 
  rating = 5.0, 
  reviewCount = 0 
}) => {
  const fullStars = Math.floor(rating);

  return (
    <div className="w-full h-full justify-between items-start inline-flex">
      <div className="text-[#4B4B4B] text-xs font-normal leading-5">
        {status} | +{salesCount} vendidos
      </div>
      <div className="flex-col justify-start items-start gap-1 inline-flex">
        <div className="justify-start items-center gap-2 inline-flex">
          <div className="flex-col justify-center items-end inline-flex">
            <div className="text-right">
              <span className="text-[#4B4B4B] text-sm font-semibold">
                {rating.toFixed(1)}
              </span>
              <span className="text-[#4B4B4B] text-sm font-medium">
                {' '}
              </span>
              <span className="text-[#4B4B4B] text-sm font-medium leading-5">
                ({reviewCount})
              </span>
            </div>
          </div>
          <div className="justify-start items-center gap-0.5 flex">
            {[...Array(5)].map((_, i) => (
              i < fullStars ? (
                <StarIcon key={i} />
              ) : (
                <div 
                  key={i} 
                  className="w-4 h-[14px] bg-gray-300"
                />
              )
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
