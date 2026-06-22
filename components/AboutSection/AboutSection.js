'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './AboutSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const tagsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const nextSection = document.getElementById('skills-section');
      const nextCard = nextSection?.querySelector('[class*=card]');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top+=700',
          scrub: 0.35,
          pin: cardRef.current,
          anticipatePin: 1,
          markers: false,
        }
      });

      gsap.set(cardRef.current, {
        position: 'relative',
        zIndex: 10,
        transformPerspective: 2000,
      });

      tl.to({}, { duration: 0.4 });

      tl.to(cardRef.current, {
        opacity: 0.78,
        scale: 0.94,
        rotationX: 10,
        rotationY: 2,
        y: -20,
        filter: 'blur(8px)',
        boxShadow: '0 30px 80px rgba(0,0,0,0.35)',
        ease: 'power1.out',
      }, 0.4);

      tl.to([styles.blueGlow, styles.orangeGlow].map((className) => sectionRef.current.querySelector(`.${className}`)), {
        y: -18,
        opacity: 0.85,
        ease: 'none',
      }, 0);

      if (nextCard) {
        gsap.set(nextCard, {
          opacity: 0.75,
          scale: 0.88,
          rotationX: -10,
          rotationY: -2,
          y: 20,
          filter: 'blur(6px)',
          zIndex: 9,
          transformPerspective: 2000,
        });
        tl.fromTo(nextCard,
          { opacity: 0.75, scale: 0.88, rotationX: -10, rotationY: -2, y: 20, filter: 'blur(6px)' },
          { opacity: 1, scale: 1, rotationX: 0, rotationY: 0, y: 0, filter: 'blur(0px)', ease: 'power1.out' },
          '<0.6'
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.aboutSection} id="who-am-i">
      {/* Visual background glows */}
      <div className={styles.blueGlow} />
      <div className={styles.orangeGlow} />

      <div ref={cardRef} className={styles.card}>
        <span className={styles.sectionNumber}>01</span>

        <div className={styles.cardMain}>
          <div ref={titleRef} className={styles.header}>
            <div>
              <div className={styles.tagline}>About Profile</div>
              <h2 className={styles.title}>Who I Am</h2>
            </div>
          </div>

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
        </div>

        <aside className={styles.cardAside}>
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
        </aside>
      </div>
    </section>
  );
};

export default AboutSection;
