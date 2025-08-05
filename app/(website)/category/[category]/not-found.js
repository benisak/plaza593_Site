import Container from "@/components/container";
import CategoryList from "@/components/categorylistsearch";
import Subscription from "@/components/Subscription";
import { getCategorizedPostCategories } from "@/lib/sanity/client";

export default async function NotFoundPage() {
  const data = await getCategorizedPostCategories(7);
  const categoriesForList = {
    topCategories: data?.topCategories || [],
    otherCategories: data?.otherCategories || [],
  };

  return (
    <div className="bg-[#F1F1F1] min-h-screen">
      <section style={{ padding: "2rem", textAlign: "center" }}>
        <h1 className="text-brand-primary text-3xl font-semibold tracking-tight dark:text-white lg:text-5xl lg:leading-tight mb-4">
          Productos
        </h1>
        <p>0 Productos</p>
      </section>

      <div
        className="w-full max-w-[calc(100vw-32px)] sm:max-w-md md:max-w-[1185px] mx-auto py-6 bg-[#F6F6F6] rounded-lg md:mt-6 mt-4 flex justify-center items-center text-center text-[#4B4B4B] text-lg font-bold break-words"
      >
        Sin resultados para esta categoría. Inténtalo otra vez
      </div>

      <Container large>
        <div className="w-full pt-8">

          {/* Centered Text Above Category List */}
          <div 
            style={{
              color: "#1F1F1F",
              fontSize: 30,
              fontWeight: "700",
              wordWrap: "break-word",
              textAlign: "center",
              marginBottom: 20,
              marginTop: 20,
              fontFamily: "Nunito, sans-serif"
            }}
          >
            O explora por categoría
          </div>
          
          <CategoryList topAndOtherCategories={categoriesForList} />
        </div>
      </Container>

      <div className="w-full md:mt-12 mt-4 bg-gray-100">
        <Subscription />
      </div>
    </div>
  );
}
