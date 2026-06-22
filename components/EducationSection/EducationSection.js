'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './EducationSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const EducationSection = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const numberRef = useRef(null);
  const timelineRef = useRef(null);

  const educationData = [
    {
      id: 1,
      duration: '2023 - 2027',
      degree: 'Bachelor of Technology (B.Tech)',
      institution: 'KL University',
      details: [
        'Computer Science & Engineering',
        'Specialization: AI Driven Languages and Technologies',
        'CGPA: 8.07',
        'Status: Currently Pursuing'
      ]
    },
    {
      id: 2,
      duration: '2021 - 2023',
      degree: 'Intermediate (MPC)',
      institution: '',
      details: [
        'Marks: 617 / 1000',
        'Percentage: 61.7%'
      ]
    },
    {
      id: 3,
      duration: '2021',
      degree: 'CBSE 10th',
      institution: '',
      details: [
        'CGPA: 6.51',
        'Percentage: 61.85%'
      ]
    }
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nextSection = document.getElementById('projects-section');
      const nextCard = nextSection?.querySelector('[class*=projectsCard]');

      if (nextCard) {
        gsap.set(nextCard, { opacity: 0.92, scale: 0.92, y: 80 });
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top+=700',
          scrub: 0.35,
          pin: cardRef.current,
          anticipatePin: 1,
          markers: false
        }
      });

      gsap.set(cardRef.current, {
        zIndex: 10,
        transformPerspective: 2000,
      });

      tl.to(cardRef.current, {
        opacity: 0.64,
        scale: 0.88,
        rotationX: 12,
        rotationY: 3,
        y: -220,
        filter: 'blur(14px)',
        boxShadow: '0 55px 140px rgba(0,0,0,0.5)',
        ease: 'power1.out'
      }, 0);

      tl.to([styles.blueGlow, styles.orangeGlow].map((className) => sectionRef.current.querySelector(`.${className}`)), {
        y: -18,
        opacity: 0.85,
        ease: 'none'
      }, 0);

      if (nextCard) {
        gsap.set(nextCard, {
          opacity: 0.62,
          scale: 0.86,
          rotationX: -14,
          rotationY: -4,
          y: 160,
          filter: 'blur(14px)',
          zIndex: 9,
          transformPerspective: 2000,
        });
        tl.fromTo(nextCard,
          { opacity: 0.62, scale: 0.86, rotationX: -14, rotationY: -4, y: 160, filter: 'blur(14px)' },
          { opacity: 1, scale: 1, rotationX: 0, rotationY: 0, y: 0, filter: 'blur(0px)', ease: 'power1.out' },
          0.2
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.educationSection} id="education-section">
      <div className={styles.blueGlow} />
      <div className={styles.orangeGlow} />

      <div ref={cardRef} className={styles.card}>
        <span ref={numberRef} className={styles.sectionNumber}>03</span>

        <div className={styles.cardMain}>
          <div className={styles.educationHeaderRow}>
            <div>
              <div className={styles.sectionTagline}>ABOUT • EDUCATION</div>
              <h2 ref={titleRef} className={styles.sectionTitle}>EDUCATION</h2>
            </div>
          </div>

          <div ref={timelineRef} className={styles.timelineContainer}>
          {educationData.map((edu) => (
            <div key={edu.id} className={styles.timelineEntry}>
              {/* Left: Duration */}
              <div className={styles.durationColumn}>
                <span className={styles.duration}>{edu.duration}</span>
              </div>

              {/* Center: Divider Line */}
              <div className={styles.dividerColumn}>
                <div className={styles.dividerLine} />
                <div className={styles.dividerDot} />
              </div>

              {/* Right: Education Details */}
              <div className={styles.detailsColumn}>
                <h3 className={styles.degree}>{edu.degree}</h3>
                {edu.institution && (
                  <p className={styles.institution}>{edu.institution}</p>
                )}
                <div className={styles.details}>
                  {edu.details.map((detail, idx) => (
                    <p key={idx} className={styles.detailItem}>
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
          <div className={styles.highlightPanel}>
            <div className={styles.highlightTitle}>Education Snapshot</div>
            <p className={styles.highlightText}>
              Pursuing B.Tech in AI Driven Languages and Technologies with a focus on full-stack systems and applied machine learning.
            </p>
            <div className={styles.educationStatGroup}>
              <div className={styles.educationStat}>
                <span>Current CGPA</span>
                <strong>8.07</strong>
              </div>
              <div className={styles.educationStat}>
                <span>Program</span>
                <strong>KL University</strong>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
};

export default EducationSection;
