/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
      // padding: {
      //   DEFAULT: '1rem',
      //   sm: '2rem',
      //   lg: '4rem',
      //   xl: '5rem',
      //   '2xl': '6rem',
      // },
    extend: {
      screens:{
        sm:"576px",
        md:"768px",
        lg:"992px",
        xl:"1200px",
        "2xl":"1400px"
      },
    },
  },
  plugins: [],
}

// Extra small
// <576px	Small
// ≥576px	Medium
// ≥768px	Large
// ≥992px	X-Large
// ≥1200px	XX-Large
// ≥1400px
// .container	100%	540px	720px	960px	1140px	1320px
// .container-sm	100%	540px	720px	960px	1140px	1320px
// .container-md	100%	100%	720px	960px	1140px	1320px
// .container-lg	100%	100%	100%	960px	1140px	1320px
// .container-xl	100%	100%	100%	100%	1140px	1320px
// .container-xxl	100%	100%	100%	100%	100%	1320px
// .container-fluid	100%	100%	100%	100%	100%	100%