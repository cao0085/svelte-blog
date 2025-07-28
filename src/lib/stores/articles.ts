// src/lib/stores/articles.ts
import { writable } from 'svelte/store';
import { readable } from 'svelte/store';
import type { Article } from '$lib/types';


const parsed: Article[] = [];

// here target svelte.config.js mdsvex({ extensions: ['.md'] })
// props: metadata, default
const processedArticles = import.meta.glob('/src/content/**/*.md', { eager: true });

for (const srcPath in processedArticles) {
  const articleData = processedArticles[srcPath] as any;
  parsed.push({
    category: articleData.metadata.category,
    subCategory: articleData.metadata.subCategory,
    title: articleData.metadata.title,
    slug: articleData.metadata.slug,
    date: articleData.metadata.date,
    tags: articleData.metadata.tags,
    excerpt: articleData.metadata.excerpt ?? '',
    component: articleData.default
  });
}

// export const articles = writable(parsed.sort((a, b) => b.date.localeCompare(a.date)));

// 日期排序（新 → 舊）
parsed.sort((a, b) => b.date.localeCompare(a.date));

export const articles = readable(parsed);