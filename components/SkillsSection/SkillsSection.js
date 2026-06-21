'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './SkillsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const SkillsSection = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const numberRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nextSection = document.getElementById('education-section');
      const nextCard = nextSection?.querySelector('[class*=card]');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 45%',
          end: 'bottom 25%',
          scrub: 0.35,
          markers: false,
        }
      });

      tl.to(cardRef.current, {
        opacity: 0.4,
        scale: 0.92,
        y: -80,
        ease: 'power1.out',
      }, 0);

      if (nextCard) {
        tl.fromTo(nextCard,
          { opacity: 0.92, scale: 0.92, y: 80 },
          { opacity: 1, scale: 1, y: 0, ease: 'power1.out' },
          0
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.skillsSection} id="skills-section">
      <div className={styles.blueGlow} />
      <div className={styles.orangeGlow} />

      <div ref={cardRef} className={styles.card}>
        {/* Section Header Row */}
        <div className={styles.skillsHeaderRow}>
          <div>
            <div className={styles.sectionTagline}>Expertise</div>
            <h2 ref={titleRef} className={styles.sectionTitle}>Technical Skills</h2>
          </div>
          <span ref={numberRef} className={styles.sectionNumber}>02</span>
        </div>

        {/* 7-Category Skills Grid */}
        <div ref={gridRef} className={styles.skillsGrid}>
          {/* Languages */}
          <div>
            <h3 className={styles.cardTitle}>Languages</h3>
            <div className={styles.skillsList}>
              <span className={styles.skillTag}>JavaScript</span>
              <span className={styles.skillTag}>Java</span>
              <span className={styles.skillTag}>Python</span>
              <span className={styles.skillTag}>HTML5</span>
              <span className={styles.skillTag}>CSS3</span>
            </div>
          </div>

          {/* Frontend */}
          <div>
            <h3 className={styles.cardTitle}>Frontend</h3>
            <div className={styles.skillsList}>
              <span className={styles.skillTag}>React.js</span>
              <span className={styles.skillTag}>Next.js</span>
              <span className={styles.skillTag}>Tailwind CSS</span>
              <span className={styles.skillTag}>Bootstrap</span>
              <span className={styles.skillTag}>Responsive Design</span>
            </div>
          </div>

          {/* Backend */}
          <div>
            <h3 className={styles.cardTitle}>Backend</h3>
            <div className={styles.skillsList}>
              <span className={styles.skillTag}>Node.js</span>
              <span className={styles.skillTag}>Express.js</span>
              <span className={styles.skillTag}>REST APIs</span>
              <span className={styles.skillTag}>JWT Auth</span>
            </div>
          </div>

          {/* Databases */}
          <div>
            <h3 className={styles.cardTitle}>Databases</h3>
            <div className={styles.skillsList}>
              <span className={styles.skillTag}>MongoDB</span>
              <span className={styles.skillTag}>MySQL</span>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className={styles.cardTitle}>Tools</h3>
            <div className={styles.skillsList}>
              <span className={styles.skillTag}>Git</span>
              <span className={styles.skillTag}>GitHub</span>
              <span className={styles.skillTag}>VS Code</span>
              <span className={styles.skillTag}>Postman</span>
            </div>
          </div>

          {/* Cloud & Deployment */}
          <div>
            <h3 className={styles.cardTitle}>Cloud & Deployment</h3>
            <div className={styles.skillsList}>
              <span className={styles.skillTag}>Railway</span>
              <span className={styles.skillTag}>Render</span>
              <span className={styles.skillTag}>Vercel</span>
              <span className={styles.skillTag}>Cloudflare</span>
            </div>
          </div>

          {/* AI & Technologies */}
          <div>
            <h3 className={styles.cardTitle}>AI & Technologies</h3>
            <div className={styles.skillsList}>
              <span className={styles.skillTag}>Generative AI</span>
              <span className={styles.skillTag}>Prompt Engineering</span>
              <span className={styles.skillTag}>API Integration</span>
              <span className={styles.skillTag}>AI Interview Systems</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
