/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        gold: {
          50: '#FBF8F1',
          100: '#F7F1E3',
          200: '#F0E3C7',
          300: '#E8D5AB',
          400: '#D9BB7E',
          500: '#CBA251',
          600: '#B6883B',
          700: '#94702F',
          800: '#735823',
          900: '#5C461D',
        },
        charcoal: {
          50: '#F6F6F6',
          100: '#E7E7E7',
          200: '#D1D1D1',
          300: '#B0B0B0',
          400: '#888888',
          500: '#6D6D6D',
          600: '#5D5D5D',
          700: '#4F4F4F',
          800: '#3D3D3D',
          900: '#1A1A1A',
        },
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'medium': '0 4px 25px rgba(0, 0, 0, 0.1)',
        'strong': '0 10px 35px rgba(0, 0, 0, 0.15)',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      transitionDuration: {
        '2000': '2000ms',
      },
      transitionTimingFunction: {
        'elegant': 'cubic-bezier(0.42, 0.0, 0.58, 1.0)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out forwards',
        'slide-up': 'slideUp 0.8s ease-in-out forwards',
      },
      aspectRatio: {
        'portrait': '2/3',
        'art': '3/4',
      },
    },
  },
  plugins: [],
};