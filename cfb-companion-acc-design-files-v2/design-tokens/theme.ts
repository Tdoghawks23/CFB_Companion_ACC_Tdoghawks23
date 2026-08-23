export const colors = {
  accNavy: '#13294B',
  accBlue: '#4B9CD3',
  accGold: '#C99700',
  bgPrimary: '#0A0E1A',
  bgCard: '#111827',
  bgCardHover: '#1F2937',
  bgElevated: '#1E293B',
  textPrimary: '#F9FAFB',
  textSecondary: '#9CA3AF',
  textMuted: '#6B7280',
  win: '#22C55E',
  loss: '#EF4444',
  featured: '#F59E0B',
  // v2 additions
  bgSkeleton: '#161E2C',
  skeletonSheen: '#232E42',
} as const;

// v2 additions — mobile-first shell dimensions (px)
export const shell = {
  tabbarHeight: 58,
  topbarHeight: 54,
  touchTargetMin: 44,
} as const;
