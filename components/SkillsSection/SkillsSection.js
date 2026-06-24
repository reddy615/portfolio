import styles from './SkillsSection.module.css';

const SKILL_GROUPS = [
  {
    title: 'Languages',
    skills: ['JavaScript', 'Java', 'Python', 'HTML5', 'CSS3'],
  },
  {
    title: 'Frontend',
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'Responsive Design'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth'],
  },
  {
    title: 'Databases',
    skills: ['MongoDB', 'MySQL'],
  },
  {
    title: 'Tools',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman'],
  },
  {
    title: 'Cloud & Deployment',
    skills: ['Railway', 'Render', 'Vercel', 'Cloudflare'],
  },
  {
    title: 'AI & Technologies',
    skills: ['Generative AI', 'Prompt Engineering', 'API Integration', 'AI Interview Systems'],
  },
];

function SkillTags({ items }) {
  return (
    <div className={styles.skillsList}>
      {items.map((item) => (
        <span key={item} className={styles.skillTag}>
          {item}
        </span>
      ))}
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section className={styles.skillsSection} id="skills-section">
      <article className={styles.card} aria-labelledby="skills-title">
        <span className={styles.sectionNumber}>02</span>

        <div className={styles.cardMain}>
          <header className={styles.skillsHeaderRow}>
            <div>
              <div className={styles.sectionTagline}>Expertise</div>
              <h2 id="skills-title" className={styles.sectionTitle}>
                Technical Skills
              </h2>
            </div>
          </header>

          <div className={styles.skillsGrid}>
            {SKILL_GROUPS.map((group) => (
              <div key={group.title} className={styles.skillGroup}>
                <h3 className={styles.cardTitle}>{group.title}</h3>
                <SkillTags items={group.skills} />
              </div>
            ))}
          </div>
        </div>

        <aside className={styles.cardAside}>
          <h3 className={styles.cardTitle}>Key Strengths</h3>
          <p className={styles.highlightText}>
            Building responsive UI, backend APIs, cloud deployments, and AI-enhanced web
            products.
          </p>
          <SkillTags items={['React.js', 'Node.js', 'MongoDB', 'AI', 'Vercel']} />
        </aside>
      </article>
    </section>
  );
}
