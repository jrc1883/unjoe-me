# Bento Portfolio Redesign Implementation Plan

> **For Claude:** Use executing-plans skill to implement this plan task-by-task.

**Goal:** Transform unjoe.me into a maximelbv.com-style bento grid portfolio with rich visual elements, expandable cards, resume integration, and storytelling timeline.

**Architecture:** Replace linear layout with CSS Grid bento layout. Create modular card components. Add client-side JavaScript for expandable interactions. Integrate resume PDF viewer. Build icon-based interests section with hover effects.

**Tech Stack:** Astro 5.x, CSS Grid, Vanilla JavaScript, PDF.js (for resume), Lucide Icons

---

## Phase 1: Core Layout Components

### Task 1: Create BentoGrid Component

**Files:**
- Create: `src/components/BentoGrid.astro`

**Step 1: Create the component**

```astro
---
interface Props {
  class?: string;
}
const { class: className = '' } = Astro.props;
---

<div class:list={["bento-grid", className]}>
  <slot />
</div>

<style>
  .bento-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-auto-rows: minmax(120px, auto);
    gap: 1rem;
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  @media (max-width: 900px) {
    .bento-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 600px) {
    .bento-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

**Step 2: Verify file created**

Run: `ls src/components/BentoGrid.astro`
Expected: File exists

---

### Task 2: Create BentoCard Component

**Files:**
- Create: `src/components/BentoCard.astro`

**Step 1: Create the component**

```astro
---
interface Props {
  title?: string;
  colSpan?: 1 | 2;
  rowSpan?: 1 | 2 | 3;
  expandable?: boolean;
  href?: string;
  class?: string;
}

const {
  title,
  colSpan = 1,
  rowSpan = 1,
  expandable = false,
  href,
  class: className = ''
} = Astro.props;

const Tag = href ? 'a' : 'div';
---

<Tag
  class:list={[
    "bento-card",
    `col-span-${colSpan}`,
    `row-span-${rowSpan}`,
    { expandable },
    className
  ]}
  href={href}
  data-expandable={expandable ? "true" : undefined}
>
  {title && <h3 class="card-title">{title}</h3>}
  <div class="card-content">
    <slot />
  </div>
  {expandable && (
    <button class="expand-btn" aria-label="Expand">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M6 9l6 6 6-6"/>
      </svg>
    </button>
  )}
</Tag>

