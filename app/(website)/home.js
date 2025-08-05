import Link from "next/link";
import PostList from "@/components/postlist";
import Featured from "@/components/featured";
import HeroSection from "@/components/HeroSection";
import Subscription from "@/components/Subscription";
import CategoryList from "@/components/categorylist";
import {
  getCategorizedPostCategories,
  getCategorizedPostCategoriesLabels,
  getFeaturedRecipes,
  getNonFeaturedRecipes,
} from "@/lib/sanity/client";

export default async function HomeLifeStyle({}) {
  const featuredPost = await getFeaturedRecipes(24); // Get enough posts to cover both sections
  const posts = await getNonFeaturedRecipes(12);
  const categoriesForList = await getCategorizedPostCategories(7);

  return (
    <>
      {/* Hero Section */}
      <div className="w-full">
        <HeroSection />
      </div>

      {/* Category List Section for Mobile */}
      <div className="block md:hidden w-full md:pt-8">
        <CategoryList topAndOtherCategories={categoriesForList} />
      </div>

      {/* Main Content Section */}
      <div className="bg-[#F1F1F1] flex w-full flex-col gap-[1px] lg:gap-[55px] px-4">
        {/* Category List Section for Desktop */}
        <div className="hidden md:block md:pt-8">
          <CategoryList topAndOtherCategories={categoriesForList} />
        </div>

        {/* Favorite Products Section */}
        <div className="pb-6">
          {featuredPost.length >= 8 && (
            <>
              {/* Desktop version - grid with 4 cols + aligned title */}
              <div className="md:mb-8 hidden md:flex md:flex-col md:items-center md:w-full">
                <div className="grid grid-cols-4 gap-6 w-full max-w-6xl mx-auto">
                  <div className="col-span-4">
                    <h2 className="text-[#1F1F1F] text-3xl font-medium font-nunito">
                      <strong>Productos recomendados</strong>
                    </h2>
                  </div>
                  {featuredPost.slice(0, 8).map((post) => (
                    <PostList
                      key={post._id}
                      post={post}
                      aspect="landscape"
                      pathPrefix="blog"
                      fontWeight="normal"
                      preloadImage={true}
                      className="w-full"
                    />
                  ))}
                </div>
              </div>

              {/* Mobile version */}
              <div className="md:hidden w-full mt-6">
                <h2 className="text-[#1F1F1F] text-2xl font-bold font-nunito">
                  <strong>Productos recomendados</strong>
                </h2>
                <div className="mt-6 grid grid-cols-1 gap-6">
                  {featuredPost.slice(0, 8).map((post) => (
                    <PostList
                      key={post._id}
                      post={post}
                      aspect="landscape"
                      pathPrefix="blog"
                      fontWeight="normal"
                      preloadImage={true}
                      className="w-full"
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Full-width Subscription Section */}
      <div className="w-full bg-gray-100">
        <Subscription />
      </div>

      {/* Other Products Section */}
      <div className="bg-[#F1F1F1] flex w-full flex-col gap-[1px] lg:gap-[55px] px-4">
        {/* Other Products Content */}
        <div className="pb-0 pt-6">
          {featuredPost.length > 8 && (
            <div className="mb-2 mt-0 w-full">
              {/* Desktop - 16 posts */}
              <div className="md:mt-8 hidden md:flex md:items-center md:justify-center">
                <div className="grid grid-cols-4 gap-6 w-full max-w-6xl mx-auto">
                  {featuredPost.slice(8, 24).map((post) => (
                    <PostList
                      key={post._id}
                      post={post}
                      aspect="landscape"
                      pathPrefix="blog"
                      fontWeight="normal"
                      preloadImage={true}
                      className="w-full"
                    />
                  ))}
                </div>
              </div>

              {/* Mobile - 8 posts */}
              <div className="md:hidden grid grid-cols-1 gap-4">
                {featuredPost.slice(8, 16).map((post) => (
                  <PostList
                    key={post._id}
                    post={post}
                    aspect="landscape"
                    pathPrefix="blog"
                    fontWeight="normal"
                    preloadImage={true}
                    className="w-full"
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Archive Link */}
        <div className="archive-link flex w-full justify-center px-0 sm:px-[30px] sm:py-[50px] md:py-0 pb-[56px] md:pb-[32px] pt-[24px]">
          <Link
            href="/archive"
            className="bg-[#F1F1F1] border border-[#1F1F1F] hover:border-[#1F1F1F] text-[#1F1F1F] hover:bg-[#1F1F1F] hover:text-white transition-colors duration-300 ease-in-out relative inline-flex w-full max-w-[100%] items-center justify-center gap-1 rounded-md px-4 py-3 text-center text-sm font-medium focus:z-20 disabled:pointer-events-none disabled:opacity-40 md:w-auto"
            style={{
              borderRadius: "8px",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
            }}
          >
            <span>Ver todos los productos</span>
          </Link>
        </div>
      </div>
    </>
  );
}
