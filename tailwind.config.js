// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require("tailwindcss/colors");

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class", '[data-mode="dark"]'],

  theme: {
    borderRadius: {
      DEFAULT: "0.5rem",
      sm: "0.25rem",
      full: "9999px",
    },
    extend: {
      maxWidth: {
        tooltip: "9rem",
      },
      spacing: {
        4.5: "1.125rem",
        5.5: "1.375rem",
        6.5: "1.625rem",
        13: "3.25rem",
        15: "3.75rem",
        17: "4.25rem",
        18: "4.5rem",
        22: "5.5rem",
        23: "5.75rem",
      },
      colors: {
        darkblue: {
          50: "oklch(96.93% 0.01 var(--dark-blue-hue) / <alpha-value>)",
          100: "oklch(84.36% 0.08 var(--dark-blue-hue) / <alpha-value>)",
          200: "oklch(71.79% 0.08 var(--dark-blue-hue) / <alpha-value>)",
          300: "oklch(59.09% 0.08 var(--dark-blue-hue) / <alpha-value>)",
          400: "oklch(46.4% 0.08 var(--dark-blue-hue) / <alpha-value>)",
          500: "oklch(33.79% 0.086 var(--dark-blue-hue) / <alpha-value>)",
          600: "oklch(31.3% 0.11 var(--dark-blue-hue) / <alpha-value>)",
          700: "oklch(27.69% 0.12 var(--dark-blue-hue) / <alpha-value>)",
          800: "oklch(24.31% 0.1 var(--dark-blue-hue) / <alpha-value>)",
          900: "oklch(21.02% 0.09 var(--dark-blue-hue) / <alpha-value>)",
          950: "oklch(17.1% 0.09 var(--dark-blue-hue) / <alpha-value>)",
        },
        bronze: {
          50: "oklch(96.97% 0.02 var(--bronze-hue) / <alpha-value>)",
          100: "oklch(89.43% 0.06 var(--bronze-hue) / <alpha-value>)",
          200: "oklch(81.76% 0.11 var(--bronze-hue) / <alpha-value>)",
          300: "oklch(74.27% 0.15 var(--bronze-hue) / <alpha-value>)",
          400: "oklch(66.7% 0.15 var(--bronze-hue) / <alpha-value>)",
          500: "oklch(59.01% 0.16 var(--bronze-hue) / <alpha-value>)",
          600: "oklch(51.5% 0.14 var(--bronze-hue) / <alpha-value>)",
          700: "oklch(41.28% .11 var(--bronze-hue) / <alpha-value>)",
          800: "oklch(30.56% 0.08 var(--bronze-hue) / <alpha-value>)",
          900: "oklch(20.94% 0.06 var(--bronze-hue) / <alpha-value>)",
          950: "oklch(17.2% 0.042 var(--bronze-hue) / <alpha-value>)",
        },
        gunmetal: {
          50: "oklch(96.93% 0.01 var(--gunmetal-hue) / <alpha-value>)",
          100: "oklch(84.4% 0.01 var(--gunmetal-hue) / <alpha-value>)",
          200: "oklch(72.08% 0.01 var(--gunmetal-hue) / <alpha-value>)",
          300: "oklch(59.53% 0.01 var(--gunmetal-hue) / <alpha-value>)",
          400: "oklch(47.09% 0.01 var(--gunmetal-hue) / <alpha-value>)",
          500: "oklch(34.68% 0.01 var(--gunmetal-hue) / <alpha-value>)",
          600: "oklch(31.98% 0.04 var(--gunmetal-hue) / <alpha-value>)",
          700: "oklch(28.41% 0.06 var(--gunmetal-hue) / <alpha-value>)",
          800: "oklch(24.53% 0.05 var(--gunmetal-hue) / <alpha-value>)",
          900: "oklch(21% 0.05 var(--gunmetal-hue) / <alpha-value>)",
          950: "oklch(18.8% 0.04 var(--gunmetal-hue) / <alpha-value>)",
        },
        detroitblue: {
          50: "oklch(97.1% 0.02 var(--detroit-blue-hue) / <alpha-value>)",
          100: "oklch(88.57% 0.06 var(--detroit-blue-hue) / <alpha-value>)",
          200: "oklch(80% 0.11 var(--detroit-blue-hue) / <alpha-value>)",
          300: "oklch(71.42% 0.13 var(--detroit-blue-hue) / <alpha-value>)",
          400: "oklch(62.9% 0.13 var(--detroit-blue-hue) / <alpha-value>)",
          500: "oklch(54.41% 0.13 var(--detroit-blue-hue) / <alpha-value>)",
          600: "oklch(47.68% 0.12 var(--detroit-blue-hue) / <alpha-value>)",
          700: "oklch(38.63% 0.09 var(--detroit-blue-hue) / <alpha-value>)",
          800: "oklch(29.37% 0.07 var(--detroit-blue-hue) / <alpha-value>)",
          900: "oklch(20.98% 0.05 var(--detroit-blue-hue) / <alpha-value>)",
          950: "oklch(17.8% 0.04 var(--detroit-blue-hue) / <alpha-value>)",
        },
        success: colors.emerald,
        error: colors.rose,
        warning: colors.amber,
      },
    },
  },
  plugins: [],
};
