'use client';

import React, { useEffect } from 'react';
import CinematicLayer from '@/components/CinematicLayer/CinematicLayer';
import VideoIntro from '@/components/VideoIntro/VideoIntro';
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

      {/* 2. Standalone Animated About Section */}
      <AboutSection />

      {/* 3. Standalone Animated Technical Skills Section */}
      <SkillsSection />

      {/* 4. Standalone Animated Education Section */}
      <EducationSection />

      {/* 5. Standalone Animated Projects Section */}
      <ProjectsSection />

      {/* 6. Contact Section */}
      <ContactSection />
    </main>
  );
}
