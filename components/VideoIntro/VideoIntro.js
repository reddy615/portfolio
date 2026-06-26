'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import styles from './VideoIntro.module.css';

const VideoIntro = () => {
  const containerRef = useRef(null);
  const bgVideoRef = useRef(null);
  const fgVideoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const autoScrollTimerRef = useRef(null);
  const autoScrollCancelled = useRef(false);
  const removeCancelListenersRef = useRef(null);

  // Sync play/pause click
  const togglePlay = () => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    if (!fg || !bg) return;

    if (fg.paused) {
      Promise.all([fg.play(), bg.play()])
        .then(() => {
          setIsPlaying(true);
        })
        .catch((err) => {
          console.warn('Playback failed or interrupted:', err);
          setIsPlaying(!fg.paused);
        });
    } else {
      fg.pause();
      bg.pause();
      setIsPlaying(false);
    }
  };

  // Toggle audio for the foreground video
  const handleToggleAudio = () => {
    const fg = fgVideoRef.current;
    if (!fg) return;

    const nextMuted = !fg.muted;
    fg.muted = nextMuted;
    fg.volume = nextMuted ? 0 : 1;
    setAudioEnabled(!nextMuted);

    if (!nextMuted && fg.paused) {
      fg.play().catch((err) => console.warn('Foreground audio playback failed:', err));
    }
  };

  // Clicking scroll down indicator or VIEW PROJECTS button
  const handleScrollDown = () => {
    const projectsSection = document.getElementById('projects-section');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.scrollTo({
        top: window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    // 1. Double check videos are synced on load
    const bg = bgVideoRef.current;
    const fg = fgVideoRef.current;

    if (bg && fg) {
      bg.muted = true; // bg video MUST always be muted
      fg.muted = true; // foreground video must also be muted for autoplay

      bg.play().catch((err) => console.warn('Background video autoplay blocked:', err));
      fg.play().catch((err) => console.warn('Foreground video autoplay blocked:', err));
    }

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const entranceTl = gsap.timeline({ defaults: { ease: 'power4.out' } });
      entranceTl.fromTo(
        `.${styles.bgVideo}`,
        { opacity: 0 },
        { opacity: 0.55, duration: 2.0 }
      );
      entranceTl.fromTo(
        `.${styles.videoForegroundWrapper}`,
        { opacity: 0, scale: 1.15 },
        { opacity: 1, scale: 1, duration: 1.8 },
        '-=1.5'
      );
      entranceTl.fromTo(
        `.${styles.titleLine}:first-child`,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2 },
        '-=1.0'
      );
      entranceTl.fromTo(
        `.${styles.titleLine}:last-child`,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2 },
        '-=1.0'
      );
      entranceTl.fromTo(
        `.${styles.designation}`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0 },
        '-=1.0'
      );
      entranceTl.fromTo(
        `.${styles.heroBadge}`,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.05 },
        '-=0.8'
      );
      entranceTl.fromTo(
        `.${styles.heroButtons}`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0 },
        '-=0.6'
      );
      entranceTl.fromTo(
        `.${styles.controlsWrapper}`,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.0 },
        '-=0.7'
      );
      entranceTl.fromTo(
        `.${styles.scrollIndicator}`,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.2 },
        '-=0.8'
      );

      const heroScrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.65,
          markers: false,
        }
      });

      heroScrollTl.to(
        `.${styles.contentOverlay}`,
        { y: -180, opacity: 0, ease: 'none' },
        0
      );
      heroScrollTl.to(
        `.${styles.videoForegroundWrapper}`,
        { scale: 1.08, ease: 'none' },
        0
      );
      heroScrollTl.to(
        `.${styles.bgVideo}`,
        { opacity: 0.24, ease: 'none' },
        0
      );
    }, containerRef);

    return () => {
      // Clear any pending auto-scroll timer and remove interaction listeners
      if (autoScrollTimerRef.current) {
        clearTimeout(autoScrollTimerRef.current);
        autoScrollTimerRef.current = null;
      }
      if (removeCancelListenersRef.current) {
        removeCancelListenersRef.current();
        removeCancelListenersRef.current = null;
      }
      ctx.revert();
    };
  }, []);

  // Make sure to sync status dynamically if video has paused itself due to browser sleep
  const handleFgPlay = () => setIsPlaying(true);
  const handleFgPause = () => setIsPlaying(false);

  // Handle foreground video end: wait 1s then auto-scroll to WHO I AM (cancelable by user)
  const handleVideoEnd = () => {
    autoScrollCancelled.current = false;

    const onUserInteract = () => {
      autoScrollCancelled.current = true;
      if (autoScrollTimerRef.current) {
        clearTimeout(autoScrollTimerRef.current);
        autoScrollTimerRef.current = null;
      }
      if (removeCancelListenersRef.current) {
        removeCancelListenersRef.current();
        removeCancelListenersRef.current = null;
      }
    };

    window.addEventListener('wheel', onUserInteract, { passive: true });
    window.addEventListener('touchstart', onUserInteract, { passive: true });
    window.addEventListener('pointerdown', onUserInteract, { passive: true });
    window.addEventListener('keydown', onUserInteract, { passive: true });

    removeCancelListenersRef.current = () => {
      window.removeEventListener('wheel', onUserInteract);
      window.removeEventListener('touchstart', onUserInteract);
      window.removeEventListener('pointerdown', onUserInteract);
      window.removeEventListener('keydown', onUserInteract);
    };

    autoScrollTimerRef.current = setTimeout(() => {
      autoScrollTimerRef.current = null;
      if (autoScrollCancelled.current) {
        if (removeCancelListenersRef.current) {
          removeCancelListenersRef.current();
          removeCancelListenersRef.current = null;
        }
        return;
      }

      const target = document.getElementById('who-am-i');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }

      if (removeCancelListenersRef.current) {
        removeCancelListenersRef.current();
        removeCancelListenersRef.current = null;
      }
    }, 1000);
  };

  return (
    <div ref={containerRef} className={styles.heroContainer}>
      {/* 1. Blurred duplicate background video */}
      <div className={styles.videoBackgroundWrapper}>
        <video
          ref={bgVideoRef}
          className={styles.bgVideo}
          src="/videos/intro.mp4"
          loop
          muted
          playsInline
          autoPlay
          preload="metadata"
        />
      </div>

      {/* 2. Cinematic overlay gradient */}
      <div className={styles.cinematicOverlay} />

      {/* 3. Widescreen Foreground floating video */}
      <div className={styles.videoForegroundWrapper}>
        <video
          ref={fgVideoRef}
          className={styles.fgVideo}
          src="/videos/intro.mp4"
          muted
          playsInline
          autoPlay
          preload="auto"
          onPlay={handleFgPlay}
          onPause={handleFgPause}
          onEnded={handleVideoEnd}
        />
      </div>

      {/* 4. Portfolio Content Overlays */}
      <div className={styles.contentOverlay}>

        <div className={styles.mainSection}>
            <div className={styles.openWorkBadge}>OPEN TO WORK</div>
          <div className={styles.titleContainer}>
            <h1 className={styles.titleLine}>P. AKSHAY</h1>
          </div>
          <div className={styles.titleContainer}>
            <h1 className={`${styles.titleLine} ${styles.accentText}`}>REDDY</h1>
          </div>
          <div className={styles.designation}>
            SOFTWARE ENGINEER • FULL STACK DEVELOPER
          </div>

          <div className={styles.heroBadges}>
            <span className={styles.heroBadge}>React</span>
            <span className={styles.heroBadge}>Node.js</span>
            <span className={styles.heroBadge}>Express.js</span>
            <span className={styles.heroBadge}>MongoDB</span>
            <span className={styles.heroBadge}>JavaScript</span>
            <span className={styles.heroBadge}>Git</span>
            <span className={styles.heroBadge}>GitHub</span>
            <span className={styles.heroBadge}>AI/ML</span>
          </div>

          <div className={styles.heroButtons}>
            <button className={styles.primaryBtn} onClick={handleScrollDown}>
              VIEW PROJECTS
            </button>
            <a 
              href="https://github.com/reddy615" 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.secondaryBtn}
            >
              GITHUB →
            </a>
          </div>
        </div>
      </div>

      {/* 5. Glassmorphism Controls Panel */}
      <div className={styles.controlsWrapper}>
        {/* Play/Pause Button */}
        <button 
          className={styles.glassBtn} 
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? (
            // Pause Icon
            <svg viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            // Play Icon
            <svg viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        <button
          className={styles.glassBtn}
          onClick={handleToggleAudio}
          aria-label={audioEnabled ? 'Mute audio' : 'Enable audio'}
        >
          {audioEnabled ? (
            <svg viewBox="0 0 24 24">
              <path d="M5 9v6h4l5 5V4L9 9H5z" />
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03" stroke="currentColor" strokeWidth="2" fill="none" />
              <path d="M18.5 5.5c2.92 2.92 2.92 7.66 0 10.58" stroke="currentColor" strokeWidth="2" fill="none" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24">
              <path d="M5 9v6h4l5 5V4L9 9H5z" />
              <line x1="16" y1="8" x2="20" y2="12" stroke="currentColor" strokeWidth="2" />
              <line x1="20" y1="8" x2="16" y2="16" stroke="currentColor" strokeWidth="2" />
            </svg>
          )}
        </button>
      </div>

      {/* 6. Centered Pulsing Scroll Down Indicator */}
      <button type="button" className={styles.scrollIndicator} onClick={handleScrollDown}>
        <span>SCROLL DOWN</span>
        <div className={styles.scrollLineContainer}>
          <div className={styles.scrollLinePulse} />
        </div>
      </button>
    </div>
  );
};

export default VideoIntro;
