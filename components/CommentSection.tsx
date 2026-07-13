'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { addComment, deleteComment, getCommentsByPost, getCommentsByMoment } from '@/lib/db';
import type { Comment } from '@/lib/types';

export default function CommentSection({ type, targetId }: { type: 'post' | 'moment'; targetId: string }) {
  const { user, username } = useAuth();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchComments = type === 'post'
      ? getCommentsByPost(targetId)
      : getCommentsByMoment(targetId);
    fetchComments.then(setComments);
  }, [type, targetId]);

  const handleSubmit = async () => {
    if (!comment.trim() || !user) return;
    setError('');
    setSubmitting(true);

    const insertParams: { content: string; postId?: string; momentId?: string } = { content: comment.trim() };
    if (type === 'post') insertParams.postId = targetId;
    else insertParams.momentId = targetId;

    const newComment = await addComment(insertParams, user.id, username);

    if (newComment) {
      setComments((prev) => [...prev, newComment]);
      setComment('');
    } else {
      setError('发布失败，请重试');
    }
    setSubmitting(false);
  };

  return (
    <div style={{ marginTop: '60px' }}>
      <h3
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--accent-amber)',
          marginBottom: '24px',
        }}
      >
        {'// 评论'}
      </h3>

      {/* 评论输入框 */}
      <div
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-color)',
          borderRadius: 'var(--radius-md)',
          padding: '20px 24px',
          marginBottom: '28px',
        }}
      >
        <textarea
          placeholder={user ? '写下你的想法...' : '登录后即可评论'}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          disabled={!user}
          style={{
            width: '100%',
            minHeight: '90px',
            background: 'var(--bg-primary)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-sm)',
            padding: '14px 16px',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-sans)',
            fontSize: '0.9rem',
            lineHeight: 1.6,
            resize: 'vertical',
            outline: 'none',
            cursor: user ? 'text' : 'not-allowed',
            opacity: user ? 1 : 0.5,
          }}
        />
        {error && (
          <p style={{ fontSize: '0.8rem', color: '#ef4444', marginTop: '8px', fontFamily: 'var(--font-mono)' }}>
            {error}
          </p>
        )}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '14px',
          }}
        >
          <span
            style={{
              fontSize: '0.82rem',
              color: 'var(--text-muted)',
              fontFamily: 'var(--font-mono)',
            }}
          >
            {user ? `已登录: ${username || user.email?.split('@')[0]}` : '登录后即可评论'}
          </span>
          <button
            onClick={handleSubmit}
            disabled={!user || !comment.trim() || submitting}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              fontWeight: 500,
              color: user ? 'var(--bg-primary)' : 'var(--text-muted)',
              background: user ? 'var(--accent-amber)' : 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 20px',
              cursor: user && comment.trim() && !submitting ? 'pointer' : 'not-allowed',
              opacity: user && comment.trim() && !submitting ? 1 : 0.5,
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => {
              if (user && comment.trim() && !submitting) e.currentTarget.style.background = 'var(--accent-amber-dark)';
            }}
            onMouseLeave={(e) => {
              if (user && comment.trim() && !submitting) e.currentTarget.style.background = 'var(--accent-amber)';
            }}
          >
            {submitting ? '发送中...' : '发布'}
          </button>
        </div>
      </div>

      {/* 实际评论列表 */}
      {comments.length > 0 ? (
        comments.map((c) => (
          <div
            key={c.id}
            style={{
              padding: '20px 0',
              borderBottom: '1px solid var(--border-color)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <div
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  background: 'var(--accent-amber-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.65rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--accent-amber)',
                }}
              >
                {(c.author.name || '?')[0].toUpperCase()}
              </div>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                {c.author.name || '匿名'}
              </span>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginLeft: 'auto', fontFamily: 'var(--font-mono)' }}>
                {formatCommentDate(c.createdAt)}
              </span>
            </div>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'var(--text-secondary)', paddingLeft: '36px' }}>
              {c.content}
            </p>
            {user && user.id === c.author.id && (
              <div style={{ textAlign: 'right', marginTop: '8px' }}>
                <button
                  onClick={async () => {
                    const ok = await deleteComment(c.id);
                    if (ok) setComments((prev) => prev.filter((x) => x.id !== c.id));
                  }}
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '2px 6px',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
                >
                  删除
                </button>
              </div>
            )}
          </div>
        ))
      ) : (
        <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', padding: '20px 0', fontFamily: 'var(--font-mono)' }}>
          暂无评论，来抢沙发吧
        </p>
      )}
    </div>
  );
}

function formatCommentDate(s: string) {
  const d = new Date(s);
  return d.toISOString().slice(0, 10);
}
