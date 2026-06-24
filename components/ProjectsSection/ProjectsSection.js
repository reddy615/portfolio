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
      'An AI-powered interview preparation platform that provides mock interviews, coding assessments, AI-generated questions, performance analytics, and personalized feedback.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'OpenAI/Gemini APIs', 'Judge0'],
    features: ['AI mock interviews', 'Coding assessments', 'Performance analytics', 'Real-time evaluation'],
    accent: 'AI INTERVIEW',
    githubUrl: 'https://github.com/reddy615',
    liveUrl: '#',
  },
  {
    id: 2,
    title: 'Doctors Farms Resort Booking Website',
    description:
      'A full-stack resort booking platform with room management, inquiry handling, responsive UI, and cloud deployment.',
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Railway'],
    features: ['Resort booking', 'Inquiry management', 'Email notifications', 'Responsive design'],
    accent: 'RESORT BOOKING',
    githubUrl: 'https://github.com/reddy615',
    liveUrl: '#',
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
              <article key={project.id} className={styles.projectCard}>
                <div className={styles.projectMedia} aria-hidden="true">
                  <div className={styles.projectMediaGlow}></div>
                  <div className={styles.projectMediaLabel}>{project.accent}</div>
                  <div className={styles.projectMediaScreen}>
                    {project.id === 2 ? (
                      <img
                        src="/doctors-farms-screenshot.png"
                        alt="Doctors Farms Resort"
                        className={styles.projectImage}
                      />
                    ) : (
                      <div className={styles.projectMediaScreenInner}>
                        <span className={styles.projectMediaDot}></span>
                        <span className={styles.projectMediaDot}></span>
                        <span className={styles.projectMediaDot}></span>
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.projectContent}>
                  <div className={styles.projectIndex}>0{project.id}</div>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDescription}>{project.description}</p>

                  <div className={styles.sectionLabel}>Tech Stack</div>
                  <div className={styles.stackList}>
                    {project.stack.map((item) => (
                      <span key={item} className={styles.stackChip}>
                        {item}
                      </span>
                    ))}
                  </div>

                  <div className={styles.sectionLabel}>Features</div>
                  <ul className={styles.featureList}>
                    {project.features.map((feature) => (
                      <li key={feature} className={styles.featureItem}>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div className={styles.actionRow}>
                    <a className={styles.primaryButton} href={project.githubUrl} target="_blank" rel="noreferrer">
                      GitHub
                    </a>
                    <a className={styles.secondaryButton} href={project.liveUrl} target="_blank" rel="noreferrer">
                      Live Demo
                    </a>
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
