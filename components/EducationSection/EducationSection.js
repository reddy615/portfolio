import styles from './EducationSection.module.css';

const EDUCATION_BADGES = ['B.Tech', 'CGPA 8.07', 'KL University', 'AI Technologies'];

export default function EducationSection() {
  return (
    <section className={styles.educationSection} id="education-section">
      <article className={styles.card} aria-labelledby="education-title">
        <span className={styles.sectionNumber}>03</span>

        <div className={styles.cardMain}>
          <header className={styles.header}>
            <div className={styles.tagline}>Academic Profile</div>
            <h2 id="education-title" className={styles.title}>
              Education
            </h2>
          </header>

          <p className={styles.bioText}>
            Pursuing B.Tech at KL University with a strong focus on artificial intelligence,
            modern web systems, and production-ready software architecture.
          </p>

          <div className={styles.badgeRow}>
            {EDUCATION_BADGES.map((tag) => (
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
