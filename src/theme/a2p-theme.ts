// Charte graphique A2P Performance
export const a2pTheme = {
  colors: {
    primary: {
      main: '#2563eb', // Bleu A2P
      light: '#60a5fa',
      dark: '#1e40af',
      50: '#eff6ff',
      100: '#dbeafe',
      200: '#bfdbfe',
      300: '#93c5fd',
      400: '#60a5fa',
      500: '#3b82f6',
      600: '#2563eb',
      700: '#1d4ed8',
      800: '#1e40af',
      900: '#1e3a8a',
    },
    secondary: {
      main: '#10b981', // Vert succès
      light: '#34d399',
      dark: '#059669',
    },
    warning: {
      main: '#f59e0b',
      light: '#fbbf24',
      dark: '#d97706',
    },
    danger: {
      main: '#ef4444',
      light: '#f87171',
      dark: '#dc2626',
    },
    neutral: {
      50: '#f9fafb',
      100: '#f3f4f6',
      200: '#e5e7eb',
      300: '#d1d5db',
      400: '#9ca3af',
      500: '#6b7280',
      600: '#4b5563',
      700: '#374151',
      800: '#1f2937',
      900: '#111827',
    },
  },
  branding: {
    name: 'A2P Performance',
    tagline: 'Excellence en Kinésithérapie du Sport',
    logo: '/build/a2p-logo.png', // À ajouter
  },
  typography: {
    fontFamily: {
      sans: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      mono: '"Courier New", Courier, monospace',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
  },
  badges: {
    excellence: {
      label: 'Excellence',
      color: '#10b981',
      threshold: 90,
    },
    bonneEvolution: {
      label: 'Bonne évolution',
      color: '#3b82f6',
      threshold: 70,
    },
    attention: {
      label: 'Attention requise',
      color: '#f59e0b',
      threshold: 50,
    },
    alerte: {
      label: 'Alerte',
      color: '#ef4444',
      threshold: 0,
    },
  },
};

export type A2PTheme = typeof a2pTheme;
