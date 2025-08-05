"use client";

import Link from "next/link";
import {
  AllPostCategories,
  PostCategory
} from "@/shared/entities/PostCategory";

interface CategoryListProps {
  topAndOtherCategories: AllPostCategories;
  onLinkClick: () => void;
}

export default function CategoryList({
  topAndOtherCategories,
  onLinkClick
}: CategoryListProps) {
  const { topCategories, otherCategories } = topAndOtherCategories;
  const categories: PostCategory[] = [...topCategories, ...otherCategories];

  const mobileCategories = categories.slice(0, 8);

  return (
    <div className="w-full bg-[#F1F1F1] pb-6">
      <div className="grid grid-cols-3 gap-3">
        {mobileCategories.map((cat) => (
          <CategoryCard key={cat._id} category={cat} onClick={onLinkClick} />
        ))}
        
        <Link
  href="/archive"
  onClick={onLinkClick}
  className="relative bg-white shadow-sm rounded-xl p-2 transition hover:shadow-md"
  style={{ paddingBottom: '100%' }} // ⬅️ maintain 1:1 aspect ratio
>
  <div className="absolute inset-0 flex items-center justify-center">
    <span className="text-xs font-bold text-Black-500 text-center w-full font-nunito">
      Ver todos
    </span>
  </div>
</Link>

      </div>
    </div>
  );
}

function CategoryCard({
  category,
  onClick,
}: {
  category: PostCategory;
  onClick: () => void;
}) {
  const isHogar = category.title?.toLowerCase() === "hogar";

  return (
    <Link
      href={`/category/${category.slug || "#"}`}
      onClick={onClick}
      className={`flex flex-col bg-white shadow-sm rounded-xl p-2 transition hover:shadow-md ${
        isHogar ? "h-[136px]" : "aspect-square"
      }`}
    >
      <div className="flex-grow w-full flex items-center justify-center">
        {category.image?.asset?.url ? (
          <img
            src={category.image.asset.url}
            alt={category.image.alt || "Category image"}
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-gray-200 rounded-lg">
            <span className="text-sm text-gray-500">No Image</span>
          </div>
        )}
      </div>
      <h3 className="h-8 flex items-center justify-center text-xs font-bold text-Black-500 text-center w-full font-nunito">
        {category.title}
      </h3>
    </Link>
  );
}

