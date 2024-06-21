/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite-react/**/*.js',
    flowbite.content()
  ],
  theme: {
    extend: {
      colors: {
        bg1: "var(--color-bg1)",
        bg2: "var(--color-bg2)",
        header: "var(--color-header)",
        text: "var(--color-text)",
        hover: "var(--color-hover)",
        btn: "var(--color-btn)",
      }
    },
  },
  plugins: [
    flowbite.plugin(),
    require('flowbite/plugin')
  ]
}

