import { supabase } from './supabase';
import type { Post, Moment, Comment } from './types';

// ========== Posts ==========

export async function getFeaturedPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .in('type', ['project', 'essay'])
    .order('pinned', { ascending: false })
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) { console.error('getFeaturedPosts:', error); return []; }
  return mapPosts(data);
}

export async function getProjects(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('type', 'project')
    .order('pinned', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) { console.error('getProjects:', error); return []; }
  return mapPosts(data);
}

export async function getEssays(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('type', 'essay')
    .order('pinned', { ascending: false })
    .order('created_at', { ascending: false });

  if (error) { console.error('getEssays:', error); return []; }
  return mapPosts(data);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) { console.error('getPostBySlug:', error); return null; }
  return mapPost(data);
}

// ========== Moments ==========

export async function getMoments(): Promise<Moment[]> {
  const { data, error } = await supabase
    .from('moments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) { console.error('getMoments:', error); return []; }
  return data.map(mapMoment);
}

// ========== Comments ==========

export async function getCommentsByPost(postId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) { console.error('getCommentsByPost:', error); return []; }
  return data.map(mapComment);
}

export async function getCommentsByMoment(momentId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from('comments')
    .select('*')
    .eq('moment_id', momentId)
    .order('created_at', { ascending: true });

  if (error) { console.error('getCommentsByMoment:', error); return []; }
  return data.map(mapComment);
}

export async function addComment(
  comment: { content: string; postId?: string; momentId?: string },
  userId: string,
  username: string,
): Promise<Comment | null> {
  const { data, error } = await supabase
    .from('comments')
    .insert({
      content: comment.content,
      post_id: comment.postId || null,
      moment_id: comment.momentId || null,
      author_id: userId,
      author_name: username,
    })
    .select()
    .single();

  if (error) { console.error('addComment:', error); return null; }
  return mapComment(data);
}

export async function deleteComment(commentId: string): Promise<boolean> {
  const { error } = await supabase
    .from('comments')
    .delete()
    .eq('id', commentId);

  if (error) { console.error('deleteComment:', error); return false; }
  return true;
}

// ========== Mappers (DB row → app type) ==========

function mapPost(row: any): Post {
  return {
    id: row.id,
    type: row.type,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt || '',
    content: row.content || '',
    coverImage: row.cover_image,
    tags: row.tags || [],
    author: row.author_id ? { id: row.author_id, name: 'Petrichor' } : { id: 'me', name: 'Petrichor' },
    pinned: row.pinned || false,
    createdAt: row.created_at,
  };
}

function mapPosts(rows: any[]): Post[] {
  return rows.map(mapPost);
}

function mapMoment(row: any): Moment {
  return {
    id: row.id,
    content: row.content,
    imageUrl: row.image_url,
    author: row.author_id ? { id: row.author_id, name: 'Petrichor' } : { id: 'me', name: 'Petrichor' },
    createdAt: row.created_at,
  };
}

function mapComment(row: any): Comment {
  return {
    id: row.id,
    content: row.content,
    author: { id: row.author_id || 'anon', name: row.author_name || '匿名' },
    createdAt: row.created_at,
  };
}
