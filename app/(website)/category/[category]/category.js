import { PortableText } from "@/lib/sanity/plugins/portabletext";
import { urlForImage } from "@/lib/sanity/image";
import PostList from "@/components/postlist";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function Author(props) {
  const { loading, recipes, title } = props;

  if (!loading && !recipes.length) {
    notFound();
  }

  return (
     <div className="bg-[#F1F1F1] pt-14 pb-10 px-4 md:px-[160px] lg:gap-[55px]">
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-nunito text-center text-Black-500 text-2xl md:text-4xl font-black">
          {title}
        </h1>
        <p className="mt-1 text-gray-600">{recipes.length} Productos</p>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:gap-10 xl:grid-cols-4">
        {recipes.map((post) => (
          <PostList
            pathPrefix={"blog"}
            key={post._id}
            post={post}
            aspect="square"
          />
        ))}
      </div>
    </div>
  );
}
