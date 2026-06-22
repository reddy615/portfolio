'use client';

import React from 'react';
import CinematicLayer from '@/components/CinematicLayer/CinematicLayer';
import VideoIntro from '@/components/VideoIntro/VideoIntro';
import SharedDeck from '@/components/SharedDeck/SharedDeck';
import AboutSection from '@/components/AboutSection/AboutSection';
import SkillsSection from '@/components/SkillsSection/SkillsSection';
import EducationSection from '@/components/EducationSection/EducationSection';
import ProjectsSection from '@/components/ProjectsSection/ProjectsSection';
import ContactSection from '@/components/ContactSection/ContactSection';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.pageContainer}>
      {/* 1. Cinematic Hero Area */}
      <div className={styles.heroWrapper}>
        {/* Transparent Three.js floating particle overlay */}
        <CinematicLayer />
        
        {/* Fullscreen video and landing content */}
        <VideoIntro />
      </div>

      {/* 2. Shared pinned deck for section cards */}
      <SharedDeck />

      {/* 3. Scroll anchor sections for the shared deck */}
      <AboutSection />
      <SkillsSection />
      <EducationSection />
      <ProjectsSection />

      {/* 4. Contact Section */}
      <ContactSection />
    </main>
  );
}
