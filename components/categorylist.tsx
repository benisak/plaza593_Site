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

  // Slice the array to get a maximum of 8 categories for display.
  // This will be used for both mobile and desktop grids.
  const displayCategories = categories.slice(0, 8);

  return (
    <div className="w-full bg-[#FCD704] px-4 pb-6 md:bg-[#F1F1F1] md:px-0 md:pb-12">
      <h2 className="sr-only">Categories</h2>

      {/* Mobile grid: unchanged */}
      <div className="grid grid-cols-3 gap-2 md:hidden">
        {displayCategories.map((cat) => (
          <CategoryCard key={cat._id} category={cat} onClick={onLinkClick} />
        ))}
        <Link
          href="/archive"
          onClick={onLinkClick}
          className="flex flex-col items-center justify-center bg-white rounded-xl h-[122px] p-2 transition hover:shadow-md"
        >
          <span className="text-xs font-bold text-Black-500 text-center w-full font-nunito mt-2">
            Ver todos
          </span>
        </Link>
      </div>

      {/* Desktop grid: updated to use the sliced array */}
      <div className="hidden md:flex md:flex-col md:items-center md:w-full md:bg-[#F1F1F1]">
        <div className="grid grid-cols-4 gap-6 w-full max-w-6xl mx-auto">
          {/* Mapped over the sliced `displayCategories` to enforce the 8-item limit */}
          {displayCategories.map((cat) => (
            <CategoryCard key={cat._id} category={cat} onClick={onLinkClick} desktop />
          ))}
        </div>
        <div className="flex justify-center mt-6">
          <Link href="/archive" onClick={onLinkClick}>
            <span className="text-Black-500 text-base font-semibold underline cursor-pointer">
              Ver todos los productos
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({
  category,
  onClick,
  desktop = false,
}: {
  category: PostCategory;
  onClick: () => void;
  desktop?: boolean;
}) {
  return (
    <Link
      href={`/category/${category.slug || "#"}`}
      onClick={onClick}
      className={
        desktop
          ? "flex flex-row items-center bg-white rounded-xl h-[120px] p-4 shadow-sm transition hover:shadow-md"
          : "flex flex-col items-center bg-white rounded-xl h-[122px] p-0"
      }
      style={desktop ? { minWidth: "0" } : {}}
    >
      <div className={desktop ? "" : "pt-[13px] w-full flex flex-col items-center"}>
        <div
          className={
            desktop
              ? "flex-shrink-0 h-[80px] w-[80px] rounded-lg bg-white flex items-center justify-center"
              : "h-[72px] w-[72px] rounded-lg bg-white flex items-center justify-center"
          }
        >
          {category.image?.asset?.url ? (
            <img
              src={category.image.asset.url}
              alt={category.image.alt || "Category image"}
              className="h-full w-full object-cover rounded-lg"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-white rounded-lg">
              <span className="text-sm text-gray-500">No Image</span>
            </div>
          )}
        </div>
      </div>
      <h3
        className={
          desktop
            ? "ml-4 text-base font-bold text-Black-500 whitespace-nowrap overflow-hidden text-ellipsis font-nunito"
            : "mt-[6px] mb-[13px] text-xs font-bold text-Black-500 text-center w-full font-nunito"
        }
      >
        {category.title}
      </h3>
    </Link>
  );
}
