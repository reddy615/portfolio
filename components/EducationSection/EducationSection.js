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
      const tl = gsap.timeline({
        defaults: { ease: 'power3.out' },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play reverse play reverse',
          markers: false
        }
      });

      tl.fromTo(cardRef.current,
        { opacity: 0, y: 80, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.2,
          boxShadow: '0 30px 100px rgba(0, 0, 0, 0.7), 0 0 50px rgba(255, 140, 58, 0.12)'
        }
      );

      tl.fromTo(numberRef.current,
        { opacity: 0, scale: 0.5 },
        { opacity: 1, scale: 1, duration: 0.8 },
        '-=0.8'
      );

      tl.fromTo(titleRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8 },
        '-=0.6'
      );

      const timelineItems = timelineRef.current.querySelectorAll(`.${styles.timelineEntry}`);
      tl.fromTo(timelineItems,
        { opacity: 0, y: 30, x: -20 },
        { opacity: 1, y: 0, x: 0, duration: 0.8, stagger: 0.15 },
        '-=0.6'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.educationSection}>
      <div className={styles.blueGlow} />
      <div className={styles.orangeGlow} />

      <div ref={cardRef} className={styles.card}>
        {/* Section Header Row */}
        <div className={styles.educationHeaderRow}>
          <div>
            <div className={styles.sectionTagline}>ABOUT • EDUCATION</div>
            <h2 ref={titleRef} className={styles.sectionTitle}>EDUCATION</h2>
          </div>
          <div ref={numberRef} className={styles.sectionNumber}>03</div>
        </div>

        {/* Timeline Container */}
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
    </section>
  );
};

export default EducationSection;
