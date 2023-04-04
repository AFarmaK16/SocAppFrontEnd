module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#243E8B",
        secondary: {
          100: "#79f16e",
          200: "#4ec418",
        },
      },
      textColor: {
        primary: "#e0e7ff",
        secondary: {
          100: "#79f16e",
          200: "#4ec418",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
