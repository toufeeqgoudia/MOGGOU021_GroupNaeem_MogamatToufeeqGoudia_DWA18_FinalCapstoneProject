/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '88': '22rem'
      },
      height: {
        '144': '32rem'
      },
      boxShadow: {
        'tn' : '0 2px 5px #696969',
        'bn' : '0 0 10px #696969',
      },
    },
  },
  plugins: [],
}

