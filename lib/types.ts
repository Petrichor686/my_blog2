export interface Post {
  id: string;
  type: 'project' | 'essay';
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags?: string[];
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  pinned?: boolean;
  createdAt: string;
}

export interface Moment {
  id: string;
  content: string;
  imageUrl?: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
}

export interface Comment {
  id: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  createdAt: string;
}
