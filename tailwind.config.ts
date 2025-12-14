import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // Mobile-first: default is mobile, scale up
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px', // Future desktop
    },
    extend: {
      colors: {
        // shadcn/ui CSS variables
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Brand colors - main blue (#093D7F)
        brand: {
          50: '#E6EEF7',
          100: '#C2D4EB',
          200: '#9AB8DD',
          300: '#6E99CC',
          400: '#0B4EA2',
          500: '#093D7F',
          600: '#073366',
          700: '#05284F',
          800: '#041E3B',
          900: '#021426',
          950: '#010A14',
          DEFAULT: '#093D7F',
        },
        // Secondary red (#D6192F)
        'brand-secondary': {
          50: '#FEF2F3',
          100: '#FDE6E8',
          200: '#FBD0D5',
          300: '#F7A8B2',
          400: '#EE1C25',
          500: '#D6192F',
          600: '#B51526',
          700: '#94111F',
          800: '#7A0F1A',
          900: '#66101A',
          950: '#3A050A',
          DEFAULT: '#D6192F',
        },
        // Ternary gray (#E6E6E6) - backgrounds & elements
        'brand-ternary': {
          50: '#FFFFFF',
          100: '#FAFAFA',
          200: '#F5F5F5',
          300: '#F0F0F0',
          400: '#EBEBEB',
          500: '#E6E6E6',
          600: '#CCCCCC',
          700: '#B3B3B3',
          800: '#999999',
          900: '#737373',
          950: '#525252',
          DEFAULT: '#E6E6E6',
        },
        // Custom Splachovačka colors
        toilet: {
          bowl: '#F5F5F5',
          water: '#87CEEB',
          flush: '#4A90D9',
          seat: '#E8E8E8',
        },
        poop: {
          DEFAULT: '#8B4513',
          light: '#A0522D',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        heading: ['var(--font-fredoka)', 'system-ui', 'sans-serif'],
        body: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-nunito)', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        // Flush swirl animation
        flush: {
          '0%': { 
            transform: 'translateY(0) rotate(0deg) scale(1)',
            opacity: '1',
          },
          '50%': { 
            transform: 'translateY(50px) rotate(360deg) scale(0.7)',
            opacity: '1',
          },
          '100%': { 
            transform: 'translateY(150px) rotate(720deg) scale(0.1)',
            opacity: '0',
          },
        },
        // Water swirl in toilet
        swirl: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        // Toilet wobble on hover
        wobble: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        // Success splash
        splash: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(2)', opacity: '0' },
        },
      },
      animation: {
        flush: 'flush 1.5s ease-in forwards',
        swirl: 'swirl 1s linear infinite',
        wobble: 'wobble 0.3s ease-in-out infinite',
        splash: 'splash 0.5s ease-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
