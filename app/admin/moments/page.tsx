'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { getAllMoments, createMoment, deleteMoment } from '@/lib/admin-db';
import type { Moment } from '@/lib/types';

export default function AdminMomentsPage() {
  const { user, loading } = useAuth();
  const [moments, setMoments] = useState<Moment[]>([]);
  const [content, setContent] = useState('');
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const fetchMoments = useCallback(async () => {
    const m = await getAllMoments();
    setMoments(m);
    setLoadingData(false);
  }, []);

  useEffect(() => { if (!loading && user) fetchMoments(); }, [loading, user, fetchMoments]);

  const handleCreate = async () => {
    if (!content.trim()) return;
    setSaving(true);
    const created = await createMoment(content.trim());
    if (created) { setMsg('已发布'); setContent(''); fetchMoments(); }
    else setMsg('发布失败');
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定删除？')) return;
    await deleteMoment(id);
    fetchMoments();
  };

  if (loading || loadingData) {
    return <div className="container" style={{ padding: '100px 0', textAlign: 'center', color: 'var(--text-muted)' }}>加载中...</div>;
  }

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--accent-amber)' }}>
          {'// 说说管理'}
        </h1>
        <a href="/admin" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>← 返回</a>
      </div>

      {msg && (
        <div style={{ background: 'var(--accent-amber-bg)', border: '1px solid var(--accent-amber)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', marginBottom: '24px', fontSize: '0.85rem', color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>
          {msg}
        </div>
      )}

      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '20px 24px', marginBottom: '40px', display: 'flex', gap: '12px', alignItems: 'flex-end' }}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="写点什么..."
          style={{
            flex: 1, minHeight: '80px',
            background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)',
            padding: '10px 14px', color: 'var(--text-primary)', fontSize: '0.88rem', outline: 'none', resize: 'vertical',
          }}
        />
        <button onClick={handleCreate} disabled={saving || !content.trim()}
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 600,
            color: 'var(--bg-primary)', background: content.trim() ? 'var(--accent-amber)' : 'var(--border-color)',
            border: 'none', borderRadius: 'var(--radius-sm)', padding: '8px 18px', cursor: content.trim() ? 'pointer' : 'not-allowed',
            height: '40px', flexShrink: 0,
          }}
        >
          发布
        </button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {moments.map((m) => (
          <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '12px 16px' }}>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{m.content}</p>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginTop: '6px', display: 'inline-block' }}>
                {formatDate(m.createdAt)}
              </span>
            </div>
            <button onClick={() => handleDelete(m.id)}
              style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: '#ef4444',
                background: 'none', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)',
                padding: '4px 10px', cursor: 'pointer', flexShrink: 0, marginLeft: '12px',
              }}
            >删除</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function formatDate(s: string) { return new Date(s).toISOString().slice(0, 10); }
