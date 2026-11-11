import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        vellaro: {
          olive: "#5D5839",
          oliveHover: "#4B472D",
          oliveDark: "#3A3622",
          cream: "#F8F3ED",
          creamLight: "#FAF6F0",
          creamMuted: "#ECE5DC",
          sand: "#E5DDD3",
          charcoal: "#1F1E19",
          dark: "#141310",
          muted: "#767262",
          border: "#E2DBD1",
          gold: "#C4B487",
        },
        editorial: {
          cream: "#F8F3ED",
          sand: "#ECE5DC",
          charcoal: "#1F1E19",
          obsidian: "#141310",
          gold: "#5D5839",
          bronze: "#767262",
          accent: "#5D5839",
          emerald: "#059669",
        }
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "Cambria", "'Times New Roman'", "serif"],
        display: ["'Playfair Display'", "Georgia", "serif"],
        sans: ["'Plus Jakarta Sans'", "var(--font-geist-sans)", "Helvetica", "Arial", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(31, 30, 25, 0.04)",
        "glass-elevated": "0 20px 40px -15px rgba(31, 30, 25, 0.08)",
        "glass-dark": "0 8px 32px 0 rgba(0, 0, 0, 0.4)",
      }
    },
  },
  plugins: [],
};

export default config;
