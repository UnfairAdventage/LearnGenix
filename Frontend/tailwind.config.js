/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Dark theme color palette
        'base-light': '#10141C',
        'surface': '#181E29',
        'primary': {
          DEFAULT: '#4F46E5',
          50: '#EBEAFE',
          100: '#D6D3FD',
          200: '#ADA7FB',
          300: '#847BF9',
          400: '#5B4FF7',
          500: '#4F46E5',
          600: '#3F38B8',
          700: '#2F2A8A',
          800: '#1F1C5C',
          900: '#0F0E2E',
        },
        'primary-neon': '#7B61FF',
        'secondary': '#22D3EE',
        'green-neon': '#5AF7B3',
        'pink-neon': '#F472B6',
        'text-primary': '#F1F5F9',
        'text-secondary': '#A1A1AA',
        'border': '#232C3B',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 20px rgba(123, 97, 255, 0.3)',
        'neon-sm': '0 0 10px rgba(123, 97, 255, 0.2)',
        'cyan-neon': '0 0 20px rgba(34, 211, 238, 0.3)',
        'green-neon': '0 0 20px rgba(90, 247, 179, 0.3)',
      },
    },
  },
  plugins: [],
};