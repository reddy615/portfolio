'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './ProjectsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const ProjectsSection = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const gridRef = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(cardRef.current, { opacity: 0.92, scale: 0.92, y: 80 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top+=700',
          scrub: 0.35,
          pin: cardRef.current,
          pinSpacing: false,
          anticipatePin: 1,
          markers: false
        }
      });

      tl.fromTo(cardRef.current,
        { opacity: 0.92, scale: 0.92, y: 80 },
        { opacity: 1, scale: 1, y: 0, ease: 'power1.out' },
        0
      );

      tl.fromTo(titleRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
        0.2
      );

      tl.fromTo(gridRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 },
        0.3
      );

      tl.fromTo(footerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        0.4
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.projectsSection} id="projects-section">
      <div className={styles.blueGlow} />
      <div className={styles.orangeGlow} />

      <div ref={cardRef} className={styles.projectsCard}>
        {/* Section Title Header */}
        <div ref={titleRef} className={styles.sectionHeaderRow}>
          <div className={styles.sectionNumber}>04</div>
          <div>
            <div className={styles.sectionTagline}>Selected Works</div>
            <h2 className={styles.sectionTitle}>PROJECTS</h2>
          </div>
        </div>

        {/* Project Cards Grid */}
        <div ref={gridRef} className={styles.twoColumnGrid}>
          {/* Project 1 */}
          <div className={styles.card}>
            <div className={styles.projectImage}>
              <Image
                src="/ai-interview-screenshot.png"
                alt="AI Interview Preparation Platform screenshot"
                fill
                className={styles.projectScreenshot}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className={styles.cardIcon}>
              <svg viewBox="0 0 24 24">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>AI Interview Preparation Platform</h3>
            <div className={styles.statusBadge}>In Development</div>
            <p className={styles.projectDescription}>An AI-powered interview preparation platform that helps students prepare for technical interviews through AI-generated questions, coding assessments, mock interviews, performance analytics, and personalized feedback.</p>
            <ul className={styles.projectSpecs}>
              <li className={styles.projectSpecItem}>AI Mock Interviews</li>
              <li className={styles.projectSpecItem}>Coding Assessments</li>
              <li className={styles.projectSpecItem}>Performance Analytics</li>
              <li className={styles.projectSpecItem}>Personalized Feedback</li>
            </ul>
            <div className={styles.techStackWrapper}>
              <div className={styles.techStackLabel}>Tech Stack</div>
              <div className={styles.skillsList}>
                <span className={styles.skillTag}>React.js</span>
                <span className={styles.skillTag}>Node.js</span>
                <span className={styles.skillTag}>Express.js</span>
                <span className={styles.skillTag}>MongoDB</span>
                <span className={styles.skillTag}>OpenAI / Gemini</span>
                <span className={styles.skillTag}>Judge0</span>
              </div>
            </div>

            <div className={styles.projectActions}>
              <a className={`${styles.projectBtn} ${styles.githubBtn}`} href="https://github.com/reddy615/AI" target="_blank" rel="noreferrer">GitHub</a>
            </div>
          </div>

          {/* Project 2 */}
          <div className={styles.card}>
            <div className={styles.projectImage}>
              <Image
                src="/doctors-farms-screenshot.png"
                alt="Doctors Farms Resort Booking Website screenshot"
                fill
                className={styles.projectScreenshot}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className={styles.cardIcon}>
              <svg viewBox="0 0 24 24">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-.93 0-1.822-.377-2.487-1.047l-.547-.548z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Doctors Farms Resort Booking Website</h3>
            <div className={styles.statusBadgeLive}>Live</div>
            <p className={styles.projectDescription}>A full-stack resort booking platform that allows users to explore rooms, send booking inquiries, and interact with a responsive modern UI. The system includes email notifications, inquiry management, and cloud deployment.</p>
            <ul className={styles.projectSpecs}>
              <li className={styles.projectSpecItem}>AI-generated interview questions</li>
              <li className={styles.projectSpecItem}>Interactive coding assessments</li>
              <li className={styles.projectSpecItem}>In-depth performance analytics</li>
              <li className={styles.projectSpecItem}>Mock interview feedback system</li>
            </ul>
            <div className={styles.techStackWrapper}>
              <div className={styles.techStackLabel}>Tech Stack</div>
              <div className={styles.skillsList}>
                <span className={styles.skillTag}>React.js</span>
                <span className={styles.skillTag}>Node.js</span>
                <span className={styles.skillTag}>Express.js</span>
                <span className={styles.skillTag}>MongoDB</span>
                <span className={styles.skillTag}>Railway</span>
              </div>
            </div>

            <div className={styles.projectActions}>
              <a className={`${styles.projectBtn} ${styles.githubBtn}`} href="https://github.com/reddy615/doctors-farms" target="_blank" rel="noreferrer">GitHub</a>
              <a className={`${styles.projectBtn} ${styles.liveBtn}`} href="https://doctorsfarmnunna.in" target="_blank" rel="noreferrer">Live Link</a>
            </div>
          </div>
        </div>

        {/* Footer inside the Projects Slide */}
        <footer ref={footerRef} className={styles.footer}>
          <p>© {new Date().getFullYear()} P. AKSHAY REDDY. ALL RIGHTS RESERVED.</p>
          <p style={{ marginTop: '6px' }}>
            Built using <span className={styles.footerHighlight}>Next.js, Three.js, GSAP & CSS Modules</span>
          </p>
        </footer>
      </div>
    </section>
  );
};

export default ProjectsSection;
