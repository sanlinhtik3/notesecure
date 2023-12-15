import type { Config } from 'tailwindcss'
import { nextui } from "@nextui-org/react";


const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  darkMode: "class",
  plugins: [nextui({
    themes: {
      light: {
        colors: {
          primary: {
            //... 50 to 900
            foreground: "#FFFFFF",
            DEFAULT: "#0ea5e9",
          },
        }
      },
      dark: {
        colors: {
          primary: "#0ea5e9",
        }
      },
    },
  })]
}
export default config
