'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import sharedStyles from './SharedDeck.module.css';
import aboutStyles from '@/components/AboutSection/AboutSection.module.css';
import skillsStyles from '@/components/SkillsSection/SkillsSection.module.css';
import educationStyles from '@/components/EducationSection/EducationSection.module.css';
import projectsStyles from '@/components/ProjectsSection/ProjectsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const SharedDeck = () => {
  const deckRef = useRef(null);
  const aboutCardRef = useRef(null);
  const skillsCardRef = useRef(null);
  const educationCardRef = useRef(null);
  const projectsCardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const deck = deckRef.current;
      const about = aboutCardRef.current;
      const skills = skillsCardRef.current;
      const education = educationCardRef.current;
      const projects = projectsCardRef.current;

      if (!deck || !about || !skills || !education || !projects) return;

      gsap.set([about, skills, education, projects], {
        position: 'absolute',
        top: 0,
        left: '50%',
        x: '-50%',
        width: '100%',
        maxWidth: '1800px',
        transformOrigin: 'center center',
      });

      gsap.set(about, { zIndex: 40 });
      gsap.set(skills, { zIndex: 30 });
      gsap.set(education, { zIndex: 20 });
      gsap.set(projects, { zIndex: 10 });

      const pinTrigger = ScrollTrigger.create({
        trigger: '#who-am-i',
        start: 'top top',
        endTrigger: '#projects-section',
        end: 'bottom top+=700',
        scrub: 0.35,
        pin: deck,
        anticipatePin: 1,
        markers: false,
      });

      const aboutTween = gsap.timeline({
        scrollTrigger: {
          trigger: '#who-am-i',
          start: 'top top',
          end: 'bottom top+=700',
          scrub: 0.35,
          markers: false,
        }
      });

      aboutTween.to(about, {
        opacity: 0.64,
        scale: 0.88,
        rotationX: 12,
        rotationY: 3,
        y: -220,
        filter: 'blur(14px)',
        boxShadow: '0 55px 140px rgba(0,0,0,0.5)',
        ease: 'power1.out',
      }, 0);

      aboutTween.fromTo(skills,
        { opacity: 0.62, scale: 0.86, rotationX: -14, rotationY: -4, y: 160, filter: 'blur(14px)' },
        { opacity: 1, scale: 1, rotationX: 0, rotationY: 0, y: 0, filter: 'blur(0px)', ease: 'power1.out' },
        0.2
      );

      const skillsTween = gsap.timeline({
        scrollTrigger: {
          trigger: '#skills-section',
          start: 'top top',
          end: 'bottom top+=700',
          scrub: 0.35,
          markers: false,
        }
      });

      skillsTween.to(skills, {
        opacity: 0.64,
        scale: 0.88,
        rotationX: 12,
        rotationY: 3,
        y: -220,
        filter: 'blur(14px)',
        boxShadow: '0 55px 140px rgba(0,0,0,0.5)',
        ease: 'power1.out',
      }, 0);

      skillsTween.fromTo(education,
        { opacity: 0.62, scale: 0.86, rotationX: -14, rotationY: -4, y: 160, filter: 'blur(14px)' },
        { opacity: 1, scale: 1, rotationX: 0, rotationY: 0, y: 0, filter: 'blur(0px)', ease: 'power1.out' },
        0.2
      );

      const educationTween = gsap.timeline({
        scrollTrigger: {
          trigger: '#education-section',
          start: 'top top',
          end: 'bottom top+=700',
          scrub: 0.35,
          markers: false,
        }
      });

      educationTween.to(education, {
        opacity: 0.64,
        scale: 0.88,
        rotationX: 12,
        rotationY: 3,
        y: -220,
        filter: 'blur(14px)',
        boxShadow: '0 55px 140px rgba(0,0,0,0.5)',
        ease: 'power1.out',
      }, 0);

      educationTween.fromTo(projects,
        { opacity: 0.92, scale: 0.92, y: 80, filter: 'blur(0px)' },
        { opacity: 1, scale: 1, y: 0, ease: 'power1.out' },
        0.2
      );

      gsap.set(projects, { opacity: 0.92, scale: 0.92, y: 80 });

      return () => {
        pinTrigger.kill();
      };
    }, deckRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={deckRef} className={sharedStyles.sharedDeck}>
      <div ref={aboutCardRef} className={aboutStyles.card} data-section="who-am-i">
        <span className={aboutStyles.sectionNumber}>01</span>
        <div className={aboutStyles.cardMain}>
          <div className={aboutStyles.header}>
            <div>
              <div className={aboutStyles.tagline}>About Profile</div>
              <h2 className={aboutStyles.title}>Who I Am</h2>
            </div>
          </div>
          <div className={aboutStyles.content}>
            <p className={aboutStyles.bioText}>
              I am P. Akshay Reddy, a B.Tech student specializing in AI Driven Languages and Technologies. I am passionate about Full Stack Development, Artificial Intelligence, and building scalable web applications.
            </p>
            <div className={aboutStyles.bioText}>
              I have developed projects such as:
              <ul className={aboutStyles.projectList}>
                <li className={aboutStyles.projectItem}>Doctors Farms Resort Booking Website</li>
                <li className={aboutStyles.projectItem}>AI Interview Preparation Platform</li>
              </ul>
            </div>
            <p className={aboutStyles.bioText}>
              My primary tech stack includes React, Node.js, Express.js, MongoDB, JavaScript, Git, and cloud deployment platforms.
            </p>
            <p className={aboutStyles.bioText}>
              I enjoy solving real-world problems through software engineering and continuously improving my development skills.
            </p>
          </div>
        </div>
        <aside className={aboutStyles.cardAside}>
          <div className={aboutStyles.tagsSection}>
            <div className={aboutStyles.tagsLabel}>Core Focus Areas</div>
            <div className={aboutStyles.tagsList}>
              <span className={aboutStyles.tag}>FULL STACK</span>
              <span className={aboutStyles.tag}>REACT</span>
              <span className={aboutStyles.tag}>NODE.JS</span>
              <span className={aboutStyles.tag}>MONGODB</span>
              <span className={aboutStyles.tag}>AI/ML</span>
              <span className={aboutStyles.tag}>CLOUD</span>
            </div>
          </div>
        </aside>
      </div>

      <div ref={skillsCardRef} className={skillsStyles.card} data-section="skills-section">
        <span className={skillsStyles.sectionNumber}>02</span>
        <div className={skillsStyles.cardMain}>
          <div className={skillsStyles.skillsHeaderRow}>
            <div>
              <div className={skillsStyles.sectionTagline}>Expertise</div>
              <h2 className={skillsStyles.sectionTitle}>Technical Skills</h2>
            </div>
          </div>
          <div className={skillsStyles.skillsGrid}>
            <div>
              <h3 className={skillsStyles.cardTitle}>Languages</h3>
              <div className={skillsStyles.skillsList}>
                <span className={skillsStyles.skillTag}>JavaScript</span>
                <span className={skillsStyles.skillTag}>Java</span>
                <span className={skillsStyles.skillTag}>Python</span>
                <span className={skillsStyles.skillTag}>HTML5</span>
                <span className={skillsStyles.skillTag}>CSS3</span>
              </div>
            </div>
            <div>
              <h3 className={skillsStyles.cardTitle}>Frontend</h3>
              <div className={skillsStyles.skillsList}>
                <span className={skillsStyles.skillTag}>React.js</span>
                <span className={skillsStyles.skillTag}>Next.js</span>
                <span className={skillsStyles.skillTag}>Tailwind CSS</span>
                <span className={skillsStyles.skillTag}>Bootstrap</span>
                <span className={skillsStyles.skillTag}>Responsive Design</span>
              </div>
            </div>
            <div>
              <h3 className={skillsStyles.cardTitle}>Backend</h3>
              <div className={skillsStyles.skillsList}>
                <span className={skillsStyles.skillTag}>Node.js</span>
                <span className={skillsStyles.skillTag}>Express.js</span>
                <span className={skillsStyles.skillTag}>REST APIs</span>
                <span className={skillsStyles.skillTag}>JWT Auth</span>
              </div>
            </div>
            <div>
              <h3 className={skillsStyles.cardTitle}>Databases</h3>
              <div className={skillsStyles.skillsList}>
                <span className={skillsStyles.skillTag}>MongoDB</span>
                <span className={skillsStyles.skillTag}>MySQL</span>
              </div>
            </div>
            <div>
              <h3 className={skillsStyles.cardTitle}>Tools</h3>
              <div className={skillsStyles.skillsList}>
                <span className={skillsStyles.skillTag}>Git</span>
                <span className={skillsStyles.skillTag}>GitHub</span>
                <span className={skillsStyles.skillTag}>VS Code</span>
                <span className={skillsStyles.skillTag}>Postman</span>
              </div>
            </div>
            <div>
              <h3 className={skillsStyles.cardTitle}>Cloud & Deployment</h3>
              <div className={skillsStyles.skillsList}>
                <span className={skillsStyles.skillTag}>Railway</span>
                <span className={skillsStyles.skillTag}>Render</span>
                <span className={skillsStyles.skillTag}>Vercel</span>
                <span className={skillsStyles.skillTag}>Cloudflare</span>
              </div>
            </div>
            <div>
              <h3 className={skillsStyles.cardTitle}>AI & Technologies</h3>
              <div className={skillsStyles.skillsList}>
                <span className={skillsStyles.skillTag}>Generative AI</span>
                <span className={skillsStyles.skillTag}>Prompt Engineering</span>
                <span className={skillsStyles.skillTag}>API Integration</span>
                <span className={skillsStyles.skillTag}>AI Interview Systems</span>
              </div>
            </div>
          </div>
        </div>
        <aside className={skillsStyles.cardAside}>
          <div className={skillsStyles.highlightPanel}>
            <div className={skillsStyles.highlightTitle}>Key Strengths</div>
            <p className={skillsStyles.highlightText}>
              Building responsive UI, backend APIs, cloud deployments, and AI-enhanced web products.
            </p>
            <div className={skillsStyles.highlightList}>
              <span className={skillsStyles.skillTag}>React.js</span>
              <span className={skillsStyles.skillTag}>Node.js</span>
              <span className={skillsStyles.skillTag}>MongoDB</span>
              <span className={skillsStyles.skillTag}>AI</span>
              <span className={skillsStyles.skillTag}>Vercel</span>
            </div>
          </div>
        </aside>
      </div>

      <div ref={educationCardRef} className={educationStyles.card} data-section="education-section">
        <span className={educationStyles.sectionNumber}>03</span>
        <div className={educationStyles.cardMain}>
          <div className={educationStyles.educationHeaderRow}>
            <div>
              <div className={educationStyles.sectionTagline}>ABOUT • EDUCATION</div>
              <h2 className={educationStyles.sectionTitle}>EDUCATION</h2>
            </div>
          </div>
          <div className={educationStyles.timelineContainer}>
            {[
              {
                id: 1,
                duration: '2023 - 2027',
                degree: 'Bachelor of Technology (B.Tech)',
                institution: 'KL University',
                details: [
                  'Computer Science & Engineering',
                  'Specialization: AI Driven Languages and Technologies',
                  'CGPA: 8.07',
                  'Status: Currently Pursuing',
                ],
              },
              {
                id: 2,
                duration: '2021 - 2023',
                degree: 'Intermediate (MPC)',
                institution: '',
                details: ['Marks: 617 / 1000', 'Percentage: 61.7%'],
              },
              {
                id: 3,
                duration: '2021',
                degree: 'CBSE 10th',
                institution: '',
                details: ['CGPA: 6.51', 'Percentage: 61.85%'],
              },
            ].map((edu) => (
              <div key={edu.id} className={educationStyles.timelineEntry}>
                <div className={educationStyles.durationColumn}>
                  <span className={educationStyles.duration}>{edu.duration}</span>
                </div>
                <div className={educationStyles.dividerColumn}>
                  <div className={educationStyles.dividerLine} />
                  <div className={educationStyles.dividerDot} />
                </div>
                <div className={educationStyles.detailsColumn}>
                  <h3 className={educationStyles.degree}>{edu.degree}</h3>
                  {edu.institution && <p className={educationStyles.institution}>{edu.institution}</p>}
                  <div className={educationStyles.details}>
                    {edu.details.map((detail, idx) => (
                      <p key={idx} className={educationStyles.detailItem}>
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <aside className={educationStyles.cardAside}>
          <div className={educationStyles.highlightPanel}>
            <div className={educationStyles.highlightTitle}>Education Snapshot</div>
            <p className={educationStyles.highlightText}>
              Pursuing B.Tech in AI Driven Languages and Technologies with a focus on full-stack systems and applied machine learning.
            </p>
            <div className={educationStyles.educationStatGroup}>
              <div className={educationStyles.educationStat}>
                <span>Current CGPA</span>
                <strong>8.07</strong>
              </div>
              <div className={educationStyles.educationStat}>
                <span>Program</span>
                <strong>KL University</strong>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div ref={projectsCardRef} className={projectsStyles.projectsCard} data-section="projects-section">
        <span className={projectsStyles.sectionNumber}>04</span>
        <div className={projectsStyles.cardMain}>
          <div className={projectsStyles.sectionHeaderRow}>
            <div>
              <div className={projectsStyles.sectionTagline}>Selected Works</div>
              <h2 className={projectsStyles.sectionTitle}>PROJECTS</h2>
            </div>
          </div>
          <div className={projectsStyles.twoColumnGrid}>
            <div className={projectsStyles.card}>
              <div className={projectsStyles.projectImage}>
                <Image
                  src="/ai-interview-screenshot.png"
                  alt="AI Interview Preparation Platform screenshot"
                  fill
                  className={projectsStyles.projectScreenshot}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className={projectsStyles.cardIcon}>
                <svg viewBox="0 0 24 24">
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <h3 className={projectsStyles.cardTitle}>AI Interview Preparation Platform</h3>
              <div className={projectsStyles.statusBadge}>In Development</div>
              <p className={projectsStyles.projectDescription}>An AI-powered interview preparation platform that helps students prepare for technical interviews through AI-generated questions, coding assessments, mock interviews, performance analytics, and personalized feedback.</p>
              <ul className={projectsStyles.projectSpecs}>
                <li className={projectsStyles.projectSpecItem}>AI Mock Interviews</li>
                <li className={projectsStyles.projectSpecItem}>Coding Assessments</li>
                <li className={projectsStyles.projectSpecItem}>Performance Analytics</li>
                <li className={projectsStyles.projectSpecItem}>Personalized Feedback</li>
              </ul>
              <div className={projectsStyles.techStackWrapper}>
                <div className={projectsStyles.techStackLabel}>Tech Stack</div>
                <div className={projectsStyles.skillsList}>
                  <span className={projectsStyles.skillTag}>React.js</span>
                  <span className={projectsStyles.skillTag}>Node.js</span>
                  <span className={projectsStyles.skillTag}>Express.js</span>
                  <span className={projectsStyles.skillTag}>MongoDB</span>
                  <span className={projectsStyles.skillTag}>OpenAI / Gemini</span>
                  <span className={projectsStyles.skillTag}>Judge0</span>
                </div>
              </div>
              <div className={projectsStyles.projectActions}>
                <a className={`${projectsStyles.projectBtn} ${projectsStyles.githubBtn}`} href="https://github.com/reddy615/AI" target="_blank" rel="noreferrer">GitHub</a>
              </div>
            </div>
            <div className={projectsStyles.card}>
              <div className={projectsStyles.projectImage}>
                <Image
                  src="/doctors-farms-screenshot.png"
                  alt="Doctors Farms Resort Booking Website screenshot"
                  fill
                  className={projectsStyles.projectScreenshot}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className={projectsStyles.cardIcon}>
                <svg viewBox="0 0 24 24">
                  <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-.93 0-1.822-.377-2.487-1.047l-.547-.548z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <h3 className={projectsStyles.cardTitle}>Doctors Farms Resort Booking Website</h3>
              <div className={projectsStyles.statusBadgeLive}>Live</div>
              <p className={projectsStyles.projectDescription}>A full-stack resort booking platform that allows users to explore rooms, send booking inquiries, and interact with a responsive modern UI. The system includes email notifications, inquiry management, and cloud deployment.</p>
              <ul className={projectsStyles.projectSpecs}>
                <li className={projectsStyles.projectSpecItem}>AI-generated interview questions</li>
                <li className={projectsStyles.projectSpecItem}>Interactive coding assessments</li>
                <li className={projectsStyles.projectSpecItem}>In-depth performance analytics</li>
                <li className={projectsStyles.projectSpecItem}>Mock interview feedback system</li>
              </ul>
              <div className={projectsStyles.techStackWrapper}>
                <div className={projectsStyles.techStackLabel}>Tech Stack</div>
                <div className={projectsStyles.skillsList}>
                  <span className={projectsStyles.skillTag}>React.js</span>
                  <span className={projectsStyles.skillTag}>Node.js</span>
                  <span className={projectsStyles.skillTag}>Express.js</span>
                  <span className={projectsStyles.skillTag}>MongoDB</span>
                  <span className={projectsStyles.skillTag}>Railway</span>
                </div>
              </div>
              <div className={projectsStyles.projectActions}>
                <a className={`${projectsStyles.projectBtn} ${projectsStyles.githubBtn}`} href="https://github.com/reddy615/doctors-farms" target="_blank" rel="noreferrer">GitHub</a>
                <a className={`${projectsStyles.projectBtn} ${projectsStyles.liveBtn}`} href="https://doctorsfarmnunna.in" target="_blank" rel="noreferrer">Live Link</a>
              </div>
            </div>
          </div>
        </div>
        <aside className={projectsStyles.cardAside}>
          <div className={projectsStyles.highlightPanel}>
            <div className={projectsStyles.highlightTitle}>Featured Work</div>
            <p className={projectsStyles.highlightText}>
              AI interview prep and resort booking projects built with modern web architecture, deployment pipelines, and full-stack integration.
            </p>
          </div>
          <footer className={projectsStyles.footer}>
            <p>© {new Date().getFullYear()} P. AKSHAY REDDY. ALL RIGHTS RESERVED.</p>
            <p style={{ marginTop: '6px' }}>
              Built using <span className={projectsStyles.footerHighlight}>Next.js, Three.js, GSAP & CSS Modules</span>
            </p>
          </footer>
        </aside>
      </div>
    </div>
  );
};

export default SharedDeck;
