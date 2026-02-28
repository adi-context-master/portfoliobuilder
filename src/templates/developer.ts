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

  // -- Contact info line (rendered like env vars) --
  const contactLines: string[] = [];
  if (data.email) {
    contactLines.push(
      `<a href="mailto:${e(data.email)}" class="contact-link"><span class="var">EMAIL</span>="${e(data.email)}"</a>`
    );
  }
  if (data.phone) {
    contactLines.push(
      `<a href="tel:${e(data.phone)}" class="contact-link"><span class="var">PHONE</span>="${e(data.phone)}"</a>`
    );
  }
  if (data.location) {
    contactLines.push(
      `<span class="contact-link"><span class="var">LOCATION</span>="${e(data.location)}"</span>`
    );
  }
  if (data.website) {
    contactLines.push(
      `<a href="${e(data.website)}" target="_blank" rel="noopener noreferrer" class="contact-link"><span class="var">WEB</span>="${e(data.website)}"</a>`
    );
  }
  if (data.linkedin) {
    contactLines.push(
      `<a href="${e(data.linkedin)}" target="_blank" rel="noopener noreferrer" class="contact-link"><span class="var">LINKEDIN</span>="${e(data.linkedin)}"</a>`
    );
  }
  if (data.github) {
    contactLines.push(
      `<a href="${e(data.github)}" target="_blank" rel="noopener noreferrer" class="contact-link"><span class="var">GITHUB</span>="${e(data.github)}"</a>`
    );
  }

  // -- Header section --
  const headerSection = `
    <header class="terminal-header">
      <div class="terminal-bar">
        <span class="terminal-dot red"></span>
        <span class="terminal-dot yellow"></span>
        <span class="terminal-dot green"></span>
        <span class="terminal-bar-title">portfolio.sh</span>
      </div>
      <div class="terminal-body">
        <div class="ascii-greeting">
          <span class="prompt">$</span> cat /etc/motd
        </div>
        <h1 class="glitch-name">${e(data.name)}<span class="cursor">_</span></h1>
        ${data.title ? `<p class="title-line"><span class="comment">// ${e(data.title)}</span></p>` : ""}
        ${
          hasContact
            ? `<div class="contact-env">
                <span class="prompt">$</span> export \\
                <div class="env-vars">${contactLines.join(' \\\n                  ')}</div>
              </div>`
            : ""
        }
      </div>
    </header>`;

  // -- Summary section --
  const summarySection = hasSummary
    ? `
    <section class="terminal-section">
      <h2 class="section-header"><span class="prompt">$</span> cat README.md</h2>
      <div class="code-block">
        <div class="block-header"><span class="file-indicator">~</span> README.md</div>
        <div class="block-content">
          <p class="summary-text">${e(data.summary)}</p>
        </div>
      </div>
    </section>`
    : "";

  // -- Experience section --
  const experienceSection = hasExperience
    ? `
    <section class="terminal-section">
      <h2 class="section-header"><span class="prompt">$</span> git log --oneline experience/</h2>
      <div class="entries">
        ${data.experience
          .map(
            (exp) => `
          <div class="code-block">
            <div class="block-header">
              <span class="file-indicator">&gt;</span>
              <span class="entry-title">${e(exp.role)}</span>
              <span class="entry-meta">@ ${e(exp.company)}</span>
            </div>
            <div class="block-content">
              <span class="date-range"><span class="comment">/* ${e(exp.startDate)} &mdash; ${e(exp.endDate)} */</span></span>
              <p class="entry-desc">${e(exp.description)}</p>
            </div>
          </div>`
          )
          .join("")}
      </div>
    </section>`
    : "";

  // -- Education section --
  const educationSection = hasEducation
    ? `
    <section class="terminal-section">
      <h2 class="section-header"><span class="prompt">$</span> ls -la education/</h2>
      <div class="entries">
        ${data.education
          .map(
            (edu) => `
          <div class="code-block">
            <div class="block-header">
              <span class="file-indicator">&gt;</span>
              <span class="entry-title">${e(edu.degree)}${edu.field ? ` in ${e(edu.field)}` : ""}</span>
            </div>
            <div class="block-content">
              <span class="entry-meta">${e(edu.institution)}</span>
              <span class="date-range"><span class="comment">/* ${e(edu.startDate)} &mdash; ${e(edu.endDate)} */</span></span>
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
    <section class="terminal-section">
      <h2 class="section-header"><span class="prompt">$</span> echo $SKILLS | tr ',' '\\n'</h2>
      <div class="skills-grid">
        ${data.skills
          .map(
            (skill) =>
              `<span class="skill-tag"><span class="tag-bracket">[</span>${e(skill)}<span class="tag-bracket">]</span></span>`
          )
          .join("")}
      </div>
    </section>`
    : "";

  // -- Projects section --
  const projectsSection = hasProjects
    ? `
    <section class="terminal-section">
      <h2 class="section-header"><span class="prompt">$</span> find ~/projects -type d -maxdepth 1</h2>
      <div class="entries">
        ${data.projects
          .map(
            (proj) => `
          <div class="code-block">
            <div class="block-header">
              <span class="file-indicator">&gt;</span>
              <span class="entry-title">${e(proj.name)}</span>
              ${proj.url ? `<a href="${e(proj.url)}" target="_blank" rel="noopener noreferrer" class="project-link">[open]</a>` : ""}
            </div>
            <div class="block-content">
              <p class="entry-desc">${e(proj.description)}</p>
              ${
                proj.technologies.length > 0
                  ? `<div class="tech-stack">
                      <span class="comment">// stack:</span>
                      ${proj.technologies.map((t) => `<span class="tech-tag">${e(t)}</span>`).join("")}
                    </div>`
                  : ""
              }
            </div>
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
       DEVELOPER / TERMINAL THEME
       ======================================== */

    :root {
      --bg-primary: #0d1117;
      --bg-secondary: #161b22;
      --bg-card: #1a1f2b;
      --bg-card-header: #21262d;
      --border: #30363d;
      --border-highlight: #3d444d;
      --text-primary: #c9d1d9;
      --text-secondary: #8b949e;
      --text-muted: #6e7681;
      --green: #4ade80;
      --green-dim: #22c55e;
      --green-glow: rgba(74, 222, 128, 0.15);
      --amber: #fbbf24;
      --amber-dim: #d97706;
      --amber-glow: rgba(251, 191, 36, 0.12);
      --cyan: #22d3ee;
      --purple: #a78bfa;
      --red-dot: #ff5f57;
      --yellow-dot: #febc2e;
      --green-dot: #28c840;
      --font-mono: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Consolas', 'Monaco', monospace;
    }

    body {
      font-family: var(--font-mono);
      background-color: var(--bg-primary);
      color: var(--text-primary);
      font-size: 14px;
      line-height: 1.7;
      padding: 2rem 1rem;
      position: relative;
      overflow-x: hidden;
    }

    /* Subtle scanline overlay */
    body::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      background: repeating-linear-gradient(
        0deg,
        transparent,
        transparent 2px,
        rgba(0, 0, 0, 0.03) 2px,
        rgba(0, 0, 0, 0.03) 4px
      );
      z-index: 9999;
    }

    .container {
      max-width: 860px;
      margin: 0 auto;
    }

    /* ---- Blinking cursor ---- */
    @keyframes blink {
      0%, 50% { opacity: 1; }
      51%, 100% { opacity: 0; }
    }

    .cursor {
      animation: blink 1s step-end infinite;
      color: var(--green);
      font-weight: 400;
    }

    /* ---- Fade in animation ---- */
    @keyframes fadeSlideIn {
      from {
        opacity: 0;
        transform: translateY(8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    /* ---- Terminal window header ---- */
    .terminal-header {
      border: 1px solid var(--border);
      border-radius: 8px;
      overflow: hidden;
      margin-bottom: 2.5rem;
      background: var(--bg-secondary);
      box-shadow:
        0 0 40px rgba(74, 222, 128, 0.04),
        0 16px 48px rgba(0, 0, 0, 0.4);
      animation: fadeSlideIn 0.5s ease-out;
    }

    .terminal-bar {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 12px 16px;
      background: var(--bg-card-header);
      border-bottom: 1px solid var(--border);
    }

    .terminal-dot {
      width: 12px;
      height: 12px;
      border-radius: 50%;
    }

    .terminal-dot.red { background: var(--red-dot); }
    .terminal-dot.yellow { background: var(--yellow-dot); }
    .terminal-dot.green { background: var(--green-dot); }

    .terminal-bar-title {
      flex: 1;
      text-align: center;
      color: var(--text-muted);
      font-size: 12px;
    }

    .terminal-body {
      padding: 2rem 2rem 2.5rem;
    }

    .ascii-greeting {
      color: var(--text-muted);
      font-size: 13px;
      margin-bottom: 1rem;
    }

    .glitch-name {
      font-size: 2.4rem;
      font-weight: 700;
      color: var(--green);
      letter-spacing: -0.5px;
      line-height: 1.2;
      text-shadow: 0 0 20px var(--green-glow);
      margin-bottom: 0.25rem;
    }

    .title-line {
      margin-bottom: 1.25rem;
    }

    .comment {
      color: var(--text-muted);
      font-style: italic;
    }

    .contact-env {
      margin-top: 1.25rem;
      font-size: 13px;
      color: var(--text-secondary);
      line-height: 2;
    }

    .env-vars {
      padding-left: 1.5rem;
      display: flex;
      flex-wrap: wrap;
      gap: 0.25rem 1.25rem;
    }

    .contact-link {
      color: var(--text-secondary);
      transition: color 0.2s ease;
    }

    .contact-link:hover {
      color: var(--amber);
    }

    .var {
      color: var(--cyan);
      font-weight: 600;
    }

    /* ---- Prompt character ---- */
    .prompt {
      color: var(--green);
      font-weight: 700;
      margin-right: 0.5rem;
      user-select: none;
    }

    /* ---- Sections ---- */
    .terminal-section {
      margin-bottom: 2.5rem;
      animation: fadeSlideIn 0.5s ease-out;
    }

    .section-header {
      font-size: 15px;
      font-weight: 600;
      color: var(--text-secondary);
      margin-bottom: 1.25rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px dashed var(--border);
      letter-spacing: 0.3px;
    }

    /* ---- Code block cards ---- */
    .entries {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .code-block {
      border: 1px solid var(--border);
      border-radius: 6px;
      overflow: hidden;
      background: var(--bg-card);
      transition: border-color 0.25s ease, box-shadow 0.25s ease;
    }

    .code-block:hover {
      border-color: var(--border-highlight);
      box-shadow: 0 0 16px rgba(74, 222, 128, 0.05);
    }

    .block-header {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      padding: 0.75rem 1.25rem;
      background: var(--bg-card-header);
      border-bottom: 1px solid var(--border);
      font-size: 13px;
      flex-wrap: wrap;
    }

    .file-indicator {
      color: var(--amber);
      font-weight: 700;
    }

    .entry-title {
      color: var(--green);
      font-weight: 600;
      font-size: 15px;
    }

    .entry-meta {
      color: var(--text-muted);
      font-size: 13px;
    }

    .block-content {
      padding: 1rem 1.25rem;
    }

    .date-range {
      display: block;
      margin-bottom: 0.5rem;
      font-size: 13px;
    }

    .entry-desc {
      color: var(--text-secondary);
      font-size: 13px;
      white-space: pre-wrap;
      line-height: 1.75;
    }

    .summary-text {
      color: var(--text-secondary);
      font-size: 13.5px;
      line-height: 1.8;
      white-space: pre-wrap;
    }

    /* ---- Skills ---- */
    .skills-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 0.6rem;
    }

    .skill-tag {
      display: inline-flex;
      align-items: center;
      padding: 0.35rem 0.85rem;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: 4px;
      font-size: 13px;
      color: var(--amber);
      font-weight: 500;
      transition: all 0.2s ease;
      cursor: default;
    }

    .skill-tag:hover {
      border-color: var(--amber-dim);
      background: var(--amber-glow);
      box-shadow: 0 0 12px rgba(251, 191, 36, 0.08);
    }

    .tag-bracket {
      color: var(--text-muted);
      font-weight: 400;
      margin: 0 2px;
    }

    /* ---- Projects ---- */
    .project-link {
      margin-left: auto;
      color: var(--cyan);
      font-size: 12px;
      font-weight: 600;
      transition: color 0.2s ease;
    }

    .project-link:hover {
      color: var(--green);
    }

    .tech-stack {
      margin-top: 0.75rem;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 0.4rem;
    }

    .tech-stack .comment {
      margin-right: 0.25rem;
      font-size: 12px;
    }

    .tech-tag {
      display: inline-block;
      padding: 0.2rem 0.6rem;
      background: var(--green-glow);
      border: 1px solid rgba(74, 222, 128, 0.2);
      border-radius: 3px;
      font-size: 11.5px;
      color: var(--green);
      font-weight: 500;
    }

    /* ---- Footer ---- */
    .terminal-footer {
      text-align: center;
      padding-top: 2rem;
      border-top: 1px dashed var(--border);
      color: var(--text-muted);
      font-size: 12px;
    }

    .terminal-footer .prompt {
      font-size: 12px;
    }

    /* ========================================
       RESPONSIVE
       ======================================== */

    @media (max-width: 768px) {
      body {
        padding: 1rem 0.5rem;
        font-size: 13px;
      }

      .terminal-body {
        padding: 1.5rem 1.25rem 2rem;
      }

      .glitch-name {
        font-size: 1.8rem;
      }

      .env-vars {
        padding-left: 0.5rem;
        flex-direction: column;
        gap: 0.1rem;
      }

      .block-header {
        padding: 0.6rem 1rem;
      }

      .block-content {
        padding: 0.75rem 1rem;
      }

      .section-header {
        font-size: 13px;
      }

      .skill-tag {
        font-size: 12px;
        padding: 0.3rem 0.65rem;
      }
    }

    @media (max-width: 480px) {
      .glitch-name {
        font-size: 1.5rem;
      }

      .terminal-bar-title {
        display: none;
      }

      .block-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.25rem;
      }

      .project-link {
        margin-left: 0;
      }
    }

    @media (min-width: 769px) {
      body {
        font-size: 14px;
        padding: 3rem 2rem;
      }
    }

    /* ---- Print-friendly overrides ---- */
    @media print {
      body::before {
        display: none;
      }

      body {
        background: #fff;
        color: #1a1a1a;
      }

      .terminal-header,
      .code-block {
        box-shadow: none;
        border-color: #ccc;
      }

      .glitch-name {
        color: #1a1a1a;
        text-shadow: none;
      }

      .cursor {
        display: none;
      }

      .prompt {
        color: #333;
      }

      .entry-title,
      .tech-tag {
        color: #1a1a1a;
      }

      .skill-tag {
        color: #1a1a1a;
        border-color: #ccc;
        background: #f5f5f5;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    ${headerSection}
    ${summarySection}
    ${experienceSection}
    ${educationSection}
    ${skillsSection}
    ${projectsSection}
    <footer class="terminal-footer">
      <span class="prompt">$</span> exit 0
    </footer>
  </div>
</body>
</html>`;
}
