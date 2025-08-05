import "@/styles/tailwind.css";
import { Providers } from "./providers";
import { cx } from "@/utils/all";
import { Inter, Lora, Nunito } from "next/font/google";
import {
  getAllRecipeSlugs,
  getCategorizedPostCategories,
  getSettings,
} from "@/lib/sanity/client";
import Footer from "@/components/footer";
import GetNavbar from "@/components/getnavbar";
import { urlForImage } from "@/lib/sanity/image";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const lora = Lora({
  subsets: ["latin"],
  variable: "--font-lora",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
});

async function sharedMetaData(params: any) {
  const settings = await getSettings();

  return {
    // enable this for resolving opengraph images
    // metadataBase: new URL(settings.url),
    title: {
      default:
        settings?.title ||
        "Plaza 593 | Tu Tienda Online para Comprar de Todo",
      template: "%s | Plaza 593 | Tu Tienda Online para Comprar de Todo"
    },
    description:
      settings?.description ||
      "En Plaza 593, tu e-commerce de confianza, tenemos todo lo que necesitas. Explora miles de productos, encuentra las mejores ofertas y compra online de forma fácil, rápida y segura.",
    keywords: ["recipes", "cooking", "easy recipes", "dinner ideas", "healthy recipes", "meal planning", "desserts", "baking", "quick meals", "homemade", "cooking tips", "food blog", "kitchen hacks", "family meals", "comfort food"],
    authors: [{ name: "DreamCode" }],
    canonical: settings?.url,
    openGraph: {
      images: [
        {
          url:
            urlForImage(settings?.openGraphImage)?.src ||  
            "/img/opengraphDT.png",
          width: 800,
          height: 600
        }
      ]
    },
    twitter: {
      title: settings?.title || "Plaza 593 | Tu Tienda Online para Comprar de Todo",
      card: "summary_large_image"
    },
    robots: {
      index: true,
      follow: true
    }
  };
}


const siteUrl = "https://Plaza 593-lovat.vercel.app/"; 

export async function generateMetadata({ params }: { params: any }) {
  const settings = await getSettings();

  const siteTitle = "Plaza 593 | Tu Tienda Online para Comprar de Todo";
  const siteDescription =
    "En Plaza 593, tu e-commerce de confianza, tenemos todo lo que necesitas. Explora miles de productos, encuentra las mejores ofertas y compra online de forma fácil, rápida y segura.";
    
  const keywords = [
    "recipes",
    "cooking",
    "easy recipes",
    "dinner ideas",
    "healthy recipes",
    "meal planning",
    "desserts",
    "baking",
    "quick meals",
    "homemade",
    "cooking tips",
    "food blog",
    "kitchen hacks",
    "family meals",
    "comfort food"
  ];

  const ogImage = `${siteUrl}/img/opengraphDT.png`;
  const twitterHandle = "@quickestkitchen";

  return {
    title: {
      default: siteTitle,
      template: `%s | ${siteTitle}`
    },
    description: siteDescription,
    keywords: keywords,
    openGraph: {
      title: siteTitle,
      description: siteDescription,
      url: siteUrl, // Ensure this is correct
      images: [
        {
          url: ogImage, // Corrected to avoid duplication
          width: 1200, // Recommended Open Graph size
          height: 630,
          alt: "De Todo Open Graph Image"
        }
      ],
      siteName: "Plaza 593",
      type: "website"
    },
    twitter: {
      title: siteTitle,
      description: siteDescription,
      card: "summary_large_image",
      site: twitterHandle,
      images: [ogImage]
    },
    icons: {
      icon: "/img/FaviconDT.svg",
      apple: "/img/FaviconDT.svg",
    }
  };
}

export default async function Layout({
  children,
  params
}: {
  children: React.ReactNode;
  params: any;
}) {
  const settings = await getSettings();

  const categoriesForNavbar = await getCategorizedPostCategories(2);
  const categoriesForNavbar1 = await getCategorizedPostCategories(2);
  const categoriesForNavbarMobileList =
    await getCategorizedPostCategories(7);

  const slugs = await getAllRecipeSlugs();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cx(inter.variable, lora.variable, nunito.variable)}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-PXGJ36HN');`
          }}
        />
        {/* End Google Tag Manager */}
        {/* Custom favicon links */}
        <link rel="icon" type="image/png" sizes="32x32" href="/img/FaviconDT.svg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/img/FaviconDT.svg" />
      </head>

      <body className="text-gray-800 antialiased dark:bg-black dark:text-gray-400">
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe 
            src="https://www.googletagmanager.com/ns.html?id=GTM-PXGJ36HN"
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}
        <Providers>
          <GetNavbar
            topAndOtherCategories={categoriesForNavbar}
            Categoriesmobile3={categoriesForNavbar1}
            CategoriesmobileList={categoriesForNavbarMobileList}
          />
          <div>{children}</div>
          <Footer {...settings} />
        </Providers>
      </body>
    </html>
  );
}
