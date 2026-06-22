'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './ContactSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef(null);
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const infoRef = useRef(null);

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
        { opacity: 1, y: 0, scale: 1, duration: 1.2 }
      );

      tl.fromTo(titleRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.8'
      );

      tl.fromTo(infoRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
        '-=0.6'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.contactSection} id="contact-section">
      <div className={styles.blueGlow} />
      <div className={styles.orangeGlow} />

      <div ref={cardRef} className={styles.card}>
        <div ref={titleRef} className={styles.header}>
          <div className={styles.tagline}>Get In Touch</div>
          <h2 className={styles.title}>Contact</h2>
        </div>

        <div ref={infoRef} className={styles.contactInfo}>
          <p className={styles.contactText}>
            Name: <strong>P. Akshay Reddy</strong>
          </p>
          <p className={styles.contactText}>
            Location: 📍 Nunna, Vijayawada, Andhra Pradesh, India
          </p>
          <p className={styles.contactText}>
            Status: Available for Opportunities
          </p>
          <p className={styles.contactText}>
            Email: <a href="mailto:2300090002csit@gmail.com" className={styles.contactLink}>2300090002csit@gmail.com</a>
          </p>
          <p className={styles.contactText}>
            GitHub: <a href="https://github.com/reddy615" target="_blank" rel="noreferrer" className={styles.contactLink}>github.com/reddy615</a>
          </p>
          <p className={styles.contactText}>
            LinkedIn: <a href="https://www.linkedin.com/in/akshayreddy-polareddy-42664b399/" target="_blank" rel="noreferrer" className={styles.contactLink}>linkedin.com/in/akshayreddy-polareddy-42664b399</a>
          </p>

          <div className={styles.contactActions}>
            <a
              href="/resume/2300090002_AkshayReddy.pdf"
              download="2300090002_AkshayReddy.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.downloadButton}
            >
              <span className={styles.pdfIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 2C4.9 2 4 2.9 4 4V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8L14 2H6ZM14 3.5L18.5 8H14V3.5ZM8.5 17H7V15.5H8.5V17ZM11 17H9.5V11H11V17ZM14.5 17H13V13.5H14.5V17ZM16.5 17H15V11H16.5V17Z" />
                </svg>
              </span>
              DOWNLOAD RESUME
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
