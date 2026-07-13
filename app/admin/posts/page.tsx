'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { getAllPosts, deletePost, togglePinned, createPost, updatePost } from '@/lib/admin-db';
import type { Post } from '@/lib/types';

export default function AdminPostsPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm] = useState({
    type: 'project' as 'project' | 'essay',
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    tags: '',
    pinned: false,
  });
  const [loadingData, setLoadingData] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState('');

  const fetchPosts = useCallback(async () => {
    const p = await getAllPosts();
    setPosts(p);
    setLoadingData(false);
  }, []);

  useEffect(() => {
    if (!loading && user) fetchPosts();
  }, [loading, user, fetchPosts]);

  useEffect(() => {
    if (!loading && !user) router.push('/login');
  }, [loading, user, router]);

  const resetForm = () => {
    setEditing(null);
    setForm({ type: 'project', title: '', slug: '', excerpt: '', content: '', tags: '', pinned: false });
  };

  const openEdit = (p: Post) => {
    setEditing(p);
    setForm({
      type: p.type,
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt,
      content: p.content,
      tags: p.tags?.join(', ') || '',
      pinned: p.pinned || false,
    });
  };

  const handleSave = async () => {
    setSaving(true);
    setMsg('');
    const tagArr = form.tags.split(',').map((t) => t.trim()).filter(Boolean);

    if (editing) {
      const updated = await updatePost(editing.id, {
        title: form.title, slug: form.slug, excerpt: form.excerpt,
        content: form.content, tags: tagArr, pinned: form.pinned,
      });
      if (updated) { setMsg('已更新'); fetchPosts(); resetForm(); }
      else setMsg('更新失败');
    } else {
      const created = await createPost({
        type: form.type, title: form.title, slug: form.slug,
        excerpt: form.excerpt, content: form.content, tags: tagArr, pinned: form.pinned,
      });
      if (created) { setMsg('已创建'); fetchPosts(); resetForm(); }
      else setMsg('创建失败');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('确定删除？')) return;
    await deletePost(id);
    fetchPosts();
  };

  if (loading || loadingData) {
    return <div className="container" style={{ padding: '100px 0', textAlign: 'center', color: 'var(--text-muted)' }}>加载中...</div>;
  }

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', color: 'var(--accent-amber)' }}>
          {'// 文章管理'}
        </h1>
        <div style={{ display: 'flex', gap: '12px' }}>
          <a href="/admin" style={smallLink}>← 返回</a>
          <button onClick={resetForm} style={smallBtn}>+ 新建文章</button>
        </div>
      </div>

      {msg && (
        <div style={{ background: 'var(--accent-amber-bg)', border: '1px solid var(--accent-amber)', borderRadius: 'var(--radius-sm)', padding: '10px 14px', marginBottom: '24px', fontSize: '0.85rem', color: 'var(--accent-amber)', fontFamily: 'var(--font-mono)' }}>
          {msg}
        </div>
      )}

      {/* Editor */}
      <div style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', padding: '24px', marginBottom: '40px' }}>
        <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', color: 'var(--text-primary)', marginBottom: '20px' }}>
          {editing ? '编辑文章' : '新建文章'}
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: '12px 16px', alignItems: 'center' }}>
          <Label>类型</Label>
          <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as 'project' | 'essay' })} style={inputStyle}>
            <option value="project">项目</option>
            <option value="essay">随笔</option>
          </select>

          <Label>标题</Label>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} style={inputStyle} />

          <Label>Slug</Label>
          <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="url-friendly-name" style={inputStyle} />

          <Label>摘要</Label>
          <input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} style={inputStyle} />

          <Label>标签</Label>
          <input value={form.tags} onChange={(e) => setForm({ ...form, tags: e.target.value })} placeholder="用逗号分隔" style={inputStyle} />

          <Label>正文 (Markdown)</Label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <input
              type="file"
              accept=".md"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                const text = await file.text();
                setForm({ ...form, content: text });
                // auto-fill title and slug from filename
                const name = file.name.replace(/\.md$/, '');
                if (!form.title) setForm((f) => ({ ...f, title: name }));
                if (!form.slug) setForm((f) => ({ ...f, slug: name.toLowerCase().replace(/[^a-z0-9一-鿿]+/g, '-').replace(/^-|-$/g, '') }));
              }}
              style={{ ...inputStyle, padding: '6px 8px', cursor: 'pointer' }}
            />
            <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} style={{ ...inputStyle, minHeight: '200px', fontFamily: 'var(--font-mono)', fontSize: '0.82rem' }} />
          </div>

          <Label>置顶</Label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input type="checkbox" checked={form.pinned} onChange={(e) => setForm({ ...form, pinned: e.target.checked })} />
            <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>置顶</span>
          </label>
        </div>

        <div style={{ marginTop: '20px', display: 'flex', gap: '12px' }}>
          <button onClick={handleSave} disabled={saving} style={amberBtn}>
            {saving ? '保存中...' : (editing ? '更新' : '创建')}
          </button>
          {editing && <button onClick={resetForm} style={cancelBtn}>取消编辑</button>}
        </div>
      </div>

      {/* Post list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {posts.map((p) => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '12px 16px' }}>
            <div style={{ flex: 1 }}>
              <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-amber)', marginRight: '12px' }}>
                [{p.type === 'project' ? '项目' : '随笔'}]
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>{p.title}</span>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '12px', fontFamily: 'var(--font-mono)' }}>
                {formatDate(p.createdAt)}
              </span>
              {p.pinned && <span style={{ fontSize: '0.7rem', color: 'var(--accent-amber)', marginLeft: '8px', fontFamily: 'var(--font-mono)' }}>📌</span>}
            </div>
            <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
              <button onClick={() => togglePinned(p.id, !p.pinned).then(() => fetchPosts())} style={actionBtn}>
                {p.pinned ? '取消置顶' : '置顶'}
              </button>
              <button onClick={() => openEdit(p)} style={actionBtn}>编辑</button>
              <button onClick={() => handleDelete(p.id)} style={{ ...actionBtn, color: '#ef4444' }}>删除</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontFamily: 'var(--font-mono)' }}>{children}</span>;
}

function formatDate(s: string) { return new Date(s).toISOString().slice(0, 10); }

const inputStyle: React.CSSProperties = {
  background: 'var(--bg-primary)',
  border: '1px solid var(--border-color)',
  borderRadius: 'var(--radius-sm)',
  padding: '8px 12px',
  color: 'var(--text-primary)',
  fontSize: '0.85rem',
  outline: 'none',
  width: '100%',
};

const amberBtn: React.CSSProperties = {
  fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 600,
  color: 'var(--bg-primary)', background: 'var(--accent-amber)',
  border: 'none', borderRadius: 'var(--radius-sm)', padding: '8px 18px', cursor: 'pointer',
};

const cancelBtn: React.CSSProperties = {
  fontFamily: 'var(--font-mono)', fontSize: '0.82rem',
  color: 'var(--text-secondary)', background: 'none',
  border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '8px 18px', cursor: 'pointer',
};

const smallBtn: React.CSSProperties = {
  fontFamily: 'var(--font-mono)', fontSize: '0.78rem', fontWeight: 500,
  color: 'var(--accent-amber)', background: 'none',
  border: '1px solid var(--accent-amber)', borderRadius: 'var(--radius-sm)', padding: '6px 14px', cursor: 'pointer',
};

const smallLink: React.CSSProperties = {
  fontFamily: 'var(--font-mono)', fontSize: '0.78rem',
  color: 'var(--text-secondary)', padding: '6px 0', marginRight: '8px', display: 'flex', alignItems: 'center',
};

const actionBtn: React.CSSProperties = {
  fontFamily: 'var(--font-mono)', fontSize: '0.72rem',
  color: 'var(--text-secondary)', background: 'none',
  border: '1px solid var(--border-color)', borderRadius: 'var(--radius-sm)', padding: '4px 10px', cursor: 'pointer',
};
