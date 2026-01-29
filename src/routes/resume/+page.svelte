<script lang="ts">
  import { resumeData } from "$lib/data/resume";
  import { jsPDF } from "jspdf";

  function generatePDF() {
    const doc = new jsPDF({
      unit: "mm",
      format: "a4",
    });

    const pageWidth = 210;
    const margin = 15;
    const contentWidth = pageWidth - margin * 2;
    let y = 20;

    // Helper functions
    const drawSectionHeader = (title: string) => {
      doc.setFillColor(220, 220, 220);
      doc.rect(margin, y, contentWidth, 7, "F");
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text(title, margin + 2, y + 5);
      y += 10;
    };

    const drawText = (
      text: string,
      x: number,
      fontSize: number = 10,
      style: "normal" | "bold" = "normal",
    ) => {
      doc.setFontSize(fontSize);
      doc.setFont("helvetica", style);
      doc.text(text, x, y);
    };

    // Name
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text(resumeData.name, margin, y);
    y += 8;

    // Contact info
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const contactLines = [];
    if (resumeData.contact.location)
      contactLines.push(resumeData.contact.location);
    if (resumeData.contact.phone) contactLines.push(resumeData.contact.phone);
    if (resumeData.contact.email) contactLines.push(resumeData.contact.email);
    if (resumeData.contact.github) contactLines.push(resumeData.contact.github);

    doc.text(contactLines.join(" | "), margin, y);
    y += 10;

    // Career Objective
    if (resumeData.objective) {
      drawSectionHeader("Career Objective");
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const objectiveLines = doc.splitTextToSize(
        resumeData.objective,
        contentWidth,
      );
      doc.text(objectiveLines, margin, y);
      y += objectiveLines.length * 5 + 5;
    }

    // Professional Summary
    if (resumeData.summary) {
      drawSectionHeader("Professional Summary");
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const summaryLines = doc.splitTextToSize(
        resumeData.summary,
        contentWidth,
      );
      doc.text(summaryLines, margin, y);
      y += summaryLines.length * 5 + 5;
    }

    // Education
    if (resumeData.education.length > 0) {
      drawSectionHeader("Education");
      resumeData.education.forEach((edu) => {
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text(edu.degree, margin, y);
        y += 5;
        doc.setFont("helvetica", "normal");
        doc.text(edu.date, margin, y);
        y += 5;
        doc.text(edu.school, margin, y);
        y += 8;
      });
    }

    // Work History
    if (resumeData.experience.length > 0) {
      drawSectionHeader("Work History");
      resumeData.experience.forEach((exp) => {
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text(exp.title, margin, y);
        y += 5;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(100, 100, 100);
        doc.text(exp.period, margin, y);
        y += 5;
        doc.setTextColor(0, 0, 0);
        doc.text(exp.company, margin, y);
        y += 5;

        exp.highlights.forEach((highlight) => {
          doc.text(`• ${highlight}`, margin + 2, y);
          y += 5;
        });
        y += 3;
      });
    }

    // Skills
    if (resumeData.skills.length > 0) {
      drawSectionHeader("Skills");
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");

      // Two columns for skills
      const midPoint = Math.ceil(resumeData.skills.length / 2);
      const leftSkills = resumeData.skills.slice(0, midPoint);
      const rightSkills = resumeData.skills.slice(midPoint);

      const startY = y;
      leftSkills.forEach((skill) => {
        doc.text(`• ${skill}`, margin, y);
        y += 5;
      });

      y = startY;
      rightSkills.forEach((skill) => {
        doc.text(`• ${skill}`, margin + contentWidth / 2, y);
        y += 5;
      });
    }

    doc.save("resume.pdf");
  }
</script>

<svelte:head>
  <title>Resume | {resumeData.name}</title>
</svelte:head>

<div class="resume-container">
  <div class="actions">
    <button on:click={generatePDF} class="download-btn"> Download PDF </button>
  </div>

  <div class="resume">
    <header>
      <h1>{resumeData.name}</h1>
      <div class="contact">
        {#if resumeData.contact.location}<span
            >{resumeData.contact.location}</span
          >{/if}
        {#if resumeData.contact.phone}<span>{resumeData.contact.phone}</span
          >{/if}
        {#if resumeData.contact.email}<span>{resumeData.contact.email}</span
          >{/if}
        {#if resumeData.contact.github}<span>{resumeData.contact.github}</span
          >{/if}
      </div>
    </header>

    {#if resumeData.objective}
      <section>
        <h2>Career Objective</h2>
        <p>{resumeData.objective}</p>
      </section>
    {/if}

    {#if resumeData.summary}
      <section>
        <h2>Professional Summary</h2>
        <p>{resumeData.summary}</p>
      </section>
    {/if}

    {#if resumeData.experience.length > 0}
      <section>
        <h2>Work History</h2>
        {#each resumeData.experience as exp}
          <div class="entry">
            <div class="entry-title">{exp.title}</div>
            <div class="entry-date">{exp.period}</div>
            <div class="entry-subtitle">{exp.company}</div>
            <ul>
              {#each exp.highlights as highlight}
                <li>{highlight}</li>
              {/each}
            </ul>
          </div>
        {/each}
      </section>
    {/if}

    {#if resumeData.education.length > 0}
      <section>
        <h2>Education</h2>
        {#each resumeData.education as edu}
          <div class="entry">
            <div class="entry-title">{edu.degree}</div>
            <div class="entry-date">{edu.date}</div>
            <div class="entry-subtitle">{edu.school}</div>
          </div>
        {/each}
      </section>
    {/if}

    <!-- {#if resumeData.skills.length > 0}
      <section>
        <h2>Skills</h2>
        <div class="skills-grid">
          {#each resumeData.skills as skill}
            <span class="skill">• {skill}</span>
          {/each}
        </div>
      </section>
    {/if} -->
  </div>
</div>

<style>
  .resume-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 2rem;
  }

  .actions {
    margin-bottom: 1.5rem;
    text-align: right;
  }

  .download-btn {
    background: var(--color-theme-1, #e63946);
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s;
  }

  .download-btn:hover {
    background: #c1121f;
  }

  .resume {
    background: white;
    color: #333;
    padding: 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }

  header {
    margin-bottom: 1.5rem;
  }

  h1 {
    font-size: 1.8rem;
    margin: 0 0 0.5rem 0;
    color: #333;
  }

  .contact {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem 1rem;
    font-size: 0.9rem;
    color: #666;
  }

  section {
    margin-bottom: 1.5rem;
  }

  h2 {
    font-size: 1rem;
    background: #ddd;
    padding: 0.4rem 0.6rem;
    margin: 0 0 0.75rem 0;
    color: #333;
  }

  .entry {
    margin-bottom: 1rem;
  }

  .entry-title {
    font-weight: bold;
    font-size: 0.95rem;
  }

  .entry-date {
    color: #666;
    font-size: 0.85rem;
  }

  .entry-subtitle {
    font-size: 0.9rem;
  }

  ul {
    margin: 0.5rem 0 0 1.2rem;
    padding: 0;
  }

  li {
    font-size: 0.9rem;
    margin-bottom: 0.25rem;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.5;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.25rem 2rem;
  }

  .skill {
    font-size: 0.9rem;
  }
</style>
