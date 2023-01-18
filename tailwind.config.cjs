// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // <-- Add this line
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['class', '.theme-dark'],
  theme: {
    colors: {
      brand: '#4e4afc',
      'brand-hover': '#5195FC',
      'brand-muted': '#21385b',
      'dark-main': '#06070b',
      'dark-bright': '#f6f6f9',
      'light-muted': '#121212',
      'dark-muted': '#828296',
      'dark-floating': '#06070b',
      'dark-border': '#44444D',
      'light-bright': '#090909',
      'dark-card': '#10131E',
      'light-main': '#e6e6e2',
      'light-card': '#fff',
      'light-border': '#dddddd',
      green: '#55ff63',
      'green-muted': '#53A55A',
      link: '#00aff4',
      danger: '#d83c3e',
      transparent: 'transparent',
    },
    screens: {
      small: '701px',
    },
    extend: {
      fontFamily: {
        barlow: ['Barlow', 'sans-serif'],
        rubik: ['Rubik', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        jetbrains: ['JetBrains Mono', 'monospace'],
      },

      keyframes: {
        fadein: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        fadeinbackdrop: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '0.8',
          },
        },
        fadeincmd: {
          '0%': {
            filter: 'blur(5px)',
            opacity: '0',
          },
          '100%': {
            filter: 'none',
            opacity: '1',
          },
        },
        fadeinup: {
          '0%': {
            transform: 'translateY(-20px)',
            filter: 'blur(5px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            filter: 'none',
            opacity: '1',
          },
        },
        fadeindown: {
          '0%': {
            transform: 'translateY(-20px)',
            filter: 'blur(25px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            filter: 'none',
            opacity: '1',
          },
        },
        authbg: {
          '0%': {
            filter: 'blur(30px)',
            opacity: '0',
          },
          '100%': {
            filter: 'none',
            opacity: '1',
          },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
      },

      animation: {
        fadein: 'fadein 200ms ease forwards',
        fadeinbackdrop: 'fadeinbackdrop 200ms ease forwards',
        fadeincmd: 'fadeincmd 200ms ease',
        fadeinup: 'fadeinup 600ms ease forwards',
        fadeindown: 'fadeindown 800ms ease forwards',
        composerfadein: 'fadeinup 200ms ease forwards',
        authbg: 'authbg 1300ms ease forwards',
        wiggle: 'wiggle 10s ease-in-out infinite',
      },
    },
  },
  plugins: [
    plugin(function ({ addVariant, e, postcss }) {
      addVariant('firefox', ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: '-moz-document',
          params: 'url-prefix()',
        })
        isFirefoxRule.append(container.nodes)
        container.append(isFirefoxRule)
        isFirefoxRule.walkRules(rule => {
          rule.selector = `.${e(
            `firefox${separator}${rule.selector.slice(1)}`
          )}`
        })
      })
    }),
  ],
}
