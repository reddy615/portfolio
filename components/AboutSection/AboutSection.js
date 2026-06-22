'use client';

import React, { useRef } from 'react';
import styles from './AboutSection.module.css';

const AboutSection = () => {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className={styles.aboutSection} id="who-am-i">
      <div className={styles.blueGlow} />
      <div className={styles.orangeGlow} />
    </section>
  );
};

export default AboutSection;
