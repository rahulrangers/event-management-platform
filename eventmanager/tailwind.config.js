/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        md2: "804px",
        md3: "1200px",
        sm2:"500px"
      },
      fontWeight: {
        400: 400,
        100: 100,
      },
      boxShadow: {
        custom:
          "0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        mentor:
          "0px 5px 6px -3px rgba(0,0,0,0.2), 0px 9px 12px 1px rgba(0,0,0,0.14), 0px 3px 16px 2px rgba(0,0,0,0.12)",
      },
    },
    fontFamily: {
      sans2: ["Josefin Sans", "sans-serif"],
    },
    fontStyle: {
      italic: "italic",
      fontstylish: "Verdana, Geneva, Tahoma, sans-serif",
    },
  },
  plugins: [],
};