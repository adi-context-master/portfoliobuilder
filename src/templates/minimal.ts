import { ResumeData } from "@/types/resume";
import { baseReset } from "./base-styles";
import { escapeHtml } from "@/lib/utils";

export function generate(data: ResumeData): string {
  const e = escapeHtml; // shorthand

  const styles = `
    ${baseReset}

    :root {
      --color-bg: #ffffff;
      --color-text: #1a1a1a;
      --color-text-secondary: #555555;
      --color-text-muted: #888888;
      --color-border: #e5e5e5;
      --color-accent: #333333;
      --color-link: #0066cc;
      --color-link-hover: #004499;
      --color-skill-bg: #f5f5f5;
      --font-stack: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
        Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        Arial, sans-serif;
    }

    body {
      font-family: var(--font-stack);
      background-color: var(--color-bg);
      color: var(--color-text);
      font-size: 16px;
      line-height: 1.7;
    }

    .container {
      max-width: 800px;
      margin: 0 auto;
      padding: 80px 24px;
    }

    /* ---- Header ---- */
    .header {
      margin-bottom: 56px;
    }

    .header__name {
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: -0.025em;
      line-height: 1.2;
      color: var(--color-text);
    }

    .header__title {
      font-size: 1.15rem;
      font-weight: 400;
      color: var(--color-text-secondary);
      margin-top: 4px;
    }

    .header__contact {
      display: flex;
      flex-wrap: wrap;
      gap: 8px 20px;
      margin-top: 20px;
      font-size: 0.9rem;
      color: var(--color-text-muted);
    }

    .header__contact a {
      color: var(--color-link);
      transition: color 0.15s ease;
    }

    .header__contact a:hover {
      color: var(--color-link-hover);
    }

    .header__contact-separator {
      display: none;
    }

    /* ---- Sections ---- */
    .section {
      margin-bottom: 48px;
    }

    .section:last-child {
      margin-bottom: 0;
    }

    .section__title {
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--color-text-muted);
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 1px solid var(--color-border);
    }

    /* ---- Summary ---- */
    .summary__text {
      font-size: 1.05rem;
      line-height: 1.8;
      color: var(--color-text-secondary);
    }

    /* ---- Experience ---- */
    .experience-item {
      margin-bottom: 32px;
    }

    .experience-item:last-child {
      margin-bottom: 0;
    }

    .experience-item__header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 4px 16px;
      margin-bottom: 6px;
    }

    .experience-item__role {
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--color-text);
    }

    .experience-item__dates {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      white-space: nowrap;
    }

    .experience-item__company {
      font-size: 0.95rem;
      color: var(--color-text-secondary);
      margin-bottom: 8px;
    }

    .experience-item__description {
      font-size: 0.95rem;
      color: var(--color-text-secondary);
      line-height: 1.7;
    }

    /* ---- Education ---- */
    .education-item {
      margin-bottom: 24px;
    }

    .education-item:last-child {
      margin-bottom: 0;
    }

    .education-item__header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 4px 16px;
      margin-bottom: 4px;
    }

    .education-item__degree {
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--color-text);
    }

    .education-item__dates {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      white-space: nowrap;
    }

    .education-item__institution {
      font-size: 0.95rem;
      color: var(--color-text-secondary);
    }

    /* ---- Skills ---- */
    .skills__list {
      display: flex;
      flex-wrap: wrap;
      gap: 10px;
    }

    .skills__item {
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--color-text-secondary);
      background-color: var(--color-skill-bg);
      padding: 6px 14px;
      border-radius: 4px;
    }

    /* ---- Projects ---- */
    .project-item {
      margin-bottom: 28px;
    }

    .project-item:last-child {
      margin-bottom: 0;
    }

    .project-item__name {
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--color-text);
    }

    .project-item__name a {
      color: var(--color-link);
      transition: color 0.15s ease;
    }

    .project-item__name a:hover {
      color: var(--color-link-hover);
    }

    .project-item__description {
      font-size: 0.95rem;
      color: var(--color-text-secondary);
      line-height: 1.7;
      margin-top: 4px;
    }

    .project-item__technologies {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 10px;
    }

    .project-item__tech-tag {
      font-size: 0.78rem;
      font-weight: 500;
      color: var(--color-text-muted);
      background-color: var(--color-skill-bg);
      padding: 3px 10px;
      border-radius: 3px;
    }

    /* ---- Responsive ---- */
    @media (max-width: 600px) {
      .container {
        padding: 48px 20px;
      }

      .header {
        margin-bottom: 40px;
      }

      .header__name {
        font-size: 1.85rem;
      }

      .header__title {
        font-size: 1.05rem;
      }

      .header__contact {
        flex-direction: column;
        gap: 4px;
      }

      .section {
        margin-bottom: 36px;
      }

      .experience-item__header,
      .education-item__header {
        flex-direction: column;
        gap: 2px;
      }

      .experience-item__dates,
      .education-item__dates {
        order: -1;
      }
    }

    @media print {
      .container {
        padding: 0;
        max-width: 100%;
      }

      body {
        font-size: 12pt;
      }
    }
  `;

  // --- Build contact items ---
  const contactItems: string[] = [];
  if (data.email) {
    contactItems.push(`<a href="mailto:${e(data.email)}">${e(data.email)}</a>`);
  }
  if (data.phone) {
    contactItems.push(`<a href="tel:${e(data.phone)}">${e(data.phone)}</a>`);
  }
  if (data.location) {
    contactItems.push(`<span>${e(data.location)}</span>`);
  }
  if (data.website) {
    const display = data.website.replace(/^https?:\/\//, "");
    contactItems.push(
      `<a href="${e(data.website)}" target="_blank" rel="noopener noreferrer">${e(display)}</a>`
    );
  }
  if (data.linkedin) {
    const display = data.linkedin.replace(/^https?:\/\/(www\.)?/, "");
    contactItems.push(
      `<a href="${e(data.linkedin)}" target="_blank" rel="noopener noreferrer">${e(display)}</a>`
    );
  }
  if (data.github) {
    const display = data.github.replace(/^https?:\/\/(www\.)?/, "");
    contactItems.push(
      `<a href="${e(data.github)}" target="_blank" rel="noopener noreferrer">${e(display)}</a>`
    );
  }

  // --- Build header ---
  const headerHtml = `
    <header class="header">
      <h1 class="header__name">${e(data.name)}</h1>
      ${data.title ? `<p class="header__title">${e(data.title)}</p>` : ""}
      ${
        contactItems.length > 0
          ? `<div class="header__contact">${contactItems.join('<span aria-hidden="true">&middot;</span>')}</div>`
          : ""
      }
    </header>
  `;

  // --- Build summary ---
  const summaryHtml = data.summary
    ? `
    <section class="section">
      <h2 class="section__title">About</h2>
      <p class="summary__text">${e(data.summary)}</p>
    </section>
  `
    : "";

  // --- Build experience ---
  const experienceHtml =
    data.experience.length > 0
      ? `
    <section class="section">
      <h2 class="section__title">Experience</h2>
      ${data.experience
        .map(
          (exp) => `
        <div class="experience-item">
          <div class="experience-item__header">
            <span class="experience-item__role">${e(exp.role)}</span>
            ${
              exp.startDate || exp.endDate
                ? `<span class="experience-item__dates">${e(exp.startDate)}${exp.startDate && exp.endDate ? " &ndash; " : ""}${e(exp.endDate)}</span>`
                : ""
            }
          </div>
          <div class="experience-item__company">${e(exp.company)}</div>
          ${exp.description ? `<p class="experience-item__description">${e(exp.description)}</p>` : ""}
        </div>
      `
        )
        .join("")}
    </section>
  `
      : "";

  // --- Build education ---
  const educationHtml =
    data.education.length > 0
      ? `
    <section class="section">
      <h2 class="section__title">Education</h2>
      ${data.education
        .map(
          (edu) => `
        <div class="education-item">
          <div class="education-item__header">
            <span class="education-item__degree">${e(edu.degree)}${edu.field ? `, ${e(edu.field)}` : ""}</span>
            ${
              edu.startDate || edu.endDate
                ? `<span class="education-item__dates">${e(edu.startDate)}${edu.startDate && edu.endDate ? " &ndash; " : ""}${e(edu.endDate)}</span>`
                : ""
            }
          </div>
          <div class="education-item__institution">${e(edu.institution)}</div>
        </div>
      `
        )
        .join("")}
    </section>
  `
      : "";

  // --- Build skills ---
  const skillsHtml =
    data.skills.length > 0
      ? `
    <section class="section">
      <h2 class="section__title">Skills</h2>
      <div class="skills__list">
        ${data.skills.map((skill) => `<span class="skills__item">${e(skill)}</span>`).join("")}
      </div>
    </section>
  `
      : "";

  // --- Build projects ---
  const projectsHtml =
    data.projects.length > 0
      ? `
    <section class="section">
      <h2 class="section__title">Projects</h2>
      ${data.projects
        .map(
          (proj) => `
        <div class="project-item">
          <div class="project-item__name">
            ${
              proj.url
                ? `<a href="${e(proj.url)}" target="_blank" rel="noopener noreferrer">${e(proj.name)}</a>`
                : e(proj.name)
            }
          </div>
          ${proj.description ? `<p class="project-item__description">${e(proj.description)}</p>` : ""}
          ${
            proj.technologies.length > 0
              ? `<div class="project-item__technologies">${proj.technologies.map((tech) => `<span class="project-item__tech-tag">${e(tech)}</span>`).join("")}</div>`
              : ""
          }
        </div>
      `
        )
        .join("")}
    </section>
  `
      : "";

  // --- Assemble full document ---
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${e(data.name)}${data.title ? ` &ndash; ${e(data.title)}` : ""}</title>
  <style>${styles}</style>
</head>
<body>
  <div class="container">
    ${headerHtml}
    ${summaryHtml}
    ${experienceHtml}
    ${educationHtml}
    ${skillsHtml}
    ${projectsHtml}
  </div>
</body>
</html>`;
}
