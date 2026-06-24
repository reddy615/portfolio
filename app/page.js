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
      <div className={styles.heroWrapper}>
        <CinematicLayer />
        <VideoIntro />
      </div>

      <AboutSection />
      <SkillsSection />
      <EducationSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
