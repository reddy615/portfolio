'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './VideoIntro.module.css';

const VideoIntro = () => {
  const containerRef = useRef(null);
  const bgVideoRef = useRef(null);
  const fgVideoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [showSoundBadge, setShowSoundBadge] = useState(true);
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

  // Sync mute/unmute click
  const toggleMute = () => {
    const fg = fgVideoRef.current;
    if (fg) {
      fg.muted = !isMuted;
      setIsMuted(!isMuted);
    }
    // Clicking sound badge or manually unmuting hides the sound hint badge
    setShowSoundBadge(false);
  };

  // Sound badge click unmutes and makes sure it's playing
  const handleSoundBadgeClick = () => {
    const fg = fgVideoRef.current;
    const bg = bgVideoRef.current;
    
    if (fg) {
      fg.muted = false;
      setIsMuted(false);
    }
    
    if (!isPlaying) {
      setIsPlaying(true);
      syncPlayback(true);
    }
    
    setShowSoundBadge(false);
  };

  // Clicking scroll down indicator
  const handleScrollDown = () => {
    const aboutSection = document.getElementById('about-section');
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

    if (bg && fg) {
      bg.muted = true; // bg video MUST always be muted
      fg.muted = isMuted;

      // Autoplay attempt
      const startAutoplay = () => {
        bg.play().catch(() => {});
        fg.play().catch(() => {});
      };
      
      if (document.readyState === 'complete') {
        startAutoplay();
      } else {
        window.addEventListener('load', startAutoplay);
      }
    }

    // 2. Auto-hide sound badge after 6 seconds
    const badgeTimer = setTimeout(() => {
      setShowSoundBadge(false);
    }, 6000);

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

      // After the hero intro timeline completes, auto-scroll to About section
      tl.eventCallback('onComplete', () => {
        console.log('Hero animation completed');

        // Reset cancel flag
        autoScrollCancelled.current = false;

        // Handler that cancels the pending auto-scroll on user interaction
        const onUserInteract = (e) => {
          console.log('User interaction detected, cancelling auto-scroll', e.type);
          autoScrollCancelled.current = true;
          if (autoScrollTimerRef.current) {
            clearTimeout(autoScrollTimerRef.current);
            autoScrollTimerRef.current = null;
          }
          // remove listeners once user interacted
          if (removeCancelListenersRef.current) {
            removeCancelListenersRef.current();
            removeCancelListenersRef.current = null;
          }
        };

        // Attach passive listeners so we do not block native scrolling
        window.addEventListener('wheel', onUserInteract, { passive: true });
        window.addEventListener('touchstart', onUserInteract, { passive: true });
        window.addEventListener('pointerdown', onUserInteract, { passive: true });
        window.addEventListener('keydown', onUserInteract, { passive: true });

        // Store remover for cleanup
        removeCancelListenersRef.current = () => {
          window.removeEventListener('wheel', onUserInteract);
          window.removeEventListener('touchstart', onUserInteract);
          window.removeEventListener('pointerdown', onUserInteract);
          window.removeEventListener('keydown', onUserInteract);
        };

        // Wait 1s then perform smooth native scroll if not cancelled
        console.log('Starting 1s timer for auto-scroll to WHO I AM');
        autoScrollTimerRef.current = setTimeout(() => {
          autoScrollTimerRef.current = null;
          if (autoScrollCancelled.current) {
            console.log('Auto-scroll cancelled before trigger');
            if (removeCancelListenersRef.current) {
              removeCancelListenersRef.current();
              removeCancelListenersRef.current = null;
            }
            return;
          }

          const aboutSection = document.getElementById('who-am-i');
          if (aboutSection) {
            console.log('Auto scroll triggered — target found: who-am-i');
            aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else {
            console.log('Auto scroll target not found: who-am-i');
          }

          // cleanup listeners after initiating scroll
          if (removeCancelListenersRef.current) {
            removeCancelListenersRef.current();
            removeCancelListenersRef.current = null;
          }
        }, 1000);
      });
    }, containerRef);

    return () => {
      clearTimeout(badgeTimer);
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
          loop
          playsInline
          autoPlay
          onPlay={handleFgPlay}
          onPause={handleFgPause}
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
        {showSoundBadge && (
          <button className={styles.soundBadge} onClick={handleSoundBadgeClick}>
            <span className={styles.soundBadgeDot} />
            TAP FOR SOUND
          </button>
        )}

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

        {/* Mute/Unmute Button */}
        <button 
          className={styles.glassBtn} 
          onClick={toggleMute} 
          aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
        >
          {isMuted ? (
            // Muted Speaker Icon
            <svg viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.03c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
            </svg>
          ) : (
            // Active Speaker Icon
            <svg viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
            </svg>
          )}
        </button>
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
