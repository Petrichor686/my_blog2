import SectionLabel from '@/components/SectionLabel';
import PostCard from '@/components/PostCard';
import { getProjects } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const projects = await getProjects();
  const pinnedProjects = projects.filter((p) => p.pinned);
  const normalProjects = projects.filter((p) => !p.pinned);

  return (
    <div className="container">
      <section style={{ padding: '80px 0' }}>
        {/* 页头 */}
        <div style={{ marginBottom: '12px' }}>
          <SectionLabel label="项目" />
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
          记录我在控制系统、嵌入式、机器人等领域折腾过的项目实战——
          包括仿真、硬件设计、软件开发全流程。
        </p>

        {/* 置顶项目 */}
        {pinnedProjects.length > 0 && (
          <>
            {pinnedProjects.map((post) => (
              <div key={post.id} style={{ marginBottom: '24px' }}>
                <PostCard post={post} pinned />
              </div>
            ))}
          </>
        )}

        {/* 普通项目 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '24px',
          }}
        >
          {normalProjects.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        {projects.length === 0 && (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '60px 0' }}>
            暂无项目，敬请期待...
          </p>
        )}
      </section>
    </div>
  );
}
