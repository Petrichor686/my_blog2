'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from '@/components/CodeBlock';

interface Props {
  content: string;
}

export default function MarkdownRenderer({ content }: Props) {
  return (
    <div className="markdown-body" style={{
      fontSize: '1rem',
      lineHeight: 1.9,
      color: 'var(--text-secondary)',
    }}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children, ...props }) => (
            <h2
              style={{
                fontSize: '1.4rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                marginTop: '48px',
                marginBottom: '16px',
                fontFamily: 'var(--font-mono)',
              }}
              {...props}
            >
              {'// '}{children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3
              style={{
                fontSize: '1.15rem',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginTop: '36px',
                marginBottom: '12px',
              }}
              {...props}
            >
              {children}
            </h3>
          ),
          p: ({ children, ...props }) => (
            <p style={{ marginBottom: '16px' }} {...props}>{children}</p>
          ),
          strong: ({ children, ...props }) => (
            <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }} {...props}>{children}</strong>
          ),
          code: ({ className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const inline = !match;
            if (!inline) {
              return <CodeBlock language={match[1]}>{String(children).replace(/\n$/, '')}</CodeBlock>;
            }
            return (
              <code
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.9em',
                  background: 'var(--code-highlight-bg)',
                  color: 'var(--code-highlight)',
                  padding: '1px 6px',
                  borderRadius: '3px',
                }}
                {...props}
              >
                {children}
              </code>
            );
          },
          a: ({ children, href, ...props }) => (
            <a
              href={href}
              style={{
                color: 'var(--accent-amber)',
                textDecoration: 'underline',
                textUnderlineOffset: '3px',
              }}
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            >
              {children}
            </a>
          ),
          blockquote: ({ children, ...props }) => (
            <blockquote
              style={{
                borderLeft: '3px solid var(--accent-amber)',
                paddingLeft: '16px',
                margin: '16px 0',
                color: 'var(--text-muted)',
                fontStyle: 'italic',
              }}
              {...props}
            >
              {children}
            </blockquote>
          ),
          ul: ({ children, ...props }) => (
            <ul style={{ paddingLeft: '24px', marginBottom: '16px', listStyleType: 'disc' }} {...props}>{children}</ul>
          ),
          ol: ({ children, ...props }) => (
            <ol style={{ paddingLeft: '24px', marginBottom: '16px', listStyleType: 'decimal' }} {...props}>{children}</ol>
          ),
          li: ({ children, ...props }) => (
            <li style={{ marginBottom: '4px' }} {...props}>{children}</li>
          ),
          table: ({ children, ...props }) => (
            <div style={{ overflowX: 'auto', marginBottom: '16px' }}>
              <table
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  fontSize: '0.9rem',
                  border: '1px solid var(--border-color)',
                }}
                {...props}
              >
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead style={{ background: 'var(--bg-card)' }} {...props}>{children}</thead>
          ),
          th: ({ children, ...props }) => (
            <th
              style={{
                border: '1px solid var(--border-color)',
                padding: '10px 14px',
                textAlign: 'left',
                fontWeight: 600,
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
              }}
              {...props}
            >
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td
              style={{
                border: '1px solid var(--border-color)',
                padding: '8px 14px',
              }}
              {...props}
            >
              {children}
            </td>
          ),
          hr: (props) => (
            <hr
              style={{
                border: 'none',
                borderTop: '1px solid var(--border-color)',
                margin: '32px 0',
              }}
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
