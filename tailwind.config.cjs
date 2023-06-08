// tailwind.config.js

const { ComponentsContentPath } = require("@yext/search-ui-react");

module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{ts,tsx}",
    "./lib/**/*.{js,jsx}",
    ComponentsContentPath,
  ],
  theme: {
    extend: {
      colors: {
        "bg-light": "#F2F7FA",
        "bg-dark": "#1C1C1E",
        "fg-light-1": "#FFFFFF",
        "fg-dark-1": "#2c2c2e",
        "fg-light-2": "#2d2d2D",
        "fg-dark-2": "#48484A",
        "cta-1-light": "#B87253",
        "cta-1-dark": "#D96740",
        "cta-2-light": "#2d2d2d",
        "cta-2-dark": "#F4F4F4",
        "text-light-primary": "#FFFFFF",
        "text-dark-primary": "#000000",
        "text-light-secondary": "#FFFFFF",
        "text-dark-secondary": "#000000",
        primary: "#004e82",
        secondary: "#d6763c",
        heading: "#1d1d1d",
        text: "#555555",
        blue_cnt: "#024E82",
        "primary-dark": "#14517b",
        "primary-light": "#85a1b3",
        "secondary-dark": "#e1702b",
        "secondary-light": "#dda888",
      },
      borderRadius: {
        cta: "var(--cta-border-radius, 1rem)",
      },
      keyframes: {
        rotate: {
          "100%": { transform: "rotate(360deg)" },
        },
        dash: {
          "0%": { transform: "rotate(0deg)", "stroke-dashoffset": 204 },
          "50%": { transform: "rotate(45deg)", "stroke-dashoffset": 52 },
          "100%": { transform: "rotate(360deg)", "stroke-dashoffset": 204 },
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
