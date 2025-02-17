// /** @type {import('tailwindcss').Config} */

// import daisyui from 'daisyui';

// /** @type {import daisyui from "daisyui"} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     daisyui
//   ],
// }

/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  darkMode: "class", // Ensures Tailwind's dark mode works
  plugins: [daisyui],
  daisyui: {
    themes: false, // ✅ This disables all default themes
  },
};
