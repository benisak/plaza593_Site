"use client";

import React from "react";

interface MobileButtonProps {
  isOverlayVisible: boolean;
  productTitle?: string; 
}

const MobileButton: React.FC<MobileButtonProps> = ({ isOverlayVisible, productTitle }) => {
  const whatsappNumber = "593998525463";
  const message = `Hola! Estoy interesado en ${productTitle || "este producto"}`;
  const whatsappMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleClick = () => {
    console.log("[WhatsApp Redirect] Message to send:", message);
    console.log("[WhatsApp Redirect] URL:", whatsappUrl);
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 sm:hidden ${
        isOverlayVisible ? "pointer-events-none opacity-50" : ""
      }`}
    >
      <div className="w-full bg-white px-4 pt-5 pb-6 shadow-[0_-2px_10px_rgba(0,0,0,0.08)] flex flex-col gap-2">
        {/* Comprar ahora */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick} // 🧠 Add log
          className="flex h-[51px] w-full items-center justify-center gap-2.5 rounded-lg bg-[#FCD704] transition-colors"
        >
          {/* [SVG remains unchanged] */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
            className="shrink-0"
          >
            {/* ...paths... */}
          </svg>
          <span className="text-base font-semibold text-black">
            Comprar ahora
          </span>
        </a>

        {/* Agregar al carrito */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleClick} // 🧠 Add log
          className="h-[51px] w-full rounded-lg bg-[#D3D3D3] text-black text-base font-semibold transition-colors hover:opacity-90 flex items-center justify-center"
        >
          Agregar al carrito
        </a>
      </div>
    </div>
  );
};

export default MobileButton;
