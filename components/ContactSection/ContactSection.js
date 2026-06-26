'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './ContactSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const CONTACT_DETAILS = [
  {
    label: 'GitHub',
    value: 'github.com/reddy615',
    href: 'https://github.com/reddy615',
    note: 'Explore my projects, source code, and technical contributions.',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/akshayreddy-polareddy-42664b399',
    href: 'https://www.linkedin.com/in/akshayreddy-polareddy-42664b399/',
    note: "Let's connect and discuss opportunities, technology, and innovation.",
  },
  {
    label: 'Email',
    value: '2300090002csit@gmail.com',
    href: 'mailto:2300090002csit@gmail.com',
  },
  {
    label: 'Location',
    value: '📍 Nunna, Vijayawada, Andhra Pradesh, India',
  },
  {
    label: 'Status',
    value: 'Available for Opportunities',
  },
];

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

          <div className={styles.contactList}>
            {CONTACT_DETAILS.map((item) => (
              <div key={item.label} className={styles.contactBlock}>
                <div className={styles.contactRow}>
                  <span className={styles.contactLabel}>{item.label}:</span>
                  {item.href ? (
                    <a
                      href={item.href}
                      className={styles.contactValue}
                      target={item.label === 'Email' ? undefined : '_blank'}
                      rel={item.label === 'Email' ? undefined : 'noopener noreferrer'}
                    >
                      {item.value}
                    </a>
                  ) : (
                    <span className={styles.contactValue}>{item.value}</span>
                  )}
                </div>
                {item.note && <p className={styles.contactNote}>{item.note}</p>}
              </div>
            ))}
          </div>

          <a
            href="/resume/2300090002_AkshayReddy.pdf"
            download="2300090002_AkshayReddy.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.downloadButton}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              style={{ marginRight: 8, flexShrink: 0 }}
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
