"use client";

import React from "react";

interface PriceCardProps {
  price?: string;
  discount?: string;
}

const PriceCard: React.FC<PriceCardProps> = ({ price = "999", discount }) => {
  // Format numbers in Colombian peso style (dots as thousands separators)
  const formatCOP = (value: number) => {
    return `$${Math.round(value).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  };

  const formatPrice = (priceValue: string) => {
    const numericPrice = parseInt(priceValue.replace(/[^0-9]/g, ""));
    return formatCOP(numericPrice);
  };

  const calculateDiscountedPrice = (originalPrice: string, discountPercent: string) => {
    const numericPrice = parseInt(originalPrice.replace(/[^0-9]/g, ""));
    const discountValue = parseInt(discountPercent.replace(/[^0-9]/g, ""));
    const discountedPrice = numericPrice * (100 - discountValue) / 100;
    return formatCOP(discountedPrice);
  };

  const calculateInstallment = (originalPrice: string, discountPercent: string, months: number = 12) => {
    const numericPrice = parseInt(originalPrice.replace(/[^0-9]/g, ""));
    const discountValue = parseInt(discountPercent.replace(/[^0-9]/g, ""));
    const discountedPrice = numericPrice * (100 - discountValue) / 100;
    const installmentValue = discountedPrice / months;
    return formatCOP(installmentValue);
  };

  const hasDiscount = discount && discount !== "0" && discount !== "0%";

  return (
    <div className="flex flex-col items-start gap-1 text-left">
      {hasDiscount ? (
        <>
          {/* Original price - crossed out, thinner font */}
          <div 
            className="text-gray-600 line-through font-light"
            style={{ fontSize: '16px' }}
          >
            {formatPrice(price)}
          </div>
          
          {/* New discounted price and discount badge container */}
          <div className="flex items-center gap-3">
            {/* Calculated discounted price - main price with thinner font */}
            <div 
              className="text-black font-light"
              style={{ fontSize: '32px' }}
            >
              {calculateDiscountedPrice(price, discount)}
            </div>
            
            {/* Discount badge with thinner font */}
            <span 
              className="text-green-600 font-light"
              style={{ fontSize: '18px' }}
            >
              {discount.includes('%') ? discount : `${discount}%`} OFF
            </span>
          </div>
          
          {/* Installment row with same style as discount label */}
          <div
            className="text-green-600 font-light"
            style={{ fontSize: '18px' }}
          >
            12 cuotas de {calculateInstallment(price, discount)} con 0% interés
          </div>
        </>
      ) : (
        /* No discount - show original price as main with thinner font */
        <div 
          className="text-black font-light"
          style={{ fontSize: '32px' }}
        >
          {formatPrice(price)}
        </div>
      )}
    </div>
  );
};

export default PriceCard;
