export default function SectionLabel({ label }: { label: string }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.82rem',
        fontWeight: 500,
        color: 'var(--accent-amber)',
        letterSpacing: '0.03em',
      }}
    >
      {'// '}
      {label}
    </span>
  );
}
