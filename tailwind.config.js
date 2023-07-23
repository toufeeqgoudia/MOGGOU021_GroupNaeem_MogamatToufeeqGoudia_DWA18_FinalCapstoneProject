/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        '88': '22rem',
        '365': '365px',
      },
      height: {
        '144': '32rem',
        '33' : '30%',
      },
      boxShadow: {
        'tn' : '0 2px 5px #696969',
        'bn' : '0 0 10px #696969',
      },
    },
  },
  plugins: [],
}

