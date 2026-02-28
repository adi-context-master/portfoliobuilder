import { ResumeData } from "@/types/resume";
import { baseReset } from "./base-styles";
import { escapeHtml } from "@/lib/utils";

export function generate(data: ResumeData): string {
  const e = escapeHtml;

  const contactItems: string[] = [];
  if (data.email) {
    contactItems.push(
      `<a href="mailto:${e(data.email)}" class="contact-link">${e(data.email)}</a>`
    );
  }
  if (data.phone) {
    contactItems.push(`<span class="contact-item">${e(data.phone)}</span>`);
  }
  if (data.location) {
    contactItems.push(`<span class="contact-item">${e(data.location)}</span>`);
  }
  if (data.website) {
    contactItems.push(
      `<a href="${e(data.website)}" target="_blank" rel="noopener noreferrer" class="contact-link">${e(data.website)}</a>`
    );
  }
  if (data.linkedin) {
    contactItems.push(
      `<a href="${e(data.linkedin)}" target="_blank" rel="noopener noreferrer" class="contact-link">LinkedIn</a>`
    );
  }
  if (data.github) {
    contactItems.push(
      `<a href="${e(data.github)}" target="_blank" rel="noopener noreferrer" class="contact-link">GitHub</a>`
    );
  }

  const headerSection = `
    <header class="header">
      <div class="header-inner">
        ${data.name ? `<h1 class="name">${e(data.name)}</h1>` : ""}
        ${data.title ? `<p class="title">${e(data.title)}</p>` : ""}
        ${
          contactItems.length > 0
            ? `<div class="contact-row">${contactItems.join('<span class="contact-separator">/</span>')}</div>`
            : ""
        }
      </div>
    </header>
  `;

  const summarySection = data.summary
    ? `
    <section class="section">
      <h2 class="section-heading">About</h2>
      <p class="summary-text">${e(data.summary)}</p>
    </section>
  `
    : "";

  const experienceSection =
    data.experience.length > 0
      ? `
    <section class="section">
      <h2 class="section-heading">Experience</h2>
      <div class="entries">
        ${data.experience
          .map(
            (exp) => `
          <div class="entry">
            <div class="entry-header">
              <div>
                <h3 class="entry-title">${e(exp.role)}</h3>
                <p class="entry-subtitle">${e(exp.company)}</p>
              </div>
              <span class="entry-date">${e(exp.startDate)}${exp.endDate ? ` &mdash; ${e(exp.endDate)}` : ""}</span>
            </div>
            ${exp.description ? `<p class="entry-description">${e(exp.description)}</p>` : ""}
          </div>
        `
          )
          .join("")}
      </div>
    </section>
  `
      : "";

  const educationSection =
    data.education.length > 0
      ? `
    <section class="section">
      <h2 class="section-heading">Education</h2>
      <div class="entries">
        ${data.education
          .map(
            (edu) => `
          <div class="entry">
            <div class="entry-header">
              <div>
                <h3 class="entry-title">${e(edu.degree)}${edu.field ? ` in ${e(edu.field)}` : ""}</h3>
                <p class="entry-subtitle">${e(edu.institution)}</p>
              </div>
              <span class="entry-date">${e(edu.startDate)}${edu.endDate ? ` &mdash; ${e(edu.endDate)}` : ""}</span>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </section>
  `
      : "";

  const skillsSection =
    data.skills.length > 0
      ? `
    <section class="section">
      <h2 class="section-heading">Skills</h2>
      <div class="skills-grid">
        ${data.skills.map((skill) => `<span class="skill-badge">${e(skill)}</span>`).join("")}
      </div>
    </section>
  `
      : "";

  const projectsSection =
    data.projects.length > 0
      ? `
    <section class="section">
      <h2 class="section-heading">Projects</h2>
      <div class="projects-grid">
        ${data.projects
          .map(
            (proj) => `
          <div class="project-card">
            <div class="project-card-header">
              ${
                proj.url
                  ? `<a href="${e(proj.url)}" target="_blank" rel="noopener noreferrer" class="project-name">${e(proj.name)}</a>`
                  : `<h3 class="project-name">${e(proj.name)}</h3>`
              }
            </div>
            ${proj.description ? `<p class="project-description">${e(proj.description)}</p>` : ""}
            ${
              proj.technologies.length > 0
                ? `<div class="project-tech">${proj.technologies.map((t) => `<span class="tech-tag">${e(t)}</span>`).join("")}</div>`
                : ""
            }
          </div>
        `
          )
          .join("")}
      </div>
    </section>
  `
      : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${data.name ? e(data.name) : "Portfolio"}</title>
  <style>
    ${baseReset}

    :root {
      --bg-primary: #0a0a0a;
      --bg-surface: #111111;
      --bg-surface-hover: #1a1a1a;
      --text-primary: #ffffff;
      --text-secondary: #a0a0a0;
      --text-muted: #666666;
      --gradient-start: #3b82f6;
      --gradient-end: #8b5cf6;
      --border-subtle: #222222;
      --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        'Helvetica Neue', Arial, sans-serif;
    }

    body {
      font-family: var(--font-sans);
      background-color: var(--bg-primary);
      color: var(--text-primary);
    }

    /* --- Header --- */
    .header {
      padding: 80px 24px 60px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .header::before {
      content: '';
      position: absolute;
      top: -40%;
      left: 50%;
      transform: translateX(-50%);
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(59,130,246,0.12) 0%, rgba(139,92,246,0.06) 50%, transparent 70%);
      pointer-events: none;
    }

    .header-inner {
      position: relative;
      max-width: 800px;
      margin: 0 auto;
    }

    .name {
      font-size: 4rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.1;
      background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 12px;
    }

    .title {
      font-size: 1.35rem;
      font-weight: 400;
      color: var(--text-secondary);
      margin-bottom: 28px;
    }

    .contact-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      gap: 8px;
      font-size: 0.95rem;
      color: var(--text-muted);
    }

    .contact-link {
      color: var(--text-secondary);
      transition: color 0.2s ease;
    }

    .contact-link:hover {
      color: var(--gradient-start);
    }

    .contact-separator {
      color: var(--border-subtle);
      user-select: none;
    }

    .contact-item {
      color: var(--text-secondary);
    }

    /* --- Layout --- */
    .main-content {
      max-width: 860px;
      margin: 0 auto;
      padding: 0 24px 80px;
    }

    /* --- Sections --- */
    .section {
      margin-bottom: 64px;
    }

    .section-heading {
      font-size: 1.75rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      margin-bottom: 32px;
      padding-bottom: 12px;
      position: relative;
      display: inline-block;
    }

    .section-heading::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 3px;
      border-radius: 2px;
      background: linear-gradient(90deg, var(--gradient-start), var(--gradient-end));
    }

    /* --- Summary --- */
    .summary-text {
      font-size: 1.15rem;
      line-height: 1.8;
      color: var(--text-secondary);
      max-width: 720px;
    }

    /* --- Entries (Experience / Education) --- */
    .entries {
      display: flex;
      flex-direction: column;
      gap: 36px;
    }

    .entry {
      padding: 28px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      transition: border-color 0.2s ease, background-color 0.2s ease;
    }

    .entry:hover {
      border-color: #333333;
      background-color: var(--bg-surface-hover);
    }

    .entry-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 12px;
    }

    .entry-title {
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .entry-subtitle {
      font-size: 1rem;
      color: var(--text-secondary);
      margin-top: 4px;
    }

    .entry-date {
      font-size: 0.85rem;
      color: var(--text-muted);
      white-space: nowrap;
      flex-shrink: 0;
      padding-top: 4px;
    }

    .entry-description {
      font-size: 0.95rem;
      line-height: 1.7;
      color: var(--text-secondary);
    }

    /* --- Skills --- */
    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .skill-badge {
      position: relative;
      display: inline-block;
      padding: 10px 20px;
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--text-primary);
      background: var(--bg-surface);
      border-radius: 9999px;
      border: 1px solid transparent;
      background-clip: padding-box;
    }

    .skill-badge::before {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: 9999px;
      padding: 1px;
      background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }

    /* --- Projects --- */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 24px;
    }

    .project-card {
      padding: 28px;
      background: var(--bg-surface);
      border: 1px solid var(--border-subtle);
      border-radius: 12px;
      transition: border-color 0.25s ease, transform 0.25s ease, background-color 0.25s ease;
    }

    .project-card:hover {
      border-color: #333333;
      background-color: var(--bg-surface-hover);
      transform: translateY(-2px);
    }

    .project-card-header {
      margin-bottom: 12px;
    }

    .project-name {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--text-primary);
      background: linear-gradient(135deg, var(--gradient-start), var(--gradient-end));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      display: inline;
    }

    .project-description {
      font-size: 0.9rem;
      line-height: 1.7;
      color: var(--text-secondary);
      margin-bottom: 16px;
    }

    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .tech-tag {
      font-size: 0.78rem;
      font-weight: 500;
      padding: 4px 12px;
      border-radius: 6px;
      background: rgba(59, 130, 246, 0.1);
      color: var(--gradient-start);
      border: 1px solid rgba(59, 130, 246, 0.15);
    }

    /* --- Responsive --- */
    @media (max-width: 768px) {
      .header {
        padding: 56px 20px 40px;
      }

      .name {
        font-size: 2.6rem;
      }

      .title {
        font-size: 1.1rem;
      }

      .main-content {
        padding: 0 20px 60px;
      }

      .section {
        margin-bottom: 48px;
      }

      .section-heading {
        font-size: 1.4rem;
        margin-bottom: 24px;
      }

      .entry-header {
        flex-direction: column;
        gap: 4px;
      }

      .entry-date {
        padding-top: 0;
      }

      .projects-grid {
        grid-template-columns: 1fr;
      }

      .entry {
        padding: 20px;
      }

      .project-card {
        padding: 20px;
      }
    }

    @media (max-width: 480px) {
      .header {
        padding: 40px 16px 32px;
      }

      .name {
        font-size: 2rem;
      }

      .title {
        font-size: 1rem;
        margin-bottom: 20px;
      }

      .contact-row {
        font-size: 0.85rem;
        gap: 6px;
      }

      .main-content {
        padding: 0 16px 48px;
      }

      .summary-text {
        font-size: 1rem;
      }

      .skill-badge {
        padding: 8px 16px;
        font-size: 0.82rem;
      }
    }
  </style>
</head>
<body>
  ${headerSection}
  <main class="main-content">
    ${summarySection}
    ${experienceSection}
    ${educationSection}
    ${skillsSection}
    ${projectsSection}
  </main>
</body>
</html>`;
}
