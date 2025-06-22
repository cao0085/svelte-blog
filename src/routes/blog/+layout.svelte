<script lang="ts">
  import ArticleNav from "$lib/components/ArticleNav.svelte";
</script>

<div class="blog-layout">
  <aside>
    <ArticleNav />
  </aside>
  <main>
    <slot />
  </main>
</div>

<style>
  .blog-layout {
    display: flex;
    min-height: 100vh;
  }

  aside {
    width: 250px;
    padding: 1rem;
    border-right: 1px solid #ddd;
    background-color: #f9f9f9;
  }

  main {
    flex: 1;
    padding: 2rem;
    overflow: auto;
  }

  @media (max-width: 768px) {
    .blog-layout {
      flex-direction: column;
    }

    aside {
      width: 100%;
      border-right: none;
      border-bottom: 1px solid #ddd;
    }
  }
</style>
