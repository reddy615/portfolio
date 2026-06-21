'use client';

import React, { useEffect, useRef } from 'react';
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
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 20%',
          scrub: 0.35,
          markers: false
        }
      });

      tl.fromTo(titleRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
        0
      );

      tl.fromTo(gridRef.current.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 },
        0
      );

      tl.fromTo(footerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        0
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
            <div className={styles.projectImage} aria-hidden="true">Image Placeholder</div>
            <div className={styles.cardIcon}>
              <svg viewBox="0 0 24 24">
                <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>Doctors Farms Resort Booking</h3>
            <ul className={styles.projectSpecs}>
              <li className={styles.projectSpecItem}>Resort booking platform</li>
              <li className={styles.projectSpecItem}>Responsive UI layout</li>
              <li className={styles.projectSpecItem}>Inquiry management system</li>
              <li className={styles.projectSpecItem}>Email notifications</li>
            </ul>
            <div className={styles.techStackWrapper}>
              <div className={styles.techStackLabel}>Tech Stack</div>
              <div className={styles.skillsList}>
                <span className={styles.skillTag}>React</span>
                <span className={styles.skillTag}>Node.js</span>
                <span className={styles.skillTag}>Express.js</span>
                <span className={styles.skillTag}>MongoDB</span>
              </div>
            </div>

            <div className={styles.projectActions}>
              <a className={`${styles.projectBtn} ${styles.githubBtn}`} href="#" target="_blank" rel="noreferrer">GitHub</a>
              <a className={`${styles.projectBtn} ${styles.liveBtn}`} href="#" target="_blank" rel="noreferrer">Live Demo</a>
            </div>
          </div>

          {/* Project 2 */}
          <div className={styles.card}>
            <div className={styles.projectImage} aria-hidden="true">Image Placeholder</div>
            <div className={styles.cardIcon}>
              <svg viewBox="0 0 24 24">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-.93 0-1.822-.377-2.487-1.047l-.547-.548z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <h3 className={styles.cardTitle}>AI Interview Prep Platform</h3>
            <ul className={styles.projectSpecs}>
              <li className={styles.projectSpecItem}>AI-generated interview questions</li>
              <li className={styles.projectSpecItem}>Interactive coding assessments</li>
              <li className={styles.projectSpecItem}>In-depth performance analytics</li>
              <li className={styles.projectSpecItem}>Mock interview feedback system</li>
            </ul>
            <div className={styles.techStackWrapper}>
              <div className={styles.techStackLabel}>Tech Stack</div>
              <div className={styles.skillsList}>
                <span className={styles.skillTag}>MERN Stack</span>
                <span className={styles.skillTag}>AI APIs</span>
                <span className={styles.skillTag}>Node.js</span>
                <span className={styles.skillTag}>React</span>
              </div>
            </div>

            <div className={styles.projectActions}>
              <a className={`${styles.projectBtn} ${styles.githubBtn}`} href="#" target="_blank" rel="noreferrer">GitHub</a>
              <a className={`${styles.projectBtn} ${styles.liveBtn}`} href="#" target="_blank" rel="noreferrer">Live Demo</a>
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
