<script lang="ts">
  import ArticleNav from "$lib/components/ArticleNav.svelte";
  import HalftoneBackground from "$lib/components/HalftoneBackground.svelte";
</script>

<!-- Fixed background: left viewport edge → right edge of nav -->
<div class="left-panel-bg">
  <HalftoneBackground />
</div>

<div class="article-layout">
  <aside>
    <ArticleNav />
  </aside>
  <main>
    <slot />
  </main>
</div>

<style>
  /* Covers from viewport left edge to the end of the aside,
     accounting for the centered container's left margin */
  .left-panel-bg {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    /* (viewport - container) / 2  +  aside width */
    width: calc((100vw - min(100vw, 64rem)) / 2 + 250px);
    pointer-events: none;
    z-index: 0;
  }

  .article-layout {
    position: relative;
    z-index: 1;
    display: flex;
    min-height: 100vh;
  }

  aside {
    width: 250px;
    padding: 1rem;
    flex-shrink: 0;
  }

  main {
    flex: 1;
    padding: 2rem;
    overflow: auto;
  }

  @media (max-width: 768px) {
    .left-panel-bg {
      display: none;
    }

    .article-layout {
      flex-direction: column;
    }

    aside {
      width: 100%;
      border-bottom: 1px solid #ddd;
    }
  }
</style>
