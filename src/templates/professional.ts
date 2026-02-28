import { ResumeData } from "@/types/resume";
import { baseReset } from "./base-styles";
import { escapeHtml } from "@/lib/utils";

export function generate(data: ResumeData): string {
  const e = escapeHtml;

  const hasContact =
    data.email || data.phone || data.location || data.website || data.linkedin || data.github;
  const hasSummary = data.summary.trim().length > 0;
  const hasExperience = data.experience.length > 0;
  const hasEducation = data.education.length > 0;
  const hasSkills = data.skills.length > 0;
  const hasProjects = data.projects.length > 0;

  /* ── Contact info block (sidebar) ─────────────────────────── */
  const contactSection = hasContact
    ? `
      <section class="sidebar-section">
        <h2 class="sidebar-heading">Contact</h2>
        <ul class="contact-list">
          ${data.email ? `<li><span class="contact-label">Email</span><a href="mailto:${e(data.email)}">${e(data.email)}</a></li>` : ""}
          ${data.phone ? `<li><span class="contact-label">Phone</span><span>${e(data.phone)}</span></li>` : ""}
          ${data.location ? `<li><span class="contact-label">Location</span><span>${e(data.location)}</span></li>` : ""}
          ${data.website ? `<li><span class="contact-label">Website</span><a href="${e(data.website)}" target="_blank" rel="noopener noreferrer">${e(data.website)}</a></li>` : ""}
          ${data.linkedin ? `<li><span class="contact-label">LinkedIn</span><a href="${e(data.linkedin)}" target="_blank" rel="noopener noreferrer">${e(data.linkedin)}</a></li>` : ""}
          ${data.github ? `<li><span class="contact-label">GitHub</span><a href="${e(data.github)}" target="_blank" rel="noopener noreferrer">${e(data.github)}</a></li>` : ""}
        </ul>
      </section>`
    : "";

  /* ── Skills block (sidebar) ───────────────────────────────── */
  const skillsSection = hasSkills
    ? `
      <section class="sidebar-section">
        <h2 class="sidebar-heading">Skills</h2>
        <ul class="skills-list">
          ${data.skills.map((s) => `<li>${e(s)}</li>`).join("")}
        </ul>
      </section>`
    : "";

  /* ── Education block (sidebar) ────────────────────────────── */
  const educationSidebar = hasEducation
    ? `
      <section class="sidebar-section">
        <h2 class="sidebar-heading">Education</h2>
        ${data.education
          .map(
            (ed) => `
          <div class="education-entry">
            <h3 class="education-degree">${e(ed.degree)}${ed.field ? `, ${e(ed.field)}` : ""}</h3>
            <p class="education-institution">${e(ed.institution)}</p>
            <p class="education-dates">${e(ed.startDate)}${ed.endDate ? ` &ndash; ${e(ed.endDate)}` : ""}</p>
          </div>`
          )
          .join("")}
      </section>`
    : "";

  /* ── Summary (main column) ────────────────────────────────── */
  const summarySection = hasSummary
    ? `
      <section class="main-section">
        <h2 class="section-heading">Professional Summary</h2>
        <hr class="section-rule" />
        <p class="summary-text">${e(data.summary)}</p>
      </section>`
    : "";

  /* ── Experience (main column) ─────────────────────────────── */
  const experienceSection = hasExperience
    ? `
      <section class="main-section">
        <h2 class="section-heading">Experience</h2>
        <hr class="section-rule" />
        ${data.experience
          .map(
            (exp) => `
          <div class="experience-entry">
            <div class="experience-header">
              <div>
                <h3 class="experience-role">${e(exp.role)}</h3>
                <p class="experience-company">${e(exp.company)}</p>
              </div>
              <span class="experience-dates">${e(exp.startDate)}${exp.endDate ? ` &ndash; ${e(exp.endDate)}` : ""}</span>
            </div>
            ${exp.description ? `<p class="experience-description">${e(exp.description)}</p>` : ""}
          </div>`
          )
          .join("")}
      </section>`
    : "";

  /* ── Projects (main column) ───────────────────────────────── */
  const projectsSection = hasProjects
    ? `
      <section class="main-section">
        <h2 class="section-heading">Projects</h2>
        <hr class="section-rule" />
        ${data.projects
          .map(
            (proj) => `
          <div class="project-entry">
            <div class="project-header">
              <h3 class="project-name">${e(proj.name)}</h3>
              ${proj.url ? `<a class="project-link" href="${e(proj.url)}" target="_blank" rel="noopener noreferrer">${e(proj.url)}</a>` : ""}
            </div>
            ${proj.description ? `<p class="project-description">${e(proj.description)}</p>` : ""}
            ${
              proj.technologies.length > 0
                ? `<div class="project-tech">${proj.technologies.map((t) => `<span class="tech-tag">${e(t)}</span>`).join("")}</div>`
                : ""
            }
          </div>`
          )
          .join("")}
      </section>`
    : "";

  /* ── Full HTML document ───────────────────────────────────── */
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${e(data.name)}${data.title ? ` &ndash; ${e(data.title)}` : ""}</title>
  <style>
    ${baseReset}

    /* ── Typography ────────────────────────────────────────── */
    :root {
      --navy: #1e3a5f;
      --navy-light: #2a5080;
      --navy-dark: #152c49;
      --accent: #3a6ea5;
      --border: #c8d6e5;
      --bg: #ffffff;
      --bg-sidebar: #f5f7fa;
      --text: #2d3436;
      --text-light: #636e72;
      --serif: Georgia, 'Times New Roman', Times, serif;
      --sans: 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    }

    body {
      font-family: var(--sans);
      color: var(--text);
      background: #e8ecf1;
      line-height: 1.65;
      font-size: 15px;
    }

    /* ── Page wrapper ──────────────────────────────────────── */
    .page-wrapper {
      max-width: 1080px;
      margin: 40px auto;
      background: var(--bg);
      box-shadow: 0 2px 24px rgba(0, 0, 0, 0.10);
      border-radius: 2px;
      overflow: hidden;
    }

    /* ── Header ────────────────────────────────────────────── */
    .header {
      background: var(--navy);
      color: #ffffff;
      padding: 48px 56px 40px;
      border-bottom: 4px solid var(--navy-dark);
    }

    .header-name {
      font-family: var(--serif);
      font-size: 2.6rem;
      font-weight: 700;
      letter-spacing: 0.02em;
      margin-bottom: 4px;
      line-height: 1.2;
    }

    .header-title {
      font-family: var(--sans);
      font-size: 1.15rem;
      font-weight: 300;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      opacity: 0.85;
    }

    /* ── Two-column layout ─────────────────────────────────── */
    .content {
      display: flex;
      min-height: 600px;
    }

    .main-column {
      flex: 0 0 65%;
      max-width: 65%;
      padding: 40px 48px 48px 56px;
      border-right: 1px solid var(--border);
    }

    .sidebar {
      flex: 0 0 35%;
      max-width: 35%;
      padding: 40px 40px 48px 36px;
      background: var(--bg-sidebar);
    }

    /* ── Main-column sections ──────────────────────────────── */
    .main-section {
      margin-bottom: 36px;
    }

    .main-section:last-child {
      margin-bottom: 0;
    }

    .section-heading {
      font-family: var(--serif);
      font-size: 1.35rem;
      font-weight: 700;
      color: var(--navy);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: 0;
    }

    .section-rule {
      border: none;
      border-top: 2px solid var(--navy);
      margin: 8px 0 20px;
    }

    /* Summary */
    .summary-text {
      color: var(--text);
      line-height: 1.75;
    }

    /* Experience */
    .experience-entry {
      margin-bottom: 24px;
      padding-bottom: 24px;
      border-bottom: 1px solid var(--border);
    }

    .experience-entry:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }

    .experience-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 16px;
      margin-bottom: 8px;
    }

    .experience-role {
      font-family: var(--serif);
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--navy-dark);
    }

    .experience-company {
      font-size: 0.95rem;
      color: var(--accent);
      font-weight: 500;
      margin-top: 2px;
    }

    .experience-dates {
      font-size: 0.85rem;
      color: var(--text-light);
      white-space: nowrap;
      padding-top: 3px;
    }

    .experience-description {
      color: var(--text);
      line-height: 1.7;
      margin-top: 4px;
    }

    /* Projects */
    .project-entry {
      margin-bottom: 22px;
      padding-bottom: 22px;
      border-bottom: 1px solid var(--border);
    }

    .project-entry:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }

    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 6px;
    }

    .project-name {
      font-family: var(--serif);
      font-size: 1.05rem;
      font-weight: 700;
      color: var(--navy-dark);
    }

    .project-link {
      font-size: 0.82rem;
      color: var(--accent);
      text-decoration: underline;
      word-break: break-all;
    }

    .project-link:hover {
      color: var(--navy);
    }

    .project-description {
      color: var(--text);
      line-height: 1.7;
      margin-bottom: 8px;
    }

    .project-tech {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
    }

    .tech-tag {
      display: inline-block;
      font-size: 0.78rem;
      background: var(--navy);
      color: #ffffff;
      padding: 2px 10px;
      border-radius: 2px;
      letter-spacing: 0.02em;
    }

    /* ── Sidebar sections ──────────────────────────────────── */
    .sidebar-section {
      margin-bottom: 32px;
    }

    .sidebar-section:last-child {
      margin-bottom: 0;
    }

    .sidebar-heading {
      font-family: var(--serif);
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--navy);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      padding-bottom: 8px;
      border-bottom: 2px solid var(--navy);
      margin-bottom: 16px;
    }

    /* Contact */
    .contact-list li {
      margin-bottom: 12px;
      font-size: 0.9rem;
      line-height: 1.5;
    }

    .contact-label {
      display: block;
      font-weight: 600;
      font-size: 0.78rem;
      text-transform: uppercase;
      letter-spacing: 0.06em;
      color: var(--navy);
      margin-bottom: 1px;
    }

    .contact-list a {
      color: var(--accent);
      text-decoration: underline;
      text-decoration-color: var(--border);
      text-underline-offset: 2px;
    }

    .contact-list a:hover {
      color: var(--navy);
      text-decoration-color: var(--navy);
    }

    /* Skills */
    .skills-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
    }

    .skills-list li {
      font-size: 0.85rem;
      background: #ffffff;
      border: 1px solid var(--border);
      padding: 4px 14px;
      border-radius: 2px;
      color: var(--navy-dark);
      font-weight: 500;
    }

    /* Education */
    .education-entry {
      margin-bottom: 18px;
      padding-bottom: 18px;
      border-bottom: 1px solid var(--border);
    }

    .education-entry:last-child {
      margin-bottom: 0;
      padding-bottom: 0;
      border-bottom: none;
    }

    .education-degree {
      font-family: var(--serif);
      font-size: 0.98rem;
      font-weight: 700;
      color: var(--navy-dark);
      line-height: 1.4;
    }

    .education-institution {
      font-size: 0.9rem;
      color: var(--accent);
      font-weight: 500;
      margin-top: 2px;
    }

    .education-dates {
      font-size: 0.82rem;
      color: var(--text-light);
      margin-top: 2px;
    }

    /* ── Footer ────────────────────────────────────────────── */
    .footer {
      background: var(--navy);
      text-align: center;
      padding: 16px 56px;
      color: rgba(255, 255, 255, 0.45);
      font-size: 0.78rem;
      letter-spacing: 0.04em;
    }

    /* ── Responsive ────────────────────────────────────────── */
    @media (max-width: 768px) {
      body {
        background: var(--bg);
      }

      .page-wrapper {
        margin: 0;
        box-shadow: none;
        border-radius: 0;
      }

      .header {
        padding: 32px 24px 28px;
      }

      .header-name {
        font-size: 1.9rem;
      }

      .header-title {
        font-size: 1rem;
      }

      .content {
        flex-direction: column;
      }

      .main-column {
        flex: 1 1 auto;
        max-width: 100%;
        padding: 28px 24px 32px;
        border-right: none;
        border-bottom: 1px solid var(--border);
      }

      .sidebar {
        flex: 1 1 auto;
        max-width: 100%;
        padding: 28px 24px 32px;
      }

      .experience-header {
        flex-direction: column;
        gap: 2px;
      }

      .project-header {
        flex-direction: column;
        gap: 2px;
      }

      .footer {
        padding: 14px 24px;
      }
    }

    @media (max-width: 480px) {
      .header {
        padding: 24px 16px 20px;
      }

      .header-name {
        font-size: 1.55rem;
      }

      .main-column {
        padding: 24px 16px 28px;
      }

      .sidebar {
        padding: 24px 16px 28px;
      }

      .section-heading {
        font-size: 1.15rem;
      }
    }
  </style>
</head>
<body>
  <div class="page-wrapper">
    <header class="header">
      <h1 class="header-name">${e(data.name)}</h1>
      ${data.title ? `<p class="header-title">${e(data.title)}</p>` : ""}
    </header>

    <div class="content">
      <main class="main-column">
        ${summarySection}
        ${experienceSection}
        ${projectsSection}
      </main>

      <aside class="sidebar">
        ${contactSection}
        ${skillsSection}
        ${educationSidebar}
      </aside>
    </div>

    <footer class="footer">
      &copy; ${new Date().getFullYear()} ${e(data.name)}
    </footer>
  </div>
</body>
</html>`;
}
