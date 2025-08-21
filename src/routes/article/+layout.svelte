<script lang="ts">
  import ArticleNav from "$lib/components/ArticleNav.svelte";
</script>

<div class="article-layout">
  <aside>
    <ArticleNav />
  </aside>
  <main>
    <slot />
  </main>
</div>

<style>
  .article-layout {
    display: flex;
    min-height: 100vh;
  }

  aside {
    width: 250px;
    padding: 1rem;
  }

  main {
    flex: 1;
    padding: 2rem;
    overflow: auto;
  }

  @media (max-width: 768px) {
    .article-layout {
      flex-direction: column;
    }

    aside {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid #ddd;
    }
  }
</style>
