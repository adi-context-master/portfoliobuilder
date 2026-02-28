import { ResumeData } from "@/types/resume";
import { baseReset } from "./base-styles";
import { escapeHtml } from "@/lib/utils";

export function generate(data: ResumeData): string {
  const e = escapeHtml;

  const contactItems: string[] = [];
  if (data.email) {
    contactItems.push(
      `<a href="mailto:${e(data.email)}" class="contact-chip"><span class="contact-icon">&#9993;</span>${e(data.email)}</a>`
    );
  }
  if (data.phone) {
    contactItems.push(
      `<span class="contact-chip"><span class="contact-icon">&#9742;</span>${e(data.phone)}</span>`
    );
  }
  if (data.location) {
    contactItems.push(
      `<span class="contact-chip"><span class="contact-icon">&#9906;</span>${e(data.location)}</span>`
    );
  }
  if (data.website) {
    contactItems.push(
      `<a href="${e(data.website)}" target="_blank" rel="noopener noreferrer" class="contact-chip"><span class="contact-icon">&#9741;</span>${e(data.website)}</a>`
    );
  }
  if (data.linkedin) {
    contactItems.push(
      `<a href="${e(data.linkedin)}" target="_blank" rel="noopener noreferrer" class="contact-chip">LinkedIn</a>`
    );
  }
  if (data.github) {
    contactItems.push(
      `<a href="${e(data.github)}" target="_blank" rel="noopener noreferrer" class="contact-chip">GitHub</a>`
    );
  }

  const summarySection = data.summary
    ? `
    <section class="section fade-in">
      <h2 class="section-title"><span class="section-accent">01.</span> About Me</h2>
      <div class="card summary-card">
        <p>${e(data.summary)}</p>
      </div>
    </section>`
    : "";

  const experienceSection =
    data.experience.length > 0
      ? `
    <section class="section fade-in">
      <h2 class="section-title"><span class="section-accent">02.</span> Experience</h2>
      <div class="timeline">
        ${data.experience
          .map(
            (exp) => `
          <div class="card timeline-card">
            <div class="timeline-dot"></div>
            <div class="card-header">
              <h3 class="card-title">${e(exp.role)}</h3>
              <span class="card-meta">${e(exp.company)}</span>
            </div>
            <span class="card-date">${e(exp.startDate)} &mdash; ${e(exp.endDate)}</span>
            <p class="card-body">${e(exp.description)}</p>
          </div>`
          )
          .join("")}
      </div>
    </section>`
      : "";

  const educationSection =
    data.education.length > 0
      ? `
    <section class="section fade-in">
      <h2 class="section-title"><span class="section-accent">03.</span> Education</h2>
      <div class="edu-grid">
        ${data.education
          .map(
            (edu) => `
          <div class="card edu-card">
            <h3 class="card-title">${e(edu.degree)}${edu.field ? ` <span class="field-highlight">in ${e(edu.field)}</span>` : ""}</h3>
            <span class="card-meta">${e(edu.institution)}</span>
            <span class="card-date">${e(edu.startDate)} &mdash; ${e(edu.endDate)}</span>
          </div>`
          )
          .join("")}
      </div>
    </section>`
      : "";

  const skillsSection =
    data.skills.length > 0
      ? `
    <section class="section fade-in">
      <h2 class="section-title"><span class="section-accent">04.</span> Skills</h2>
      <div class="skills-grid">
        ${data.skills
          .map(
            (skill, i) => `
          <div class="skill-chip skill-color-${i % 5}" style="animation-delay: ${i * 0.06}s">
            ${e(skill)}
          </div>`
          )
          .join("")}
      </div>
    </section>`
      : "";

  const projectsSection =
    data.projects.length > 0
      ? `
    <section class="section fade-in">
      <h2 class="section-title"><span class="section-accent">05.</span> Projects</h2>
      <div class="projects-grid">
        ${data.projects
          .map(
            (proj, i) => `
          <div class="card project-card project-size-${i % 3}" style="animation-delay: ${i * 0.1}s">
            <div class="project-header">
              <h3 class="card-title">${e(proj.name)}</h3>
              ${proj.url ? `<a href="${e(proj.url)}" target="_blank" rel="noopener noreferrer" class="project-link" aria-label="Visit ${e(proj.name)}">&#8599;</a>` : ""}
            </div>
            <p class="card-body">${e(proj.description)}</p>
            ${
              proj.technologies.length > 0
                ? `<div class="tech-tags">${proj.technologies.map((t) => `<span class="tech-tag">${e(t)}</span>`).join("")}</div>`
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
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${e(data.name)}${data.title ? ` &mdash; ${e(data.title)}` : ""}</title>
  <style>
    ${baseReset}

    :root {
      --color-bg: #faf5ff;
      --color-surface: #ffffff;
      --color-text: #1e1b4b;
      --color-text-muted: #6b7280;
      --color-pink: #ec4899;
      --color-purple: #a855f7;
      --color-blue: #3b82f6;
      --color-lavender: #c4b5fd;
      --color-rose: #fecdd3;
      --color-sky: #bae6fd;
      --color-mint: #a7f3d0;
      --color-peach: #fed7aa;
      --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
      --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.06), 0 2px 6px rgba(0, 0, 0, 0.04);
      --shadow-lg: 0 10px 30px rgba(0, 0, 0, 0.08), 0 4px 12px rgba(0, 0, 0, 0.04);
      --radius: 16px;
      --radius-sm: 10px;
      --radius-full: 9999px;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background-color: var(--color-bg);
      color: var(--color-text);
      line-height: 1.7;
    }

    /* ========== Decorative Background ========== */

    body::before {
      content: "";
      position: fixed;
      top: -40%;
      right: -20%;
      width: 600px;
      height: 600px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(168, 85, 247, 0.08) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }

    body::after {
      content: "";
      position: fixed;
      bottom: -30%;
      left: -15%;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(236, 72, 153, 0.07) 0%, transparent 70%);
      pointer-events: none;
      z-index: 0;
    }

    .wrapper {
      position: relative;
      z-index: 1;
      max-width: 960px;
      margin: 0 auto;
      padding: 48px 24px 80px;
    }

    /* ========== Keyframes ========== */

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(28px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.92);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-4px); }
    }

    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }

    .fade-in {
      opacity: 0;
      animation: fadeInUp 0.7s ease-out forwards;
    }

    /* ========== Header ========== */

    .header {
      text-align: center;
      padding: 48px 24px 40px;
      margin-bottom: 40px;
      animation: fadeIn 0.8s ease-out forwards;
    }

    .header-name {
      font-size: 3rem;
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1.15;
      background: linear-gradient(135deg, var(--color-purple), var(--color-pink), var(--color-blue));
      background-size: 200% auto;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      animation: shimmer 6s linear infinite;
    }

    .header-title {
      font-size: 1.2rem;
      font-weight: 400;
      color: var(--color-text-muted);
      margin-top: 8px;
      letter-spacing: 0.02em;
    }

    .contact-bar {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 10px;
      margin-top: 28px;
    }

    .contact-chip {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 16px;
      font-size: 0.85rem;
      color: var(--color-text);
      background: var(--color-surface);
      border: 1px solid rgba(168, 85, 247, 0.15);
      border-radius: var(--radius-full);
      box-shadow: var(--shadow-sm);
      transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
    }

    .contact-chip:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
      border-color: var(--color-lavender);
    }

    .contact-icon {
      font-size: 1rem;
      line-height: 1;
    }

    /* ========== Sections ========== */

    .section {
      margin-bottom: 56px;
    }

    .section:nth-child(2) { animation-delay: 0.1s; }
    .section:nth-child(3) { animation-delay: 0.2s; }
    .section:nth-child(4) { animation-delay: 0.3s; }
    .section:nth-child(5) { animation-delay: 0.4s; }
    .section:nth-child(6) { animation-delay: 0.5s; }

    .section-title {
      font-size: 1.6rem;
      font-weight: 700;
      margin-bottom: 24px;
      letter-spacing: -0.02em;
    }

    .section-accent {
      font-family: "Courier New", Courier, monospace;
      font-weight: 600;
      font-size: 0.9rem;
      color: var(--color-purple);
      margin-right: 8px;
    }

    /* ========== Cards ========== */

    .card {
      background: var(--color-surface);
      border-radius: var(--radius);
      padding: 28px;
      box-shadow: var(--shadow-md);
      border: 1px solid rgba(168, 85, 247, 0.08);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
    }

    .card:hover {
      transform: translateY(-3px);
      box-shadow: var(--shadow-lg);
    }

    .card-header {
      margin-bottom: 6px;
    }

    .card-title {
      font-size: 1.15rem;
      font-weight: 700;
      color: var(--color-text);
      line-height: 1.35;
    }

    .card-meta {
      display: block;
      font-size: 0.95rem;
      font-weight: 500;
      color: var(--color-purple);
      margin-top: 2px;
    }

    .card-date {
      display: inline-block;
      font-size: 0.82rem;
      font-weight: 500;
      color: var(--color-text-muted);
      background: rgba(168, 85, 247, 0.07);
      padding: 3px 12px;
      border-radius: var(--radius-full);
      margin-top: 8px;
    }

    .card-body {
      font-size: 0.95rem;
      color: var(--color-text-muted);
      margin-top: 14px;
      line-height: 1.75;
    }

    .field-highlight {
      font-weight: 400;
      color: var(--color-pink);
    }

    /* ========== Summary ========== */

    .summary-card {
      border-left: 4px solid var(--color-purple);
      font-size: 1.05rem;
      line-height: 1.8;
      color: var(--color-text);
    }

    /* ========== Timeline (Experience) ========== */

    .timeline {
      display: flex;
      flex-direction: column;
      gap: 20px;
      position: relative;
      padding-left: 24px;
    }

    .timeline::before {
      content: "";
      position: absolute;
      left: 5px;
      top: 8px;
      bottom: 8px;
      width: 2px;
      background: linear-gradient(180deg, var(--color-purple), var(--color-pink), var(--color-blue));
      border-radius: 2px;
    }

    .timeline-card {
      position: relative;
      animation: slideInLeft 0.5s ease-out both;
    }

    .timeline-card:nth-child(1) { animation-delay: 0.1s; }
    .timeline-card:nth-child(2) { animation-delay: 0.2s; }
    .timeline-card:nth-child(3) { animation-delay: 0.3s; }
    .timeline-card:nth-child(4) { animation-delay: 0.4s; }
    .timeline-card:nth-child(5) { animation-delay: 0.5s; }

    .timeline-dot {
      position: absolute;
      left: -27px;
      top: 32px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: var(--color-purple);
      border: 3px solid var(--color-bg);
      box-shadow: 0 0 0 2px var(--color-purple);
    }

    /* ========== Education Grid ========== */

    .edu-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 20px;
    }

    .edu-card {
      border-top: 3px solid;
      border-image: linear-gradient(90deg, var(--color-blue), var(--color-purple)) 1;
    }

    /* ========== Skills Grid (Asymmetric) ========== */

    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
    }

    .skill-chip {
      padding: 10px 22px;
      font-size: 0.9rem;
      font-weight: 600;
      border-radius: var(--radius-full);
      animation: scaleIn 0.4s ease-out both;
      transition: transform 0.2s ease, box-shadow 0.2s ease;
      cursor: default;
    }

    .skill-chip:hover {
      transform: translateY(-2px) scale(1.04);
      box-shadow: var(--shadow-md);
    }

    .skill-color-0 { background: var(--color-rose); color: #9f1239; }
    .skill-color-1 { background: var(--color-lavender); color: #5b21b6; }
    .skill-color-2 { background: var(--color-sky); color: #0c4a6e; }
    .skill-color-3 { background: var(--color-mint); color: #065f46; }
    .skill-color-4 { background: var(--color-peach); color: #9a3412; }

    /* ========== Projects Grid (Asymmetric) ========== */

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      grid-auto-rows: auto;
      gap: 20px;
    }

    .project-card {
      animation: scaleIn 0.5s ease-out both;
    }

    .project-size-0 {
      grid-column: span 2;
    }

    .project-size-1 {
      grid-column: span 1;
    }

    .project-size-2 {
      grid-column: span 1;
    }

    .project-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 12px;
    }

    .project-link {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      min-width: 36px;
      font-size: 1.2rem;
      font-weight: 700;
      color: var(--color-purple);
      background: rgba(168, 85, 247, 0.08);
      border-radius: 50%;
      transition: background 0.2s ease, color 0.2s ease, transform 0.2s ease;
    }

    .project-link:hover {
      background: var(--color-purple);
      color: #fff;
      transform: scale(1.1);
    }

    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-top: 16px;
    }

    .tech-tag {
      font-size: 0.78rem;
      font-weight: 600;
      padding: 4px 12px;
      border-radius: var(--radius-full);
      background: rgba(59, 130, 246, 0.1);
      color: var(--color-blue);
      letter-spacing: 0.01em;
    }

    /* ========== Footer ========== */

    .footer {
      text-align: center;
      padding: 40px 0 0;
      font-size: 0.82rem;
      color: var(--color-text-muted);
      opacity: 0.7;
    }

    .footer-dot {
      display: inline-block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin: 0 4px;
      vertical-align: middle;
      animation: float 3s ease-in-out infinite;
    }

    .footer-dot:nth-child(1) { background: var(--color-pink); animation-delay: 0s; }
    .footer-dot:nth-child(2) { background: var(--color-purple); animation-delay: 0.3s; }
    .footer-dot:nth-child(3) { background: var(--color-blue); animation-delay: 0.6s; }

    /* ========== Responsive ========== */

    @media (max-width: 768px) {
      .wrapper {
        padding: 32px 16px 60px;
      }

      .header {
        padding: 32px 16px 28px;
      }

      .header-name {
        font-size: 2.2rem;
      }

      .header-title {
        font-size: 1.05rem;
      }

      .section-title {
        font-size: 1.35rem;
      }

      .card {
        padding: 22px;
      }

      .projects-grid {
        grid-template-columns: 1fr;
      }

      .project-size-0,
      .project-size-1,
      .project-size-2 {
        grid-column: span 1;
      }

      .edu-grid {
        grid-template-columns: 1fr;
      }

      .timeline {
        padding-left: 20px;
      }

      .timeline-dot {
        left: -23px;
      }
    }

    @media (max-width: 480px) {
      .header-name {
        font-size: 1.75rem;
      }

      .contact-bar {
        gap: 8px;
      }

      .contact-chip {
        font-size: 0.8rem;
        padding: 5px 12px;
      }

      .skill-chip {
        padding: 8px 16px;
        font-size: 0.82rem;
      }

      .card {
        padding: 18px;
        border-radius: var(--radius-sm);
      }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <header class="header">
      ${data.name ? `<h1 class="header-name">${e(data.name)}</h1>` : ""}
      ${data.title ? `<p class="header-title">${e(data.title)}</p>` : ""}
      ${contactItems.length > 0 ? `<div class="contact-bar">${contactItems.join("")}</div>` : ""}
    </header>

    ${summarySection}
    ${experienceSection}
    ${educationSection}
    ${skillsSection}
    ${projectsSection}

    <footer class="footer">
      <span class="footer-dot"></span>
      <span class="footer-dot"></span>
      <span class="footer-dot"></span>
    </footer>
  </div>

  <script>
    (function() {
      var els = document.querySelectorAll('.fade-in');
      if (!('IntersectionObserver' in window)) {
        els.forEach(function(el) { el.style.opacity = '1'; });
        return;
      }
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12 });
      els.forEach(function(el) {
        el.style.animationPlayState = 'paused';
        observer.observe(el);
      });
    })();
  </script>
</body>
</html>`;
}
