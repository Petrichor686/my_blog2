'use client';

import Link from 'next/link';
import { Post } from '@/lib/types';
import { useRef } from 'react';

interface Props {
  post: Post;
  index: number;
}

const typeLabels: Record<string, string> = {
  project: '项目',
  essay: '随笔',
};

export default function ContentCard({ post, index }: Props) {
  const badgeRef = useRef<HTMLDivElement>(null);

  const linkHref =
    post.type === 'project' ? `/projects/${post.slug}` : `/essays/${post.slug}`;

  const handleEnter = () => {
    if (badgeRef.current) {
      badgeRef.current.style.background = 'var(--accent-amber)';
      badgeRef.current.style.color = 'var(--bg-primary)';
    }
  };
  const handleLeave = () => {
    if (badgeRef.current) {
      badgeRef.current.style.background = 'var(--accent-amber-bg)';
      badgeRef.current.style.color = 'var(--accent-amber)';
    }
  };

  return (
    <Link
      href={linkHref}
      style={{
        display: 'block',
        position: 'relative',
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px 28px 24px',
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
      {/* 编号徽章 */}
      <div
        ref={badgeRef}
        style={{
          width: '32px',
          height: '32px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.78rem',
          fontWeight: 600,
          background: 'var(--accent-amber-bg)',
          color: 'var(--accent-amber)',
          marginBottom: '20px',
          transition: 'all 0.25s',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      <h3
        style={{
          fontSize: '1.15rem',
          fontWeight: 600,
          lineHeight: 1.5,
          marginBottom: '12px',
          color: 'var(--text-primary)',
        }}
      >
        {post.title}
      </h3>

      <p
        style={{
          fontSize: '0.9rem',
          lineHeight: 1.7,
          color: 'var(--text-secondary)',
          marginBottom: '18px',
        }}
      >
        {highlightCode(post.excerpt)}
      </p>

      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {/* 类型标签 */}
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            fontWeight: 500,
            color: 'var(--accent-amber)',
            border: '1px solid var(--accent-amber)',
            borderRadius: 'var(--radius-full)',
            padding: '3px 14px',
          }}
        >
          {typeLabels[post.type]}
        </span>

        {/* 标签 */}
        {post.tags?.slice(0, 3).map((tag) => (
          <span
            key={tag}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: 'var(--text-muted)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-full)',
              padding: '3px 14px',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

/** Wrap backtick-wrapped text in code-highlight spans */
function highlightCode(text: string) {
  const parts = text.split(/(`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.85em',
            background: 'var(--code-highlight-bg)',
            color: 'var(--code-highlight)',
            padding: '2px 6px',
            borderRadius: '3px',
          }}
        >
          {part.slice(1, -1)}
        </code>
      );
    }
    return part;
  });
}
