import styles from './AboutSection.module.css';

const ABOUT_BADGES = ['FULL STACK', 'AI/ML', 'REACT', 'NODE.JS', 'MONGODB', 'CLOUD'];

export default function AboutSection() {
  return (
    <section className={styles.aboutSection} id="who-am-i">
      <article className={styles.card} aria-labelledby="about-title">
        <span className={styles.sectionNumber}>01</span>

        <div className={styles.cardMain}>
          <header className={styles.header}>
            <div className={styles.tagline}>About Profile</div>
            <h2 id="about-title" className={styles.title}>
              Who I Am
            </h2>
          </header>

          <p className={styles.bioText}>
            I am P. Akshay Reddy, a B.Tech student in AI Driven Languages and Technologies.
            I build polished full-stack applications with modern UX, scalable APIs, and
            deployment-ready architecture.
          </p>

          <div className={styles.badgeRow}>
            {ABOUT_BADGES.map((tag) => (
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
