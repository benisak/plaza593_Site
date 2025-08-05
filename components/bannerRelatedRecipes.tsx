"use client"; // Add this line at the very top

import { useState, useEffect } from "react";
import RelatedPost from "@/components/relatedrecipeposts";
import Link from "next/link"; // Ensure you import Link

export default function BannerRelatedRecipes(props) {
  const { relatedRecipes } = props;

  // Declare hooks at the top so they run on every render
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 4; // Fixed to always show 4 on desktop

  useEffect(() => {
    // Function to update itemsPerPage based on window width if needed
    const updateItemsPerPage = () => {
      if (window.innerWidth < 768) {
        // You can add mobile-specific logic here if needed
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => {
      window.removeEventListener("resize", updateItemsPerPage);
    };
  }, []);

  // Conditional rendering based on the relatedRecipes length,
  // now placed after all hooks are called.
  if (!relatedRecipes || relatedRecipes.length <= 1) {
    return (
      <div className="relative flex w-full justify-center">
        {/* Desktop Version */}
        <Link
          href="/archive"
          className="hidden md:inline-flex items-center justify-center gap-[4px] rounded-[8px] border border-black bg-[#F6F6F6] px-[16px] py-[12px] text-sm font-medium text-black hover:bg-gray-50 md:mt-1"
        >
          Ver todos los productos
        </Link>
      </div>
    );
  }

  const handleNext = () => {
    if (currentIndex + itemsPerPage < relatedRecipes.length) {
      setCurrentIndex(currentIndex + itemsPerPage);
    } else {
      // Cycle back to the first set of recipes
      setCurrentIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setCurrentIndex(currentIndex - itemsPerPage);
    } else {
      // Cycle to the last set of recipes
      setCurrentIndex(Math.max(0, relatedRecipes.length - itemsPerPage));
    }
  };

  return (
    <div className="text-[#1F1F1F] text-xl font-bold">
      <p className="md:hidden mt-6">Productos relacionados</p>


{/* Desktop Layout - REVISED */}
<div className="hidden md:flex items-center justify-between mt-6">
  {/* Previous Button */}
  <button onClick={handlePrev} disabled={relatedRecipes.length <= itemsPerPage}>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32" fill="none">
      <path d="M20 24L12 16L20 8" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </button>

  {/* Main Content Area - This container now just provides the flex-grow space */}
  <div className="flex-grow mx-4">
    {/* This new container groups the title and grid, and is centered */}
    <div className="max-w-7xl mx-auto">
      {/* The title is now left-aligned (by default) within the centered container */}
      <p className="mb-6 text-xl font-bold text-[#1F1F1F]">Productos relacionados</p>

      {/* The grid is also inside the centered container */}
      <div className="grid grid-cols-4 gap-4">
        {relatedRecipes.slice(currentIndex, currentIndex + itemsPerPage).map((post) => (
          <RelatedPost
            pathPrefix="blog"
            key={post._id}
            post={post}
            aspect="square"
            minimal={false}
            preloadImage={true}
            fontSize="medium"
            fontWeight="normal"
          />
        ))}
      </div>
    </div>
  </div>

  {/* Next Button */}
  <button onClick={handleNext} disabled={relatedRecipes.length <= itemsPerPage}>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32" fill="none">
      <path d="M12 8L20 16L12 24" stroke="#1F1F1F" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </button>
</div>




      {/* Mobile Layout */}
      <div className="md:hidden mt-6 mb-6 mobile-layout">
        <div className="flex flex-col gap-[30px]">
          {relatedRecipes.slice(0, 10).map((post) => (
            <RelatedPost
              pathPrefix="blog"
              key={post._id}
              post={post}
              aspect="square"
              minimal={false}
              preloadImage={true}
              fontSize="medium"
              fontWeight="normal"
            />
          ))}
        </div>
      </div>


      {/* Ver todos los productos Button */}
      <div className="relative flex w-full justify-center mt-1">
        {/* Desktop  Version */}
        <Link
          href="/archive"
          className="hidden md:inline-flex items-center justify-center gap-[4px] rounded-[8px] border border-[#1F1F1F] bg-[#F6F6F6] px-[16px] py-[12px] text-sm font-medium text-[#1F1F1F] hover:bg-gray-50 md:mt-8"
        >
         Ver todos los productos
        </Link>
      </div>
    </div>
  );
}
