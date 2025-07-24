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
    gap: 0.75rem;
    align-items: flex-end;
  }

  .article-header h1 {
    color: rgb(61, 61, 60);
    font-weight: 700;
    font-size: 2rem;
    margin: 0;
  }

  .article-header p {
    font-size: 1rem;
    color: rgb(111, 110, 110);
    margin: 0;
    white-space: nowrap;
  }

  .article-body {
    font-family: "Roboto", "Arial", sans-serif;
  }

  :global(.article-body hr) {
    border-color: rgb(148, 148, 148);
  }
  :global(.article-body h2) {
    font-size: 1.75rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  :global(.article-body h6) {
    font-size: 1rem;
    color: rgb(61, 61, 60);
    margin-top: 0.75rem;
    margin-bottom: 0.75rem;
  }

  :global(.article-body p) {
    margin: 8px;
  }

  :global(.article-body ul) {
    margin: 8px;
  }

  :global(.article-body li) {
    font-size: 0.95rem;
    margin: 8px;
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
