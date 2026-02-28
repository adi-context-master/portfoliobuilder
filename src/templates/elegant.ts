import { ResumeData } from "@/types/resume";
import { baseReset } from "./base-styles";
import { escapeHtml } from "@/lib/utils";

export function generate(data: ResumeData): string {
  const e = escapeHtml;

  const contactItems: string[] = [];
  if (data.email) contactItems.push(`<a href="mailto:${e(data.email)}" class="contact-link">${e(data.email)}</a>`);
  if (data.phone) contactItems.push(`<a href="tel:${e(data.phone)}" class="contact-link">${e(data.phone)}</a>`);
  if (data.location) contactItems.push(`<span class="contact-item">${e(data.location)}</span>`);
  if (data.website) contactItems.push(`<a href="${e(data.website)}" target="_blank" rel="noopener noreferrer" class="contact-link">${e(data.website)}</a>`);
  if (data.linkedin) contactItems.push(`<a href="${e(data.linkedin)}" target="_blank" rel="noopener noreferrer" class="contact-link">LinkedIn</a>`);
  if (data.github) contactItems.push(`<a href="${e(data.github)}" target="_blank" rel="noopener noreferrer" class="contact-link">GitHub</a>`);

  const hasHeader = data.name || data.title || contactItems.length > 0;
  const hasSummary = data.summary;
  const hasExperience = data.experience.length > 0;
  const hasEducation = data.education.length > 0;
  const hasSkills = data.skills.length > 0;
  const hasProjects = data.projects.length > 0;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${data.name ? e(data.name) + " — Portfolio" : "Portfolio"}</title>
  <style>
    ${baseReset}

    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600&display=swap');

    :root {
      --color-cream: #fdf8f0;
      --color-cream-deep: #faf6f1;
      --color-gold: #b8860b;
      --color-gold-light: #d4a853;
      --color-gold-pale: #f0e6c8;
      --color-charcoal: #2d2d2d;
      --color-charcoal-light: #4a4a4a;
      --color-warm-gray: #7a7168;
      --color-border: #e0d5c5;
      --font-serif: 'Cormorant Garamond', Georgia, Garamond, 'Times New Roman', serif;
      --font-body: Georgia, Garamond, 'Times New Roman', serif;
      --spacing-xs: 0.5rem;
      --spacing-sm: 1rem;
      --spacing-md: 1.75rem;
      --spacing-lg: 2.75rem;
      --spacing-xl: 4rem;
    }

    body {
      font-family: var(--font-body);
      background-color: var(--color-cream);
      color: var(--color-charcoal);
      font-size: 16px;
      line-height: 1.75;
    }

    .page-wrapper {
      max-width: 820px;
      margin: 0 auto;
      padding: var(--spacing-xl) var(--spacing-md);
    }

    /* ---- Header ---- */
    .header {
      text-align: center;
      padding-bottom: var(--spacing-lg);
      border-bottom: 1px solid var(--color-border);
      margin-bottom: var(--spacing-lg);
    }

    .header::before {
      content: '';
      display: block;
      width: 48px;
      height: 2px;
      background: linear-gradient(90deg, var(--color-gold), var(--color-gold-light));
      margin: 0 auto var(--spacing-md);
    }

    .header-name {
      font-family: var(--font-serif);
      font-size: 3rem;
      font-weight: 300;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--color-charcoal);
      margin-bottom: 0.25rem;
      line-height: 1.2;
    }

    .header-title {
      font-family: var(--font-serif);
      font-size: 1.2rem;
      font-weight: 400;
      font-style: italic;
      color: var(--color-gold);
      letter-spacing: 0.08em;
      margin-bottom: var(--spacing-sm);
    }

    .contact-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.4rem 1.5rem;
      margin-top: var(--spacing-sm);
      font-size: 0.875rem;
      color: var(--color-warm-gray);
    }

    .contact-link,
    .contact-item {
      color: var(--color-warm-gray);
      transition: color 0.25s ease;
      position: relative;
    }

    .contact-link:hover {
      color: var(--color-gold);
    }

    .contact-row > *:not(:last-child)::after {
      content: '';
      display: inline-block;
      width: 3px;
      height: 3px;
      background-color: var(--color-gold-light);
      border-radius: 50%;
      vertical-align: middle;
      margin-left: 1.5rem;
    }

    /* ---- Sections ---- */
    .section {
      margin-bottom: var(--spacing-lg);
    }

    .section-heading {
      font-family: var(--font-serif);
      font-size: 1.1rem;
      font-weight: 600;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: var(--color-gold);
      margin-bottom: var(--spacing-md);
      padding-bottom: 0.6rem;
      border-bottom: 1px solid var(--color-border);
      position: relative;
    }

    .section-heading::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 60px;
      height: 1px;
      background: linear-gradient(90deg, var(--color-gold), var(--color-gold-light));
    }

    /* ---- Decorative rule ---- */
    .ornamental-rule {
      border: none;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent,
        var(--color-gold-pale) 20%,
        var(--color-gold-light) 50%,
        var(--color-gold-pale) 80%,
        transparent
      );
      margin: var(--spacing-lg) 0;
    }

    /* ---- Summary ---- */
    .summary-text {
      font-size: 1.05rem;
      line-height: 1.9;
      color: var(--color-charcoal-light);
      max-width: 680px;
      margin: 0 auto;
      text-align: center;
      font-style: italic;
      position: relative;
      padding: 0 var(--spacing-sm);
    }

    .summary-text::before,
    .summary-text::after {
      font-family: var(--font-serif);
      font-size: 2.5rem;
      color: var(--color-gold-light);
      line-height: 1;
      position: absolute;
    }

    .summary-text::before {
      content: '\\201C';
      top: -0.3rem;
      left: -0.75rem;
    }

    .summary-text::after {
      content: '\\201D';
      bottom: -0.8rem;
      right: -0.5rem;
    }

    /* ---- Experience ---- */
    .experience-entry {
      margin-bottom: var(--spacing-md);
      padding-left: var(--spacing-sm);
      border-left: 2px solid var(--color-gold-pale);
    }

    .experience-entry:last-child {
      margin-bottom: 0;
    }

    .experience-role {
      font-family: var(--font-serif);
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--color-charcoal);
      margin-bottom: 0.1rem;
      line-height: 1.4;
    }

    .experience-company {
      font-style: italic;
      color: var(--color-gold);
      font-size: 0.95rem;
      margin-bottom: 0.15rem;
    }

    .experience-dates {
      font-size: 0.82rem;
      letter-spacing: 0.08em;
      color: var(--color-warm-gray);
      text-transform: uppercase;
      margin-bottom: 0.5rem;
    }

    .experience-description {
      font-size: 0.95rem;
      color: var(--color-charcoal-light);
      line-height: 1.8;
    }

    /* ---- Education ---- */
    .education-entry {
      margin-bottom: var(--spacing-md);
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      flex-wrap: wrap;
      gap: 0.25rem 1rem;
    }

    .education-entry:last-child {
      margin-bottom: 0;
    }

    .education-main {
      flex: 1;
      min-width: 200px;
    }

    .education-degree {
      font-family: var(--font-serif);
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--color-charcoal);
      line-height: 1.4;
    }

    .education-field {
      font-style: italic;
      color: var(--color-gold);
      font-size: 0.95rem;
    }

    .education-institution {
      font-size: 0.92rem;
      color: var(--color-charcoal-light);
    }

    .education-dates {
      font-size: 0.82rem;
      letter-spacing: 0.08em;
      color: var(--color-warm-gray);
      text-transform: uppercase;
      white-space: nowrap;
    }

    /* ---- Skills ---- */
    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
    }

    .skill-tag {
      display: inline-block;
      padding: 0.35rem 1rem;
      font-size: 0.82rem;
      letter-spacing: 0.06em;
      color: var(--color-gold);
      border: 1px solid var(--color-gold-pale);
      border-radius: 2px;
      background: linear-gradient(
        135deg,
        rgba(184, 134, 11, 0.04),
        rgba(212, 168, 83, 0.08)
      );
      transition: all 0.25s ease;
    }

    .skill-tag:hover {
      border-color: var(--color-gold-light);
      background: linear-gradient(
        135deg,
        rgba(184, 134, 11, 0.08),
        rgba(212, 168, 83, 0.14)
      );
    }

    /* ---- Projects ---- */
    .project-entry {
      margin-bottom: var(--spacing-md);
      padding: var(--spacing-sm) var(--spacing-sm) var(--spacing-sm) var(--spacing-sm);
      border: 1px solid var(--color-border);
      border-radius: 2px;
      background: linear-gradient(
        135deg,
        rgba(253, 248, 240, 0.5),
        rgba(250, 246, 241, 0.9)
      );
      transition: border-color 0.25s ease;
    }

    .project-entry:hover {
      border-color: var(--color-gold-pale);
    }

    .project-entry:last-child {
      margin-bottom: 0;
    }

    .project-header {
      display: flex;
      align-items: baseline;
      gap: 0.75rem;
      flex-wrap: wrap;
      margin-bottom: 0.35rem;
    }

    .project-name {
      font-family: var(--font-serif);
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--color-charcoal);
    }

    .project-link {
      font-size: 0.8rem;
      color: var(--color-gold);
      letter-spacing: 0.04em;
      border-bottom: 1px solid var(--color-gold-pale);
      transition: border-color 0.25s ease;
    }

    .project-link:hover {
      border-color: var(--color-gold);
    }

    .project-description {
      font-size: 0.95rem;
      color: var(--color-charcoal-light);
      line-height: 1.75;
      margin-bottom: 0.6rem;
    }

    .project-technologies {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
    }

    .project-tech {
      font-size: 0.75rem;
      font-style: italic;
      color: var(--color-warm-gray);
      padding: 0.2rem 0.6rem;
      border: 1px solid var(--color-border);
      border-radius: 1px;
    }

    /* ---- Footer ---- */
    .footer {
      text-align: center;
      padding-top: var(--spacing-lg);
      margin-top: var(--spacing-lg);
      border-top: 1px solid var(--color-border);
    }

    .footer::after {
      content: '';
      display: block;
      width: 48px;
      height: 2px;
      background: linear-gradient(90deg, var(--color-gold), var(--color-gold-light));
      margin: var(--spacing-sm) auto 0;
    }

    .footer-text {
      font-size: 0.78rem;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--color-warm-gray);
    }

    /* ---- Responsive ---- */
    @media (max-width: 768px) {
      .page-wrapper {
        padding: var(--spacing-lg) var(--spacing-sm);
      }

      .header-name {
        font-size: 2.2rem;
        letter-spacing: 0.12em;
      }

      .header-title {
        font-size: 1.05rem;
      }

      .contact-row {
        flex-direction: column;
        align-items: center;
        gap: 0.35rem;
      }

      .contact-row > *::after {
        display: none !important;
      }

      .education-entry {
        flex-direction: column;
      }

      .summary-text {
        font-size: 0.98rem;
        padding: 0 0.5rem;
      }

      .summary-text::before {
        left: -0.4rem;
      }

      .summary-text::after {
        right: -0.2rem;
      }
    }

    @media (max-width: 480px) {
      .header-name {
        font-size: 1.75rem;
        letter-spacing: 0.08em;
      }

      .section-heading {
        font-size: 0.95rem;
        letter-spacing: 0.16em;
      }

      .experience-role {
        font-size: 1.05rem;
      }

      .skills-list {
        gap: 0.4rem;
      }

      .skill-tag {
        padding: 0.25rem 0.7rem;
        font-size: 0.78rem;
      }
    }

    @media print {
      body {
        background: #fff;
        font-size: 11pt;
      }

      .page-wrapper {
        max-width: 100%;
        padding: 0;
      }

      .skill-tag:hover,
      .project-entry:hover,
      .contact-link:hover {
        color: inherit;
        border-color: inherit;
        background: inherit;
      }
    }
  </style>
