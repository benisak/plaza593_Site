//sell card component for desktop and mobile versions
"use client";

import React from "react";
import { FaStar } from "react-icons/fa";

const SellCard: React.FC = () => {
  const renderStars = () => {
    return Array.from({ length: 5 }).map((_, i) => (
      <FaStar key={i} className="text-[#FFB700] w-4 h-4" />
    ));
  };

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden sm:inline-flex w-96 p-4 rounded-lg outline outline-1 outline-offset-[-1px] outline-[#B6B6B6] flex-col justify-center items-center gap-4 bg-white">
        <div className="self-stretch flex flex-col justify-start items-start gap-6">
          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            <div className="p-2 bg-[#C6DFF5] rounded-lg inline-flex justify-center items-center gap-2.5">
              <div className="text-black text-sm font-medium ">+50 vendidos</div>
            </div>

            <div className="flex flex-col justify-start items-start gap-1">
              <div className="text-gray-600 text-xs font-normal ">Calificación</div>
              <div className="inline-flex justify-start items-center gap-2">
                <div className="flex justify-start items-center gap-1">
                  {renderStars()}
                </div>
                <div className="w-11 inline-flex flex-col justify-start items-start">
                  <div className="text-gray-600 text-base font-semibold ">5.0</div>
                </div>
              </div>
            </div>

            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="text-black text-4xl font-bold font-nunito">$5,000,000</div>
              <div className="text-black text-base font-semibold ">
                o en 3 cuotas de $1,799,000 0% interés
              </div>
            </div>
          </div>

          <div className="self-stretch pr-3.5 py-2 rounded-lg flex flex-col justify-start items-start gap-2">
            <div className="text-black text-lg font-medium  leading-relaxed">
              Recíbelo en: 5 días hábiles
            </div>
            <div className="text-black text-base font-normal  leading-normal">
              Garantía de producto: 12 meses
            </div>
            <div className="text-black text-base font-normal  leading-normal">
              Últimas: 10 unidades
            </div>
          </div>
        </div>

        {/* Comprar ahora */}
        <div className="self-stretch inline-flex justify-start items-center gap-6 mt-2">
          <a
            href="https://wa.me/573001234567"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 p-4 bg-yellow-400 rounded-lg flex justify-center items-center gap-2.5 hover:bg-yellow-300 transition"
          >
            <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="19"
            viewBox="0 0 20 19"
            fill="none"
            className="shrink-0"
          >
            <path
              d="M2.5 17L3.57709 13.0019C2.70844 11.4445 2.43247 9.62706 2.7998 7.88318C3.16713 6.1393 4.15313 4.58593 5.57687 3.50811C7.0006 2.4303 8.76657 1.90034 10.5507 2.01548C12.3349 2.13063 14.0175 2.88315 15.2899 4.13496C16.5623 5.38677 17.339 7.0539 17.4776 8.83044C17.6162 10.607 17.1074 12.3737 16.0445 13.8065C14.9815 15.2393 13.4358 16.242 11.691 16.6307C9.94617 17.0193 8.11922 16.7678 6.54543 15.9223L2.5 17ZM6.74049 14.4262L6.99068 14.5741C8.13061 15.2475 9.46204 15.5262 10.7775 15.3667C12.0929 15.2072 13.3184 14.6185 14.2631 13.6923C15.2078 12.7662 15.8185 11.5546 16.0002 10.2463C16.1818 8.9381 15.9241 7.60673 15.2673 6.4597C14.6105 5.31267 13.5914 4.41441 12.3688 3.9049C11.1463 3.39539 9.78895 3.30325 8.50837 3.64283C7.2278 3.98242 6.0959 4.73466 5.28907 5.78233C4.48225 6.83 4.04581 8.11425 4.04778 9.43494C4.04671 10.53 4.35058 11.6039 4.92556 12.537L5.08246 12.7948L4.48031 15.0263L6.74049 14.4262Z"
              fill="black"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.673 9.97346C12.5302 9.86704 12.363 9.79214 12.1841 9.75446C12.0053 9.71678 11.8195 9.71731 11.6409 9.75602C11.3725 9.85902 11.1991 10.2481 11.0258 10.4427C10.9892 10.4893 10.9355 10.522 10.8747 10.5347C10.8139 10.5473 10.7501 10.539 10.6955 10.5113C9.71308 10.1558 8.88962 9.50377 8.35885 8.66118C8.31358 8.6086 8.29215 8.54184 8.29908 8.47496C8.30601 8.40807 8.34076 8.34628 8.39601 8.30259C8.58939 8.12569 8.73138 7.90658 8.80884 7.66553C8.82604 7.39964 8.76012 7.1348 8.61894 6.90257C8.50979 6.577 8.30207 6.28711 8.02033 6.06714C7.87501 6.00674 7.71389 5.98649 7.55639 6.00883C7.3989 6.03117 7.25176 6.09514 7.13273 6.19302C6.9261 6.35776 6.76208 6.56323 6.65277 6.7943C6.54346 7.02538 6.49163 7.27616 6.5011 7.5282C6.50174 7.66973 6.52115 7.81065 6.5589 7.94782C6.65476 8.27738 6.80218 8.59224 6.9965 8.88244C7.1367 9.10474 7.28966 9.31994 7.45475 9.52714C7.99124 10.2077 8.66563 10.7855 9.44047 11.2285C9.8293 11.4537 10.2449 11.6367 10.679 11.774C11.1299 11.9629 11.6278 12.0354 12.1198 11.9839C12.4001 11.9446 12.6656 11.8424 12.8931 11.6861C13.1206 11.5297 13.303 11.3241 13.4243 11.0874C13.4956 10.9443 13.5172 10.7844 13.4862 10.6296C13.4119 10.313 12.9537 10.1261 12.673 9.97346Z"
              fill="black"
            />
          </svg>
            <span className="text-black text-base font-semibold ">Comprar ahora</span>
          </a>
        </div>

        {/* Note */}
        <div className="self-stretch p-4 bg-[#FFFCEC] rounded-lg inline-flex justify-center items-start gap-4 mt-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none" className="shrink-0">
            <path d="M10.5013 13.3327V9.99935M10.5013 6.66602H10.5096M18.8346 9.99935C18.8346 14.6017 15.1037 18.3327 10.5013 18.3327C5.89893 18.3327 2.16797 14.6017 2.16797 9.99935C2.16797 5.39698 5.89893 1.66602 10.5013 1.66602C15.1037 1.66602 18.8346 5.39698 18.8346 9.99935Z" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div className="flex-1 text-black text-sm font-medium  leading-tight">
            Para realizar tu compra de manera segura da clic en comprar ahora y todo el proceso de compra lo harás con nuestro asesor por WhatsApp.
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="inline-flex sm:hidden w-full p-4 rounded-lg outline outline-1 outline-offset-[-1px] outline-[#B6B6B6] flex-col justify-center items-center gap-4 bg-white">
        <div className="self-stretch flex flex-col justify-start items-start gap-6">
          <div className="self-stretch flex flex-col justify-start items-start gap-4">
            <div className="p-2 bg-[#C6DFF5] rounded-lg inline-flex justify-center items-center gap-2.5">
              <div className="text-black text-sm font-medium ">+50 vendidos</div>
            </div>

            <div className="flex flex-col justify-start items-start gap-1">
              <div className="text-gray-600 text-xs font-normal ">Calificación</div>
              <div className="inline-flex justify-start items-center gap-2">
                <div className="flex justify-start items-center gap-1">
                  {renderStars()}
                </div>
                <div className="w-11 inline-flex flex-col justify-start items-start">
                  <div className="text-gray-600 text-base font-semibold ">5.0</div>
                </div>
              </div>
            </div>

            <div className="self-stretch flex flex-col justify-start items-start gap-2">
              <div className="text-black text-4xl font-bold font-nunito">$5,000,000</div>
              <div className="text-black text-base font-semibold ">
                o en 3 cuotas de $1,799,000 0% interés
              </div>
            </div>
          </div>

          <div className="self-stretch pr-3.5 py-2 rounded-lg flex flex-col justify-start items-start gap-2">
            <div className="text-black text-lg font-medium  leading-relaxed">
              Recíbelo en: 5 días hábiles
            </div>
            <div className="text-black text-base font-normal  leading-normal">
              Garantía de producto: 12 meses
            </div>
            <div className="text-black text-base font-normal  leading-normal">
              Últimas: 10 unidades
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="self-stretch p-4 bg-[#FFFCEC] rounded-lg inline-flex justify-center items-start gap-4 mt-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none" className="shrink-0">
            <path d="M10.5013 13.3327V9.99935M10.5013 6.66602H10.5096M18.8346 9.99935C18.8346 14.6017 15.1037 18.3327 10.5013 18.3327C5.89893 18.3327 2.16797 14.6017 2.16797 9.99935C2.16797 5.39698 5.89893 1.66602 10.5013 1.66602C15.1037 1.66602 18.8346 5.39698 18.8346 9.99935Z" stroke="#1E1E1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>

          <div className="flex-1 text-black text-sm font-medium  leading-tight">
            Para realizar tu compra de manera segura da clic en comprar ahora y todo el proceso de compra lo harás con nuestro asesor por WhatsApp.
          </div>
        </div>
      </div>
    </>
  );
};

export default SellCard;
