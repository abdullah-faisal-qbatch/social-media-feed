/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    extend: {
      colors: {
        brightRed: "hsl(12, 88%, 59%)",
        brightRedLight: "hsl(12, 88%, 69%)",
        brightRedSupLight: "hsl(12, 88%, 95%)",
        darkBlue: "hsl(228, 39%, 23%)",
        darkGrayishBlue: "hsl(227, 12%, 61%)",
        veryDarkBlue: "hsl(233, 12%, 13%)",
        veryPaleRed: "hsl(13, 100%, 96%)",
        veryLightGray: "hsl(0, 0%, 98%)",
        grayColour: "hsl(214, 24%, 89%)",
        mintGreen: "hsl(240, 11%, 93%)",
        blueProfessional: "hsl(230, 74%, 62%)",
        indigoProfessional: "hsl(247, 41%, 49%)",
        purpleProfessional: "hsl(261, 51%, 51%)",
        pinkProfessional: "hsl(332, 79%, 58%)",
        redProfessional: "hsl(0, 86%, 69%)",
        orangeProfessional: "hsl(13, 85%, 63%)",
        yellowProfessional: "hsl(38, 85%, 62%)",
        greenProfessional: "hsl(158, 58%, 48%)",
        tealProfessional: "hsl(0, 0%, 2%)",
        cyanProfessional: "hsl(208, 85%, 63%)",
      },
      gridTemplateRows: {
        // Simple 8 row grid
        8: "repeat(8, minmax(0, 1fr))",
        // Complex site-specific row configuration
        layout: "200px minmax(900px, 1fr) 100px",
      },
    },
  },
  plugins: [],
};
