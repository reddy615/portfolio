'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './SkillsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const SKILL_CATEGORIES = [
  {
    name: 'LANGUAGES',
    skills: ['JavaScript', 'Java', 'Python', 'HTML5', 'CSS3'],
  },
  {
    name: 'FRONTEND',
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'Responsive Design'],
  },
  {
    name: 'BACKEND',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication'],
  },
  {
    name: 'DATABASES',
    skills: ['MongoDB', 'MySQL'],
  },
  {
    name: 'TOOLS',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman'],
  },
  {
    name: 'CLOUD & DEPLOYMENT',
    skills: ['Railway', 'Render', 'Vercel', 'Cloudflare'],
  },
  {
    name: 'AI & TECHNOLOGIES',
    skills: ['Generative AI', 'Prompt Engineering', 'AI Interview Systems', 'API Integration'],
  },
];

export default function SkillsSection() {
  const sectionRef = useRef(null);
  const categoryRefs = useRef([]);

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

    // Animate categories with stagger
    const categoryElements = sectionRef.current.querySelectorAll(`.${styles.skillCategory}`);
    if (categoryElements.length > 0) {
      gsap.fromTo(
        categoryElements,
        { opacity: 0, y: 15 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.4,
          stagger: 0.1,
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

    // Animate skill chips with stagger
    const skillChips = sectionRef.current.querySelectorAll(`.${styles.skillChip}`);
    if (skillChips.length > 0) {
      gsap.fromTo(
        skillChips,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          delay: 0.5,
          stagger: 0.05,
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
        if (trigger.vars.id === 'skills-section-animation') {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className={styles.skillsSection} id="skills-section">
      <article className={styles.card} aria-labelledby="skills-title">
        <span className={styles.sectionNumber}>02</span>

        <div className={styles.cardMain}>
          <header className={styles.header}>
            <div className={styles.tagline}>Technical Stack</div>
            <h2 id="skills-title" className={styles.title}>
              Technical Skills
            </h2>
          </header>

          <div className={styles.skillsGrid}>
            {SKILL_CATEGORIES.map((category, categoryIndex) => (
              <div key={categoryIndex} className={styles.skillCategory}>
                <h3 className={styles.categoryName}>{category.name}</h3>
                <div className={styles.skillsList}>
                  {category.skills.map((skill) => (
                    <span key={skill} className={styles.skillChip}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </section>
  );
}
