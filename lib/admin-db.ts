import { supabase } from './supabase';
import { supabaseAdmin } from './supabase-admin';
import type { Post, Moment } from './types';

// ========== admin-only CRUD ==========

export async function getAllPosts(): Promise<Post[]> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) { console.error('getAllPosts:', error); return []; }
  return data.map(mapPost);
}

export async function createPost(post: {
  type: 'project' | 'essay';
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  tags: string[];
  pinned: boolean;
}): Promise<Post | null> {
  const client = supabaseAdmin();
  const { data, error } = await client
    .from('posts')
    .insert({
      type: post.type,
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      tags: post.tags,
      pinned: post.pinned,
    })
    .select()
    .single();

  if (error) { console.error('createPost:', error); return null; }
  return mapPost(data);
}

export async function updatePost(
  id: string,
  post: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    tags: string[];
    pinned: boolean;
  },
): Promise<Post | null> {
  const client = supabaseAdmin();
  const { data, error } = await client
    .from('posts')
    .update({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      tags: post.tags,
      pinned: post.pinned,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) { console.error('updatePost:', error); return null; }
  return mapPost(data);
}

export async function deletePost(id: string): Promise<boolean> {
  const client = supabaseAdmin();
  const { error } = await client.from('posts').delete().eq('id', id);
  if (error) { console.error('deletePost:', error); return false; }
  return true;
}

export async function togglePinned(id: string, pinned: boolean): Promise<boolean> {
  const client = supabaseAdmin();
  const { error } = await client.from('posts').update({ pinned }).eq('id', id);
  if (error) { console.error('togglePinned:', error); return false; }
  return true;
}

// ========== Moments ==========

export async function getAllMoments(): Promise<Moment[]> {
  const { data, error } = await supabase
    .from('moments')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) { console.error('getAllMoments:', error); return []; }
  return data.map(mapMoment);
}

export async function createMoment(content: string): Promise<Moment | null> {
  const client = supabaseAdmin();
  const { data, error } = await client
    .from('moments')
    .insert({ content })
    .select()
    .single();

  if (error) { console.error('createMoment:', error); return null; }
  return mapMoment(data);
}

export async function deleteMoment(id: string): Promise<boolean> {
  const client = supabaseAdmin();
  const { error } = await client.from('moments').delete().eq('id', id);
  if (error) { console.error('deleteMoment:', error); return false; }
  return true;
}

// ========== Comments (admin can delete any) ==========

export async function deleteAnyComment(commentId: string): Promise<boolean> {
  const client = supabaseAdmin();
  const { error } = await client.from('comments').delete().eq('id', commentId);
  if (error) { console.error('deleteAnyComment:', error); return false; }
  return true;
}

// ========== Mappers ==========

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

function mapMoment(row: any): Moment {
  return {
    id: row.id,
    content: row.content,
    imageUrl: row.image_url,
    author: row.author_id ? { id: row.author_id, name: 'Petrichor' } : { id: 'me', name: 'Petrichor' },
    createdAt: row.created_at,
  };
}
