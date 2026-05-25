import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        background:
          "var(--background)",

        surface:
          "var(--surface)",

        "surface-secondary":
          "var(--surface-secondary)",

        foreground:
          "var(--foreground)",

        muted:
          "var(--muted-foreground)",

        border:
          "var(--border)",

        primary:
          "var(--primary)",

        accent:
          "var(--accent)",

        "accent-secondary":
          "var(--accent-secondary)",

        success:
          "var(--success)",

        warning:
          "var(--warning)",

        error:
          "var(--error)",
      },

      borderRadius: {
        sm: "var(--radius-sm)",

        md: "var(--radius-md)",

        lg: "var(--radius-lg)",

        xl: "var(--radius-xl)",
      },

      boxShadow: {
        soft:
          "var(--shadow-soft)",
      },

      fontFamily: {
        sans: [
          "var(--font-inter)",
        ],

        display: [
          "var(--font-bricolage)",
        ],
      },
    },
  },

  plugins: [],
};

export default config;