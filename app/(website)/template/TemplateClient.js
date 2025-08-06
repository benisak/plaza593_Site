// template/TemplateClient.js
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function TemplateClient({ onReady }) {
  const searchParams = useSearchParams();

  useEffect(() => {
    const price = searchParams.get("price");
    const discount = searchParams.get("discount");
    const multiplier = searchParams.get("multiplier"); // ADD THIS LINE
    const image = searchParams.get("image");
    const title = searchParams.get("title");
    const description = searchParams.get("description");
    const categoriesParam = searchParams.get("categories");
    
    const categories = categoriesParam ? categoriesParam.split(",").map(cat => ({
      title: cat.trim(),
      slug: { current: cat.trim().toLowerCase() }
    })) : [];

    const verification = searchParams.get("verification");
    const hasQueryParamVerified = verification === "dreamcode";

    // Default description if none provided
    const defaultDescription = "El iPhone 16 redefine la experiencia móvil con su potente chip A18 Bionic y cámaras avanzadas. Diseñado para usuarios que buscan rendimiento excepcional y calidad premium.";

    // ADD THIS MULTIPLIER LOGIC
    const parseColombianPrice = (priceStr) => {
      if (!priceStr) return 999;
      // Remove all dots from Colombian format (e.g., "4.649.000" -> "4649000")
      return parseInt(priceStr.replace(/\./g, ""));
    };

    const basePrice = parseColombianPrice(price);
    const priceMultiplier = parseFloat(multiplier || "1.25");
    const finalPrice = Math.round(basePrice * priceMultiplier);

    const hardcodedData = {
      title: title || "iPhone 16",
      price: finalPrice.toString(), // CHANGE THIS LINE - use multiplied price
      discount: discount || "10",
      image: image || "https://via.placeholder.com/400x400",
      description: description || defaultDescription,
      categories: categories.length > 0 ? categories : [
        { title: "Electronics", slug: { current: "electronics" } },
        { title: "Smartphones", slug: { current: "smartphones" } }
      ],
      body: [
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: description || defaultDescription
            }
          ]
        },
        {
          _type: "block",
          children: [
            {
              _type: "span",
              text: "Características principales:"
            }
          ]
        },
        {
          _type: "block",
          listItem: "bullet",
          children: [
            {
              _type: "span",
              text: "Pantalla Super Retina XDR de 6.1 pulgadas"
            }
          ]
        },
        {
          _type: "block",
          listItem: "bullet",
          children: [
            {
              _type: "span",
              text: "Chip A18 Bionic con GPU de 5 núcleos"
            }
          ]
        },
        {
          _type: "block",
          listItem: "bullet",
          children: [
            {
              _type: "span",
              text: "Sistema de cámaras Pro con zoom óptico 3x"
            }
          ]
        },
        {
          _type: "block",
          listItem: "bullet",
          children: [
            {
              _type: "span",
              text: "Batería de larga duración con carga rápida"
            }
          ]
        },
        {
          _type: "block",
          listItem: "bullet",
          children: [
            {
              _type: "span",
              text: "Resistente al agua IP68"
            }
          ]
        }
      ],
      ingredients: [
        {
          _key: "1",
          ingredient: "128GB de almacenamiento interno",
          quantity: "1"
        },
        {
          _key: "2",
          ingredient: "Cable USB-C a Lightning",
          quantity: "1"
        },
        {
          _key: "3",
          ingredient: "Documentación y pegatinas Apple",
          quantity: "1"
        }
      ],
      mainImage: {
        alt: title || "iPhone 16"
      }
    };

    if (onReady) onReady(hardcodedData, hasQueryParamVerified);
  }, [searchParams, onReady]);

  return null;
}
