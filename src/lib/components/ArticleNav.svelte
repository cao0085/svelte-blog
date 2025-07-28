<script lang="ts">
  import { articles } from "$lib/stores/articles";
  import { base } from '$app/paths';
  import type { Article, Category } from "$lib/types";
  type GroupedArticles = {
    [K in Category]?: {
      [subCategory: string]: Article[];
    };
  };

  const CATEGORY_LABELS: Record<Category, string> = {
    software: "Software",
    music: "測試",
    read: "閱讀心得",
  };
  let openSections: Record<string, boolean> = {};
  let openSubSections: Record<string, boolean> = {};

  $: grouped = (() => {
    const map: GroupedArticles = {};

    if ($articles?.length) {
      for (const article of $articles) {
        if (!article?.category) continue;

        const { category, subCategory } = article;
        const sub = subCategory || "__uncategorized__";

        if (!map[category]) {
          map[category] = {};
        }

        if (!map[category][sub]) {
          map[category][sub] = [];
        }

        map[category][sub].push(article);
      }
    }

    return map;
  })();
</script>

<nav>
  <h2>
    <a href="{base}/blog" class="nav-heading-link">文章列表</a>
  </h2>

  {#each Object.entries(grouped) as [category, subGroups]}
    <section>
      <button
        class="category-toggle"
        on:click={() => (openSections[category] = !openSections[category])}
        aria-expanded={openSections[category]}
      >
        {CATEGORY_LABELS[category] ?? category}
      </button>

      {#if openSections[category]}
        {#each Object.entries(subGroups) as [sub, items]}
          {#if sub === "__uncategorized__"}
            <ul>
              {#each items as article}
                <li><a href={`/blog/${article.slug}`}>{article.title}</a></li>
              {/each}
            </ul>
          {:else}
            <details bind:open={openSubSections[`${category}_${sub}`]}>
              <summary>{sub}</summary>
              <ul>
                {#each items as article}
                  <li><a href={`/blog/${article.slug}`}>{article.title}</a></li>
                {/each}
              </ul>
            </details>
          {/if}
        {/each}
      {/if}
    </section>
  {/each}
</nav>
