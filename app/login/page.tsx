'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export default function LoginPage() {
  const { user, username, signIn, signUp, signOut } = useAuth();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [usernameVal, setUsernameVal] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const errMsg = isLogin ? await signIn(email, password) : await signUp(email, password, usernameVal);
    if (errMsg) {
      setError(errMsg);
      setLoading(false);
    } else if (!isLogin) {
      setError('注册成功！请检查邮箱确认链接，或直接在 Supabase 后台开启邮箱自动确认。');
      setLoading(false);
    } else {
      router.push('/');
    }
  };

  // Already logged in
  if (user) {
    return (
      <div className="container">
        <div style={{ maxWidth: '420px', margin: '0 auto', padding: '100px 0', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.88rem',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <span style={{ color: 'var(--accent-amber)' }}>$</span>
            <span style={{ color: 'var(--accent-green)' }}>whoami</span>
          </p>
          <p style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
            当前登录: <span style={{ color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>{username || user.email?.split('@')[0]}</span>
          </p>
          <button
            onClick={async () => { await signOut(); router.refresh(); }}
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.85rem',
              color: 'var(--accent-amber)',
              background: 'none',
              border: '1px solid var(--accent-amber)',
              borderRadius: 'var(--radius-sm)',
              padding: '8px 20px',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--accent-amber)';
              e.currentTarget.style.color = 'var(--bg-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = 'var(--accent-amber)';
            }}
          >
            退出登录
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div
        style={{
          maxWidth: '420px',
          margin: '0 auto',
          padding: '100px 0',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.88rem',
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <span style={{ color: 'var(--accent-amber)' }}>$</span>
            <span style={{ color: 'var(--accent-green)' }}>
              {isLogin ? 'ssh login' : 'ssh register'}
            </span>
          </p>
          <h1
            style={{
              fontSize: '1.8rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '8px',
            }}
          >
            {isLogin ? '欢迎回来' : '创建账号'}
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            {isLogin ? '登录以发表评论和互动' : '注册后即可发表评论和互动'}
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="login-form-card"
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            borderRadius: 'var(--radius-lg)',
            padding: '32px',
          }}
        >
          {error && (
            <div
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                borderRadius: 'var(--radius-sm)',
                padding: '10px 14px',
                marginBottom: '20px',
                fontSize: '0.82rem',
                color: '#ef4444',
                fontFamily: 'var(--font-mono)',
                lineHeight: 1.5,
              }}
            >
              {error}
            </div>
          )}

          {!isLogin && (
            <div style={{ marginBottom: '20px' }}>
              <label
                style={{
                  display: 'block',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  color: 'var(--text-secondary)',
                  marginBottom: '8px',
                }}
              >
                username
              </label>
              <input
                type="text"
                value={usernameVal}
                onChange={(e) => setUsernameVal(e.target.value)}
                placeholder="你的用户名"
                required
                style={{
                  width: '100%',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 16px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.92rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent-amber)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
              />
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--text-secondary)',
                marginBottom: '8px',
              }}
            >
              email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              style={{
                width: '100%',
                background: 'var(--bg-primary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-sm)',
                padding: '12px 16px',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.92rem',
                outline: 'none',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent-amber)')}
              onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
            />
          </div>

          <div style={{ marginBottom: '28px' }}>
            <label
              style={{
                display: 'block',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--text-secondary)',
                marginBottom: '8px',
              }}
            >
              password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                style={{
                  width: '100%',
                  background: 'var(--bg-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '12px 40px 12px 16px',
                  color: 'var(--text-primary)',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.92rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                }}
                onFocus={(e) => (e.currentTarget.style.borderColor = 'var(--accent-amber)')}
                onBlur={(e) => (e.currentTarget.style.borderColor = 'var(--border-color)')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? '隐藏密码' : '显示密码'}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.75rem',
                  padding: '6px',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-amber)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {showPassword ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                    <line x1="1" y1="1" x2="23" y2="23"/>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: 'var(--bg-primary)',
              background: loading ? 'var(--text-muted)' : 'var(--accent-amber)',
              border: 'none',
              borderRadius: 'var(--radius-sm)',
              padding: '12px 0',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              marginBottom: '20px',
            }}
            onMouseEnter={(e) => {
              if (!loading) e.currentTarget.style.background = 'var(--accent-amber-dark)';
            }}
            onMouseLeave={(e) => {
              if (!loading) e.currentTarget.style.background = 'var(--accent-amber)';
            }}
          >
            {loading ? '处理中...' : (isLogin ? '登录' : '注册')}
          </button>

          <p
            style={{
              textAlign: 'center',
              fontSize: '0.85rem',
              color: 'var(--text-muted)',
            }}
          >
            {isLogin ? '还没有账号？' : '已有账号？'}
            <button
              type="button"
              onClick={() => { setIsLogin(!isLogin); setError(''); }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--accent-amber)',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 500,
                padding: '0 4px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              {isLogin ? '去注册' : '去登录'}
            </button>
          </p>
        </form>

        <p
          style={{
            textAlign: 'center',
            marginTop: '24px',
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
          }}
        >
          · 注册登录由 Supabase Auth 提供支持 ·
        </p>
      </div>
    </div>
  );
}
