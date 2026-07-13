import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/lib/db';
import CommentSection from '@/components/CommentSection';
import MarkdownRenderer from '@/components/MarkdownRenderer';

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
          {post.content ? <MarkdownRenderer content={post.content} /> : <p>暂无详细内容...</p>}
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
