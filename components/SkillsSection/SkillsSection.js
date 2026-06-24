import styles from './SkillsSection.module.css';

const SKILL_LABELS = ['React', 'Node.js', 'Express.js', 'MongoDB', 'JavaScript', 'Railway'];

export default function SkillsSection() {
  return (
    <section className={styles.skillsSection} id="skills-section">
      <article className={styles.card} aria-labelledby="skills-title">
        <span className={styles.sectionNumber}>02</span>

        <div className={styles.cardMain}>
          <header className={styles.header}>
            <div className={styles.tagline}>Technical Skills</div>
            <h2 id="skills-title" className={styles.title}>
              Technical Skills
            </h2>
          </header>

          <p className={styles.bioText}>
            Practical front-end and back-end capabilities for polished applications,
            API-first systems, and intelligent deployments with modern tools.
          </p>

          <div className={styles.badgeRow}>
            {SKILL_LABELS.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}
