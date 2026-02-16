interface StatusDotProps {
  color?: string;
  pulse?: boolean;
  size?: number;
}

export function StatusDot({ color = '#00D4AA', pulse = true, size = 8 }: StatusDotProps) {
  return (
    <span className="relative inline-flex" style={{ width: size, height: size }}>
      {pulse && (
        <span
          className="absolute inset-0 rounded-full opacity-40"
          style={{
            backgroundColor: color,
            animation: 'pulse-dot 2s ease-in-out infinite',
          }}
        />
      )}
      <span
        className="relative inline-flex rounded-full"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
        }}
      />
    </span>
  );
}
