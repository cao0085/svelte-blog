// src/routes/blog/[slug]/+page.ts
/** 這個檔案只負責告訴 SvelteKit 如何列舉網址，畫面邏輯仍放在 +page.svelte */

export const prerender = true;
export async function entries() {
  const files = import.meta.glob('/src/content/**/*.md', { eager: true });
  return Object.values(files).map((p: any) => ({
    slug: p.metadata.slug 
  }));
}
