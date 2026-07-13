'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';

export default function Navbar() {
  const { user, username, signOut } = useAuth();

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        height: 'var(--nav-height)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        maxWidth: 'var(--max-width)',
        margin: '0 auto',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        background: 'rgba(10, 9, 8, 0.8)',
        borderBottom: '1px solid var(--border-color)',
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '1.1rem',
          fontWeight: 600,
          letterSpacing: '0.02em',
          display: 'flex',
          alignItems: 'center',
          gap: '1px',
          transition: 'opacity 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
      >
        <span style={{ color: 'var(--accent-amber)' }}>&gt;</span>
        <span> petrichor.dev</span>
      </Link>

      <div style={{ display: 'flex', gap: '28px', alignItems: 'center' }}>
        {[
          { href: '/projects', label: '项目' },
          { href: '/essays', label: '随笔' },
          { href: '/moments', label: '说说' },
        ].map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontSize: '0.92rem',
              color: 'var(--text-secondary)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 500,
              letterSpacing: '0.02em',
              transition: 'color 0.2s',
              padding: '4px 0',
              borderBottom: '2px solid transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = 'var(--accent-amber)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            {link.label}
          </Link>
        ))}

        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span
              style={{
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-secondary)',
              }}
            >
              {username || user.email?.split('@')[0]}
            </span>
            <button
              onClick={signOut}
              style={{
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
                background: 'none',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '4px 12px',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-amber)';
                e.currentTarget.style.color = 'var(--accent-amber)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-color)';
                e.currentTarget.style.color = 'var(--text-muted)';
              }}
            >
              退出
            </button>
          </div>
        ) : (
          <Link
            href="/login"
            style={{
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--accent-amber)',
              border: '1px solid var(--accent-amber)',
              borderRadius: 'var(--radius-sm)',
              padding: '4px 14px',
              transition: 'all 0.2s',
              fontWeight: 500,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--accent-amber)';
              e.currentTarget.style.color = 'var(--bg-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--accent-amber)';
            }}
          >
            登录
          </Link>
        )}
      </div>
    </nav>
  );
}
