import type { SvelteComponent } from 'svelte';

export type Category = "software" | "music" | "read";

export interface Article {
  category: Category;
  subCategory?: string;
  title: string;
  date: string;
  slug: string;
  tags?: string[];
  excerpt?: string;
  component: typeof SvelteComponent;
}