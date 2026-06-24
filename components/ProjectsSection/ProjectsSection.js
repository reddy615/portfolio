import styles from './ProjectsSection.module.css';

const PROJECT_BADGES = ['AI Interview Platform', 'Doctors Farms Resort', 'MERN', 'AI'];

export default function ProjectsSection() {
  return (
    <section className={styles.projectsSection} id="projects-section">
      <div className={styles.projectsCard} aria-labelledby="projects-title">
        <span className={styles.sectionNumber}>04</span>

        <div className={styles.cardMain}>
          <header className={styles.header}>
            <div className={styles.tagline}>Selected Works</div>
            <h2 id="projects-title" className={styles.title}>
              Projects
            </h2>
          </header>

          <p className={styles.bioText}>
            I build modern web applications with polished UX, full-stack integration, and
            deployment-ready architecture for real-world use.
          </p>

          <div className={styles.badgeRow}>
            {PROJECT_BADGES.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
