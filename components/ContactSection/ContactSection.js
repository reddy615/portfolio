import styles from './ContactSection.module.css';

const CONTACT_BADGES = ['GitHub', 'LinkedIn', 'Email'];

export default function ContactSection() {
  return (
    <section className={styles.contactSection} id="contact-section">
      <div className={styles.card}>
        <span className={styles.sectionNumber}>05</span>

        <div className={styles.cardMain}>
          <header className={styles.header}>
            <div className={styles.tagline}>Contact</div>
            <h2 className={styles.title}>Contact</h2>
          </header>

          <p className={styles.bioText}>
            Connect with me for web development, AI integrations, and polished product delivery.
            I respond quickly and keep project communication clear.
          </p>

          <div className={styles.badgeRow}>
            {CONTACT_BADGES.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          <a
            href="/resume/2300090002_AkshayReddy.pdf"
            download="2300090002_AkshayReddy.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.downloadButton}
          >
            Download Resume
          </a>
        </div>
      </div>
    </section>
  );
}
