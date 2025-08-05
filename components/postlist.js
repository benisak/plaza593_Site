import Image from "next/image";
import Link from "next/link";
import { cx } from "@/utils/all";
import { urlForImage } from "@/lib/sanity/image";
import { PhotoIcon } from "@heroicons/react/24/outline";
import CategoryLabel from "@/components/blog/category";

export default function PostList({
  post,
  aspect,
  minimal,
  pathPrefix,
  preloadImage,
  fontSize,
  fontWeight,
}) {
  const imageProps = post?.mainImage ? urlForImage(post.mainImage) : null;

  return (
    <div
      className={cx(
        "group cursor-pointer w-full max-w-[600px]",
        "flex md:flex-col flex-row items-start gap-4"
      )}
    >
      {/* Image Section */}
      <div
        className={cx(
          "inline-flex justify-center items-center gap-2.5 rounded-lg bg-white",
          "overflow-hidden",
          "transition-all hover:scale-105",
          // CHANGED: The mobile size is now 88x88px. The `md:` prefix ensures the desktop size remains unchanged.
          "md:w-[276px] md:h-[276px] w-[88px] h-[88px]"
        )}
      >
        <Link
          href={`/${pathPrefix}/post/${post.slug?.current}`}
          // CHANGED: Padding is now 8px to make the inner image container 72x72px (88px - 8px*2).
          className="block w-full h-full p-[8px] box-border"
        >
          {imageProps ? (
            <div className="relative w-full h-full">
              <Image
                src={imageProps.src}
                {...(post.mainImage.blurDataURL && {
                  placeholder: "blur",
                  blurDataURL: post.mainImage.blurDataURL,
                })}
                alt={post.mainImage?.alt || "Thumbnail"}
                loading="lazy"
                fill
                // NOTE: The 'sizes' prop is still correct. It tells the browser the image will render at 72px on small screens.
                sizes="(max-width: 768px) 72px, 276px"
                className="object-cover rounded-lg"
              />
            </div>
          ) : (
            <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 text-gray-200">
              <PhotoIcon />
            </span>
          )}
        </Link>
      </div>

      {/* Text Section */}
      <div
        className={cx(
          "flex flex-col justify-between flex-1 h-full md:h-[160px]",
          "self-start md:self-auto",
          "-mt-[8px] md:mt-0" // <-- This aligns the text column with the image top on mobile only
        )}
      >
        {/* Top (Category) */}
        <div className="min-h-[24px]">
          <CategoryLabel
            categories={post.categories}
            nomargin={minimal}
            className="flex flex-wrap gap-2"
          />
        </div>

        {/* Middle (Title) */}
       <div className="mt-4 md:mt-2 flex-1">
        <h2
          className={cx(
            "text-[14px] md:text-[18px]",
            "font-medium",
            "text-[#1F1F1F]",
            "leading-tight"
          )}
        >
          <Link href={`/${pathPrefix}/post/${post.slug?.current}`}>
            {post.title}
          </Link>
        </h2>
      </div>

        {/* Bottom (Price) */}
        <div className="mt-2">
          <span
            className="text-[#1F1F1F] font-bold text-[20px] leading-[30px] break-words"
            style={{
              color: "var(--Black-500, #1F1F1F)",
              fontSize: "20px",
              fontWeight: 700,
              lineHeight: "30px",
              wordWrap: "break-word",
            }}
          >
            $499.900
          </span>
        </div>
      </div>
    </div>
  );
}
