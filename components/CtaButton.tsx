'use client';

export default function CtaButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.9rem',
        fontWeight: 500,
        color: 'var(--text-primary)',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-sm)',
        padding: '10px 24px',
        transition: 'all 0.25s',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent-amber)';
        e.currentTarget.style.color = 'var(--accent-amber)';
        e.currentTarget.style.boxShadow = 'var(--shadow-glow-amber)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.color = 'var(--text-primary)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {children}
    </a>
  );
}
