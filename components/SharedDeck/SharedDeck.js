'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import sharedStyles from './SharedDeck.module.css';
import aboutStyles from '@/components/AboutSection/AboutSection.module.css';
import skillsStyles from '@/components/SkillsSection/SkillsSection.module.css';
import educationStyles from '@/components/EducationSection/EducationSection.module.css';
import projectsStyles from '@/components/ProjectsSection/ProjectsSection.module.css';

gsap.registerPlugin(ScrollTrigger);

const SKILL_GROUPS = [
  {
    title: 'Languages',
    skills: ['JavaScript', 'Java', 'Python', 'HTML5', 'CSS3'],
  },
  {
    title: 'Frontend',
    skills: ['React.js', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'Responsive Design'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth'],
  },
  {
    title: 'Databases',
    skills: ['MongoDB', 'MySQL'],
  },
  {
    title: 'Tools',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman'],
  },
  {
    title: 'Cloud & Deployment',
    skills: ['Railway', 'Render', 'Vercel', 'Cloudflare'],
  },
  {
    title: 'AI & Technologies',
    skills: ['Generative AI', 'Prompt Engineering', 'API Integration', 'AI Interview Systems'],
  },
];

const EDUCATION = [
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
];

const PROJECTS = [
  {
    title: 'AI Interview Preparation Platform',
    image: '/ai-interview-screenshot.png',
    imageAlt: 'AI Interview Preparation Platform screenshot',
    iconPath:
      'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    status: 'In Development',
    isLive: false,
    description:
      'An AI-powered interview preparation platform that helps students prepare for technical interviews through AI-generated questions, coding assessments, mock interviews, performance analytics, and personalized feedback.',
    features: [
      'AI Mock Interviews',
      'Coding Assessments',
      'Performance Analytics',
      'Personalized Feedback',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'OpenAI / Gemini', 'Judge0'],
    links: [{ label: 'GitHub', href: 'https://github.com/reddy615/AI', type: 'github' }],
  },
  {
    title: 'Doctors Farms Resort Booking Website',
    image: '/doctors-farms-screenshot.png',
    imageAlt: 'Doctors Farms Resort Booking Website screenshot',
    iconPath:
      'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0012 18.75c-.93 0-1.822-.377-2.487-1.047l-.547-.548z',
    status: 'Live',
    isLive: true,
    description:
      'A full-stack resort booking platform that allows users to explore rooms, send booking inquiries, and interact with a responsive modern UI. The system includes email notifications, inquiry management, and cloud deployment.',
    features: [
      'Room discovery and responsive browsing',
      'Booking inquiry workflow',
      'Email notifications',
      'Cloud-hosted full-stack deployment',
    ],
    stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Railway'],
    links: [
      {
        label: 'GitHub',
        href: 'https://github.com/reddy615/doctors-farms',
        type: 'github',
      },
      { label: 'Live Link', href: 'https://doctorsfarmnunna.in', type: 'live' },
    ],
  },
];

const COPYRIGHT_YEAR = new Date().getFullYear();

function SkillTags({ items, styles }) {
  return (
    <div className={styles.skillsList}>
      {items.map((item) => (
        <span key={item} className={styles.skillTag}>
          {item}
        </span>
      ))}
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <article className={projectsStyles.card}>
      <div className={projectsStyles.projectImage}>
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          className={projectsStyles.projectScreenshot}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className={projectsStyles.cardIcon}>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            d={project.iconPath}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>

      <h3 className={projectsStyles.cardTitle}>{project.title}</h3>
      <div
        className={
          project.isLive ? projectsStyles.statusBadgeLive : projectsStyles.statusBadge
        }
      >
        {project.status}
      </div>
      <p className={projectsStyles.projectDescription}>{project.description}</p>

      <ul className={projectsStyles.projectSpecs}>
        {project.features.map((feature) => (
          <li key={feature} className={projectsStyles.projectSpecItem}>
            {feature}
          </li>
        ))}
      </ul>

      <div className={projectsStyles.techStackWrapper}>
        <div className={projectsStyles.techStackLabel}>Tech Stack</div>
        <SkillTags items={project.stack} styles={projectsStyles} />
      </div>

      <div className={projectsStyles.projectActions}>
        {project.links.map((link) => (
          <a
            key={link.href}
            className={`${projectsStyles.projectBtn} ${
              link.type === 'live' ? projectsStyles.liveBtn : projectsStyles.githubBtn
            }`}
            href={link.href}
            target="_blank"
            rel="noreferrer"
          >
            {link.label}
          </a>
        ))}
      </div>
    </article>
  );
}

export default function SharedDeck() {
  const deckRef = useRef(null);
  const aboutCardRef = useRef(null);
  const skillsCardRef = useRef(null);
  const educationCardRef = useRef(null);
  const projectsCardRef = useRef(null);

  useEffect(() => {
    let media;

    const ctx = gsap.context(() => {
      const deck = deckRef.current;
      const about = aboutCardRef.current;
      const skills = skillsCardRef.current;
      const education = educationCardRef.current;
      const projects = projectsCardRef.current;

      if (!deck || !about || !skills || !education || !projects) {
        return;
      }

      const cards = [about, skills, education, projects];
      const trigger = document.getElementById('who-am-i') || deck;

      gsap.set(cards, {
        position: 'absolute',
        top: 0,
        left: '50%',
        width: 'min(94vw, 1800px)',
        transformOrigin: 'center center',
        yPercent: 0,
      });

      const createDeckTimeline = ({ end, exitY, offsets }) => {
        gsap.set(about, {
          zIndex: 40,
          opacity: 1,
          scale: 1,
          y: offsets[0],
          rotationX: 0,
          rotationY: 0,
          filter: 'blur(0px)',
        });
        gsap.set(skills, {
          zIndex: 30,
          opacity: 0.9,
          scale: 0.95,
          y: offsets[1],
          filter: 'blur(0px)',
        });
        gsap.set(education, {
          zIndex: 20,
          opacity: 0.85,
          scale: 0.9,
          y: offsets[2],
          filter: 'blur(0px)',
        });
        gsap.set(projects, {
          zIndex: 10,
          opacity: 0.8,
          scale: 0.85,
          y: offsets[3],
          filter: 'blur(0px)',
        });

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger,
            start: 'top top',
            end,
            scrub: 0.35,
            pin: deck,
            anticipatePin: 1,
          },
        });

        timeline
          .to(about, {
            scale: 0.95,
            y: exitY,
            opacity: 0.8,
            filter: 'blur(4px)',
            ease: 'power1.inOut',
          })
          .to(
            skills,
            {
              y: 0,
              scale: 1,
              opacity: 1,
              filter: 'blur(0px)',
              ease: 'power1.inOut',
            },
            '<0.2'
          )
          .to(
            skills,
            {
              scale: 0.95,
              y: exitY,
              opacity: 0.8,
              filter: 'blur(4px)',
              ease: 'power1.inOut',
            },
            '+=0.5'
          )
          .to(
            education,
            {
              y: 0,
              scale: 1,
              opacity: 1,
              filter: 'blur(0px)',
              ease: 'power1.inOut',
            },
            '<0.2'
          )
          .to(
            education,
            {
              scale: 0.95,
              y: exitY,
              opacity: 0.8,
              filter: 'blur(4px)',
              ease: 'power1.inOut',
            },
            '+=0.5'
          )
          .to(
            projects,
            {
              y: 0,
              scale: 1,
              opacity: 1,
              filter: 'blur(0px)',
              ease: 'power1.inOut',
            },
            '<0.2'
          );
      };

      media = gsap.matchMedia();
      media.add('(min-width: 769px)', () => {
        createDeckTimeline({
          end: '+=4000',
          exitY: -10,
          offsets: [0, 40, 80, 120],
        });
      });
      media.add('(max-width: 768px)', () => {
        createDeckTimeline({
          end: '+=3000',
          exitY: -5,
          offsets: [0, 20, 40, 60],
        });
      });
    }, deckRef);

    return () => {
      media?.revert();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={deckRef} className={sharedStyles.sharedDeck}>
      <section
        ref={aboutCardRef}
        className={aboutStyles.card}
        data-section="who-am-i"
        aria-labelledby="shared-about-title"
      >
        <span className={aboutStyles.sectionNumber}>01</span>
        <div className={aboutStyles.cardMain}>
          <div className={aboutStyles.header}>
            <div>
              <div className={aboutStyles.tagline}>About Profile</div>
              <h2 id="shared-about-title" className={aboutStyles.title}>
                Who I Am
              </h2>
            </div>
          </div>
          <div className={aboutStyles.content}>
            <p className={aboutStyles.bioText}>
              I am P. Akshay Reddy, a B.Tech student specializing in AI Driven Languages
              and Technologies. I am passionate about Full Stack Development, Artificial
              Intelligence, and building scalable web applications.
            </p>
            <div className={aboutStyles.bioText}>
              I have developed projects such as:
              <ul className={aboutStyles.projectList}>
                <li className={aboutStyles.projectItem}>
                  Doctors Farms Resort Booking Website
                </li>
                <li className={aboutStyles.projectItem}>
                  AI Interview Preparation Platform
                </li>
              </ul>
            </div>
            <p className={aboutStyles.bioText}>
              My primary tech stack includes React, Node.js, Express.js, MongoDB,
              JavaScript, Git, and cloud deployment platforms.
            </p>
            <p className={aboutStyles.bioText}>
              I enjoy solving real-world problems through software engineering and
              continuously improving my development skills.
            </p>
          </div>
        </div>
        <aside className={aboutStyles.cardAside}>
          <div className={aboutStyles.tagsSection}>
            <div className={aboutStyles.tagsLabel}>Core Focus Areas</div>
            <div className={aboutStyles.tagsList}>
              {['FULL STACK', 'REACT', 'NODE.JS', 'MONGODB', 'AI/ML', 'CLOUD'].map(
                (tag) => (
                  <span key={tag} className={aboutStyles.tag}>
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </aside>
      </section>

      <section
        ref={skillsCardRef}
        className={skillsStyles.card}
        data-section="skills-section"
        aria-labelledby="shared-skills-title"
      >
        <span className={skillsStyles.sectionNumber}>02</span>
        <div className={skillsStyles.cardMain}>
          <div className={skillsStyles.skillsHeaderRow}>
            <div>
              <div className={skillsStyles.sectionTagline}>Expertise</div>
              <h2 id="shared-skills-title" className={skillsStyles.sectionTitle}>
                Technical Skills
              </h2>
            </div>
          </div>
          <div className={skillsStyles.skillsGrid}>
            {SKILL_GROUPS.map((group) => (
              <div key={group.title}>
                <h3 className={skillsStyles.cardTitle}>{group.title}</h3>
                <SkillTags items={group.skills} styles={skillsStyles} />
              </div>
            ))}
          </div>
        </div>
        <aside className={skillsStyles.cardAside}>
          <h3 className={skillsStyles.cardTitle}>Key Strengths</h3>
          <p>
            Building responsive UI, backend APIs, cloud deployments, and AI-enhanced web
            products.
          </p>
          <SkillTags
            items={['React.js', 'Node.js', 'MongoDB', 'AI', 'Vercel']}
            styles={skillsStyles}
          />
        </aside>
      </section>

      <section
        ref={educationCardRef}
        className={educationStyles.card}
        data-section="education-section"
        aria-labelledby="shared-education-title"
      >
        <span className={educationStyles.sectionNumber}>03</span>
        <div className={educationStyles.cardMain}>
          <div className={educationStyles.educationHeaderRow}>
            <div>
              <div className={educationStyles.sectionTagline}>ABOUT • EDUCATION</div>
              <h2 id="shared-education-title" className={educationStyles.sectionTitle}>
                EDUCATION
              </h2>
            </div>
          </div>
          <div className={educationStyles.timelineContainer}>
            {EDUCATION.map((education) => (
              <div key={education.id} className={educationStyles.timelineEntry}>
                <div className={educationStyles.durationColumn}>
                  <span className={educationStyles.duration}>{education.duration}</span>
                </div>
                <div className={educationStyles.dividerColumn}>
                  <div className={educationStyles.dividerLine} />
                  <div className={educationStyles.dividerDot} />
                </div>
                <div className={educationStyles.detailsColumn}>
                  <h3 className={educationStyles.degree}>{education.degree}</h3>
                  {education.institution && (
                    <p className={educationStyles.institution}>{education.institution}</p>
                  )}
                  <div className={educationStyles.details}>
                    {education.details.map((detail) => (
                      <p key={detail} className={educationStyles.detailItem}>
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
          <h3 className={educationStyles.degree}>Education Snapshot</h3>
          <p className={educationStyles.detailItem}>
            Pursuing B.Tech in AI Driven Languages and Technologies with a focus on
            full-stack systems and applied machine learning.
          </p>
          <p className={educationStyles.detailItem}>
            <strong>Current CGPA:</strong> 8.07
          </p>
          <p className={educationStyles.detailItem}>
            <strong>Program:</strong> KL University
          </p>
        </aside>
      </section>

      <section
        ref={projectsCardRef}
        className={projectsStyles.projectsCard}
        data-section="projects-section"
        aria-labelledby="shared-projects-title"
      >
        <span className={projectsStyles.sectionNumber}>04</span>
        <div className={projectsStyles.cardMain}>
          <div className={projectsStyles.sectionHeaderRow}>
            <div>
              <div className={projectsStyles.sectionTagline}>Selected Works</div>
              <h2 id="shared-projects-title" className={projectsStyles.sectionTitle}>
                PROJECTS
              </h2>
            </div>
          </div>
          <div className={projectsStyles.twoColumnGrid}>
            {PROJECTS.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </div>
        <aside className={projectsStyles.cardAside}>
          <h3 className={projectsStyles.cardTitle}>Featured Work</h3>
          <p className={projectsStyles.projectDescription}>
            AI interview prep and resort booking projects built with modern web
            architecture, deployment pipelines, and full-stack integration.
          </p>
          <footer className={projectsStyles.footer}>
            <p>© {COPYRIGHT_YEAR} P. AKSHAY REDDY. ALL RIGHTS RESERVED.</p>
            <p style={{ marginTop: '6px' }}>
              Built using{' '}
              <span className={projectsStyles.footerHighlight}>
                Next.js, Three.js, GSAP & CSS Modules
              </span>
            </p>
          </footer>
        </aside>
      </section>
    </div>
  );
}
