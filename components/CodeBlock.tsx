interface Props {
  language?: string;
  children: string;
}

export default function CodeBlock({ language, children }: Props) {
  return (
    <div
      style={{
        position: 'relative',
        margin: '24px 0',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
      }}
    >
      {language && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '8px 16px',
            background: 'var(--bg-card)',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--accent-amber)',
              fontWeight: 500,
            }}
          >
            {language}
          </span>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              color: 'var(--text-muted)',
            }}
          >
            copy
          </span>
        </div>
      )}
      <pre
        style={{
          margin: 0,
          padding: '20px 24px',
          background: '#0d0b0a',
          overflowX: 'auto',
          fontSize: '0.82rem',
          fontFamily: 'var(--font-mono)',
          lineHeight: 1.65,
          color: '#e0ddd8',
          tabSize: 2,
        }}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}
