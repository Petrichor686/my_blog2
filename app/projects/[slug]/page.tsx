import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/db';
import CommentSection from '@/components/CommentSection';
import CodeBlock from '@/components/CodeBlock';

export const dynamic = 'force-dynamic';

interface Props {
  params: { slug: string };
}

export default async function ProjectDetailPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post || post.type !== 'project') {
    notFound();
  }

  return (
    <div className="container">
      <article style={{ padding: '80px 0 40px' }}>
        {/* 类型标签 + 日期 */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 500,
              color: 'var(--accent-amber)',
              border: '1px solid var(--accent-amber)',
              borderRadius: 'var(--radius-full)',
              padding: '2px 12px',
            }}
          >
            项目
          </span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
            {formatDate(post.createdAt)}
          </span>
        </div>

        {/* 标题 */}
        <h1
          style={{
            fontSize: 'clamp(1.6rem, 4vw, 2.4rem)',
            fontWeight: 700,
            lineHeight: 1.3,
            marginBottom: '10px',
            color: 'var(--text-primary)',
          }}
        >
          {post.title}
        </h1>

        {/* 标签 */}
        {post.tags && post.tags.length > 0 && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '40px' }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-full)',
                  padding: '2px 14px',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {post.coverImage && (
          <div
            style={{
              marginBottom: '40px',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              border: '1px solid var(--border-color)',
            }}
          >
            <div
              style={{
                width: '100%',
                aspectRatio: '16/9',
                background: 'var(--bg-card)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.9rem',
              }}
            >
              [ 封面图: {post.coverImage} ]
            </div>
          </div>
        )}

        {/* 正文渲染 */}
        <div style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--text-secondary)' }}>
          {post.content ? renderMarkdownContent(post.content) : <p>暂无详细内容...</p>}
        </div>

        {/* 评论区 */}
        <CommentSection type="post" targetId={post.id} />
      </article>
    </div>
  );
}

function formatDate(s: string) {
  const d = new Date(s);
  return d.toISOString().slice(0, 10);
}

/** Simple markdown-to-JSX renderer */
function renderMarkdownContent(content: string) {
  const lines = content.split('\n');
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Code block
    if (line.trim().startsWith('```')) {
      const lang = line.trim().slice(3).trim() || undefined;
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeLines.push(lines[i]);
        i++;
      }
      elements.push(<CodeBlock key={i} language={lang}>{codeLines.join('\n')}</CodeBlock>);
      i++;
      continue;
    }

    // h2
    if (line.startsWith('## ')) {
      elements.push(
        <h2
          key={i}
          style={{
            fontSize: '1.4rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginTop: '48px',
            marginBottom: '16px',
            fontFamily: 'var(--font-mono)',
          }}
        >
          {'// '}
          {line.slice(3)}
        </h2>
      );
      i++;
      continue;
    }

    // Empty line
    if (line.trim() === '') {
      i++;
      continue;
    }

    // Regular paragraph
    const paragraph: string[] = [];
    while (i < lines.length && lines[i].trim() !== '' && !lines[i].trim().startsWith('```') && !lines[i].startsWith('## ')) {
      paragraph.push(lines[i]);
      i++;
    }
    if (paragraph.length > 0) {
      elements.push(
        <p key={i} style={{ marginBottom: '16px' }}>
          {renderInlineMarkdown(paragraph.join('\n'))}
        </p>
      );
    }
  }

  return elements;
}

function renderInlineMarkdown(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{part.slice(2, -2)}</strong>;
    }
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code
          key={i}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9em',
            background: 'var(--code-highlight-bg)',
            color: 'var(--code-highlight)',
            padding: '1px 6px',
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
