import Image from 'next/image';
import styles from './ProjectsSection.module.css';

const PROJECTS = [
  {
    title: 'AI Interview Preparation Platform',
    image: '/ai-interview-screenshot.png',
    imageAlt: 'AI Interview Preparation Platform screenshot',
    status: 'In Development',
    isLive: false,
    description:
      'An AI-powered interview preparation platform with generated questions, coding assessments, mock interviews, analytics, and personalized feedback.',
    features: [
      'AI Mock Interviews',
      'Coding Assessments',
      'Performance Analytics',
      'Personalized Feedback',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'OpenAI / Gemini', 'Judge0'],
    links: [{ label: 'GitHub', href: 'https://github.com/reddy615/AI', type: 'github' }],
  },
  {
    title: 'Doctors Farms Resort Booking Website',
    image: '/doctors-farms-screenshot.png',
    imageAlt: 'Doctors Farms Resort Booking Website screenshot',
    status: 'Live',
    isLive: true,
    description:
      'A full-stack resort booking platform with room discovery, booking inquiries, email notifications, inquiry management, and cloud deployment.',
    features: [
      'Room discovery and responsive browsing',
      'Booking inquiry workflow',
      'Email notifications',
      'Cloud-hosted full-stack deployment',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Railway'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/reddy615/doctors-farms',
        type: 'github',
      },
      { label: 'Live Link', href: 'https://doctorsfarmnunna.in', type: 'live' },
    ],
  },
];

function ProjectCard({ project }) {
  return (
    <article className={styles.projectCard}>
      <div className={styles.projectImage}>
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className={styles.projectScreenshot}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <h3 className={styles.cardTitle}>{project.title}</h3>
      <div className={project.isLive ? styles.statusBadgeLive : styles.statusBadge}>
        {project.status}
      </div>
      <p className={styles.projectDescription}>{project.description}</p>

      <ul className={styles.projectSpecs}>
        {project.features.map((feature) => (
          <li key={feature} className={styles.projectSpecItem}>
            {feature}
          </li>
        ))}
      </ul>

      <div className={styles.techStackWrapper}>
        <div className={styles.techStackLabel}>Tech Stack</div>
        <div className={styles.skillsList}>
          {project.stack.map((technology) => (
            <span key={technology} className={styles.skillTag}>
              {technology}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.projectActions}>
        {project.links.map((link) => (
          <a
            key={link.href}
            className={`${styles.projectBtn} ${
              link.type === 'live' ? styles.liveBtn : styles.githubBtn
            }`}
            href={link.href}
            target="_blank"
            rel="noreferrer"
          >
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}

export default function ProjectsSection() {
  return (
    <section className={styles.projectsSection} id="projects-section">
      <div className={styles.projectsCard} aria-labelledby="projects-title">
        <span className={styles.sectionNumber}>04</span>

        <div className={styles.cardMain}>
          <header className={styles.sectionHeaderRow}>
            <div>
              <div className={styles.sectionTagline}>Selected Works</div>
              <h2 id="projects-title" className={styles.sectionTitle}>
                Projects
              </h2>
            </div>
          </header>

          <div className={styles.twoColumnGrid}>
            {PROJECTS.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>

        <aside className={styles.cardAside}>
          <h3 className={styles.cardTitle}>Featured Work</h3>
          <p className={styles.projectDescription}>
            AI interview preparation and resort booking products built with modern web
            architecture, deployment pipelines, and full-stack integration.
          </p>
        </aside>
      </div>
    </section>
  );
}
