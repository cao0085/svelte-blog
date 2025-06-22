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
    <h1>{$article.title}</h1>
    <p class="text-sm text-gray-500">{$article.date}</p>
    <svelte:component this={$article.component} />
  </article>
{:else}
  <p>文章找不到。</p>
{/if}
