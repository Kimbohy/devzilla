import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1D4ED8", // Blue
          light: "#3B82F6",
          dark: "#1E40AF",
        },
        secondary: {
          DEFAULT: "#FBBF24", // Yellow
          light: "#FCD34D",
          dark: "#B45309",
        },
        accent: {
          DEFAULT: "#F43F5E", // Pink
          light: "#F472B6",
          dark: "#9B1238",
        },
        neutral: {
          DEFAULT: "#6B7280", // Gray
          light: "#D1D5DB",
          dark: "#374151",
        },
        success: {
          DEFAULT: "#34D399", // Green
          light: "#6EE7B7",
          dark: "#065F46",
        },
        warning: {
          DEFAULT: "#FBBF24", // Yellow
          light: "#FDE68A",
          dark: "#B45309",
        },
        danger: {
          DEFAULT: "#EF4444", // Red
          light: "#FCA5A5",
          dark: "#991B1B",
        },
        info: {
          DEFAULT: "#3B82F6", // Blue
          light: "#93C5FD",
          dark: "#1E40AF",
        },
        white: "#FFFFFF",
        black: "#000000",
      },
    },
  },
  plugins: [],
};
export default config;
