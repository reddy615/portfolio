'use client';

import React, { useRef } from 'react';
import styles from './EducationSection.module.css';

const EducationSection = () => {
  const sectionRef = useRef(null);

  return (
    <section ref={sectionRef} className={styles.educationSection} id="education-section">
      <div className={styles.blueGlow} />
      <div className={styles.orangeGlow} />
    </section>
  );
};

export default EducationSection;
