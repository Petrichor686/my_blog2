import ContentCard from '@/components/ContentCard';
import SectionLabel from '@/components/SectionLabel';
import CtaButton from '@/components/CtaButton';
import HeroTyping from '@/components/HeroTyping';
import BottomLinks from '@/components/BottomLinks';
import { getFeaturedPosts } from '@/lib/db';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const featuredPosts = await getFeaturedPosts();

  return (
    <div className="container">
      {/* Hero 区域 */}
      <section
        style={{
          padding: '100px 0 80px',
        }}
      >
        {/* 终端提示符 */}
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.88rem',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          <span style={{ color: 'var(--accent-amber)' }}>$</span>
          <span style={{ color: 'var(--accent-green)' }}>whoami</span>
        </p>

        <HeroTyping />

        {/* 简介 */}
        <p
          style={{
            fontSize: '1rem',
            lineHeight: 1.8,
            color: 'var(--text-secondary)',
            maxWidth: '520px',
            marginBottom: '36px',
          }}
        >
          这里是 Petrichor 的数字角落。记录我在控制系统、嵌入式、机器人领域折腾的项目实战，
          偶尔也写写生活中的碎碎念。
        </p>

        <CtaButton href="/projects">进入博客 →</CtaButton>
      </section>

      {/* 精选内容 */}
      <section style={{ paddingBottom: '40px' }}>
        <div style={{ marginBottom: '40px' }}>
          <SectionLabel label="精选内容" />
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}
        >
          {featuredPosts.map((post, i) => (
            <ContentCard
              key={post.id}
              post={post}
              index={i}
            />
          ))}
        </div>

        <BottomLinks />
      </section>
    </div>
  );
}
