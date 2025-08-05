import { Suspense } from "react";
import Search from "./search";
import Input from "./input";
import Loading from "@/components/loading";
import CategoryList from "@/components/categorylistsearch";
import Subscription from "@/components/Subscription";
import { getCategorizedPostCategories } from "@/lib/sanity/client";

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q;
  const categoriesForList = await getCategorizedPostCategories(7); // Fetching categories  D1D1D1

  return (
    // Replaced the fragment with a <main> tag for semantic HTML.
    // Applied the background color using a Tailwind arbitrary value class.
    <main className="bg-[#F1F1F1]">
      <div className="px-4 md:px-[160px]"> {/* Applied padding here */}
        <div className="pt-8 md:pt-14 flex items-center justify-center">
          <h1 className="font-nunito text-center text-Black-500 text-2xl md:text-4xl font-black">
            {query ? `Buscar resultados para "${query}"` : "Buscar"}
          </h1>
        </div>

        <Input query={query} />

        <div className="w-full"> {/* Wrapping section */}
          <Suspense key={searchParams.search} fallback={<Loading />}>
            <Search searchParams={searchParams} />
          </Suspense>

          {/* Centered Text Above Category List */}
          <div 
            style={{
              color: "#1F1F1F",
              fontSize: 30,
              fontWeight: "700",
              wordWrap: "break-word",
              textAlign: "center",
              marginTop: 48,
              fontFamily: "Nunito, sans-serif"
            }}
          >
            O explora por categoría
          </div>

          {/* Category List Section */}
          <div className="w-full pt-6">
            <CategoryList topAndOtherCategories={categoriesForList} />
          </div>
        </div>
      </div>

      {/* Full-width Subscription Section (moved outside the padded container) */}
      <div className="w-full mt-12 bg-gray-100">
        <Subscription />
      </div>
    </main>
  );
}
