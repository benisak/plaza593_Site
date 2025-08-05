"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";
import { PortableText } from "@/lib/sanity/plugins/portabletext";
import { urlForImage } from "@/lib/sanity/image";
import SellCard from "@/components/blog/sellCard";
import { BannerAd } from "@/components/blog/banner";

// Utility function for robust string validation
const isValidString = (val) => typeof val === "string" && val.trim() !== "";

export default function Post({ post, loading }) {
  const [hasQueryParamVerified, setHasQueryParamVerified] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const verification = params.get("verification");
    if (verification === "dreamcode") {
      setHasQueryParamVerified(true);
    }
  }, []);

  if (!loading && (!post || !post.slug)) {
    notFound();
  }

  const imageProps = post?.mainImage ? urlForImage(post?.mainImage) : null;
  const hasPostImage = imageProps && isValidString(imageProps.src);

  return (
    <>
      <Container className="relative">
        {/* Main container for mobile and desktop */}
        <div className="flex flex-col items-start gap-6 md:px-0 lg:w-[1199px] lg:flex-row lg:gap-[112px]">
          {/* First Column */}
          <div className="mx-auto w-full md:mx-0 md:w-auto lg:w-[616px]">
            {/* Mobile-specific width */}
            <div className="flex w-full flex-col items-center px-0 md:items-start md:px-0">

              {/* Title */}
              <h1 className="font-nunito text-brand-primary w-full text-3xl font-bold tracking-tight dark:text-white lg:text-4xl lg:leading-snug">
                {post.title}
              </h1>

              {/* Recipe Image */}
              <div className="mt-6 md:mt-11 w-full overflow-hidden lg:rounded-lg">
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
                Ver tdos los productos
              </div>
            </Link>
          </div>

          {/* Second Column */}
          <div className="mt-8 flex w-full flex-col gap-8 lg:mt-0 lg:w-[383px]">
            {/* Ingredients List */}
            <SellCard ingredients={post.ingredients} />

            {/* Subscription Component (Desktop Only) */}
            <div className="hidden flex-col gap-6 rounded-lg bg-gray-100 p-6 lg:flex lg:max-w-[360px] lg:self-center w-full">
              {/* Heading Section */}
              <div className="flex flex-col gap-4">
                <h3 className="text-black text-xl md:text-2xl font-nunito font-bold">Easy recipes, delicious results.</h3>
                <p className="text-base font-normal leading-6 text-black">
                  Subscribe to receive weekly news and the latest recipes
                </p>
              </div>

              {/* Input and Button Section */}
              <div className="flex gap-2">
                {/* Email Input */}
                <input
                  type="email"
                  placeholder="Email"
                  className="h-[51px] w-[226px] rounded-xl border border-[#7d7d7d] bg-white px-4 text-base text-[#7d7d7d] focus:outline-none"
                />
                {/* Subscribe Button */}
                <button
                  className="bg-[#F6F6F6] border border-[#2d810d] hover:border-[#2d810d] text-[#2d810d] hover:bg-[#2d810d] hover:text-white transition-colors duration-300 ease-in-out h-[51px] w-[101px] break-words rounded-md text-[16px] font-semibold"
                >
                  Subscribe
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
          // Changed from flex-[219] to a proportional width (e.g., 60%)
          className="h-[51px] w-3/5 rounded-xl border border-[#7d7d7d] bg-white px-4 text-base text-[#7d7d7d] focus:outline-none"
        />
        <button
          // Changed from flex-[101px] to a wider proportional width (e.g., 40%)
          className="h-[51px] w-2/5 rounded-md border border-[#FCD704] bg-[#FCD704] text-base font-semibold text-[#1F1F1F] transition-colors duration-300 ease-in-out hover:border-[#FCD704] hover:text-white hover:opacity-90"
        >
          Suscribirme
        </button>
      </div>
    </div>
    </>
  );
}