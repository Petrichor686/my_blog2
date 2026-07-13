'use client';

import { Moment } from '@/lib/types';
import { useRef } from 'react';

interface Props {
  moment: Moment;
}

export default function MomentCard({ moment }: Props) {
  const badgeRef = useRef<HTMLDivElement>(null);
  const date = new Date(moment.createdAt);
  const dateStr = date.toLocaleDateString('zh-CN', {
    month: 'numeric',
    day: 'numeric',
  });
  const timeStr = date.toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit',
  });

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
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-color)',
        borderRadius: 'var(--radius-md)',
        padding: '24px 28px',
        transition: 'all 0.3s ease',
        boxShadow: 'var(--shadow-card)',
        cursor: 'default',
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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          marginBottom: '14px',
        }}
      >
        <div
          ref={badgeRef}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '50%',
            background: 'var(--accent-amber-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.7rem',
            color: 'var(--accent-amber)',
            fontWeight: 600,
            transition: 'all 0.25s',
          }}
        >
          P
        </div>
        <span
          style={{
            fontSize: '0.9rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
          }}
        >
          {moment.author.name}
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-muted)',
            marginLeft: 'auto',
          }}
        >
          {dateStr} {timeStr}
        </span>
      </div>

      <p
        style={{
          fontSize: '0.92rem',
          lineHeight: 1.75,
          color: 'var(--text-secondary)',
        }}
      >
        {highlightMomentCode(moment.content)}
      </p>

      {moment.imageUrl && (
        <div
          style={{
            marginTop: '16px',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-primary)',
          }}
        >
          <div
            style={{
              width: '100%',
              aspectRatio: '16/9',
              background: 'var(--accent-amber-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            [ 图片: {moment.imageUrl} ]
          </div>
        </div>
      )}
    </div>
  );
}

function highlightMomentCode(text: string) {
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
            padding: '1px 5px',
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
