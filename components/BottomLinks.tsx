'use client';

export default function BottomLinks() {
  return (
    <div
      style={{
        display: 'flex',
        gap: '32px',
        marginTop: '48px',
        justifyContent: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
      }}
    >
      <a href="/projects" style={linkStyle}
        onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
        浏览全部项目 →
      </a>
      <a href="/essays" style={linkStyle}
        onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
        浏览全部随笔 →
      </a>
      <a href="/moments" style={linkStyle}
        onMouseEnter={hoverIn} onMouseLeave={hoverOut}>
        看看说说 →
      </a>
    </div>
  );
}

const linkStyle: React.CSSProperties = {
  color: 'var(--text-secondary)',
  transition: 'color 0.2s',
  borderBottom: '1px solid transparent',
};

function hoverIn(e: React.MouseEvent<HTMLAnchorElement>) {
  e.currentTarget.style.color = 'var(--accent-amber)';
  e.currentTarget.style.borderBottomColor = 'var(--accent-amber)';
}

function hoverOut(e: React.MouseEvent<HTMLAnchorElement>) {
  e.currentTarget.style.color = 'var(--text-secondary)';
  e.currentTarget.style.borderBottomColor = 'transparent';
}
