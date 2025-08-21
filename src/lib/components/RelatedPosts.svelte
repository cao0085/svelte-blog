<script lang="ts">
  import type { Article } from "$lib/types";
  export let items: Article[] = [];
</script>

{#if items.length}
  <aside class="mt-8">
    <h2 class="text-lg font-semibold mb-2">你可能也會喜歡：</h2>
    <ul class="list-disc pl-5">
      {#each items as item}
        <li>
          <a href="/article/{item.slug}" class="text-blue-600 hover:underline">
            {item.title}
          </a>
        </li>
      {/each}
    </ul>
  </aside>
{/if}
