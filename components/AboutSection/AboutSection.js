import styles from './AboutSection.module.css';

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

          <div className={styles.content}>
            <p className={styles.bioText}>
              I am P. Akshay Reddy, a B.Tech student specializing in AI Driven Languages
              and Technologies. I am passionate about Full Stack Development, Artificial
              Intelligence, and building scalable web applications.
            </p>
            <div className={styles.bioText}>
              I have developed projects such as:
              <ul className={styles.projectList}>
                <li className={styles.projectItem}>
                  Doctors Farms Resort Booking Website
                </li>
                <li className={styles.projectItem}>
                  AI Interview Preparation Platform
                </li>
              </ul>
            </div>
            <p className={styles.bioText}>
              My primary tech stack includes React, Node.js, Express.js, MongoDB,
              JavaScript, Git, and cloud deployment platforms.
            </p>
            <p className={styles.bioText}>
              I enjoy solving real-world problems through software engineering and
              continuously improving my development skills.
            </p>

            <div className={styles.tagsSection}>
              <h3 className={styles.tagsLabel}>Core Focus Areas</h3>
              <div className={styles.tagsList}>
                {['FULL STACK', 'REACT', 'NODE.JS', 'MONGODB', 'AI/ML', 'CLOUD'].map(
                  (tag) => (
                    <span key={tag} className={styles.tag}>
                      {tag}
                    </span>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </section>
  );
}
