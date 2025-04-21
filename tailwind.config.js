/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Your React app files
    './src/**/*.{js,jsx,ts,tsx}',

    // Storybook stories & config
    './.storybook/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF',    // Example primary color
        success: '#10B981',    // Example success color
        error: '#EF4444',      // Example error color
        neutral: {
          light: '#F9FAFB',
          dark: '#1F2937',
        },
      },
      keyframes: {
        progress: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '0 0' },
        },
      },
      animation: {
        progress: 'progress 1s linear infinite',
      },
    },
  },
  plugins: [],
};
