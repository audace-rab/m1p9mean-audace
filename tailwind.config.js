const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    colors: {
      headerTransparent: '#F8FAFC',
      headermobile: '#374151',
      current: 'currentColor',
      black: colors.black,
      white: colors.white,
      gray: "#8080801c",
      emerald: colors.emerald,
      indigo: colors.indigo,
      yellow: colors.yellow,
      rougemate: '#ca0a19e3'
    },
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        wiggle: 'wiggle 1s ease-in-out infinite'
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        }
      },
      height: {
        '128': '32rem',
        '200' : '45rem'
      },
      padding:{
        '129': '45rem',
        '84' : '84px'
      }
    }
  },
  plugins: [require('flowbite/plugin')],
}
