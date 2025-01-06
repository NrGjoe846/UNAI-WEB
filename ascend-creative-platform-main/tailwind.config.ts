import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#0A051A",
        foreground: "#ffffff",
        primary: {
          DEFAULT: "#9b87f5",
          hover: "#a594ff",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#D946EF",
          hover: "#E065F5",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#F97316",
          hover: "#EA580C",
          foreground: "#FFFFFF",
        },
        card: {
          DEFAULT: "#1A1F2C",
          foreground: "#FFFFFF",
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': "linear-gradient(to bottom, rgba(10, 5, 26, 0.9), rgba(10, 5, 26, 0.95)), url('/lovable-uploads/cd0d4cfc-ff7d-464f-a6cd-353ecc59f1b4.png')",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(155, 135, 245, 0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(155, 135, 245, 0.6)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-up": "fade-up 0.5s ease-out forwards",
        "glow": "glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;