import SectionLabel from '@/components/SectionLabel';
import MomentCard from '@/components/MomentCard';
import { getMoments } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function MomentsPage() {
  const moments = await getMoments();

  return (
    <div className="container">
      <section style={{ padding: '80px 0' }}>
        <div style={{ marginBottom: '12px' }}>
          <SectionLabel label="说说" />
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
          类似朋友圈的碎片化动态，随手记录——
          项目进度、技术吐槽、生活随想，想到什么写什么。
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {moments.map((moment) => (
            <MomentCard key={moment.id} moment={moment} />
          ))}
        </div>

        {moments.length === 0 && (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '60px 0' }}>
            暂无说说，敬请期待...
          </p>
        )}
      </section>
    </div>
  );
}
