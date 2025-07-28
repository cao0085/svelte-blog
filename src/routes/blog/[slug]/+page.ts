// src/routes/blog/[slug]/+page.ts
/** 這個檔案只負責告訴 SvelteKit 如何列舉網址，畫面邏輯仍放在 +page.svelte */

export const prerender = true;
export async function entries() {
  // 路徑請依你的內容資料夾調整
  const files = import.meta.glob('/src/content/**/*.md', { eager: true });
  return Object.values(files).map((p: any) => ({
    slug: p.metadata.slug  // 👈 slug 對應你的 [slug] 參數
  }));
}
