'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './EducationSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const EDUCATION_TIMELINE = [
  {
    id: 1,
    year: '2023 - 2027',
    degree: 'Bachelor of Technology (B.Tech)',
    field: 'Computer Science & Engineering',
    specialization: 'AI Driven Languages and Technologies',
    institution: 'KL University',
    cgpa: '8.07',
    status: 'Currently Pursuing',
  },
  {
    id: 2,
    year: '2021 - 2023',
    degree: 'Intermediate (MPC)',
    marks: '617 / 1000',
  },
  {
    id: 3,
    year: '',
    degree: 'CBSE 10th',
    cgpa: '6.51',
  },
];

export default function EducationSection() {
  const sectionRef = useRef(null);
  const timelineItemsRef = useRef([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Main section fade-in animation
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

    // Animate title
    const title = sectionRef.current.querySelector(`.${styles.title}`);
    if (title) {
      gsap.fromTo(
        title,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
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

    // Animate timeline items with stagger
    const timelineItems = sectionRef.current.querySelectorAll(`.${styles.timelineItem}`);
    if (timelineItems.length > 0) {
      gsap.fromTo(
        timelineItems,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: 0.4,
          stagger: 0.15,
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
        if (trigger.vars.id === 'education-section-animation') {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.educationSection} id="education-section">
      <article className={styles.card} aria-labelledby="education-title">
        <span className={styles.sectionNumber}>03</span>

        <div className={styles.cardMain}>
          <header className={styles.header}>
            <div className={styles.tagline}>About • Education</div>
            <h2 id="education-title" className={styles.title}>
              Education
            </h2>
          </header>

          <div className={styles.timeline}>
            {EDUCATION_TIMELINE.map((entry, index) => (
              <div key={entry.id} className={styles.timelineItem}>
                <div className={styles.timelineYear}>
                  <span className={styles.year}>{entry.year}</span>
                </div>

                <div className={styles.timelineDivider}>
                  <div className={styles.timelineMarker}></div>
                  <div className={styles.timelineLine}></div>
                </div>

                <div className={styles.timelineContent}>
                  <h3 className={styles.degreeTitle}>{entry.degree}</h3>
                  
                  {entry.field && (
                    <p className={styles.field}>{entry.field}</p>
                  )}

                  {entry.specialization && (
                    <p className={styles.detail}>
                      <span className={styles.label}>Specialization:</span>
                      {entry.specialization}
                    </p>
                  )}

                  {entry.institution && (
                    <p className={styles.detail}>
                      <span className={styles.label}>University:</span>
                      {entry.institution}
                    </p>
                  )}

                  {entry.marks && (
                    <p className={styles.detail}>
                      <span className={styles.label}>Marks:</span>
                      {entry.marks}
                    </p>
                  )}

                  {entry.cgpa && (
                    <p className={styles.detail}>
                      <span className={styles.label}>CGPA:</span>
                      {entry.cgpa}
                    </p>
                  )}

                  {entry.status && (
                    <p className={styles.status}>{entry.status}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}
