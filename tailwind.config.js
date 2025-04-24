// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     // Your React app files
//     './src/**/*.{js,jsx,ts,tsx}',

//     // Storybook stories & config
//     './.storybook/**/*.{js,jsx,ts,tsx}',
//   ],
//   theme: {
//     extend: {
//       colors: {
//         primary: '#1E40AF',    // Example primary color
//         success: '#10B981',    // Example success color
//         error: '#EF4444',      // Example error color
//         neutral: {
//           light: '#F9FAFB',
//           dark: '#1F2937',
//         },
//       },
//       keyframes: {
//         progress: {
//           '0%': { backgroundPosition: '200% 0' },
//           '100%': { backgroundPosition: '0 0' },
//         },
//       },
//       animation: {
//         progress: 'progress 1s linear infinite',
//       },
//     },
//   },
//   plugins: [],
// };

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // Enable dark mode with class switching
  theme: {
    extend: {
      keyframes: {
        'pulse-bg': {
          '0%, 100%': { backgroundColor: 'transparent' },
          '50%': { backgroundColor: 'rgba(0,0,0,0.05)' },
        },
      },
      colors: {
        // Primary colors
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Base primary
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        
        // Secondary colors
        secondary: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6', // Base secondary
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
        
        // Tertiary colors
        tertiary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981', // Base tertiary
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
        },
        
        // Neutral colors
        neutral: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
        },
        
        // Semantic colors
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
        },
        
        info: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
      },
      
      // Surface colors for light/dark themes
      surface: {
        light: {
          primary: '#ffffff',
          secondary: '#f5f5f5',
          tertiary: '#e5e5e5',
        },
        dark: {
          primary: '#171717',
          secondary: '#262626',
          tertiary: '#404040',
        },
      },
      
      // Text colors for light/dark themes
      text: {
        light: {
          primary: '#171717',
          secondary: '#525252',
          disabled: '#a3a3a3',
        },
        dark: {
          primary: '#fafafa',
          secondary: '#d4d4d4',
          disabled: '#737373',
        },
      },
      
      // Border colors
      border: {
        light: '#e5e5e5',
        dark: '#404040',
      },
      animation: {
        'pulse-bg': 'pulse-bg 1.5s ease-in-out infinite',
      },
      // Transition properties
      transitionProperty: {
        'colors': 'color, background-color, border-color, fill, stroke',
        'opacity': 'opacity',
        'transform': 'transform',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
      },
      transitionTimingFunction: {
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
      },
    },
  },
  plugins: [
    //require('@tailwindcss/forms'),
    //require('@tailwindcss/typography'),
  ],
}