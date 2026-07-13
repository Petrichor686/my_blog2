import SectionLabel from '@/components/SectionLabel';
import PostCard from '@/components/PostCard';
import { getEssays } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function EssaysPage() {
  const essays = await getEssays();
  const pinnedEssays = essays.filter((e) => e.pinned);
  const normalEssays = essays.filter((e) => !e.pinned);

  return (
    <div className="container">
      <section style={{ padding: '80px 0' }}>
        <div style={{ marginBottom: '12px' }}>
          <SectionLabel label="随笔" />
        </div>
        <p
          style={{
            fontSize: '1rem',
            lineHeight: 1.8,
            color: 'var(--text-secondary)',
            maxWidth: '520px',
            marginBottom: '48px',
          }}
        >
          一些不那么技术的东西——关于调试、阅读、职业选择，
          以及当工科生开始胡思乱想的时候写下的文字。
        </p>

        {/* 置顶随笔 */}
        {pinnedEssays.length > 0 && (
          <>
            {pinnedEssays.map((post) => (
              <div key={post.id} style={{ marginBottom: '24px' }}>
                <PostCard post={post} pinned />
              </div>
            ))}
          </>
        )}

        {/* 普通随笔 */}
        <div
          className="post-list-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {normalEssays.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {essays.length === 0 && (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '60px 0' }}>
            暂无随笔，敬请期待...
          </p>
        )}
      </section>
    </div>
  );
}
