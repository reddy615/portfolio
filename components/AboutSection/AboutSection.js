'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styles from './AboutSection.module.css';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const tagsRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Use IntersectionObserver to trigger animations when the section enters viewport
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Initialize GSAP animation timeline
          const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

          // 1. Animate card outline (fade in, slide up, glow)
          tl.to(cardRef.current, {
            opacity: 1,
            y: 0,
            duration: 1.2,
            boxShadow: '0 30px 100px rgba(0, 0, 0, 0.7), 0 0 50px rgba(255, 140, 58, 0.12)'
          });

          // 2. Slide in headers
          tl.fromTo(titleRef.current.children,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
            '-=0.8'
          );

          // 3. Stagger paragraph contents (p, ul, p)
          tl.fromTo(contentRef.current.children,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 },
            '-=0.6'
          );

          // 4. Stagger tech tags at the bottom
          tl.fromTo(tagsRef.current.children,
            { opacity: 0, scale: 0.85 },
            { opacity: 1, scale: 1, duration: 0.6, stagger: 0.08 },
            '-=0.7'
          );

          // Disconnect observer after single fire
          observer.unobserve(section);
        }
      });
    }, { threshold: 0.15 });

    observer.observe(section);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.aboutSection} id="who-am-i">
      {/* Visual background glows */}
      <div className={styles.blueGlow} />
      <div className={styles.orangeGlow} />

      <div ref={cardRef} className={styles.card}>
        {/* Section Title Header */}
        <div ref={titleRef} className={styles.header}>
          <div className={styles.tagline}>About Profile</div>
          <h2 className={styles.title}>Who I Am</h2>
        </div>

        {/* Biography Content Blocks */}
        <div ref={contentRef} className={styles.content}>
          <p className={styles.bioText}>
            I am P. Akshay Reddy, a B.Tech student specializing in AI Driven Languages and Technologies. I am passionate about Full Stack Development, Artificial Intelligence, and building scalable web applications.
          </p>

          <div className={styles.bioText}>
            I have developed projects such as:
            <ul className={styles.projectList}>
              <li className={styles.projectItem}>Doctors Farms Resort Booking Website</li>
              <li className={styles.projectItem}>AI Interview Preparation Platform</li>
            </ul>
          </div>

          <p className={styles.bioText}>
            My primary tech stack includes React, Node.js, Express.js, MongoDB, JavaScript, Git, and cloud deployment platforms.
          </p>

          <p className={styles.bioText}>
            I enjoy solving real-world problems through software engineering and continuously improving my development skills.
          </p>
        </div>

        {/* Technology Highlights section */}
        <div className={styles.tagsSection}>
          <div className={styles.tagsLabel}>Core Focus Areas</div>
          <div ref={tagsRef} className={styles.tagsList}>
            <span className={styles.tag}>FULL STACK</span>
            <span className={styles.tag}>REACT</span>
            <span className={styles.tag}>NODE.JS</span>
            <span className={styles.tag}>MONGODB</span>
            <span className={styles.tag}>AI/ML</span>
            <span className={styles.tag}>CLOUD</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
