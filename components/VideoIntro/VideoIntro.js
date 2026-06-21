'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './VideoIntro.module.css';

const VideoIntro = () => {
  const containerRef = useRef(null);
  const bgVideoRef = useRef(null);
  const fgVideoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const autoScrollTimerRef = useRef(null);
  const autoScrollCancelled = useRef(false);
  const removeCancelListenersRef = useRef(null);

  // Synchronize play state of background and foreground videos
  const syncPlayback = (playing) => {
    const bg = bgVideoRef.current;
    const fg = fgVideoRef.current;
    if (bg && fg) {
      if (playing) {
        // Play both
        const p1 = fg.play();
        const p2 = bg.play();
        
        // Handle play promise warnings in browsers
        Promise.all([p1, p2]).catch((err) => {
          console.warn('Playback failed or interrupted:', err);
        });
      } else {
        // Pause both
        fg.pause();
        bg.pause();
      }
    }
  };

  // Sync play/pause click
  const togglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);
    syncPlayback(nextState);
  };

  // Enable audio for the foreground video
  const handleEnableAudio = () => {
    const fg = fgVideoRef.current;
    if (fg) {
      fg.muted = false;
      fg.volume = 1;
      fg.play().catch((err) => console.warn('Foreground audio playback failed:', err));
      setAudioEnabled(true);
      console.log('Audio enabled for foreground video');
    }
  };

  // Clicking scroll down indicator
  const handleScrollDown = () => {
    const aboutSection = document.getElementById('who-am-i');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
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

    console.log('Video mounted');
    console.log('Video source:', '/videos/intro.mp4');

    if (bg && fg) {
      bg.muted = true; // bg video MUST always be muted
      fg.muted = true; // foreground video must also be muted for autoplay

      console.log('Video play attempt');
      bg.play().catch((err) => console.warn('Background video autoplay blocked:', err));
      fg.play().catch((err) => console.warn('Foreground video autoplay blocked:', err));
    }

    // 3. GSAP Entrance Animations
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

      // Animate background blur fade-in
      tl.fromTo(
        `.${styles.bgVideo}`,
        { opacity: 0 },
        { opacity: 0.55, duration: 2.0 }
      );

      // Animate foreground video container card (scale up and fade in)
      tl.fromTo(
        `.${styles.videoForegroundWrapper}`,
        { opacity: 0, scale: 1.15 },
        { opacity: 1, scale: 1, duration: 1.8 },
        '-=1.5'
      );


      tl.fromTo(
        `.${styles.titleLine}:first-child`,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2 },
        '-=1.0'
      );

      tl.fromTo(
        `.${styles.titleLine}:last-child`,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.2 },
        '-=1.0'
      );

      tl.fromTo(
        `.${styles.designation}`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0 },
        '-=1.0'
      );

      tl.fromTo(
        `.${styles.heroBadge}`,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.05 },
        '-=0.8'
      );

      tl.fromTo(
        `.${styles.heroButtons}`,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.0 },
        '-=0.6'
      );

      // Fade in controls panel
      tl.fromTo(
        `.${styles.controlsWrapper}`,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 1.0 },
        '-=0.7'
      );

      // Fade in scroll indicator at bottom
      tl.fromTo(
        `.${styles.scrollIndicator}`,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 1.2 },
        '-=0.8'
      );

      // No auto-scroll on GSAP timeline completion — scrolling is triggered only by video end
    }, containerRef);

    return () => {
      window.removeEventListener('load', startAutoplay);
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
    console.log('Video ended');

    // Reset cancel flag
    autoScrollCancelled.current = false;

    const onUserInteract = (e) => {
      console.log('User interaction detected during post-video delay, cancelling auto-scroll', e.type);
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

    console.log('Starting 1s timer after video end for auto-scroll to WHO I AM');
    autoScrollTimerRef.current = setTimeout(() => {
      autoScrollTimerRef.current = null;
      if (autoScrollCancelled.current) {
        console.log('Auto-scroll cancelled after video end');
        if (removeCancelListenersRef.current) {
          removeCancelListenersRef.current();
          removeCancelListenersRef.current = null;
        }
        return;
      }

      const target = document.getElementById('who-am-i');
      if (target) {
        console.log('Auto scroll triggered after video end — scrolling to who-am-i');
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else {
        console.log('Auto scroll target not found after video end: who-am-i');
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
          onPlay={() => {
            handleFgPlay();
            console.log('Video playing');
          }}
          onPause={handleFgPause}
          onEnded={handleVideoEnd}
          onLoadedData={() => console.log('Video loaded')}
          onError={(e) => console.log('Video error', e)}
        />
      </div>

      {/* 4. Portfolio Content Overlays */}
      <div className={styles.contentOverlay}>

        <div className={styles.mainSection}>
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

        {!audioEnabled && (
          <button
            className={styles.audioBtn}
            onClick={handleEnableAudio}
            aria-label="Enable audio"
          >
            ENABLE AUDIO
          </button>
        )}
      </div>

      {/* 6. Centered Pulsing Scroll Down Indicator */}
      <div className={styles.scrollIndicator} onClick={handleScrollDown}>
        <span>SCROLL DOWN</span>
        <div className={styles.scrollLineContainer}>
          <div className={styles.scrollLinePulse} />
        </div>
      </div>
    </div>
  );
};

export default VideoIntro;
