// components/ShareButton.tsx
"use client";

import React from 'react';

const ShareIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="16" 
    height="16" 
    viewBox="0 0 16 16" 
    fill="none"
    className="w-4 h-4 flex-shrink-0"
    style={{ aspectRatio: '1/1' }}
  >
    <path 
      d="M13.332 12.668C13.332 11.9316 12.7351 11.3346 11.9987 11.3346C11.5351 11.3346 11.1269 11.5713 10.888 11.9303C10.8781 11.9527 10.8674 11.9751 10.8548 11.9967C10.8421 12.0186 10.8279 12.0394 10.8132 12.0592C10.7192 12.2418 10.6654 12.4485 10.6654 12.668C10.6654 13.4043 11.2623 14.0013 11.9987 14.0013C12.7351 14.0013 13.332 13.4043 13.332 12.668ZM5.33203 8.0013C5.33203 7.26492 4.73508 6.66797 3.9987 6.66797C3.26232 6.66797 2.66536 7.26492 2.66536 8.0013C2.66536 8.73768 3.26232 9.33464 3.9987 9.33464C4.73508 9.33464 5.33203 8.73768 5.33203 8.0013ZM13.332 3.33464C13.332 2.59826 12.7351 2.0013 11.9987 2.0013C11.2623 2.0013 10.6654 2.59826 10.6654 3.33464C10.6654 4.07102 11.2623 4.66797 11.9987 4.66797C12.7351 4.66797 13.332 4.07102 13.332 3.33464ZM14.6654 3.33464C14.6654 4.80739 13.4715 6.0013 11.9987 6.0013C11.2577 6.0013 10.5874 5.69888 10.1042 5.21094L6.56445 7.27604C6.62953 7.50672 6.66536 7.7498 6.66536 8.0013C6.66536 8.2523 6.62993 8.49499 6.5651 8.72526L10.1068 10.7891C10.5898 10.3027 11.259 10.0013 11.9987 10.0013C13.4715 10.0013 14.6654 11.1952 14.6654 12.668C14.6654 14.1407 13.4715 15.3346 11.9987 15.3346C10.5259 15.3346 9.33203 14.1407 9.33203 12.668C9.33203 12.4156 9.36743 12.1715 9.43294 11.9401L5.89258 9.87695C5.4093 10.3649 4.73972 10.668 3.9987 10.668C2.52594 10.668 1.33203 9.47406 1.33203 8.0013C1.33203 6.52854 2.52594 5.33464 3.9987 5.33464C4.73938 5.33464 5.40935 5.63679 5.89258 6.12435L9.43229 4.05924C9.36736 3.82879 9.33203 3.58585 9.33203 3.33464C9.33203 1.86188 10.5259 0.667969 11.9987 0.667969C13.4715 0.667969 14.6654 1.86188 14.6654 3.33464Z" 
      fill="#4B4B4B"
    />
  </svg>
);

interface ShareButtonProps {
  title?: string;
  url?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ title, url }) => {
  const handleShare = async () => {
    const shareData = {
      title: title || document.title,
      url: url || window.location.href,
    };

    try {
      // Check if Web Share API is supported (mainly mobile)
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy URL to clipboard
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copied to clipboard!');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      // Fallback if sharing fails
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert('Link copied to clipboard!');
      } catch (clipboardError) {
        console.error('Clipboard error:', clipboardError);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="flex w-8 h-8 p-[2px_1px] flex-col justify-center items-center gap-[10px] flex-shrink-0 aspect-square rounded-[40px] bg-[#F6F6F6] hover:opacity-80 transition-opacity duration-200"
      aria-label="Share this product"
    >
      <ShareIcon />
    </button>
  );
};

export default ShareButton;
