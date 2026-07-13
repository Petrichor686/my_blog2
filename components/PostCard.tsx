'use client';

import Link from 'next/link';
import { Post } from '@/lib/types';
import { useRef } from 'react';

interface Props {
  post: Post;
  pinned?: boolean;
}

export default function PostCard({ post, pinned }: Props) {
  const badgeRef = useRef<HTMLSpanElement>(null);
  const href = post.type === 'project' ? `/projects/${post.slug}` : `/essays/${post.slug}`;

  const handleEnter = () => {
    if (badgeRef.current) {
      badgeRef.current.style.background = 'var(--accent-amber)';
      badgeRef.current.style.color = 'var(--bg-primary)';
    }
  };
  const handleLeave = () => {
    if (badgeRef.current) {
      badgeRef.current.style.background = 'transparent';
      badgeRef.current.style.color = 'var(--accent-amber)';
    }
  };

  return (
    <Link
      href={href}
      style={{
        display: 'block',
        position: 'relative',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '24px 28px',
        transition: 'all 0.3s ease',
        boxShadow: 'var(--shadow-card)',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'var(--accent-amber)';
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card-hover)';
        handleEnter();
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border-color)';
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-card)';
        handleLeave();
      }}
    >
      {pinned && (
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '14px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            fontWeight: 600,
            color: 'var(--accent-amber)',
            border: '1px solid var(--accent-amber)',
            borderRadius: 'var(--radius-sm)',
            padding: '2px 8px',
            opacity: 0.8,
          }}
        >
          置顶
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px', paddingRight: pinned ? '58px' : '0' }}>
        <span
          ref={badgeRef}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            fontWeight: 500,
            color: 'var(--accent-amber)',
            border: '1px solid var(--accent-amber)',
            borderRadius: 'var(--radius-full)',
            padding: '2px 12px',
            flexShrink: 0,
            transition: 'all 0.25s',
          }}
        >
          {post.type === 'project' ? '项目' : '随笔'}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.78rem',
            color: 'var(--text-muted)',
          }}
        >
          {post.createdAt}
        </span>
      </div>

      <h3
        style={{
          fontSize: '1.15rem',
          fontWeight: 600,
          lineHeight: 1.5,
          color: 'var(--text-primary)',
          marginBottom: '10px',
        }}
      >
        {post.title}
      </h3>

      <p
        style={{
          fontSize: '0.9rem',
          lineHeight: 1.7,
          color: 'var(--text-secondary)',
        }}
      >
        {post.excerpt}
      </p>

      {post.tags && post.tags.length > 0 && (
        <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-full)',
                padding: '2px 12px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
