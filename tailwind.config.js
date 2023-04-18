/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require("tailwindcss/plugin");
export default {
  darkMode: ['class'],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    // add custom variant for expanding sidebar
    plugin(({
      addVariant,
      e
    }) => {
      addVariant("sidebar-expanded", ({
        modifySelectors,
        separator
      }) => {
        modifySelectors(
          ({
            className
          }) =>
          `.sidebar-expanded .${e(
                        `sidebar-expanded${separator}${className}`
                    )}`
        );
      });
    }),
  ],
}