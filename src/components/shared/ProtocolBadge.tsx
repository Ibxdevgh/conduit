interface ProtocolBadgeProps {
  label: string;
  active?: boolean;
}

export function ProtocolBadge({ label, active = true }: ProtocolBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-mono tracking-wider uppercase border transition-colors ${
        active
          ? 'border-accent/30 text-accent bg-accent/5'
          : 'border-border text-muted-2 bg-surface'
      }`}
    >
      {active && (
        <span className="w-1.5 h-1.5 rounded-full bg-accent" />
      )}
      {label}
    </span>
  );
}
