// tailwind.config.js
const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        gray: colors.neutral
      },
      fontFamily: {
        sans: ["var(--font-inter)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--font-lora)", ...defaultTheme.fontFamily.serif],
        stock: [defaultTheme.fontFamily.sans],
        nunito: ["var(--font-nunito)", ...defaultTheme.fontFamily.sans]
      },
      aspectRatio: {
        "4/3": "4 / 3",
        "3/2": "3 / 2",
        "2/3": "2 / 3",
        "9/16": "9 / 16"
      },
      screens: {
        // default Tailwind screens:
        // sm: '640px', md: '768px', lg: '1024px', xl: '1280px', 2xl: '1536px'
        
        // Custom breakpoint for 15-inch laptop screens (e.g., 1440p)
        'desktop-15': '1440px', 
        
        // Your existing custom breakpoint for ~20" displays
        "3xl": "1920px",

        // Custom breakpoint for large 32-inch monitors (e.g., QHD/2K)
        'desktop-32': '2560px',
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
    require("@tailwindcss/typography")
  ]
};
