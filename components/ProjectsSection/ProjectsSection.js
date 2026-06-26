'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './ProjectsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const PROJECTS = [
  {
    id: 1,
    title: 'AI Interview Preparation Platform',
    description:
      'AI-powered interview preparation platform currently under development. The platform is being built to provide AI mock interviews, coding assessments, intelligent performance analytics, personalized feedback, and real-time interview simulations.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'OpenAI/Gemini APIs', 'Judge0'],
    features: ['AI mock interviews', 'Coding assessments', 'Performance analytics', 'Real-time evaluation'],
    accent: 'AI INTERVIEW',
    githubUrl: 'https://github.com/reddy615',
    liveUrl: '#',
    status: 'in-progress',
  },
  {
    id: 2,
    title: 'Doctors Farms Resort Booking Website',
    description:
      'A full-stack resort booking platform with room management, inquiry handling, responsive UI, and cloud deployment.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Railway'],
    features: ['Resort booking', 'Inquiry management', 'Email notifications', 'Responsive design'],
    accent: 'RESORT BOOKING',
    githubUrl: 'https://github.com/reddy615/doctors-farms',
    liveUrl: 'https://doctorsfarmnunna.in',
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'top 20%',
          scrub: false,
          markers: false,
        },
      }
    );

    const title = sectionRef.current.querySelector(`.${styles.title}`);
    if (title) {
      gsap.fromTo(
        title,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: false,
            markers: false,
          },
        }
      );
    }

    const projectCards = sectionRef.current.querySelectorAll(`.${styles.projectCard}`);
    if (projectCards.length > 0) {
      gsap.fromTo(
        projectCards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          delay: 0.3,
          stagger: 0.14,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 20%',
            scrub: false,
            markers: false,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id === 'projects-section-animation') {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.projectsSection} id="projects-section">
      <div className={styles.projectsCard} aria-labelledby="projects-title">
        <span className={styles.sectionNumber}>04</span>

        <div className={styles.cardMain}>
          <header className={styles.header}>
            <div className={styles.tagline}>Project Portfolio</div>
            <h2 id="projects-title" className={styles.title}>
              PROJECTS
            </h2>
          </header>

          <div className={styles.projectsGrid}>
            {PROJECTS.map((project) => (
              <article key={project.id} className={styles.showcaseCard}>
                <div className={styles.screenshotWrap}>
                  <img
                    src={project.id === 2 ? '/doctors-farms-screenshot.png' : '/ai-interview-screenshot.png'}
                    alt={project.title}
                    className={styles.screenshot}
                  />
                </div>

                <div className={styles.infoRow}>
                  <h3 className={styles.showcaseTitle}>{project.title}</h3>
                  <p className={styles.showcaseDesc}>
                    {project.description}
                  </p>

                  {project.status === 'in-progress' && (
                    <div className={styles.statusBadge}>
                      🚧 Currently in Development
                    </div>
                  )}

                  <div className={styles.techHeading}>TECH STACK</div>
                  <div className={styles.badgeRow}>
                    {project.stack.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={styles.buttonsRow}>
                    <a className={styles.primaryButton} href={project.githubUrl} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                    {project.status === 'in-progress' ? (
                      <div
                        className={styles.secondaryButton}
                        style={{
                          opacity: 0.7,
                          cursor: 'default',
                          pointerEvents: 'none',
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                          style={{ marginRight: 8, flexShrink: 0 }}
                        >
                          <path
                            d="M6 4h12v2H6V4zm1 4h2v8H7V8zm4 0h2v8h-2V8zm4 0h2v8h-2V8zm-8 10h12v2H6v-2z"
                            fill="currentColor"
                          />
                        </svg>
                        IN PROGRESS
                      </div>
                    ) : project.id === 2 ? (
                      <a
                        className={styles.secondaryButton}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                          style={{ marginRight: 8, flexShrink: 0 }}
                        >
                          <path
                            d="M14 4h6v6"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M10 14L20 4"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M20 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        LIVE LINK
                      </a>
                    ) : (
                      <a className={styles.secondaryButton} href={project.liveUrl} target="_blank" rel="noreferrer">
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
