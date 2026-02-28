import { ResumeData } from "@/types/resume";
import { baseReset } from "./base-styles";
import { escapeHtml } from "@/lib/utils";

export function generate(data: ResumeData): string {
  const e = escapeHtml;

  // ── Contact items as uppercase monospace labels ──
  const contactItems: string[] = [];
  if (data.email) {
    contactItems.push(
      `<a href="mailto:${e(data.email)}" class="contact-link"><span class="contact-label">Email</span><span class="contact-dash">&mdash;</span>${e(data.email)}</a>`
    );
  }
  if (data.phone) {
    contactItems.push(
      `<span class="contact-link"><span class="contact-label">Phone</span><span class="contact-dash">&mdash;</span>${e(data.phone)}</span>`
    );
  }
  if (data.location) {
    contactItems.push(
      `<span class="contact-link"><span class="contact-label">Location</span><span class="contact-dash">&mdash;</span>${e(data.location)}</span>`
    );
  }
  if (data.website) {
    contactItems.push(
      `<a href="${e(data.website)}" target="_blank" rel="noopener noreferrer" class="contact-link"><span class="contact-label">Web</span><span class="contact-dash">&mdash;</span>${e(data.website)}</a>`
    );
  }
  if (data.linkedin) {
    contactItems.push(
      `<a href="${e(data.linkedin)}" target="_blank" rel="noopener noreferrer" class="contact-link"><span class="contact-label">LinkedIn</span><span class="contact-dash">&mdash;</span>Profile</a>`
    );
  }
  if (data.github) {
    contactItems.push(
      `<a href="${e(data.github)}" target="_blank" rel="noopener noreferrer" class="contact-link"><span class="contact-label">GitHub</span><span class="contact-dash">&mdash;</span>Profile</a>`
    );
  }

  // ── Header ──
  const headerSection = `
    <header class="header">
      ${data.name ? `<h1 class="name">${e(data.name)}</h1>` : ""}
      ${data.title ? `<p class="title">${e(data.title)}</p>` : ""}
      ${
        contactItems.length > 0
          ? `<div class="contact-row">${contactItems.join("")}</div>`
          : ""
      }
    </header>
  `;

  // ── Summary as editorial pull quote ──
  const summarySection = data.summary
    ? `
    <hr class="section-rule" />
    <section class="section section-summary">
      <div class="pull-quote">
        <span class="pull-quote-mark" aria-hidden="true">&ldquo;</span>
        <blockquote class="pull-quote-text">${e(data.summary)}</blockquote>
        <span class="pull-quote-mark pull-quote-mark--end" aria-hidden="true">&rdquo;</span>
      </div>
    </section>
  `
    : "";

  // ── Experience ──
  const experienceSection =
    data.experience.length > 0
      ? `
    <hr class="section-rule" />
    <section class="section">
      <h2 class="section-heading">Experience</h2>
      <div class="entries">
        ${data.experience
          .map(
            (exp, i) => `
          ${i > 0 ? '<hr class="entry-rule" />' : ""}
          <div class="entry">
            <div class="entry-header">
              <div class="entry-titles">
                <h3 class="entry-role">${e(exp.role)}</h3>
                <p class="entry-company">${e(exp.company)}</p>
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

  // ── Education ──
  const educationSection =
    data.education.length > 0
      ? `
    <hr class="section-rule" />
    <section class="section">
      <h2 class="section-heading">Education</h2>
      <div class="entries">
        ${data.education
          .map(
            (edu, i) => `
          ${i > 0 ? '<hr class="entry-rule" />' : ""}
          <div class="entry">
            <div class="entry-header">
              <div class="entry-titles">
                <h3 class="entry-role">${e(edu.degree)}${edu.field ? ` in ${e(edu.field)}` : ""}</h3>
                <p class="entry-company">${e(edu.institution)}</p>
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

  // ── Skills (inverted section) ──
  const skillsSection =
    data.skills.length > 0
      ? `
    <hr class="section-rule" />
    <section class="section section-skills">
      <div class="skills-inner">
        <h2 class="section-heading section-heading--inverted">Skills</h2>
        <div class="skills-grid">
          ${data.skills.map((skill) => `<span class="skill-item">${e(skill)}</span>`).join("")}
        </div>
      </div>
    </section>
  `
      : "";

  // ── Projects ──
  const projectsSection =
    data.projects.length > 0
      ? `
    <hr class="section-rule" />
    <section class="section">
      <h2 class="section-heading">Projects</h2>
      <div class="projects-grid">
        ${data.projects
          .map(
            (proj) => `
          <div class="project-card">
            <div class="project-header">
              ${
                proj.url
                  ? `<a href="${e(proj.url)}" target="_blank" rel="noopener noreferrer" class="project-name">${e(proj.name)}<span class="project-arrow">&nearr;</span></a>`
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
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Source+Serif+4:wght@400;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
  <style>
    ${baseReset}

    /* ═══════════════════════════════════════════════
       MONOCHROME — Editorial Luxury
       Only: #000000, #FFFFFF, #525252
    ═══════════════════════════════════════════════ */

    :root {
      --black: #000000;
      --white: #FFFFFF;
      --gray: #525252;
      --font-display: 'Playfair Display', Georgia, 'Times New Roman', serif;
      --font-body: 'Source Serif 4', Georgia, 'Times New Roman', serif;
      --font-mono: 'JetBrains Mono', 'Courier New', Courier, monospace;
    }

    /* ── Noise texture overlay for paper-like quality ── */
    body {
      font-family: var(--font-body);
      background-color: var(--white);
      color: var(--black);
      position: relative;
      font-size: 18px;
      line-height: 1.7;
    }

    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9999;
      opacity: 0.02;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
      background-repeat: repeat;
      background-size: 256px 256px;
    }

    /* Subtle horizontal line pattern */
    body::after {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 9998;
      opacity: 0.018;
      background-image: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 3px,
        var(--black) 3px,
        var(--black) 4px
      );
    }

    .page-wrapper {
      max-width: 900px;
      margin: 0 auto;
      padding: 0 40px;
    }

    /* ═══════════════════════════════════════════════
       HEADER — Editorial magazine cover feel
    ═══════════════════════════════════════════════ */
    .header {
      padding: 120px 0 80px;
      border-bottom: 4px solid var(--black);
    }

    .name {
      font-family: var(--font-display);
      font-size: 7rem;
      font-weight: 900;
      line-height: 0.95;
      letter-spacing: -0.03em;
      color: var(--black);
      margin-bottom: 20px;
      text-transform: uppercase;
    }

    .title {
      font-family: var(--font-body);
      font-size: 1.5rem;
      font-weight: 400;
      color: var(--gray);
      letter-spacing: 0.04em;
      margin-bottom: 48px;
    }

    .contact-row {
      display: flex;
      flex-wrap: wrap;
      gap: 24px 40px;
    }

    .contact-link {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 500;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--black);
      display: inline-flex;
      align-items: center;
      gap: 0;
      transition: color 0.2s ease;
    }

    .contact-link:hover {
      color: var(--gray);
    }

    .contact-label {
      font-weight: 500;
    }

    .contact-dash {
      margin: 0 8px;
      color: var(--gray);
    }

    /* ═══════════════════════════════════════════════
       SECTION DIVIDERS
    ═══════════════════════════════════════════════ */
    .section-rule {
      border: none;
      height: 4px;
      background-color: var(--black);
      margin: 0;
    }

    .entry-rule {
      border: none;
      height: 1px;
      background-color: var(--black);
      margin: 32px 0;
      opacity: 0.2;
    }

    /* ═══════════════════════════════════════════════
       SECTIONS — Generous breathing room
    ═══════════════════════════════════════════════ */
    .section {
      padding: 80px 0;
    }

    .section-heading {
      font-family: var(--font-display);
      font-size: 2.5rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--black);
      margin-bottom: 48px;
      line-height: 1.1;
    }

    /* ═══════════════════════════════════════════════
       SUMMARY — Editorial Pull Quote
    ═══════════════════════════════════════════════ */
    .section-summary {
      padding: 100px 0;
    }

    .pull-quote {
      position: relative;
      max-width: 780px;
      margin: 0 auto;
      text-align: center;
      padding: 0 24px;
    }

    .pull-quote-mark {
      font-family: var(--font-display);
      font-size: 8rem;
      font-weight: 900;
      line-height: 0;
      color: var(--black);
      display: block;
      user-select: none;
      opacity: 0.12;
    }

    .pull-quote-mark--end {
      text-align: right;
    }

    .pull-quote-text {
      font-family: var(--font-display);
      font-size: 1.75rem;
      font-weight: 400;
      font-style: italic;
      line-height: 1.6;
      color: var(--black);
      margin: 24px 0;
      border: none;
      padding: 0;
    }

    /* ═══════════════════════════════════════════════
       EXPERIENCE & EDUCATION — Entries
    ═══════════════════════════════════════════════ */
    .entries {
      display: flex;
      flex-direction: column;
    }

    .entry {
      padding: 0;
    }

    .entry-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 24px;
      margin-bottom: 12px;
    }

    .entry-titles {
      flex: 1;
    }

    .entry-role {
      font-family: var(--font-display);
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--black);
      line-height: 1.3;
      margin-bottom: 4px;
    }

    .entry-company {
      font-family: var(--font-body);
      font-size: 1.05rem;
      font-style: italic;
      color: var(--gray);
    }

    .entry-date {
      font-family: var(--font-mono);
      font-size: 0.78rem;
      font-weight: 400;
      letter-spacing: 0.05em;
      color: var(--gray);
      white-space: nowrap;
      flex-shrink: 0;
      padding-top: 8px;
      text-transform: uppercase;
    }

    .entry-description {
      font-family: var(--font-body);
      font-size: 1rem;
      line-height: 1.75;
      color: var(--gray);
      max-width: 680px;
    }

    /* ═══════════════════════════════════════════════
       SKILLS — Inverted Section (black bg, white text)
    ═══════════════════════════════════════════════ */
    .section-skills {
      background-color: var(--black);
      color: var(--white);
      margin-left: -40px;
      margin-right: -40px;
      padding-left: 40px;
      padding-right: 40px;
    }

    .skills-inner {
      max-width: 900px;
      margin: 0 auto;
    }

    .section-heading--inverted {
      color: var(--white);
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 16px;
    }

    .skill-item {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 16px 24px;
      font-family: var(--font-mono);
      font-size: 0.82rem;
      font-weight: 500;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      color: var(--white);
      border: 1px solid var(--white);
      border-radius: 0;
      text-align: center;
      transition: background-color 0.2s ease, color 0.2s ease;
      cursor: default;
    }

    .skill-item:hover {
      background-color: var(--white);
      color: var(--black);
    }

    /* ═══════════════════════════════════════════════
       PROJECTS
    ═══════════════════════════════════════════════ */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 0;
    }

    .project-card {
      padding: 36px;
      border: 1px solid var(--black);
      border-radius: 0;
      transition: background-color 0.2s ease, color 0.2s ease;
    }

    .project-card:hover {
      background-color: var(--black);
      color: var(--white);
    }

    .project-card:hover .project-name {
      color: var(--white);
    }

    .project-card:hover .project-description {
      color: rgba(255, 255, 255, 0.7);
    }

    .project-card:hover .tech-tag {
      border-color: var(--white);
      color: var(--white);
    }

    .project-card:hover .project-arrow {
      color: var(--white);
    }

    .project-header {
      margin-bottom: 16px;
    }

    .project-name {
      font-family: var(--font-display);
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--black);
      display: inline;
      transition: color 0.2s ease;
    }

    .project-arrow {
      margin-left: 6px;
      font-size: 1rem;
      transition: color 0.2s ease;
    }

    .project-description {
      font-family: var(--font-body);
      font-size: 0.95rem;
      line-height: 1.7;
      color: var(--gray);
      margin-bottom: 20px;
      transition: color 0.2s ease;
    }

    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .tech-tag {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 500;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 6px 14px;
      border: 1px solid var(--black);
      border-radius: 0;
      color: var(--black);
      transition: border-color 0.2s ease, color 0.2s ease;
    }

    /* ═══════════════════════════════════════════════
       FOOTER
    ═══════════════════════════════════════════════ */
    .footer-rule {
      border: none;
      height: 4px;
      background-color: var(--black);
      margin: 0;
    }

    .footer {
      padding: 48px 0 80px;
      text-align: center;
    }

    .footer-text {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      letter-spacing: 0.15em;
      text-transform: uppercase;
      color: var(--gray);
    }

    /* ═══════════════════════════════════════════════
       RESPONSIVE — Tablet
    ═══════════════════════════════════════════════ */
    @media (max-width: 900px) {
      .name {
        font-size: 5rem;
      }

      .section-heading {
        font-size: 2rem;
      }

      .pull-quote-text {
        font-size: 1.5rem;
      }

      .pull-quote-mark {
        font-size: 6rem;
      }

      .projects-grid {
        grid-template-columns: 1fr;
      }
    }

    /* ═══════════════════════════════════════════════
       RESPONSIVE — Mobile
    ═══════════════════════════════════════════════ */
    @media (max-width: 640px) {
      body {
        font-size: 16px;
      }

      .page-wrapper {
        padding: 0 24px;
      }

      .header {
        padding: 72px 0 48px;
      }

      .name {
        font-size: 3.2rem;
        letter-spacing: -0.02em;
      }

      .title {
        font-size: 1.15rem;
        margin-bottom: 32px;
      }

      .contact-row {
        flex-direction: column;
        gap: 12px;
      }

      .contact-link {
        font-size: 0.68rem;
      }

      .section {
        padding: 56px 0;
      }

      .section-summary {
        padding: 64px 0;
      }

      .section-heading {
        font-size: 1.6rem;
        letter-spacing: 0.08em;
        margin-bottom: 32px;
      }

      .pull-quote-text {
        font-size: 1.2rem;
      }

      .pull-quote-mark {
        font-size: 4rem;
      }

      .entry-header {
        flex-direction: column;
        gap: 4px;
      }

      .entry-date {
        padding-top: 0;
      }

      .entry-role {
        font-size: 1.25rem;
      }

      .section-skills {
        margin-left: -24px;
        margin-right: -24px;
        padding-left: 24px;
        padding-right: 24px;
      }

      .skills-grid {
        grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
        gap: 10px;
      }

      .skill-item {
        padding: 12px 16px;
        font-size: 0.72rem;
      }

      .project-card {
        padding: 24px;
      }

      .projects-grid {
        grid-template-columns: 1fr;
      }
    }

    /* ═══════════════════════════════════════════════
       RESPONSIVE — Small mobile
    ═══════════════════════════════════════════════ */
    @media (max-width: 400px) {
      .page-wrapper {
        padding: 0 16px;
      }

      .header {
        padding: 48px 0 36px;
      }

      .name {
        font-size: 2.4rem;
      }

      .title {
        font-size: 1rem;
        margin-bottom: 24px;
      }

      .section {
        padding: 40px 0;
      }

      .section-summary {
        padding: 48px 0;
      }

      .section-heading {
        font-size: 1.3rem;
      }

      .pull-quote-text {
        font-size: 1.05rem;
      }

      .pull-quote-mark {
        font-size: 3rem;
      }

      .entry-role {
        font-size: 1.1rem;
      }

      .section-skills {
        margin-left: -16px;
        margin-right: -16px;
        padding-left: 16px;
        padding-right: 16px;
      }

      .skills-grid {
        grid-template-columns: 1fr 1fr;
      }
    }

    /* ═══════════════════════════════════════════════
       PRINT STYLES
    ═══════════════════════════════════════════════ */
    @media print {
      body::before,
      body::after {
        display: none;
      }

      .section-skills {
        margin-left: 0;
        margin-right: 0;
      }

      .skill-item:hover {
        background-color: transparent;
        color: var(--white);
      }

      .project-card:hover {
        background-color: transparent;
        color: var(--black);
      }
    }
  </style>
</head>
<body>
  <div class="page-wrapper">
    ${headerSection}
    <main>
      ${summarySection}
      ${experienceSection}
      ${educationSection}
      ${skillsSection}
      ${projectsSection}
      <hr class="footer-rule" />
      <footer class="footer">
        <p class="footer-text">Portfolio</p>
      </footer>
    </main>
  </div>
</body>
</html>`;
}
