"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";
import { notFound } from "next/navigation";
import { PortableText } from "@/lib/sanity/plugins/portabletext";
import { urlForImage } from "@/lib/sanity/image";
import { parseISO, format } from "date-fns";
import { BannerAd } from "@/components/blog/banner"; // Named import
import CategoryLabel from "@/components/blog/category";
import SellCard from "@/components/blog/sellCard";
import MobileButton from "@/components/blog/mobileButton";
import BannerRelatedRecipes from "@/components/bannerRelatedRecipes";
import ProductInfo from "@/components/blog/product_info";
import FavoriteButton from "@/components/blog/FavoriteButton";
import ShareButton from "@/components/blog/ShareButton";

export default function Post(props) {
  const { loading, post, relatedRecipes } = props;

  // Redirect to 404 if post or slug is missing
  if (!loading && (!post || !post.slug)) {
    notFound();
  }

  // State to track if verification query parameter is valid
  const [hasQueryParamVerified, setHasQueryParamVerified] = useState(false);

  // WhatsApp configuration
  const whatsappNumber = "593998525463"; // Replace with your actual WhatsApp number (with country code, no + sign)
  const whatsappMessage = `Hola! Estoy interesado en ${post?.title || 'este producto'}`;

  // No Scroll Effect - Efficient for both desktop and mobile
  useEffect(() => {
    // Save current scroll position
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;
    
    // Disable scrolling
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = `-${scrollX}px`;
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.body.style.overflow = 'hidden';
    
    // Prevent touch move on mobile
    const preventTouchMove = (e) => {
      e.preventDefault();
    };
    
    // Add touch event listeners for mobile
    document.addEventListener('touchmove', preventTouchMove, { passive: false });
    document.addEventListener('wheel', preventTouchMove, { passive: false });
    
    // Cleanup function
    return () => {
      // Restore body styles
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.width = '';
      document.body.style.height = '';
      document.body.style.overflow = '';
      
      // Remove event listeners
      document.removeEventListener('touchmove', preventTouchMove);
      document.removeEventListener('wheel', preventTouchMove);
      
      // Restore scroll position
      window.scrollTo(scrollX, scrollY);
    };
  }, []);

  // Check for verification query parameter on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const verification = params.get("verification");
      if (verification === "dreamcode") {
        setHasQueryParamVerified(true);
      }
    }
  }, []);

  // WhatsApp click handler
  useEffect(() => {
    const handleWhatsAppClick = (e) => {
      // Check if the clicked element or its parents should be excluded
      const excludedElements = [
        'button', 'a', 'input', 'textarea', 'select', 
        '[role="button"]', '[tabindex]', '.prose a'
      ];
      
      // Check if click target is an excluded element or child of excluded element
      const isExcluded = excludedElements.some(selector => {
        return e.target.closest(selector);
      });

      if (!isExcluded) {
        // Create WhatsApp URL
        const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Open WhatsApp
        if (typeof window !== "undefined") {
          window.open(whatsappUrl, '_blank');
        }
      }
    };

    // Add event listener to document
    document.addEventListener('click', handleWhatsAppClick);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('click', handleWhatsAppClick);
    };
  }, [whatsappNumber, whatsappMessage]);

  const imageProps = post?.mainImage ? urlForImage(post?.mainImage) : null;

  // Handle favorite toggle
  const handleFavoriteToggle = (isFavorited) => {
    console.log('Product favorited:', isFavorited);
    // You can add API call here to save favorite state
  };

  return (
    <>
      <Container className="relative">
        {/* Main container for mobile and desktop */}
        <div className="flex flex-col items-start gap-6 md:px-0 lg:w-[1199px] lg:flex-row lg:gap-[112px]">
          {/* First Column */}
          <div className="mx-auto w-full md:mx-0 md:w-auto lg:w-[616px]">
            {/* Mobile-specific width */}
            <div className="flex w-full flex-col items-center px-0 md:items-start md:px-0">

              {/* Product Info Component - Added above Category */}
              <div className="flex w-full mb-4">
                <ProductInfo 
                  status={post.productStatus || "Nuevo"}
                  salesCount={post.salesCount || 50}
                  rating={post.rating || 5.0}
                  reviewCount={post.reviewCount || 40}
                />
              </div>
              
              {/* Category */}
              <div className="flex w-full mb-4">
                <CategoryLabel categories={post.categories} />
              </div>

              {/* Title */}
              <h1 className="mt-2 font-nunito text-brand-primary w-full text-3xl font-bold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
                {post.title}
              </h1>

              {/* Product Image with Action Buttons */}
              <div className="relative mt-4 md:mt-11 w-full overflow-hidden lg:rounded-lg">
                {/* Action Buttons Container - Positioned at top right corner of row */}
                <div className="absolute top-0 right-0 flex items-center gap-2 z-10">
                  <FavoriteButton 
                    initialFavorited={false}
                    onToggle={handleFavoriteToggle}
                  />
                  <ShareButton 
                    title={post.title}
                    url={typeof window !== 'undefined' ? window.location.href : ''}
                  />
                </div>
                
                {imageProps && (
                  <Image
                    src={imageProps.src}
                    alt={post.mainImage?.alt || "Thumbnail"}
                    loading="eager"
                    width={400}
                    height={400}
                    className="w-[328px] h-[328px] sm:w-[400px] sm:h-[400px] object-cover rounded-lg mx-auto"
                  />
                )}
              </div>

              {/* SellCard for mobile*/}
              <div className="block sm:hidden mt-8">
                <SellCard ingredients={post.ingredients} />
              </div>

              {/* Recipe body */}
              <article className="prose mb-3 mt-6 w-full break-words dark:prose-invert prose-a:text-blue-600 md:mt-11">
                {post.body && <PortableText value={post.body} />}
              </article>
            </div>

            {/* Banner Ad (Respawns if verification is true) */}
            {hasQueryParamVerified && (
              <div className="relative -mr-[calc(90vw-100%)] md:-ml-[calc(48vw-100%)] md:-mr-[calc(72vw-100%)] bg-transparent md:bg-[#F6F6F6] md:p-0">
                <BannerAd ingredients={post.ingredients} />
              </div>
            )}

            {/* Related Recipes */}
            <div className="relative -mr-[calc(90vw-100%)] md:-ml-[calc(48vw-100%)] md:-mr-[calc(72vw-100%)] md:bg-[#F6F6F6] md:p-6 md:rounded-[16px]">
              <BannerRelatedRecipes relatedRecipes={relatedRecipes} />
            </div>

            {/* Mobile Version */}
            <Link
              href="/archive"
              className="absolute left-1/2 inline-flex w-[calc(100%-32px)] -translate-x-1/2 transform items-center justify-center gap-[4px] rounded-[8px] border border-[#1F1F1F] bg-white px-4 py-[14px] text-sm font-medium text-[#1F1F1F] hover:bg-[#1F1F1F] hover:text-white hover:border-[#1F1F1F] transition-colors duration-300 ease-in-out md:hidden"
            >
              <div
                style={{
                  fontSize: 16,
                  fontWeight: "600",
                  wordWrap: "break-word",
                }}
              >
                Ver todos los productos
              </div>
            </Link>
          </div>

          {/* Second Column */}
          <div className="mt-8 flex w-full flex-col gap-8 lg:mt-0 lg:w-[383px]">

            {/* SellCard for desktop*/}
            <div className="mt-2 hidden sm:block">
              <SellCard ingredients={post.ingredients} />
            </div>

            {/* Comprar ahora mobile buttom */}
            <MobileButton/>

            {/* Subscription Component (Desktop Only) */}
            <div className="hidden w-full flex-col gap-6 rounded-lg bg-gray-100 p-6 lg:flex">
              {/* Heading Section */}
              <div className="flex flex-col gap-4">
                <h3 className="text-black text-xl md:text-2xl font-nunito font-bold">Explora. Sorpréndete. Compra.</h3>
                <p className="text-base font-normal leading-6 text-black">
                  Suscríbete y recibe las mejores recomendaciones de productos para ti.
                </p>
              </div>

              {/* Input and Button Section */}
              <div className="flex w-full gap-2">
                {/* Email Input */}
                <input
                  type="email"
                  placeholder="Email"
                  className="h-[51px] w-3/5 rounded-xl border border-[#7d7d7d] bg-white px-4 text-base text-[#7d7d7d] focus:outline-none"
                />
                {/* Suscribirme Button */}
                <button
                  className="h-[51px] w-2/5 break-words rounded-md border border-[#1F1F1F] bg-[#F6F6F6] text-[16px] font-semibold text-[#1F1F1F] transition-colors duration-300 ease-in-out"
                >
                  Suscribirme
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Mobile-specific Subscription Component (Full Width) */}
      <div className="flex w-full flex-col items-start justify-center gap-6 bg-[#FFFCEC] px-4 py-6 lg:hidden">
        <div className="flex w-full flex-col items-start justify-center gap-4">
          <h3 className="text-black text-xl md:text-2xl font-nunito font-bold">Explora. Sorpréndete. Compra.</h3>
          <p className="break-words text-[16px] font-normal leading-[24px] text-black">
            Suscríbete y recibe las mejores recomendaciones de productos para ti.
          </p>
        </div>
        {/* The container for the input and button */}
        <div className="flex w-full flex-row items-center gap-2">
          <input
            type="email"
            placeholder="Email"
            className="h-[51px] w-3/5 rounded-xl border border-[#7d7d7d] bg-white px-4 text-base text-[#7d7d7d] focus:outline-none"
          />
          <button
            className="h-[51px] w-2/5 rounded-md border border-[#FCD704] bg-[#FCD704] text-base font-semibold text-[#1F1F1F] transition-colors duration-300 ease-in-out hover:border-[#FCD704] hover:text-white hover:opacity-90"
          >
            Suscribirme
          </button>
        </div>
      </div>
    </>
  );
}
