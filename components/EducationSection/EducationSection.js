import styles from './EducationSection.module.css';

const EDUCATION = [
  {
    id: 1,
    duration: '2023 - 2027',
    degree: 'Bachelor of Technology (B.Tech)',
    institution: 'KL University',
    details: [
      'Computer Science & Engineering',
      'Specialization: AI Driven Languages and Technologies',
      'CGPA: 8.07',
      'Status: Currently Pursuing',
    ],
  },
  {
    id: 2,
    duration: '2021 - 2023',
    degree: 'Intermediate (MPC)',
    institution: '',
    details: ['Marks: 617 / 1000', 'Percentage: 61.7%'],
  },
  {
    id: 3,
    duration: '2021',
    degree: 'CBSE 10th',
    institution: '',
    details: ['CGPA: 6.51', 'Percentage: 61.85%'],
  },
];

export default function EducationSection() {
  return (
    <section className={styles.educationSection} id="education-section">
      <article className={styles.card} aria-labelledby="education-title">
        <span className={styles.sectionNumber}>03</span>

        <div className={styles.cardMain}>
          <header className={styles.educationHeaderRow}>
            <div>
              <div className={styles.sectionTagline}>About • Education</div>
              <h2 id="education-title" className={styles.sectionTitle}>
                Education
              </h2>
            </div>
          </header>

          <div className={styles.timelineContainer}>
            {EDUCATION.map((education) => (
              <div key={education.id} className={styles.timelineEntry}>
                <div className={styles.durationColumn}>
                  <span className={styles.duration}>{education.duration}</span>
                </div>
                <div className={styles.dividerColumn}>
                  <div className={styles.dividerLine} />
                  <div className={styles.dividerDot} />
                </div>
                <div className={styles.detailsColumn}>
                  <h3 className={styles.degree}>{education.degree}</h3>
                  {education.institution && (
                    <p className={styles.institution}>{education.institution}</p>
                  )}
                  <div className={styles.details}>
                    {education.details.map((detail) => (
                      <p key={detail} className={styles.detailItem}>
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className={styles.cardAside}>
          <h3 className={styles.degree}>Education Snapshot</h3>
          <p className={styles.detailItem}>
            Pursuing B.Tech in AI Driven Languages and Technologies with a focus on
            full-stack systems and applied machine learning.
          </p>
          <p className={styles.detailItem}>
            <strong>Current CGPA:</strong> 8.07
          </p>
          <p className={styles.detailItem}>
            <strong>Program:</strong> KL University
          </p>
        </aside>
      </article>
    </section>
  );
}
