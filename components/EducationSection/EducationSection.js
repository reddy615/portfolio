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
          start: 'top 45%',
          end: 'bottom 25%',
          scrub: 0.35,
          markers: false
        }
      });

      tl.to(cardRef.current, {
        opacity: 0.4,
        scale: 0.92,
        y: -80,
        ease: 'power1.out'
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
    <section ref={sectionRef} className={styles.educationSection} id="education-section">
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
