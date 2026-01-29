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
    <section class="header-section">
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
    </section>

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
            <div class="entry-header">
              <div class="entry-title">{exp.title}</div>
              <div class="entry-date">{exp.period}</div>
            </div>
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
            <div class="entry-header">
              <div class="entry-title">{edu.degree}</div>
              <div class="entry-date">{edu.date}</div>
            </div>
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
    background: #2c3e50;
    color: white;
    border: none;
    padding: 0.6rem 1.25rem;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.025em;
    cursor: pointer;
    transition: background 0.2s;
  }

  .download-btn:hover {
    background: #1a252f;
  }

  .resume {
    background: white;
    color: #2c3e50;
    padding: 3rem;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    border: 1px solid #e5e5e5;
    font-family: "Georgia", "Times New Roman", serif;
  }

  .header-section {
    margin-bottom: 1rem;
    padding-bottom: 1.5rem;
    text-align: center;
  }

  h1 {
    font-size: 2rem;
    font-weight: 600;
    margin: 0 0 0.75rem 0;
    color: #2c3e50;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    text-align: center;
  }

  .contact {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 0.5rem 0;
    font-size: 0.85rem;
    color: #555;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .contact span {
    display: flex;
    align-items: center;
  }

  .contact span:not(:last-child)::after {
    content: "|";
    margin: 0 0.75rem;
    color: #ccc;
  }

  section {
    margin-bottom: 1.75rem;
  }

  h2 {
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #2c3e50;
    border-bottom: 1px solid #2c3e50;
    padding-bottom: 0.5rem;
    margin: 0 0 1rem 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .entry {
    margin-bottom: 1.25rem;
  }

  .entry-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.25rem;
  }

  .entry-title {
    font-weight: 600;
    font-size: 1rem;
    color: #2c3e50;
  }

  .entry-date {
    color: #666;
    font-size: 0.85rem;
    font-style: italic;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .entry-subtitle {
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 0.5rem;
  }

  ul {
    margin: 0.5rem 0 0 0;
    padding-left: 1.25rem;
  }

  li {
    font-size: 0.9rem;
    margin-bottom: 0.35rem;
    line-height: 1.5;
    color: #444;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  li::marker {
    color: #2c3e50;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.7;
    color: #444;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.35rem 2rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .skill {
    font-size: 0.9rem;
    color: #444;
  }

  @media (max-width: 600px) {
    .resume {
      padding: 1.5rem;
    }

    h1 {
      font-size: 1.5rem;
    }

    .contact span:not(:last-child)::after {
      display: none;
    }

    .contact {
      flex-direction: column;
      gap: 0.25rem;
    }

    .entry-header {
      flex-direction: column;
      gap: 0.25rem;
    }
  }
</style>
