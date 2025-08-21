<script lang="ts">
</script>

<div class="fancy-background"></div>

<style>
  .fancy-background {
    width: 100%;
    height: 800px;

    background-image: radial-gradient(
        50% 50% at 50% 50%,
        rgba(213, 0, 0, 0.75) 0%,
        rgba(255, 255, 255, 0) 100%
      ),
      linear-gradient(
        180deg,
        var(--color-bg-0, #f2f2f2) 0%,
        var(--color-bg-1, #ffffff) 15%,
        var(--color-bg-2, #eeeeee) 50%
      );
    background-repeat: no-repeat;
    background-size: cover;

    /* ✅ 這段讓邊緣淡出 */
    -webkit-mask-image: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 1) 60%,
      rgba(0, 0, 0, 0) 100%
    );
    mask-image: radial-gradient(
      ellipse at center,
      rgba(0, 0, 0, 1) 60%,
      rgba(0, 0, 0, 0) 100%
    );

    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;

    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
  }
</style>
