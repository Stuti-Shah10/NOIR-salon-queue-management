/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        noir: {
          bg: '#EDECEA',      // Warm Off-White (outside boxes / page bg)
          card: '#7E9A82',    // Sage Green (inside boxes / cards)
          cardDark: '#6c8770',
          text: '#432f2e',    // Dark Brown (all text)
        },
        theme: {
          bg: 'var(--color-background, #EDECEA)',
          card: 'var(--color-secondary, #7E9A82)',
          accent: 'var(--color-secondary, #7E9A82)',
          text: 'var(--color-text, #432f2e)',
          border: 'rgba(67, 47, 46, 0.25)',
        },
        salon: {
          white: '#EDECEA',
          sage: '#7E9A82',
          brown: '#432f2e',
          gold: '#d4af37',
        }
      }
    },
  },
  plugins: [],
}
