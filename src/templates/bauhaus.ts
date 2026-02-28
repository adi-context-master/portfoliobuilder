import { ResumeData } from "@/types/resume";
import { baseReset } from "./base-styles";
import { escapeHtml } from "@/lib/utils";

export function generate(data: ResumeData): string {
  const e = escapeHtml;

  // --- Contact items with geometric icon markers ---
  const contactItems: string[] = [];
  if (data.email) {
    contactItems.push(
      `<a href="mailto:${e(data.email)}" class="contact-link"><span class="contact-icon contact-icon--red"></span>${e(data.email)}</a>`
    );
  }
  if (data.phone) {
    contactItems.push(
      `<span class="contact-item"><span class="contact-icon contact-icon--blue"></span>${e(data.phone)}</span>`
    );
  }
  if (data.location) {
    contactItems.push(
      `<span class="contact-item"><span class="contact-icon contact-icon--yellow"></span>${e(data.location)}</span>`
    );
  }
  if (data.website) {
    contactItems.push(
      `<a href="${e(data.website)}" target="_blank" rel="noopener noreferrer" class="contact-link"><span class="contact-icon contact-icon--red"></span>${e(data.website)}</a>`
    );
  }
  if (data.linkedin) {
    contactItems.push(
      `<a href="${e(data.linkedin)}" target="_blank" rel="noopener noreferrer" class="contact-link"><span class="contact-icon contact-icon--blue"></span>LinkedIn</a>`
    );
  }
  if (data.github) {
    contactItems.push(
      `<a href="${e(data.github)}" target="_blank" rel="noopener noreferrer" class="contact-link"><span class="contact-icon contact-icon--yellow"></span>GitHub</a>`
    );
  }

  // --- Header ---
  const headerSection = `
    <header class="header">
      <div class="header-geo header-geo--circle"></div>
      <div class="header-geo header-geo--square"></div>
      <div class="header-geo header-geo--diamond"></div>
      <div class="header-inner">
        ${data.name ? `<h1 class="name">${e(data.name)}</h1>` : ""}
        ${data.title ? `<p class="title">${e(data.title)}</p>` : ""}
      </div>
      ${
        contactItems.length > 0
          ? `<div class="contact-bar">${contactItems.join('<span class="contact-separator"></span>')}</div>`
          : ""
      }
    </header>
  `;

  // --- Summary (blue background section) ---
  const summarySection = data.summary
    ? `
    <section class="section section--blue">
      <h2 class="section-heading section-heading--light">ABOUT</h2>
      <p class="summary-text">${e(data.summary)}</p>
    </section>
  `
    : "";

  // --- Experience ---
  const experienceSection =
    data.experience.length > 0
      ? `
    <section class="section">
      <h2 class="section-heading">EXPERIENCE</h2>
      <div class="card-list">
        ${data.experience
          .map(
            (exp, i) => `
          <div class="card">
            <span class="card-geo card-geo--${["red", "blue", "yellow"][i % 3]}"></span>
            <div class="card-header">
              <div>
                <h3 class="card-title">${e(exp.role)}</h3>
                <p class="card-subtitle">${e(exp.company)}</p>
              </div>
              <span class="date-badge date-badge--${["red", "blue", "yellow"][i % 3]}">${e(exp.startDate)}${exp.endDate ? ` — ${e(exp.endDate)}` : ""}</span>
            </div>
            ${exp.description ? `<p class="card-description">${e(exp.description)}</p>` : ""}
          </div>
        `
          )
          .join("")}
      </div>
    </section>
  `
      : "";

  // --- Education ---
  const educationSection =
    data.education.length > 0
      ? `
    <section class="section">
      <h2 class="section-heading">EDUCATION</h2>
      <div class="card-list">
        ${data.education
          .map(
            (edu, i) => `
          <div class="card">
            <span class="card-geo card-geo--${["blue", "yellow", "red"][i % 3]}"></span>
            <div class="card-header">
              <div>
                <h3 class="card-title">${e(edu.degree)}${edu.field ? ` IN ${e(edu.field)}` : ""}</h3>
                <p class="card-subtitle">${e(edu.institution)}</p>
              </div>
              <span class="date-badge date-badge--${["blue", "yellow", "red"][i % 3]}">${e(edu.startDate)}${edu.endDate ? ` — ${e(edu.endDate)}` : ""}</span>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </section>
  `
      : "";

  // --- Skills (yellow background section) ---
  const skillsSection =
    data.skills.length > 0
      ? `
    <section class="section section--yellow">
      <h2 class="section-heading">SKILLS</h2>
      <div class="skills-grid">
        ${data.skills
          .map(
            (skill, i) =>
              `<span class="skill-badge skill-badge--${["red", "blue", "yellow"][i % 3]}">${e(skill)}</span>`
          )
          .join("")}
      </div>
    </section>
  `
      : "";

  // --- Projects ---
  const projectsSection =
    data.projects.length > 0
      ? `
    <section class="section">
      <h2 class="section-heading">PROJECTS</h2>
      <div class="projects-grid">
        ${data.projects
          .map(
            (proj, i) => `
          <div class="project-card">
            <span class="card-geo card-geo--${["yellow", "red", "blue"][i % 3]}"></span>
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
                ? `<div class="project-tech">${proj.technologies.map((t, j) => `<span class="tech-tag tech-tag--${["red", "blue", "yellow"][j % 3]}">${e(t)}</span>`).join("")}</div>`
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

  // --- Footer ---
  const footerSection = `
    <footer class="footer">
      <div class="footer-shapes">
        <span class="footer-shape footer-shape--circle"></span>
        <span class="footer-shape footer-shape--square"></span>
        <span class="footer-shape footer-shape--triangle"></span>
      </div>
    </footer>
  `;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${data.name ? e(data.name) : "Portfolio"}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;700;900&display=swap" rel="stylesheet" />
  <style>
    ${baseReset}

    /* ===== BAUHAUS DESIGN TOKENS ===== */
    :root {
      --bg: #F0F0F0;
      --fg: #121212;
      --red: #D02020;
      --blue: #1040C0;
      --yellow: #F0C020;
      --white: #FFFFFF;
      --border: 4px solid #121212;
      --shadow-sm: 4px 4px 0px 0px #121212;
      --shadow-lg: 8px 8px 0px 0px #121212;
      --font: 'Outfit', sans-serif;
    }

    /* ===== DOT GRID BACKGROUND ===== */
    body {
      font-family: var(--font);
      font-weight: 500;
      background-color: var(--bg);
      color: var(--fg);
      position: relative;
    }

    body::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: radial-gradient(circle, var(--fg) 1px, transparent 1px);
      background-size: 24px 24px;
      opacity: 0.03;
      pointer-events: none;
      z-index: 0;
    }

    /* ===== GLOBAL TYPOGRAPHY ===== */
    h1, h2, h3, h4, h5, h6 {
      font-family: var(--font);
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: -0.05em;
      line-height: 1.05;
    }

    /* ===== LAYOUT WRAPPER ===== */
    .page-wrapper {
      position: relative;
      z-index: 1;
      max-width: 960px;
      margin: 0 auto;
      padding: 0 24px;
    }

    /* ===== HEADER ===== */
    .header {
      position: relative;
      padding: 80px 0 48px;
      border-bottom: var(--border);
      overflow: hidden;
    }

    .header-inner {
      position: relative;
      z-index: 2;
    }

    .name {
      font-size: clamp(3.5rem, 10vw, 7rem);
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: -0.05em;
      line-height: 0.92;
      color: var(--fg);
      margin-bottom: 16px;
    }

    .title {
      font-size: 1.35rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.15em;
      color: var(--fg);
      opacity: 0.7;
      margin-bottom: 0;
    }

    /* Header geometric decorations */
    .header-geo {
      position: absolute;
      z-index: 1;
      pointer-events: none;
    }

    .header-geo--circle {
      width: 200px;
      height: 200px;
      border-radius: 9999px;
      background: var(--red);
      top: -40px;
      right: -30px;
      opacity: 0.85;
    }

    .header-geo--square {
      width: 120px;
      height: 120px;
      border-radius: 0;
      background: var(--blue);
      bottom: 30px;
      right: 140px;
      opacity: 0.7;
    }

    .header-geo--diamond {
      width: 80px;
      height: 80px;
      border-radius: 0;
      background: var(--yellow);
      top: 60px;
      right: 260px;
      transform: rotate(45deg);
      opacity: 0.8;
    }

    /* ===== CONTACT BAR ===== */
    .contact-bar {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0;
      margin-top: 32px;
      border: var(--border);
      background: var(--white);
      position: relative;
      z-index: 2;
    }

    .contact-link,
    .contact-item {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 14px 20px;
      font-size: 0.9rem;
      font-weight: 500;
      color: var(--fg);
      border-right: var(--border);
      transition: background-color 0.15s ease;
    }

    .contact-link:hover {
      background: var(--yellow);
    }

    .contact-separator {
      display: none;
    }

    .contact-icon {
      display: inline-block;
      width: 10px;
      height: 10px;
      flex-shrink: 0;
    }

    .contact-icon--red {
      background: var(--red);
      border-radius: 9999px;
    }

    .contact-icon--blue {
      background: var(--blue);
      border-radius: 0;
    }

    .contact-icon--yellow {
      background: var(--yellow);
      border-radius: 0;
      transform: rotate(45deg);
    }

    /* ===== SECTIONS ===== */
    .section {
      padding: 56px 0;
      border-bottom: var(--border);
      position: relative;
    }

    .section-heading {
      font-size: 2.5rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: -0.05em;
      margin-bottom: 36px;
      color: var(--fg);
      position: relative;
      display: inline-block;
    }

    .section-heading::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 0;
      width: 48px;
      height: 6px;
      background: var(--red);
      border-radius: 0;
    }

    /* ===== BLUE SECTION (Summary) ===== */
    .section--blue {
      background: var(--blue);
      margin-left: -24px;
      margin-right: -24px;
      padding-left: 24px;
      padding-right: 24px;
    }

    .section-heading--light {
      color: var(--white);
    }

    .section-heading--light::after {
      background: var(--yellow);
    }

    .summary-text {
      font-size: 1.2rem;
      line-height: 1.8;
      color: var(--white);
      max-width: 740px;
      font-weight: 400;
    }

    /* ===== YELLOW SECTION (Skills) ===== */
    .section--yellow {
      background: var(--yellow);
      margin-left: -24px;
      margin-right: -24px;
      padding-left: 24px;
      padding-right: 24px;
    }

    .section--yellow .section-heading::after {
      background: var(--fg);
    }

    /* ===== CARDS (Experience / Education) ===== */
    .card-list {
      display: flex;
      flex-direction: column;
      gap: 28px;
    }

    .card {
      position: relative;
      background: var(--white);
      border: var(--border);
      padding: 28px 28px 28px 28px;
      box-shadow: var(--shadow-lg);
      border-radius: 0;
    }

    /* Geometric corner decoration on cards */
    .card-geo {
      position: absolute;
      top: -8px;
      right: -8px;
      width: 16px;
      height: 16px;
      z-index: 3;
    }

    .card-geo--red {
      background: var(--red);
      border-radius: 9999px;
    }

    .card-geo--blue {
      background: var(--blue);
      border-radius: 0;
    }

    .card-geo--yellow {
      background: var(--yellow);
      border-radius: 0;
      transform: rotate(45deg);
    }

    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 12px;
    }

    .card-title {
      font-size: 1.2rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: -0.03em;
      color: var(--fg);
    }

    .card-subtitle {
      font-size: 1rem;
      font-weight: 500;
      color: var(--fg);
      opacity: 0.65;
      margin-top: 4px;
    }

    .card-description {
      font-size: 0.95rem;
      line-height: 1.7;
      color: var(--fg);
      opacity: 0.8;
      font-weight: 400;
    }

    /* Date badges */
    .date-badge {
      display: inline-block;
      padding: 6px 14px;
      font-size: 0.78rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      white-space: nowrap;
      flex-shrink: 0;
      border: 2px solid var(--fg);
      border-radius: 0;
    }

    .date-badge--red {
      background: var(--red);
      color: var(--white);
    }

    .date-badge--blue {
      background: var(--blue);
      color: var(--white);
    }

    .date-badge--yellow {
      background: var(--yellow);
      color: var(--fg);
    }

    /* ===== SKILLS GRID ===== */
    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .skill-badge {
      display: inline-block;
      padding: 10px 22px;
      font-size: 0.9rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.03em;
      border: var(--border);
      box-shadow: var(--shadow-sm);
      border-radius: 0;
    }

    .skill-badge--red {
      background: var(--red);
      color: var(--white);
    }

    .skill-badge--blue {
      background: var(--blue);
      color: var(--white);
    }

    .skill-badge--yellow {
      background: var(--yellow);
      color: var(--fg);
    }

    /* ===== PROJECTS GRID ===== */
    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 28px;
    }

    .project-card {
      position: relative;
      background: var(--white);
      border: var(--border);
      padding: 28px;
      box-shadow: var(--shadow-lg);
      border-radius: 0;
      transition: transform 0.15s ease;
    }

    .project-card:hover {
      transform: translate(-2px, -2px);
      box-shadow: 10px 10px 0px 0px #121212;
    }

    .project-card-header {
      margin-bottom: 12px;
    }

    .project-name {
      font-size: 1.15rem;
      font-weight: 900;
      text-transform: uppercase;
      letter-spacing: -0.03em;
      color: var(--fg);
      display: inline-block;
      border-bottom: 3px solid var(--red);
      padding-bottom: 2px;
    }

    a.project-name:hover {
      color: var(--blue);
      border-bottom-color: var(--blue);
    }

    .project-description {
      font-size: 0.9rem;
      line-height: 1.7;
      color: var(--fg);
      opacity: 0.75;
      margin-bottom: 16px;
      font-weight: 400;
    }

    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .tech-tag {
      font-size: 0.75rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      padding: 5px 12px;
      border: 2px solid var(--fg);
      border-radius: 0;
    }

    .tech-tag--red {
      background: var(--red);
      color: var(--white);
    }

    .tech-tag--blue {
      background: var(--blue);
      color: var(--white);
    }

    .tech-tag--yellow {
      background: var(--yellow);
      color: var(--fg);
    }

    /* ===== FOOTER ===== */
    .footer {
      background: var(--fg);
      padding: 48px 24px;
      margin-left: -24px;
      margin-right: -24px;
      border-top: var(--border);
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .footer-shapes {
      display: flex;
      align-items: center;
      gap: 20px;
    }

    .footer-shape {
      display: inline-block;
    }

    .footer-shape--circle {
      width: 28px;
      height: 28px;
      background: var(--red);
      border-radius: 9999px;
    }

    .footer-shape--square {
      width: 24px;
      height: 24px;
      background: var(--blue);
      border-radius: 0;
    }

    .footer-shape--triangle {
      width: 0;
      height: 0;
      border-left: 14px solid transparent;
      border-right: 14px solid transparent;
      border-bottom: 26px solid var(--yellow);
    }

    /* ===== SECTION DECORATIVE PSEUDO-ELEMENTS ===== */

    /* Red section accent: small red square in bottom-left of experience */
    .section:nth-of-type(3)::before {
      content: '';
      position: absolute;
      bottom: 20px;
      left: -12px;
      width: 24px;
      height: 24px;
      background: var(--red);
      border-radius: 0;
      transform: rotate(45deg);
      opacity: 0.5;
    }

    /* Blue circle decoration on education section */
    .section:nth-of-type(4)::after {
      content: '';
      position: absolute;
      top: 20px;
      right: -16px;
      width: 32px;
      height: 32px;
      background: var(--blue);
      border-radius: 9999px;
      opacity: 0.4;
    }

    /* Yellow bar accent for projects section */
    .section:nth-of-type(6)::before {
      content: '';
      position: absolute;
      top: 56px;
      right: 0;
      width: 6px;
      height: 60px;
      background: var(--yellow);
      border-radius: 0;
    }

    /* ===== RED ACCENT STRIP ===== */
    /* A thin red strip atop the footer area for visual punch */
    .footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 6px;
      background: var(--red);
    }

    .footer {
      position: relative;
    }

    /* ===== RESPONSIVE ===== */
    @media (max-width: 768px) {
      .page-wrapper {
        padding: 0 16px;
      }

      .header {
        padding: 56px 0 36px;
      }

      .name {
        font-size: clamp(2.5rem, 8vw, 4.5rem);
      }

      .title {
        font-size: 1.1rem;
        letter-spacing: 0.1em;
      }

      .header-geo--circle {
        width: 120px;
        height: 120px;
        top: -20px;
        right: -20px;
      }

      .header-geo--square {
        width: 72px;
        height: 72px;
        bottom: 20px;
        right: 80px;
      }

      .header-geo--diamond {
        width: 48px;
        height: 48px;
        top: 40px;
        right: 160px;
      }

      .contact-bar {
        flex-direction: column;
        align-items: stretch;
      }

      .contact-link,
      .contact-item {
        border-right: none;
        border-bottom: 2px solid var(--fg);
        padding: 12px 16px;
        font-size: 0.85rem;
      }

      .contact-link:last-child,
      .contact-item:last-child {
        border-bottom: none;
      }

      .section {
        padding: 40px 0;
      }

      .section--blue,
      .section--yellow {
        margin-left: -16px;
        margin-right: -16px;
        padding-left: 16px;
        padding-right: 16px;
      }

      .section-heading {
        font-size: 1.8rem;
        margin-bottom: 28px;
      }

      .card {
        padding: 20px;
        box-shadow: var(--shadow-sm);
      }

      .card-header {
        flex-direction: column;
        gap: 8px;
      }

      .card-title {
        font-size: 1.05rem;
      }

      .projects-grid {
        grid-template-columns: 1fr;
      }

      .project-card {
        padding: 20px;
        box-shadow: var(--shadow-sm);
      }

      .footer {
        margin-left: -16px;
        margin-right: -16px;
        padding: 36px 16px;
      }

      /* Hide section pseudo-element decorations on mobile */
      .section:nth-of-type(3)::before,
      .section:nth-of-type(4)::after,
      .section:nth-of-type(6)::before {
        display: none;
      }
    }

    @media (max-width: 480px) {
      .header {
        padding: 40px 0 28px;
      }

      .name {
        font-size: clamp(2rem, 10vw, 3rem);
      }

      .title {
        font-size: 0.95rem;
        letter-spacing: 0.08em;
      }

      .header-geo--circle {
        width: 80px;
        height: 80px;
        top: -10px;
        right: -10px;
      }

      .header-geo--square {
        width: 48px;
        height: 48px;
        right: 56px;
        bottom: 10px;
      }

      .header-geo--diamond {
        width: 32px;
        height: 32px;
        top: 28px;
        right: 110px;
      }

      .section-heading {
        font-size: 1.5rem;
        margin-bottom: 24px;
      }

      .card {
        padding: 16px;
      }

      .card-title {
        font-size: 0.95rem;
      }

      .date-badge {
        font-size: 0.7rem;
        padding: 4px 10px;
      }

      .skill-badge {
        padding: 8px 16px;
        font-size: 0.8rem;
        box-shadow: 2px 2px 0px 0px #121212;
      }

      .summary-text {
        font-size: 1.05rem;
      }

      .project-card {
        padding: 16px;
      }

      .tech-tag {
        font-size: 0.7rem;
        padding: 4px 8px;
      }

      .skills-grid {
        gap: 8px;
      }

      .footer {
        padding: 28px 16px;
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
    </main>
    ${footerSection}
  </div>
</body>
</html>`;
}