<style>
  .bento-card {
    background: var(--card-bg, #18181b);
    border: 1px solid var(--border, #27272a);
    border-radius: 16px;
    padding: 1.25rem;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: inherit;
  }

  .bento-card:hover {
    background: var(--card-hover, #1f1f23);
    border-color: #3f3f46;
    transform: translateY(-2px);
  }

  .col-span-1 { grid-column: span 1; }
  .col-span-2 { grid-column: span 2; }
  .row-span-1 { grid-row: span 1; }
  .row-span-2 { grid-row: span 2; }
  .row-span-3 { grid-row: span 3; }

  .card-title {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-muted, #71717a);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    margin: 0 0 0.75rem 0;
  }

  .card-content {
    flex: 1;
  }

  .expand-btn {
    position: absolute;
    bottom: 0.75rem;
    right: 0.75rem;
    background: transparent;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 0.25rem;
    transition: transform 0.3s ease;
  }

  .expandable.expanded .expand-btn {
    transform: rotate(180deg);
  }

  @media (max-width: 900px) {
    .col-span-2 { grid-column: span 2; }
  }

  @media (max-width: 600px) {
    .col-span-2 { grid-column: span 1; }
  }
</style>
```

**Step 2: Verify file created**

Run: `ls src/components/BentoCard.astro`
Expected: File exists

---

### Task 3: Create Card Expansion JavaScript

**Files:**
- Create: `src/scripts/expandable-cards.js`

**Step 1: Create the script**

```javascript
// Expandable card functionality
document.addEventListener('DOMContentLoaded', () => {
  const expandableCards = document.querySelectorAll('[data-expandable="true"]');

  expandableCards.forEach(card => {
    const expandBtn = card.querySelector('.expand-btn');
    const expandContent = card.querySelector('.expand-content');

    if (expandBtn && expandContent) {
      expandBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const isExpanded = card.classList.contains('expanded');

        // Close all other expanded cards
        expandableCards.forEach(c => {
          if (c !== card) {
            c.classList.remove('expanded');
            const content = c.querySelector('.expand-content');
            if (content) content.style.maxHeight = '0';
          }
        });

        // Toggle current card
        card.classList.toggle('expanded');

        if (!isExpanded) {
          expandContent.style.maxHeight = expandContent.scrollHeight + 'px';
        } else {
          expandContent.style.maxHeight = '0';
        }
      });
    }
  });
});
```

**Step 2: Verify file created**

Run: `ls src/scripts/expandable-cards.js`
Expected: File exists

---

## Phase 2: Hero Section Cards

### Task 4: Create ProfileCard Component

**Files:**
- Create: `src/components/cards/ProfileCard.astro`

**Step 1: Create directory and component**

```astro
---
import { SOCIAL_LINKS } from '../../consts';
---

<div class="profile-card">
  <div class="profile-visual">
    <!-- Stylized map/location graphic like maximelbv -->
    <svg viewBox="0 0 200 150" class="location-graphic">
      <defs>
        <linearGradient id="mapGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#1a1a2e;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#16213e;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect fill="url(#mapGrad)" width="200" height="150" rx="8"/>
      <!-- USA outline simplified -->
      <path d="M30,60 Q50,40 80,45 Q120,35 150,50 Q170,55 180,70 Q175,90 160,95 Q140,100 120,95 Q90,100 60,95 Q40,90 30,75 Z"
            fill="none" stroke="#3b82f6" stroke-width="1.5" opacity="0.4"/>
      <!-- Location pin -->
      <circle cx="100" cy="70" r="8" fill="#3b82f6" opacity="0.8"/>
      <circle cx="100" cy="70" r="4" fill="#fff"/>
    </svg>
  </div>

  <div class="social-row">
    <a href={SOCIAL_LINKS.github} target="_blank" aria-label="GitHub">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
      </svg>
    </a>
    <a href={SOCIAL_LINKS.linkedin} target="_blank" aria-label="LinkedIn">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    </a>
    <a href={SOCIAL_LINKS.email} aria-label="Email">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M22 6l-10 7L2 6"/>
      </svg>
    </a>
  </div>
</div>

<style>
  .profile-card {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    height: 100%;
  }

  .profile-visual {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .location-graphic {
    width: 100%;
    max-width: 180px;
    height: auto;
  }

  .social-row {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }

  .social-row a {
    color: var(--text-muted, #71717a);
    transition: color 0.2s ease;
    padding: 0.5rem;
  }

  .social-row a:hover {
    color: var(--text-primary, #fafafa);
  }
</style>
```

**Step 2: Verify file created**

Run: `ls src/components/cards/ProfileCard.astro`
Expected: File exists

---

### Task 5: Create ResumeCard Component (Expandable)

**Files:**
- Create: `src/components/cards/ResumeCard.astro`
- Add: Resume PDF to `public/resume/Joseph_Cannon_Resume.pdf`

**Step 1: Create the component**

```astro
---
interface Props {
  resumeUrl?: string;
}
const { resumeUrl = '/resume/Joseph_Cannon_Resume.pdf' } = Astro.props;
---

<div class="resume-card" data-expandable="true">
  <h3 class="card-label">Resume</h3>

  <div class="resume-preview">
    <!-- Stylized document preview like maximelbv -->
    <svg viewBox="0 0 120 160" class="doc-graphic">
      <rect x="10" y="10" width="100" height="140" rx="4" fill="#1f1f23" stroke="#3f3f46"/>
      <!-- Header lines -->
      <rect x="20" y="25" width="60" height="6" rx="2" fill="#3b82f6" opacity="0.8"/>
      <rect x="20" y="38" width="40" height="3" rx="1" fill="#4b5563"/>
      <!-- Content lines -->
      <rect x="20" y="55" width="80" height="3" rx="1" fill="#374151"/>
      <rect x="20" y="63" width="70" height="3" rx="1" fill="#374151"/>
      <rect x="20" y="71" width="75" height="3" rx="1" fill="#374151"/>
      <rect x="20" y="79" width="60" height="3" rx="1" fill="#374151"/>
      <!-- Section -->
      <rect x="20" y="95" width="50" height="4" rx="1" fill="#3b82f6" opacity="0.6"/>
      <rect x="20" y="106" width="80" height="3" rx="1" fill="#374151"/>
      <rect x="20" y="114" width="65" height="3" rx="1" fill="#374151"/>
      <rect x="20" y="122" width="72" height="3" rx="1" fill="#374151"/>
    </svg>
  </div>

  <div class="resume-actions">
    <a href={resumeUrl} target="_blank" class="view-btn">
      View PDF
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/>
        <polyline points="15 3 21 3 21 9"/>
        <line x1="10" y1="14" x2="21" y2="3"/>
      </svg>
    </a>
  </div>

  <div class="expand-content">
    <div class="resume-details">
      <p class="detail-item"><strong>Experience:</strong> 21+ years</p>
      <p class="detail-item"><strong>Current:</strong> Mars Inc.</p>
      <p class="detail-item"><strong>Credentials:</strong> MBA, PMP, LEED AP</p>
      <p class="detail-item"><strong>Clearance:</strong> TS/SCI eligible</p>
    </div>
  </div>

  <button class="expand-btn" aria-label="Expand details">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M6 9l6 6 6-6"/>
    </svg>
  </button>
</div>

<style>
  .resume-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
  }

  .card-label {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 0.75rem 0;
  }

  .resume-preview {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
  }

  .doc-graphic {
    width: 80px;
    height: auto;
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
  }

  .resume-actions {
    margin-top: auto;
  }

  .view-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    color: var(--text-muted);
    text-decoration: none;
    font-size: 0.875rem;
    transition: color 0.2s ease;
  }

  .view-btn:hover {
    color: var(--accent);
  }

  .expand-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease;
  }

  .resume-details {
    padding-top: 1rem;
    border-top: 1px solid var(--border);
    margin-top: 1rem;
  }

  .detail-item {
    font-size: 0.8125rem;
    color: var(--text-secondary);
    margin: 0.25rem 0;
  }

  .expand-btn {
    position: absolute;
    bottom: 0.75rem;
    right: 0.75rem;
    background: transparent;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    padding: 0.25rem;
    transition: transform 0.3s ease;
  }

  .resume-card.expanded .expand-btn {
    transform: rotate(180deg);
  }
</style>
```

**Step 2: Create resume directory**

Run: `mkdir -p public/resume`
Expected: Directory created

**Step 3: Note for user**

User needs to add their resume PDF to `public/resume/Joseph_Cannon_Resume.pdf`

---

### Task 6: Create TechStackCard Component

**Files:**
- Create: `src/components/cards/TechStackCard.astro`

**Step 1: Create the component**

```astro
---
const techStack = {
  engineering: [
    { name: 'Python', icon: '🐍' },
    { name: 'TypeScript', icon: '📘' },
    { name: 'Node.js', icon: '💚' },
    { name: 'SQL', icon: '🗃️' },
  ],
  platforms: [
    { name: 'AWS', icon: '☁️' },
    { name: 'Cloudflare', icon: '🔶' },
    { name: 'Docker', icon: '🐳' },
  ],
  tools: [
    { name: 'Claude', icon: '🤖' },
    { name: 'Git', icon: '📦' },
    { name: 'VS Code', icon: '💻' },
  ],
};
---

<div class="stack-card">
  <h3 class="card-title">My Stack</h3>

  <div class="stack-section">
    <span class="section-label">Engineering</span>
    <div class="icon-row">
      {techStack.engineering.map(tech => (
        <span class="tech-icon" title={tech.name}>{tech.icon}</span>
      ))}
    </div>
  </div>

  <div class="stack-section">
    <span class="section-label">Platforms</span>
    <div class="icon-row">
      {techStack.platforms.map(tech => (
        <span class="tech-icon" title={tech.name}>{tech.icon}</span>
      ))}
    </div>
  </div>

  <div class="stack-section">
    <span class="section-label">Tools</span>
    <div class="icon-row">
      {techStack.tools.map(tech => (
        <span class="tech-icon" title={tech.name}>{tech.icon}</span>
      ))}
    </div>
  </div>
</div>

<style>
  .stack-card {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .card-title {
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0;
  }

  .stack-section {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .section-label {
    font-size: 0.6875rem;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .icon-row {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .tech-icon {
    font-size: 1.25rem;
    cursor: default;
    transition: transform 0.2s ease;
  }

  .tech-icon:hover {
    transform: scale(1.2);
  }
</style>
```

**Step 2: Verify file created**

Run: `ls src/components/cards/TechStackCard.astro`
Expected: File exists

---

## Phase 3: Interests Section

### Task 7: Create InterestsSection Component

**Files:**
- Create: `src/components/InterestsSection.astro`

**Step 1: Create the component**

```astro
---
const interests = [
  {
    category: 'Building',
    items: [
      { name: 'Systems', icon: '⚙️' },
      { name: 'AI Agents', icon: '🤖' },
      { name: 'Automation', icon: '🔄' },
      { name: 'Home Lab', icon: '🏠' },
    ]
  },
  {
    category: 'Leading',
    items: [
      { name: 'Teams', icon: '👥' },
      { name: 'Programs', icon: '📋' },
      { name: 'Operations', icon: '🎯' },
      { name: 'Strategy', icon: '♟️' },
    ]
  },
  {
    category: 'Domains',
    items: [
      { name: 'Defense', icon: '🛡️' },
      { name: 'Facilities', icon: '🏢' },
      { name: 'Energy', icon: '⚡' },
      { name: 'Gov Tech', icon: '🏛️' },
    ]
  },
  {
    category: 'Lifestyle',
    items: [
      { name: 'Family', icon: '👨‍👩‍👧‍👦' },
      { name: 'Faith', icon: '✝️' },
      { name: 'Learning', icon: '📚' },
      { name: 'Fitness', icon: '💪' },
    ]
  },
];
---

<section class="interests-section">
  <h2 class="section-title">My Interests</h2>

  <div class="interests-grid">
    {interests.map(group => (
      <div class="interest-group">
        <span class="group-label">{group.category}</span>
        <div class="interest-items">
          {group.items.map(item => (
            <div class="interest-item" title={item.name}>
              <span class="item-icon">{item.icon}</span>
            </div>
          ))}
        </div>
      </div>
    ))}
  </div>
</section>

<style>
  .interests-section {
    padding: 3rem 0;
    max-width: 1000px;
    margin: 0 auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .section-title {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 0 0 1.5rem 0;
    padding: 0.5rem 1rem;
    background: var(--card-bg);
    border-radius: 999px;
    display: inline-block;
  }

  .interests-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
  }

  .interest-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .group-label {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--text-primary);
  }

  .interest-items {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }

  .interest-item {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 0.75rem;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    cursor: default;
  }

  .interest-item:hover {
    background: var(--card-hover);
    border-color: var(--accent);
    transform: translateY(-2px);
  }

  .item-icon {
    font-size: 1.5rem;
  }

  @media (max-width: 900px) {
    .interests-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 500px) {
    .interests-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
```

**Step 2: Verify file created**

Run: `ls src/components/InterestsSection.astro`
Expected: File exists

---

## Phase 4: Rich Timeline

### Task 8: Create StoryTimeline Component

**Files:**
- Create: `src/components/StoryTimeline.astro`

**Step 1: Create the component**

```astro
---
const timeline = [
  {
    date: '2024',
    dateColor: '#22c55e',
    heading: 'Building the Future',
    title: '🤖 AI Systems Builder',
    description: 'Developing multi-agent AI systems including PopKit (30+ agents for Claude Code), OPTIMUS (55+ agents for task automation), and Genesis Family OS. Exploring the intersection of AI and practical problem-solving.',
  },
  {
    date: '2016',
    dateColor: '#f59e0b',
    heading: 'Corporate Leadership',
    title: '🏢 Mars, Incorporated',
    description: 'Managing integrated facilities across a $140M portfolio spanning 47 sites. Leading operational excellence initiatives, sustainability programs, and cross-functional teams of 200+ personnel for a Fortune 500 company.',
  },
  {
    date: '2008',
    dateColor: '#3b82f6',
    heading: 'Engineering Foundations',
    title: '🔧 Enovity, Inc.',
    description: 'Building commissioning engineer in San Francisco. Led commercial HVAC optimization, energy efficiency programs, and earned PMP and LEED AP certifications. Applied engineering rigor to complex building systems.',
  },
  {
    date: '2003',
    dateColor: '#ef4444',
    heading: 'Service Begins',
    title: '⚓ U.S. Navy',
    description: '21+ years of service as a Machinist\'s Mate, rising to Senior Chief Petty Officer (E-8). Surface Warfare and Air Warfare qualified. Led engineering teams across multiple deployments, managing complex propulsion and auxiliary systems.',
  },
];
---

<section class="timeline-section">
  <h2 class="section-title">Educational & Professional Background</h2>

  <div class="timeline">
    {timeline.map((item, index) => (
      <div class="timeline-item">
        <div class="timeline-date" style={`background: ${item.dateColor}20; color: ${item.dateColor};`}>
          {item.date}
        </div>
        <div class="timeline-marker">
          <div class="marker-dot" style={`background: ${item.dateColor};`}></div>
          {index < timeline.length - 1 && <div class="marker-line"></div>}
        </div>
        <div class="timeline-content">
          <span class="content-heading">{item.heading}</span>
          <h3 class="content-title">{item.title}</h3>
          <p class="content-desc">{item.description}</p>
        </div>
      </div>
    ))}
  </div>
</section>

<style>
  .timeline-section {
    padding: 3rem 0;
    max-width: 1000px;
    margin: 0 auto;
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .section-title {
    font-size: 0.75rem;
    font-weight: 600;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin: 0 0 2rem 0;
    padding: 0.5rem 1rem;
    background: var(--card-bg);
    border-radius: 999px;
    display: inline-block;
  }

  .timeline {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .timeline-item {
    display: grid;
    grid-template-columns: 80px 40px 1fr;
    gap: 0;
    min-height: 120px;
  }

  .timeline-date {
    font-size: 0.75rem;
    font-weight: 700;
    padding: 0.25rem 0.75rem;
    border-radius: 4px;
    height: fit-content;
    text-align: center;
  }

  .timeline-marker {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0.25rem;
  }

  .marker-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .marker-line {
    width: 2px;
    flex: 1;
    background: var(--border);
    margin-top: 0.5rem;
  }

  .timeline-content {
    padding-bottom: 2rem;
  }

  .content-heading {
    font-size: 0.8125rem;
    font-style: italic;
    color: var(--accent);
    display: block;
    margin-bottom: 0.25rem;
  }

  .content-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 0.5rem 0;
  }

  .content-desc {
    font-size: 0.875rem;
    color: var(--text-secondary);
    line-height: 1.6;
    margin: 0;
  }

  @media (max-width: 600px) {
    .timeline-item {
      grid-template-columns: 60px 30px 1fr;
    }

    .timeline-date {
      font-size: 0.6875rem;
      padding: 0.2rem 0.5rem;
    }
  }
</style>
```

**Step 2: Verify file created**

Run: `ls src/components/StoryTimeline.astro`
Expected: File exists

---

## Phase 5: New Homepage Assembly

### Task 9: Rebuild Homepage with Bento Layout

**Files:**
- Modify: `src/pages/index.astro`

**Step 1: Create new homepage**

The new homepage should:
1. Import all new components
2. Use BentoGrid for hero section
3. Include InterestsSection
4. Include StoryTimeline
5. Keep Featured Projects and Articles sections
6. Include expandable card JavaScript

```astro
---
import { getCollection } from 'astro:content';
import BaseHead from '../components/BaseHead.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import FormattedDate from '../components/FormattedDate.astro';
import BentoGrid from '../components/BentoGrid.astro';
import BentoCard from '../components/BentoCard.astro';
import ProfileCard from '../components/cards/ProfileCard.astro';
import ResumeCard from '../components/cards/ResumeCard.astro';
import TechStackCard from '../components/cards/TechStackCard.astro';
import InterestsSection from '../components/InterestsSection.astro';
import StoryTimeline from '../components/StoryTimeline.astro';
import { SITE_TITLE, SITE_DESCRIPTION, SOCIAL_LINKS } from '../consts';

const posts = (await getCollection('blog'))
  .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
  .slice(0, 3);
---

<!doctype html>
<html lang="en">
  <head>
    <BaseHead title={SITE_TITLE} description={SITE_DESCRIPTION} />
  </head>
  <body>
    <Header />
    <main>
      <!-- Hero Name -->
      <section class="hero-name">
        <h1 class="name">josephcannon</h1>
        <p class="tagline">Engineering / Leadership / AI</p>
      </section>

      <!-- Bento Grid -->
      <BentoGrid>
        <BentoCard rowSpan={2}>
          <ProfileCard />
        </BentoCard>

        <BentoCard title="Formerly at" colSpan={1}>
          <div class="formerly-list">
            <span class="company">⚓ U.S. Navy</span>
            <span class="company">🏢 Mars Inc.</span>
          </div>
        </BentoCard>

        <BentoCard colSpan={1} rowSpan={2}>
          <ResumeCard />
        </BentoCard>

        <BentoCard rowSpan={2}>
          <TechStackCard />
        </BentoCard>
      </BentoGrid>

      <!-- Interests -->
      <InterestsSection />

      <!-- Timeline -->
      <StoryTimeline />

      <!-- Featured Projects -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <h2>Featured Projects</h2>
            <a href="/projects" class="see-all">View all</a>
          </div>
          <div class="projects-grid">
            <a href="https://github.com/jrc1883/popkit" class="project-card">
              <h3>PopKit</h3>
              <p>Claude Code plugin ecosystem with 30+ specialized agents for development workflows.</p>
              <div class="project-tags">
                <span class="tag">TypeScript</span>
                <span class="tag">Claude Code</span>
              </div>
            </a>
            <a href="#" class="project-card">
              <h3>OPTIMUS</h3>
              <p>Multi-agent orchestration system for complex task automation.</p>
              <div class="project-tags">
                <span class="tag">Python</span>
                <span class="tag">Multi-Agent</span>
              </div>
            </a>
            <a href="#" class="project-card">
              <h3>Genesis Family OS</h3>
              <p>Family management system integrating schedules, tasks, and home automation.</p>
              <div class="project-tags">
                <span class="tag">Full Stack</span>
                <span class="tag">AI</span>
              </div>
            </a>
          </div>
        </div>
      </section>

      <!-- Latest Articles -->
      <section class="section">
        <div class="container">
          <div class="section-header">
            <h2>Latest Articles</h2>
            <a href="/blog" class="see-all">View all</a>
          </div>
          <div class="articles-grid">
            {posts.length > 0 ? posts.map((post) => (
              <a href={`/blog/${post.slug}/`} class="article-card">
                <span class="article-date"><FormattedDate date={post.data.pubDate} /></span>
                <h3>{post.data.title}</h3>
                <p>{post.data.description}</p>
              </a>
            )) : (
              <div class="article-card">
                <span class="article-date">Coming soon</span>
                <h3>First Article</h3>
                <p>Stay tuned for articles about engineering, AI, and leadership.</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </main>
    <Footer />
    <script src="../scripts/expandable-cards.js"></script>
  </body>
</html>

<style>
  body {
    background-color: var(--bg-primary, #0a0a0b);
    color: var(--text-primary, #fafafa);
    font-family: system-ui, sans-serif;
    margin: 0;
    line-height: 1.6;
  }

  .hero-name {
    text-align: center;
    padding: 4rem 1rem 2rem;
  }

  .name {
    font-size: clamp(2rem, 6vw, 3.5rem);
    font-weight: 700;
    margin: 0;
    letter-spacing: -0.02em;
  }

  .tagline {
    color: var(--text-muted);
    font-size: 0.9375rem;
    margin: 0.5rem 0 0;
  }

  .formerly-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .company {
    font-size: 0.875rem;
    color: var(--text-secondary);
  }

  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .section {
    padding: 3rem 0;
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.5rem;
  }

  .section-header h2 {
    font-size: 1.5rem;
    margin: 0;
  }

  .see-all {
    color: var(--text-muted);
    font-size: 0.875rem;
    text-decoration: none;
  }

  .see-all:hover {
    color: var(--text-primary);
  }

  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }

  .project-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.5rem;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
  }

  .project-card:hover {
    background: var(--card-hover);
    border-color: #3f3f46;
    transform: translateY(-2px);
  }

  .project-card h3 {
    font-size: 1.125rem;
    margin: 0 0 0.5rem;
  }

  .project-card p {
    color: var(--text-secondary);
    font-size: 0.875rem;
    margin: 0 0 1rem;
  }

  .project-tags {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
  }

  .tag {
    background: #27272a;
    color: var(--text-muted);
    padding: 0.25rem 0.75rem;
    border-radius: 999px;
    font-size: 0.75rem;
  }

  .articles-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1rem;
  }

  .article-card {
    background: var(--card-bg);
    border: 1px solid var(--border);
    border-radius: 12px;
    padding: 1.5rem;
    text-decoration: none;
    color: inherit;
    transition: all 0.3s ease;
  }

  .article-card:hover {
    background: var(--card-hover);
    border-color: #3f3f46;
    transform: translateY(-2px);
  }

  .article-card h3 {
    font-size: 1.125rem;
    margin: 0 0 0.5rem;
  }

  .article-card p {
    color: var(--text-secondary);
    font-size: 0.875rem;
    margin: 0;
  }

  .article-date {
    color: var(--text-muted);
    font-size: 0.8125rem;
    display: block;
    margin-bottom: 0.5rem;
  }
</style>
```

**Step 2: Test build**

Run: `npm run build`
Expected: Build succeeds

**Step 3: Commit changes**

```bash
git add .
git commit -m "feat: redesign homepage with bento grid layout

- Add BentoGrid and BentoCard components
- Add ProfileCard with location graphic
- Add ResumeCard with expandable details
- Add TechStackCard with categorized icons
- Add InterestsSection with icon grid
- Add StoryTimeline with rich storytelling format
- Remove meaningless stats, add expandable interactions
- Match maximelbv.com visual style"
```

---

## Phase 6: Polish & Deploy

### Task 10: Add CSS Variables to Global Styles

**Files:**
- Modify: `src/styles/global.css`

**Step 1: Ensure CSS variables are defined**

Add/verify these variables exist in global.css:

```css
:root {
  --bg-primary: #0a0a0b;
  --bg-secondary: #111113;
  --card-bg: #18181b;
  --card-hover: #1f1f23;
  --text-primary: #fafafa;
  --text-secondary: #a1a1aa;
  --text-muted: #71717a;
  --accent: #3b82f6;
  --border: #27272a;
}
```

### Task 11: Test and Deploy

**Step 1: Run development server**

Run: `npm run dev`
Expected: Site loads with new bento layout

**Step 2: Test responsiveness**

- Check desktop (1200px+)
- Check tablet (768px)
- Check mobile (375px)

**Step 3: Test expandable cards**

- Click resume card expand button
- Verify content expands/collapses

**Step 4: Build for production**

Run: `npm run build`
Expected: No errors

**Step 5: Deploy**

```bash
git push origin master
```
Expected: Cloudflare Pages auto-deploys

---

## Summary

**Components Created:**
1. `BentoGrid.astro` - CSS Grid container
2. `BentoCard.astro` - Flexible card with span options
3. `ProfileCard.astro` - Avatar/location card
4. `ResumeCard.astro` - Expandable resume preview
5. `TechStackCard.astro` - Tech stack icons
6. `InterestsSection.astro` - Icon-based interests
7. `StoryTimeline.astro` - Rich narrative timeline
8. `expandable-cards.js` - Expansion interactions

**Key Design Changes:**
- Bento grid layout (4-column, responsive)
- Expandable cards with smooth animations
- Icon-based visual elements
- Storytelling timeline with colored dates
- Removed meaningless "55+ AI Agents" stat
- Resume integration with PDF link
