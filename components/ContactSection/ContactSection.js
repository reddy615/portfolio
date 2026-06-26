'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './ContactSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_BADGES = ['GitHub', 'LinkedIn', 'Email'];

export default function ContactSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!sectionRef.current) return;

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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.id === 'contact-section-animation') {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.contactSection} id="contact-section">
      <div className={styles.card}>
        <span className={styles.sectionNumber}>05</span>

        <div className={styles.cardMain}>
          <header className={styles.header}>
            <div className={styles.tagline}>Contact</div>
            <h2 className={styles.title}>Contact</h2>
          </header>

          <p className={styles.bioText}>
            Reach out for web development, AI integrations, and polished product launch support.
          </p>

          <div className={styles.badgeRow}>
            {CONTACT_BADGES.map((tag) => (
              <span key={tag} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>

          <a
            href="/resume/2300090002_AkshayReddy.pdf"
            download="2300090002_AkshayReddy.pdf"
            className={styles.downloadButton}
          >
            <svg
              className={styles.pdfIcon}
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7l-5-5Z"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinejoin="round"
              />
              <path d="M14 2v5h5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M8 14h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M8 11h5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span>DOWNLOAD RESUME</span>
          </a>
        </div>
      </div>
    </section>
  );
}
