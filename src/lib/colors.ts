export const colors = {
  accent: '#00D4AA',
  accentDim: 'rgba(0, 212, 170, 0.2)',
  accentGlow: 'rgba(0, 212, 170, 0.13)',
  bg: '#050508',
  surface: '#0a0a0f',
  surface2: '#111118',
  border: '#1a1a24',
  border2: '#2a2a38',
  muted: '#666680',
  muted2: '#44445a',
  muted3: '#33334a',
  text: '#e8e8e8',
  success: '#00D4AA',
  error: '#ff4466',
  warning: '#ffaa00',
  pending: '#6688ff',
} as const;

export function statusColor(status: string): string {
  switch (status) {
    case 'settled':
      return colors.success;
    case 'failed':
      return colors.error;
    case 'pending':
    case 'compliance_check':
      return colors.pending;
    case 'processing':
      return colors.warning;
    default:
      return colors.muted;
  }
}
