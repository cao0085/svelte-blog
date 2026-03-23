<script lang="ts">
  import { articles } from "$lib/stores/articles";
  import { page } from "$app/stores";
  import { derived } from "svelte/store";

  const slug = derived(page, ($page) => $page.params.slug);
  const article = derived([articles, slug], ([$articles, $slug]) =>
    $articles.find((a) => a.slug === $slug)
  );
</script>

{#if $article}
  <article class="prose mx-auto">
    <div class="article-header">
      <h1>{$article.title}</h1>
      <p>{$article.date}</p>
    </div>
    <section class="article-body">
      <svelte:component this={$article.component} />
    </section>
  </article>
{:else}
  <p>文章找不到。</p>
{/if}

<style>
  .article-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }

  .article-header h1 {
    color: #111;
    font-weight: 700;
    font-size: 2rem;
    font-weight: 600;
    margin: 0;
  }

  .article-header p {
    font-size: 0.75rem;
    color: #555;
    margin: 0;
    white-space: nowrap;
    font-style: italic;
    font-weight: 400;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #222;
  }

  .article-body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft JhengHei", sans-serif;
    font-size: 0.9rem;
    line-height: 1.8;
  }

  :global(.article-body hr) {
    border: none;
    border-top: 1px solid #ddd;
    margin: 10px 0 20px 0;
  }

  :global(.article-body h2) {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 2.5em 0 1.25em 0;
    padding-bottom: 0.625em;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  :global(.article-body h6) {
    font-size: 0.95rem;
    font-weight: 300;
    color: #666;
    margin: 10px 0;
  }

  :global(.article-body h6::before) {
    content: "▎";
    margin-right: 0.3em;
    color: #aaa;
  }

  :global(.article-body p) {
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1.8;
    margin-bottom: 15px;
  }

  :global(.article-body ul),
  :global(.article-body ol) {
    margin: 15px 0 15px 25px;
    font-weight: 400;
  }

  :global(.article-body li) {
    font-size: 0.9rem;
    font-weight: 400;
    line-height: 1.8;
    margin-bottom: 10px;
  }

  :global(.article-body pre) {
    font-size: 0.9rem;
    line-height: 1.5;
    background: rgba(255, 253, 253, 0.35); /* 透明度 75% */
    padding: 1rem;
    border-radius: 3px;
    overflow-x: auto;
    margin-bottom: 1.5rem;
    background-image: radial-gradient(
        50% 50% at 50% 50%,
        rgba(238, 232, 232, 0.75) 0%,
        rgba(155, 155, 155, 0) 100%
      ),
      linear-gradient(
        180deg,
        var(--color-bg-0) 0%,
        var(--color-bg-1) 15%,
        var(--color-bg-2) 50%
      );
  }

  :global(.article-body code) {
    /* font-family: "Fira Code", "Courier New", monospace; */
    font-size: 0.8rem;
    color: rgba(167, 167, 167, 0) 100%;
  }

  /* 避免內嵌的 <code> 也太小 */
  :global(.article-body p > code) {
    padding: 0.2em 0.4em;
    border-radius: 3px;
  }
</style>
