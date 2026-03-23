<script lang="ts">
  import { articles } from "$lib/stores/articles";
  import { base } from "$app/paths";
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
  let openSections: Record<string, boolean> = { software: true };
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
    <!-- <a href={`${base}/article`} class="nav-heading-link">文章列表</a> -->
  </h2>

  {#each Object.entries(grouped) as [category, subGroups]}
    <section>
      <button
        class="category-toggle"
        on:click={() => (openSections[category] = !openSections[category])}
        aria-expanded={openSections[category]}
      >
        <span class="arrow" class:open={openSections[category]}>›</span>
        {CATEGORY_LABELS[category] ?? category}
      </button>

      {#if openSections[category]}
        {#each Object.entries(subGroups) as [sub, items]}
          {#if sub === "__uncategorized__"}
            <ul>
              {#each items as article}
                <li>
                  <a href={`${base}/article/${article.slug}`}>{article.title}</a
                  >
                </li>
              {/each}
            </ul>
          {:else}
            <details bind:open={openSubSections[`${category}_${sub}`]}>
              <summary>{sub}</summary>
              <ul>
                {#each items as article}
                  <li>
                    <a href={`${base}/article/${article.slug}`}
                      >{article.title}</a
                    >
                  </li>
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
  nav {
    font-size: 1.025rem;
  }

  nav h2 {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0 0 1rem 0;
  }

  .nav-heading-link {
    color: var(--color-text);
    text-decoration: none;
  }

  .nav-heading-link:hover {
    color: var(--color-theme-2);
  }

  section {
    margin-bottom: 0.25rem;
  }

  .category-toggle {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    width: 100%;
    background: none;
    border: none;
    padding: 0.3rem 0;
    font-size: 1rem;
    font-weight: 600;
    color: #333;
    cursor: pointer;
    text-align: left;
    letter-spacing: 0.02em;
  }

  .category-toggle:hover {
    color: #111;
  }

  .arrow {
    display: inline-block;
    font-style: normal;
    transition: transform 0.15s ease;
    color: #888;
    font-size: 1.125rem;
    line-height: 1;
  }

  .arrow.open {
    transform: rotate(90deg);
  }

  nav ul {
    list-style: none;
    margin: 0.25rem 0 0.5rem 0;
    padding-left: 1rem;
  }

  nav li {
    margin-bottom: 0.25rem;
    line-height: 1.5;
  }

  nav li a {
    color: #333;
    text-decoration: none;
    font-size: 1rem;
  }

  nav li a:hover {
    color: var(--color-theme-2);
  }

  details summary {
    cursor: pointer;
    padding: 0.25rem 0;
    font-size: 1rem;
    color: #444;
    list-style: none;
  }

  details summary::-webkit-details-marker {
    display: none;
  }

  details summary::before {
    content: "›";
    display: inline-block;
    margin-right: 0.3rem;
    color: #888;
    transition: transform 0.15s ease;
  }

  details[open] summary::before {
    transform: rotate(90deg);
  }
</style>
