// Design Tokens for React Native HRIS App
// 8pt spacing system

export const colors = {
  // Primary
  primary: '#a3e635', // lime-400
  primaryDark: '#84cc16', // lime-500
  primaryLight: '#bef264', // lime-300
  
  // Backgrounds
  background: {
    light: '#fafafa', // zinc-50
    dark: '#0a0a0a',
  },
  
  surface: {
    light: '#ffffff',
    dark: '#18181b', // zinc-900
  },
  
  surfaceSecondary: {
    light: '#f4f4f5', // zinc-100
    dark: 'rgba(39, 39, 42, 0.5)', // zinc-800 with opacity
  },
  
  // Text
  text: {
    primary: {
      light: '#18181b', // zinc-900
      dark: '#fafafa',
    },
    secondary: {
      light: '#71717a', // zinc-500
      dark: '#a1a1aa', // zinc-400
    },
    tertiary: {
      light: '#a1a1aa', // zinc-400
      dark: '#71717a', // zinc-500
    },
  },
  
  // Borders
  border: {
    light: '#e4e4e7', // zinc-200
    dark: 'rgba(39, 39, 42, 0.5)', // zinc-800/50
  },
  
  // Status colors
  success: '#a3e635', // lime-400
  warning: '#fbbf24', // amber-400
  error: '#ef4444', // red-500
  info: '#60a5fa', // blue-400
  
  // Gradients (for gradient backgrounds)
  gradients: {
    blue: ['#60a5fa', '#3b82f6'],
    purple: ['#a78bfa', '#8b5cf6'],
    orange: ['#fb923c', '#f97316'],
    emerald: ['#34d399', '#10b981'],
    lime: ['#a3e635', '#84cc16'],
    pink: ['#f472b6', '#ec4899'],
  },
};

export const typography = {
  // Font families
  family: {
    regular: 'PlusJakartaSans-Regular',
    medium: 'PlusJakartaSans-Medium',
    semiBold: 'PlusJakartaSans-SemiBold',
    bold: 'PlusJakartaSans-Bold',
  },
  
  // Font sizes (mobile-appropriate)
  size: {
    xs: 11,
    sm: 13,
    base: 15,
    lg: 17,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
  },
  
  // Line heights
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },
  
  // Letter spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
  },
};

export const spacing = {
  // 8pt spacing system
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 40,
  '3xl': 48,
  '4xl': 64,
};

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
};

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
};

export const layout = {
  // Safe area defaults (will be overridden by useSafeAreaInsets)
  safeAreaTop: 44,
  safeAreaBottom: 34,
  
  // Common dimensions
  headerHeight: 56,
  tabBarHeight: 60,
  buttonHeight: 48,
  inputHeight: 48,
  
  // Touch targets
  minTouchTarget: 44,
  
  // Container padding
  screenPadding: spacing.lg,
};
