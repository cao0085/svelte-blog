<svelte:head>
  <title>Skills</title>
</svelte:head>

<div class="skills-container">
  <h1>基礎架構實作</h1>

  <section>
    <h2>前端</h2>
    <div class="cards">
      <a
        href="https://github.com/cao0085/base-web-design"
        target="_blank"
        class="card">React SPA</a
      >
      <a
        href="https://github.com/cao0085/angular-20"
        target="_blank"
        class="card">Angular20 ERP</a
      >
    </div>
  </section>

  <section>
    <h2>後端</h2>
    <div class="cards">
      <a
        href="https://github.com/cao0085/go-ddd-high-concurrency"
        target="_blank"
        class="card">go-high-concurrency</a
      >
      <a href="https://github.com/cao0085/CleanDDD" target="_blank" class="card"
        >.Net DDD</a
      >
      <a
        href="https://github.com/cao0085/csharpapi-template"
        target="_blank"
        class="card">.Net MVC</a
      >
    </div>
  </section>

  <section>
    <h2>地端</h2>
    <div class="cards">
      <a
        href="https://github.com/cao0085/golangTools"
        target="_blank"
        class="card">golang tool</a
      >
      <a
        href="https://github.com/cao0085/pdfMerger"
        target="_blank"
        class="card">C# tool</a
      >
    </div>
  </section>

  <section>
    <h2>個人連結</h2>
    <div class="cards">
      <a
        href="https://blog.yoshikagehub.com/resume"
        target="_blank"
        class="card">Resume</a
      >
      <a
        href="https://blog.yoshikagehub.com/article"
        target="_blank"
        class="card">Blog</a
      >
    </div>
  </section>
</div>

<style>
  .skills-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 3rem 2rem;
  }

  h1 {
    /* font-size: 2.5rem; */
    font-weight: 600;
    /* color: #2c3e50; */
    /* text-align: center; */
    /* margin: 0 0 3rem 0; */
    letter-spacing: 0.05em;
    /* text-transform: uppercase; */
  }

  section {
    margin-bottom: 2.5rem;
  }

  h2 {
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    /* color: #888; */
    margin: 0 0 1rem 0;
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
  }

  .card {
    display: inline-block;
    padding: 0.5rem 0.75rem;
    /* background: #fff; */
    /* border: 1px solid #e0e0e0; */
    border-radius: 8px;
    color: #2c3e50;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.2s ease;
    /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04); */
  }

  .card:hover {
    /* border-color: #2c3e50; */
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  @media (max-width: 600px) {
    .skills-container {
      padding: 2rem 1rem;
    }

    h1 {
      font-size: 1.75rem;
      margin-bottom: 2rem;
    }

    .cards {
      gap: 0.75rem;
    }

    .card {
      padding: 0.75rem 1rem;
      font-size: 0.9rem;
    }
  }
</style>
