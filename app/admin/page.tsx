'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL || '';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.email !== ADMIN_EMAIL)) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user || user.email !== ADMIN_EMAIL) {
    return <div className="container" style={{ padding: '100px 0', textAlign: 'center', color: 'var(--text-muted)' }}>验证中...</div>;
  }

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h1 style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '1.4rem',
        color: 'var(--accent-amber)',
        marginBottom: '40px',
      }}>
        {'// 管理后台'}
      </h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
        <AdminLink href="/admin/posts" label="文章管理" desc="新建、编辑、删除项目和随笔" />
        <AdminLink href="/admin/moments" label="说说管理" desc="发布新说说、删除旧说说" />
        <AdminLink href="/admin/comments" label="评论管理" desc="查看和删除任意评论" />
      </div>
    </div>
  );
}

function AdminLink({ href, label, desc }: { href: string; label: string; desc: string }) {
  return (
    <a
      href={href}
      style={{
        display: 'block',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '28px',
        transition: 'all 0.3s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent-amber)';
        e.currentTarget.style.transform = 'translateY(-4px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--accent-amber)', fontWeight: 600, marginBottom: '10px' }}>
        {label}
      </p>
      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{desc}</p>
    </a>
  );
}
