<script lang="ts">
  import { articles } from "$lib/stores/articles";
  import { base } from '$app/paths';
  import type { Article, Category } from "$lib/types";
  console.log(base);
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
    <a href={`${base}/blog`} class="nav-heading-link">文章列表</a>
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
                <li><a href={`${base}/blog/${article.slug}`}>{article.title}</a></li>
              {/each}
            </ul>
          {:else}
            <details bind:open={openSubSections[`${category}_${sub}`]}>
              <summary>{sub}</summary>
              <ul>
                {#each items as article}
                  <li><a href={`${base}/blog/${article.slug}`}>{article.title}</a></li>
                {/each}
              </ul>
            </details>
          {/if}
        {/each}
      {/if}
    </section>
  {/each}
</nav>


<style>

nav ul {
  margin-top: 0.5em;
  margin-bottom: 1em;
  padding-left: 1.25em; /* 保留縮排，視覺層級清楚 */
}

/* 調整 li 間距更緊湊，減少垂直空白 */
nav li {
  margin-bottom: 0.4em;
  line-height: 1.5;
  --color-text-subtle: rgba(0, 0, 0, 0.5);
}

/* 可選：讓 link 更符合清單樣式 */
nav li a {
  color: var(--color-text);
  text-decoration: none;
}

nav li a:hover {
  color: var(--color-theme-1);
  text-decoration: underline;
}

details summary {
  cursor: pointer;
  font-weight: 600;
  margin-top: 0.75em;
}
</style>
