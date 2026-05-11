<script lang="ts">
  import { resumeData } from "$lib/data/resume";
  import { jsPDF } from "jspdf";

  function generatePDF() {
    const doc = new jsPDF({
      unit: "mm",
      format: "a4",
    });

    const pageWidth = 210;
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let y = 18;

    // Colors
    const primaryColor: [number, number, number] = [44, 62, 80];
    const textColor: [number, number, number] = [68, 68, 68];
    const subtitleColor: [number, number, number] = [85, 85, 85];

    const drawSectionHeader = (title: string) => {
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(...primaryColor);
      doc.text(title.toUpperCase(), margin, y);
      y += 3;
      doc.setDrawColor(...primaryColor);
      doc.setLineWidth(0.3);
      doc.line(margin, y, margin + contentWidth, y);
      y += 7;
    };

    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(...primaryColor);
    const nameText = resumeData.name.toUpperCase();
    const nameWidth = doc.getTextWidth(nameText);
    doc.text(nameText, (pageWidth - nameWidth) / 2, y);
    y += 8;

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(...subtitleColor);
    const contactParts = [];
    if (resumeData.contact.location) {
      contactParts.push(resumeData.contact.location);
    }
    if (resumeData.contact.phone) {
      contactParts.push(resumeData.contact.phone);
    }
    if (resumeData.contact.email) {
      contactParts.push(resumeData.contact.email);
    }
    if (resumeData.contact.github) {
      contactParts.push(resumeData.contact.github);
    }
    const contactText = contactParts.join("  |  ");
    const contactWidth = doc.getTextWidth(contactText);
    doc.text(contactText, (pageWidth - contactWidth) / 2, y);
    y += 12;

    if (resumeData.summary) {
      drawSectionHeader("Professional Summary");
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(...textColor);
      const summaryLines = doc.splitTextToSize(
        resumeData.summary,
        contentWidth,
      );
      doc.text(summaryLines, margin, y);
      y += summaryLines.length * 5 + 6;
    }

    if (resumeData.skills.length > 0) {
      drawSectionHeader("Technical Skills");
      doc.setFontSize(10);
      doc.setTextColor(...textColor);
      resumeData.skills.forEach((group) => {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...primaryColor);
        doc.text(`${group.category}:`, margin, y);
        const labelWidth = doc.getTextWidth(`${group.category}:  `);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(...textColor);
        const itemsText = group.items.join(", ");
        const itemLines = doc.splitTextToSize(
          itemsText,
          contentWidth - labelWidth,
        );
        doc.text(itemLines, margin + labelWidth, y);
        y += itemLines.length * 5.5;
      });
      y += 4;
    }

    if (resumeData.sideprojects.length > 0) {
      drawSectionHeader("Side Projects");
      resumeData.sideprojects.forEach((exp) => {
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...primaryColor);
        doc.text(exp.title, margin, y);

        doc.setFont("helvetica", "italic");
        doc.setTextColor(...subtitleColor);
        const dateWidth = doc.getTextWidth(exp.link);
        doc.text(exp.link, margin + contentWidth - dateWidth, y);
        y += 5;

        doc.setTextColor(...textColor);
        exp.highlights.forEach((highlight) => {
          const bulletLines = doc.splitTextToSize(
            `- ${highlight}`,
            contentWidth - 4,
          );
          doc.text(bulletLines, margin + 2, y);
          y += bulletLines.length * 5.5;
        });
        y += 5;
      });
    }

    if (resumeData.experience.length > 0) {
      drawSectionHeader("Work Experience");
      resumeData.experience.forEach((exp) => {
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(...primaryColor);
        doc.text(exp.title, margin, y);

        doc.setFont("helvetica", "italic");
        doc.setTextColor(...subtitleColor);
        const dateWidth = doc.getTextWidth(exp.period);
        doc.text(exp.period, margin + contentWidth - dateWidth, y);
        y += 5;

        doc.setFont("helvetica", "normal");
        doc.setTextColor(...subtitleColor);
        doc.text(exp.company, margin, y);
        y += 5;

        doc.setTextColor(...textColor);
        exp.highlights.forEach((highlight) => {
          const bulletLines = doc.splitTextToSize(
            `- ${highlight}`,
            contentWidth - 4,
          );
          doc.text(bulletLines, margin + 2, y);
          y += bulletLines.length * 5.5;
        });
        y += 5;
      });
    }

    const pageHeight = 297;
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(180, 180, 180);
    const updateText = `Last Update: ${resumeData.lastUpdate}`;
    const updateWidth = doc.getTextWidth(updateText);
    doc.text(updateText, (pageWidth - updateWidth) / 2, pageHeight - 10);

    doc.save("fullstack_tonyko_resume.pdf");
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
        {#if resumeData.contact.location}<span>{resumeData.contact.location}</span>{/if}
        {#if resumeData.contact.phone}<span>{resumeData.contact.phone}</span>{/if}
        {#if resumeData.contact.email}<span>{resumeData.contact.email}</span>{/if}
        {#if resumeData.contact.github}<span>{resumeData.contact.github}</span>{/if}
      </div>
    </section>

    {#if resumeData.summary}
      <section>
        <h2>Professional Summary</h2>
        <p>{resumeData.summary}</p>
      </section>
    {/if}

    {#if resumeData.skills.length > 0}
      <section>
        <h2>Technical Skills</h2>
        <div class="skills-list">
          {#each resumeData.skills as group}
            <div class="skill-row">
              <span class="skill-category">{group.category}</span>
              <span class="skill-items">{group.items.join(", ")}</span>
            </div>
          {/each}
        </div>
      </section>
    {/if}

    {#if resumeData.sideprojects.length > 0}
      <section>
        <h2>Side Projects</h2>
        {#each resumeData.sideprojects as exp}
          <div class="entry">
            <div class="entry-header">
              <div class="entry-title">{exp.title}</div>
              <div class="entry-date">{exp.link}</div>
            </div>
            <ul>
              {#each exp.highlights as highlight}
                <li>{highlight}</li>
              {/each}
            </ul>
          </div>
        {/each}
      </section>
    {/if}

    {#if resumeData.experience.length > 0}
      <section>
        <h2>Work Experience</h2>
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

    <div class="last-update">Last Update: {resumeData.lastUpdate}</div>
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
    font-size: 1rem;
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

  .skills-list {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }

  .skill-row {
    display: flex;
    gap: 1rem;
    font-size: 0.9rem;
  }

  .skill-category {
    font-weight: 600;
    color: #2c3e50;
    min-width: 110px;
  }

  .skill-items {
    color: #444;
  }

  @media (max-width: 780px) {
    .resume-container {
      padding: 0;
    }

    .resume {
      padding: 1.5rem 1rem;
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

  .last-update {
    text-align: center;
    font-size: 0.75rem;
    color: #bbb;
    margin-top: 2rem;
    padding-top: 1rem;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  }
</style>
