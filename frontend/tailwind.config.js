/** @type {import('tailwindcss').Config} */
module.exports = {
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
        editorial: {
          cream: "#FAF8F5",
          sand: "#F4F0E8",
          charcoal: "#0F172A",
          obsidian: "#0B0F17",
          gold: "#D4AF37",
          bronze: "#8C6D3F",
          accent: "#2563EB",
          emerald: "#059669",
        }
      },
      fontFamily: {
        serif: ["Georgia", "Cambria", "'Times New Roman'", "serif"],
        display: ["Georgia", "serif"],
        sans: ["var(--font-geist-sans)", "system-ui", "-apple-system", "sans-serif"],
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(15, 23, 42, 0.05)",
        "glass-elevated": "0 20px 40px -15px rgba(15, 23, 42, 0.08)",
        "glass-dark": "0 8px 32px 0 rgba(0, 0, 0, 0.3)",
      }
    },
  },
  plugins: [],
};
