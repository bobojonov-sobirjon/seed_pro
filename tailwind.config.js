
import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'main-green': '#D0FF49',
        'main-green-hover': '#BAE042',
        'custom-gray': '#474747',
        'custom-light': '#FAFAFA',
        'custom-orange': '#FF820F',
        'input_color': "#1f2124",
        'text-main_green': '#B7ED1D'
      },
      fontFamily: {
        gilroy: ["GilroyRegular"],
        gilroy_medium: ["GilroyMedium"],
        gilroy_semibold: ["GilroySemiBold"],
        gilroy_bold: ["GilroyBold"],
        gunterz: ["Gunterz"],
        montserrat: ["Montserrat", "sans-serif"],
      },
      boxShadow: {
        'shadow-bottom': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
      }
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xxl: "1300px",
      xxxl: "1500px",
    },
  },
  plugins: [],
});