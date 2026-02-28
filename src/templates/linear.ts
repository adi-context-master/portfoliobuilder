import { ResumeData } from "@/types/resume";
import { baseReset } from "./base-styles";
import { escapeHtml } from "@/lib/utils";

export function generate(data: ResumeData): string {
  const e = escapeHtml;

  // -- Determine which sections have content --
  const hasContact =
    data.email || data.phone || data.location || data.website || data.linkedin || data.github;
  const hasSummary = data.summary.trim().length > 0;
  const hasExperience = data.experience.length > 0;
  const hasEducation = data.education.length > 0;
  const hasSkills = data.skills.length > 0;
  const hasProjects = data.projects.length > 0;

  // -- Contact pills --
  const contactPills: string[] = [];
  if (data.email) {
    contactPills.push(
      `<a href="mailto:${e(data.email)}" class="contact-pill">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
        ${e(data.email)}
      </a>`
    );
  }
  if (data.phone) {
    contactPills.push(
      `<a href="tel:${e(data.phone)}" class="contact-pill">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
        ${e(data.phone)}
      </a>`
    );
  }
  if (data.location) {
    contactPills.push(
      `<span class="contact-pill">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
        ${e(data.location)}
      </span>`
    );
  }
  if (data.website) {
    contactPills.push(
      `<a href="${e(data.website)}" target="_blank" rel="noopener noreferrer" class="contact-pill">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
        ${e(data.website)}
      </a>`
    );
  }
  if (data.linkedin) {
    contactPills.push(
      `<a href="${e(data.linkedin)}" target="_blank" rel="noopener noreferrer" class="contact-pill">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
        LinkedIn
      </a>`
    );
  }
  if (data.github) {
    contactPills.push(
      `<a href="${e(data.github)}" target="_blank" rel="noopener noreferrer" class="contact-pill">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
        GitHub
      </a>`
    );
  }

  // -- Header section --
  const headerSection = `
    <header class="header section-animate">
      <div class="header-content">
        <h1 class="header-name">${e(data.name)}</h1>
        ${data.title ? `<p class="header-title">${e(data.title)}</p>` : ""}
        ${
          hasContact
            ? `<div class="contact-row">${contactPills.join("")}</div>`
            : ""
        }
      </div>
    </header>`;

  // -- Summary section --
  const summarySection = hasSummary
    ? `
    <section class="section section-animate">
      <div class="section-label">
        <span class="label-dot"></span>
        <span class="label-text">About</span>
      </div>
      <div class="glass-card summary-card">
        <p class="summary-text">${e(data.summary)}</p>
      </div>
    </section>`
    : "";

  // -- Experience section --
  const experienceSection = hasExperience
    ? `
    <section class="section section-animate">
      <div class="section-label">
        <span class="label-dot"></span>
        <span class="label-text">Experience</span>
      </div>
      <div class="entries-grid">
        ${data.experience
          .map(
            (exp) => `
        <div class="glass-card experience-card">
          <div class="experience-header">
            <div class="experience-info">
              <h3 class="experience-role">${e(exp.role)}</h3>
              <p class="experience-company">${e(exp.company)}</p>
            </div>
            <span class="date-badge">${e(exp.startDate)} &mdash; ${e(exp.endDate)}</span>
          </div>
          ${exp.description ? `<p class="experience-description">${e(exp.description)}</p>` : ""}
        </div>`
          )
          .join("")}
      </div>
    </section>`
    : "";

  // -- Education section --
  const educationSection = hasEducation
    ? `
    <section class="section section-animate">
      <div class="section-label">
        <span class="label-dot"></span>
        <span class="label-text">Education</span>
      </div>
      <div class="entries-grid">
        ${data.education
          .map(
            (edu) => `
        <div class="glass-card education-card">
          <div class="education-header">
            <div class="education-info">
              <h3 class="education-degree">${e(edu.degree)}${edu.field ? ` <span class="education-field">in ${e(edu.field)}</span>` : ""}</h3>
              <p class="education-institution">${e(edu.institution)}</p>
            </div>
            <span class="date-badge">${e(edu.startDate)} &mdash; ${e(edu.endDate)}</span>
          </div>
        </div>`
          )
          .join("")}
      </div>
    </section>`
    : "";

  // -- Skills section --
  const skillsSection = hasSkills
    ? `
    <section class="section section-animate">
      <div class="section-label">
        <span class="label-dot"></span>
        <span class="label-text">Skills</span>
      </div>
      <div class="skills-grid">
        ${data.skills
          .map(
            (skill) =>
              `<span class="skill-pill">${e(skill)}</span>`
          )
          .join("")}
      </div>
    </section>`
    : "";

  // -- Projects section --
  const projectsSection = hasProjects
    ? `
    <section class="section section-animate">
      <div class="section-label">
        <span class="label-dot"></span>
        <span class="label-text">Projects</span>
      </div>
      <div class="projects-grid">
        ${data.projects
          .map(
            (proj) => `
        <div class="glass-card project-card">
          <div class="project-header">
            <h3 class="project-name">${e(proj.name)}</h3>
            ${proj.url ? `<a href="${e(proj.url)}" target="_blank" rel="noopener noreferrer" class="project-link">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
              <span>View</span>
            </a>` : ""}
          </div>
          ${proj.description ? `<p class="project-description">${e(proj.description)}</p>` : ""}
          ${
            proj.technologies.length > 0
              ? `<div class="project-technologies">
                  ${proj.technologies.map((t) => `<span class="tech-pill">${e(t)}</span>`).join("")}
                </div>`
              : ""
          }
        </div>`
          )
          .join("")}
      </div>
    </section>`
    : "";

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${e(data.name)} — Portfolio</title>
  <style>
    ${baseReset}

    /* ========================================
       LINEAR / MODERN — CINEMATIC DARK MODE
       ======================================== */

    :root {
      --bg-deep: #050506;
      --bg-base: #0a0a0c;
      --bg-elevated: #0f0f12;
      --bg-card: rgba(255, 255, 255, 0.05);
      --bg-card-hover: rgba(255, 255, 255, 0.07);
      --text-primary: #EDEDEF;
      --text-secondary: #B4B4B8;
      --text-muted: #8A8F98;
      --text-faint: #5C5F66;
      --accent: #5E6AD2;
      --accent-hover: #6872D9;
      --accent-glow: rgba(94, 106, 210, 0.3);
      --accent-subtle: rgba(94, 106, 210, 0.12);
      --border: rgba(255, 255, 255, 0.06);
      --border-hover: rgba(255, 255, 255, 0.1);
      --font-sans: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      --font-mono: "JetBrains Mono", "Fira Code", "SF Mono", "Cascadia Code", monospace;
      --radius-card: 16px;
      --radius-btn: 8px;
      --radius-pill: 9999px;
    }

    /* ---- Layered background ---- */
    body {
      font-family: var(--font-sans);
      background: radial-gradient(ellipse at top, #0a0a0f 0%, #050506 50%, #020203 100%);
      color: var(--text-primary);
      font-size: 15px;
      line-height: 1.6;
      min-height: 100vh;
      position: relative;
      overflow-x: hidden;
    }

    /* Ambient blob — top right (indigo) */
    body::before {
      content: '';
      position: fixed;
      top: -200px;
      right: -150px;
      width: 800px;
      height: 800px;
      background: radial-gradient(circle, rgba(94, 106, 210, 0.15) 0%, transparent 70%);
      filter: blur(150px);
      pointer-events: none;
      z-index: 0;
      animation: float 10s ease-in-out infinite;
    }

    /* Ambient blob — bottom left (purple) */
    body::after {
      content: '';
      position: fixed;
      bottom: -250px;
      left: -200px;
      width: 900px;
      height: 900px;
      background: radial-gradient(circle, rgba(120, 80, 200, 0.1) 0%, transparent 70%);
      filter: blur(150px);
      pointer-events: none;
      z-index: 0;
      animation: float 8s ease-in-out infinite reverse;
    }

    /* Subtle grid overlay */
    .grid-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: 0;
      background-image:
        repeating-linear-gradient(
          0deg,
          rgba(255, 255, 255, 0.02) 0px,
          rgba(255, 255, 255, 0.02) 1px,
          transparent 1px,
          transparent 80px
        ),
        repeating-linear-gradient(
          90deg,
          rgba(255, 255, 255, 0.02) 0px,
          rgba(255, 255, 255, 0.02) 1px,
          transparent 1px,
          transparent 80px
        );
    }

    /* ---- Animations ---- */
    @keyframes float {
      0%, 100% {
        transform: translateY(0px);
      }
      50% {
        transform: translateY(-20px);
      }
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(20px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes shimmer {
      0% {
        background-position: -200% 0;
      }
      100% {
        background-position: 200% 0;
      }
    }

    /* Section animation (triggered by IntersectionObserver) */
    .section-animate {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease, transform 0.6s ease;
    }

    .section-animate.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* ---- Layout container ---- */
    .container {
      position: relative;
      z-index: 1;
      max-width: 780px;
      margin: 0 auto;
      padding: 4rem 1.5rem 6rem;
    }

    /* ---- Gradient text utility ---- */
    .gradient-text {
      background: linear-gradient(to bottom, #fff, rgba(255, 255, 255, 0.7));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* ========================================
       HEADER
       ======================================== */
    .header {
      text-align: center;
      padding-bottom: 4rem;
      margin-bottom: 1rem;
    }

    .header-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
    }

    .header-name {
      font-size: 3.5rem;
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.1;
      background: linear-gradient(to bottom, #fff, rgba(255, 255, 255, 0.7));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .header-title {
      font-size: 1.2rem;
      font-weight: 400;
      color: var(--text-muted);
      letter-spacing: 0.01em;
      margin-top: 0.25rem;
    }

    .contact-row {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 0.5rem;
      margin-top: 1.5rem;
    }

    .contact-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.4rem 0.85rem;
      font-size: 0.8rem;
      color: var(--text-secondary);
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid var(--border);
      border-radius: var(--radius-pill);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      transition: all 0.25s ease;
      cursor: default;
    }

    a.contact-pill {
      cursor: pointer;
    }

    a.contact-pill:hover {
      color: var(--text-primary);
      background: rgba(255, 255, 255, 0.08);
      border-color: var(--border-hover);
    }

    .contact-pill svg {
      flex-shrink: 0;
      opacity: 0.6;
    }

    /* ========================================
       SECTIONS
       ======================================== */
    .section {
      margin-bottom: 5rem;
    }

    .section-label {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      margin-bottom: 1.75rem;
    }

    .label-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent);
      box-shadow: 0 0 8px var(--accent-glow);
      flex-shrink: 0;
    }

    .label-text {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: var(--text-muted);
    }

    /* ========================================
       GLASS CARDS
       ======================================== */
    .glass-card {
      background: linear-gradient(
        135deg,
        rgba(255, 255, 255, 0.08) 0%,
        rgba(255, 255, 255, 0.02) 100%
      );
      border: 1px solid var(--border);
      border-radius: var(--radius-card);
      padding: 1.75rem;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.06),
        0 2px 20px rgba(0, 0, 0, 0.4),
        0 0 40px rgba(0, 0, 0, 0.2);
      transition: all 0.35s ease;
    }

    .glass-card:hover {
      border-color: var(--border-hover);
      box-shadow:
        0 0 0 1px rgba(255, 255, 255, 0.08),
        0 2px 20px rgba(0, 0, 0, 0.4),
        0 0 40px rgba(0, 0, 0, 0.2),
        0 0 80px rgba(94, 106, 210, 0.1);
    }

    .entries-grid {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    /* ========================================
       SUMMARY
       ======================================== */
    .summary-card {
      border-left: 3px solid var(--accent);
    }

    .summary-text {
      font-size: 1.05rem;
      line-height: 1.8;
      color: var(--text-secondary);
    }

    /* ========================================
       EXPERIENCE
       ======================================== */
    .experience-card {
      position: relative;
    }

    .experience-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      margin-bottom: 0.75rem;
      flex-wrap: wrap;
    }

    .experience-info {
      flex: 1;
      min-width: 180px;
    }

    .experience-role {
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--text-primary);
      letter-spacing: -0.01em;
      line-height: 1.3;
    }

    .experience-company {
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-top: 0.2rem;
    }

    .date-badge {
      display: inline-block;
      font-family: var(--font-mono);
      font-size: 0.7rem;
      color: var(--text-faint);
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border);
      border-radius: var(--radius-pill);
      padding: 0.25rem 0.7rem;
      white-space: nowrap;
      letter-spacing: 0.02em;
      flex-shrink: 0;
    }

    .experience-description {
      font-size: 0.92rem;
      line-height: 1.75;
      color: var(--text-secondary);
      white-space: pre-wrap;
    }

    /* ========================================
       EDUCATION
       ======================================== */
    .education-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .education-info {
      flex: 1;
      min-width: 180px;
    }

    .education-degree {
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--text-primary);
      letter-spacing: -0.01em;
      line-height: 1.3;
    }

    .education-field {
      font-weight: 400;
      color: var(--accent);
    }

    .education-institution {
      font-size: 0.9rem;
      color: var(--text-muted);
      margin-top: 0.15rem;
    }

    /* ========================================
       SKILLS
       ======================================== */
    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
    }

    .skill-pill {
      display: inline-block;
      padding: 0.4rem 0.9rem;
      font-size: 0.8rem;
      font-weight: 500;
      color: var(--text-secondary);
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border);
      border-radius: var(--radius-pill);
      transition: all 0.25s ease;
      cursor: default;
    }

    .skill-pill:hover {
      color: var(--accent-hover);
      border-color: rgba(94, 106, 210, 0.3);
      background: var(--accent-subtle);
      box-shadow: 0 0 16px rgba(94, 106, 210, 0.12);
    }

    /* ========================================
       PROJECTS
       ======================================== */
    .projects-grid {
      display: grid;
      grid-template-columns: 1fr;
      gap: 1rem;
    }

    .project-card {
      position: relative;
    }

    /* Gradient border on hover via pseudo-element */
    .project-card::before {
      content: '';
      position: absolute;
      inset: -1px;
      border-radius: calc(var(--radius-card) + 1px);
      padding: 1px;
      background: linear-gradient(
        135deg,
        rgba(94, 106, 210, 0.4),
        rgba(120, 80, 200, 0.2),
        transparent 60%
      );
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      opacity: 0;
      transition: opacity 0.35s ease;
      pointer-events: none;
    }

    .project-card:hover::before {
      opacity: 1;
    }

    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.6rem;
    }

    .project-name {
      font-size: 1.05rem;
      font-weight: 600;
      color: var(--text-primary);
      letter-spacing: -0.01em;
    }

    .project-link {
      display: inline-flex;
      align-items: center;
      gap: 0.35rem;
      font-size: 0.75rem;
      font-weight: 500;
      color: var(--accent);
      padding: 0.3rem 0.65rem;
      border: 1px solid rgba(94, 106, 210, 0.2);
      border-radius: var(--radius-btn);
      transition: all 0.25s ease;
      flex-shrink: 0;
    }

    .project-link:hover {
      color: var(--accent-hover);
      background: var(--accent-subtle);
      border-color: rgba(94, 106, 210, 0.35);
    }

    .project-link svg {
      flex-shrink: 0;
    }

    .project-description {
      font-size: 0.92rem;
      line-height: 1.7;
      color: var(--text-secondary);
      margin-bottom: 0.75rem;
    }

    .project-technologies {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
    }

    .tech-pill {
      display: inline-block;
      padding: 0.2rem 0.55rem;
      font-family: var(--font-mono);
      font-size: 0.68rem;
      font-weight: 500;
      color: var(--text-muted);
      background: rgba(255, 255, 255, 0.04);
      border: 1px solid var(--border);
      border-radius: var(--radius-pill);
    }

    /* ========================================
       FOOTER
       ======================================== */
    .footer {
      text-align: center;
      padding-top: 3rem;
      margin-top: 2rem;
      border-top: 1px solid var(--border);
    }

    .footer-text {
      font-size: 0.75rem;
      color: var(--text-faint);
      letter-spacing: 0.04em;
    }

    .footer-accent {
      display: inline-block;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background: var(--accent);
      margin-bottom: 0.75rem;
      box-shadow: 0 0 8px var(--accent-glow);
    }

    /* ========================================
       RESPONSIVE
       ======================================== */
    @media (min-width: 769px) {
      .container {
        padding: 6rem 2rem 8rem;
      }

      .projects-grid {
        grid-template-columns: repeat(2, 1fr);
      }
    }

    @media (max-width: 768px) {
      .container {
        padding: 3rem 1.25rem 4rem;
      }

      .header-name {
        font-size: 2.5rem;
      }

      .header-title {
        font-size: 1.05rem;
      }

      .header {
        padding-bottom: 3rem;
      }

      .section {
        margin-bottom: 3.5rem;
      }

      .glass-card {
        padding: 1.25rem;
      }

      .contact-row {
        gap: 0.4rem;
      }

      .contact-pill {
        font-size: 0.75rem;
        padding: 0.35rem 0.7rem;
      }

      .experience-header {
        flex-direction: column;
        gap: 0.5rem;
      }

      .education-header {
        flex-direction: column;
        gap: 0.5rem;
      }

      .skills-grid {
        gap: 0.4rem;
      }

      .skill-pill {
        font-size: 0.75rem;
        padding: 0.3rem 0.7rem;
      }
    }

    @media (max-width: 480px) {
      .header-name {
        font-size: 2rem;
      }

      .header-title {
        font-size: 0.95rem;
      }

      .contact-row {
        flex-direction: column;
        align-items: center;
      }

      .section-label {
        margin-bottom: 1.25rem;
      }

      .project-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.5rem;
      }

      .glass-card {
        padding: 1rem;
        border-radius: 12px;
      }

      body::before {
        width: 400px;
        height: 400px;
      }

      body::after {
        width: 500px;
        height: 500px;
      }
    }

    /* ---- Print-friendly overrides ---- */
    @media print {
      body {
        background: #fff;
        color: #1a1a1a;
      }

      body::before,
      body::after,
      .grid-overlay {
        display: none;
      }

      .glass-card {
        background: #f8f8f8;
        border-color: #ddd;
        box-shadow: none;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
      }

      .glass-card:hover {
        box-shadow: none;
      }

      .header-name {
        background: none;
        -webkit-background-clip: unset;
        -webkit-text-fill-color: #1a1a1a;
        color: #1a1a1a;
      }

      .contact-pill {
        background: #f0f0f0;
        border-color: #ddd;
        color: #333;
        backdrop-filter: none;
        -webkit-backdrop-filter: none;
      }

      .skill-pill {
        color: #333;
        border-color: #ddd;
        background: #f0f0f0;
      }

      .label-dot {
        box-shadow: none;
      }

      .section-animate {
        opacity: 1;
        transform: none;
      }

      .project-card::before {
        display: none;
      }

      .footer-accent {
        box-shadow: none;
      }
    }
  </style>
</head>
<body>
  <div class="grid-overlay"></div>
  <div class="container">
    ${headerSection}
    ${summarySection}
    ${experienceSection}
    ${educationSection}
    ${skillsSection}
    ${projectsSection}
    <footer class="footer">
      <div class="footer-accent"></div>
      <p class="footer-text">${data.name ? e(data.name) : "Portfolio"}</p>
    </footer>
  </div>
  <script>
    (function() {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      document.querySelectorAll('.section-animate').forEach(function(el) {
        observer.observe(el);
      });
    })();
  </script>
</body>
</html>`;
}
