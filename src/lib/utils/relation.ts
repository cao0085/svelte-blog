// src/lib/utils/relation.ts
import type { Article } from '$lib/types';

/**
 * 根據 tag 自動找出相關文章（排除自己）
 */
export function findRelated(article: Article, all: Article[]): Article[] {
  if (!article?.tags) return [];

  return all
    .filter(a =>
      a.slug !== article.slug && a.tags?.some(tag => article.tags?.includes(tag))
    )
    .slice(0, 3); // 限制最多 3 篇
}