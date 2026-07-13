-- 在 Supabase SQL Editor 中执行以下 SQL

-- 1. 文章表
CREATE TABLE posts (
  id          UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type        TEXT CHECK (type IN ('project', 'essay')) NOT NULL,
  title       TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  excerpt     TEXT DEFAULT '',
  content     TEXT DEFAULT '',
  cover_image TEXT,
  tags        TEXT[] DEFAULT '{}',
  author_id   UUID REFERENCES auth.users(id),
  pinned      BOOLEAN DEFAULT false,
  created_at  TIMESTAMPTZ DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now()
);

-- 2. 说说表
CREATE TABLE moments (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  content    TEXT NOT NULL,
  image_url  TEXT,
  author_id  UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 3. 评论表
CREATE TABLE comments (
  id         UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id    UUID REFERENCES posts(id) ON DELETE CASCADE,
  moment_id  UUID REFERENCES moments(id) ON DELETE CASCADE,
  author_id  UUID REFERENCES auth.users(id),
  author_name TEXT DEFAULT '',
  content    TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  CHECK (
    (post_id IS NOT NULL AND moment_id IS NULL) OR
    (post_id IS NULL AND moment_id IS NOT NULL)
  )
);

-- 4. 索引
CREATE INDEX idx_posts_type      ON posts(type);       -- 按项目/随笔筛选时用
CREATE INDEX idx_posts_pinned    ON posts(pinned);      -- 置顶筛选（pinned = true）
CREATE INDEX idx_posts_created   ON posts(created_at DESC);
CREATE INDEX idx_moments_created ON moments(created_at DESC);

-- 5. 开启 RLS（行级安全），默认禁止所有访问，后面按需开放
ALTER TABLE posts    ENABLE ROW LEVEL SECURITY;
ALTER TABLE moments  ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;

-- 6. 公开读取策略（所有人都能读）
CREATE POLICY "public read posts"    ON posts    FOR SELECT USING (true);
CREATE POLICY "public read moments"  ON moments  FOR SELECT USING (true);
CREATE POLICY "public read comments" ON comments FOR SELECT USING (true);
