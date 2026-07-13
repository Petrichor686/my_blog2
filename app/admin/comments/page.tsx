'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { supabase } from '@/lib/supabase';
import { deleteAnyComment } from '@/lib/admin-db';
import type { Comment } from '@/lib/types';

export default function AdminCommentsPage() {
  const { user, loading } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  const fetchComments = useCallback(async () => {
    const { data } = await supabase
      .from('comments')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
    setComments((data || []).map((c: any) => ({
      id: c.id,
      content: c.content,
      author: { id: c.author_id || 'anon', name: c.author_name || '匿名' },
      createdAt: c.created_at,
    })));
    setLoadingData(false);
  }, []);

  useEffect(() => { if (!loading && user) fetchComments(); }, [loading, user, fetchComments]);

  const handleDelete = async (id: string) => {
    if (!confirm('确定删除？')) return;
    await deleteAnyComment(id);
    fetchComments();
  };

  if (loading || loadingData) {
    return <div className="container" style={{ padding: '100px 0', textAlign: 'center', color: 'var(--text-muted)' }}>加载中...</div>;
  }

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--accent-amber)' }}>
          {'// 评论管理'}
        </h1>
        <a href="/admin" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>← 返回</a>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {comments.length === 0 && (
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', padding: '20px 0' }}>暂无评论</p>
        )}
        {comments.map((c) => (
          <div key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '12px 16px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--accent-amber)' }}>
                  {c.author.name}
                </span>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {formatDate(c.createdAt)}
                </span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{c.content}</p>
            </div>
            <button onClick={() => handleDelete(c.id)}
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