</head>
<body>
  <div class="page-wrapper">
${hasHeader ? `    <header class="header">
${data.name ? `      <h1 class="header-name">${e(data.name)}</h1>\n` : ""}${data.title ? `      <p class="header-title">${e(data.title)}</p>\n` : ""}${contactItems.length > 0 ? `      <div class="contact-row">
        ${contactItems.join("\n        ")}
      </div>\n` : ""}    </header>` : ""}
${hasSummary ? `    <section class="section">
      <h2 class="section-heading">About</h2>
      <p class="summary-text">${e(data.summary)}</p>
    </section>
    <hr class="ornamental-rule">` : ""}
${hasExperience ? `    <section class="section">
      <h2 class="section-heading">Experience</h2>
${data.experience
  .map(
    (exp) => `      <div class="experience-entry">
        <h3 class="experience-role">${e(exp.role)}</h3>
        <p class="experience-company">${e(exp.company)}</p>
        <p class="experience-dates">${e(exp.startDate)}${exp.endDate ? ` &mdash; ${e(exp.endDate)}` : ""}</p>
${exp.description ? `        <p class="experience-description">${e(exp.description)}</p>\n` : ""}      </div>`
  )
  .join("\n")}
    </section>
    <hr class="ornamental-rule">` : ""}
${hasEducation ? `    <section class="section">
      <h2 class="section-heading">Education</h2>
${data.education
  .map(
    (edu) => `      <div class="education-entry">
        <div class="education-main">
          <p class="education-degree">${e(edu.degree)}</p>
${edu.field ? `          <p class="education-field">${e(edu.field)}</p>\n` : ""}          <p class="education-institution">${e(edu.institution)}</p>
        </div>
        <span class="education-dates">${e(edu.startDate)}${edu.endDate ? ` &mdash; ${e(edu.endDate)}` : ""}</span>
      </div>`
  )
  .join("\n")}
    </section>
    <hr class="ornamental-rule">` : ""}
${hasSkills ? `    <section class="section">
      <h2 class="section-heading">Skills</h2>
      <div class="skills-list">
${data.skills.map((skill) => `        <span class="skill-tag">${e(skill)}</span>`).join("\n")}
      </div>
    </section>
    <hr class="ornamental-rule">` : ""}
${hasProjects ? `    <section class="section">
      <h2 class="section-heading">Projects</h2>
${data.projects
  .map(
    (proj) => `      <div class="project-entry">
        <div class="project-header">
          <h3 class="project-name">${e(proj.name)}</h3>
${proj.url ? `          <a href="${e(proj.url)}" target="_blank" rel="noopener noreferrer" class="project-link">View Project</a>\n` : ""}        </div>
${proj.description ? `        <p class="project-description">${e(proj.description)}</p>\n` : ""}${proj.technologies.length > 0 ? `        <div class="project-technologies">
${proj.technologies.map((tech) => `          <span class="project-tech">${e(tech)}</span>`).join("\n")}
        </div>\n` : ""}      </div>`
  )
  .join("\n")}
    </section>` : ""}
    <footer class="footer">
      <p class="footer-text">${data.name ? e(data.name) : "Portfolio"}</p>
    </footer>
  </div>
</body>
</html>`;
}
