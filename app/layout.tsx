import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';
import Navbar from '@/components/Navbar';
import ParticleBackground from '@/components/ParticleBackground';
import ClickBubble from '@/components/ClickBubble';

export const metadata: Metadata = {
  title: 'petrichor.dev',
  description: '一个记录项目实战、生活随笔与碎片化说说的个人博客',
  icons: { icon: '/favicon.ico' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body>
        <AuthProvider>
        <ParticleBackground />
        <ClickBubble />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Navbar />
          <main style={{ minHeight: 'calc(100vh - var(--nav-height))' }}>
            {children}
          </main>
          <footer
            style={{
              borderTop: '1px solid var(--border-color)',
              padding: '32px 0',
              marginTop: '60px',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-mono)',
            }}
          >
            <p style={{ marginBottom: '6px' }}>
              Built with Next.js &middot; Deployed on Vercel
            </p>
            <p>&copy; {new Date().getFullYear()} petrichor.dev</p>
          </footer>
        </div>
        </AuthProvider>
      </body>
    </html>
  );
}
