export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: 'Mental Health' | 'Healing Process' | 'AI Companion' | 'New Feature';
  date: string;
  image: string;
}

export type Page = 'home' | 'blog' | 'contact';
export type Language = 'vi' | 'en';
