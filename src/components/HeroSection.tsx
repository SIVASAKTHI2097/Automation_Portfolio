import { useEffect, useMemo, useState } from "react";
import { portfolioConfig } from "../data/portfolioConfig";
import profileImg from "../assets/heroSection.png";


const roles = [
  "SDET",
  "Quality Engineer",
  "QA Specialist",
  "Automation Architect",
];

function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentRole = useMemo(() => roles[roleIndex], [roleIndex]);

  useEffect(() => {
    const typingSpeed = isDeleting ? 55 : 95;
    const pauseAfterTyping = 1200;
    const pauseAfterDeleting = 300;

    let timeout: number;

    if (!isDeleting && displayText === currentRole) {
      timeout = window.setTimeout(() => {
        setIsDeleting(true);
      }, pauseAfterTyping);
    } else if (isDeleting && displayText === "") {
      timeout = window.setTimeout(() => {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }, pauseAfterDeleting);
    } else {
      timeout = window.setTimeout(() => {
        const nextText = isDeleting
          ? currentRole.slice(0, displayText.length - 1)
          : currentRole.slice(0, displayText.length + 1);

        setDisplayText(nextText);
      }, typingSpeed);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section className="hero hero-snap" id="hero">
      <div className="hero-left">
        <div className="hero-intro">
          <p className="hero-name-line hero-anim hero-anim-1">I&apos;m Sivasakthi</p>

          <p className="hero-small-line hero-anim hero-anim-2">I&apos;m a professional</p>

          <div className="hero-main-role hero-anim hero-anim-3">
            <h1 className="hero-main-role-text">QA Automation Engineer</h1>
          </div>

          <div className="hero-role-block hero-anim hero-anim-4">
            <p className="hero-role-label">Specializing as</p>
            <p className="hero-role-line">
              <span className="typing-text">{displayText}</span>
              <span className="typing-cursor">|</span>
            </p>
          </div>

          <p className="hero-description hero-anim hero-anim-5 hero-location-line">
            Based in Bangalore, India
          </p>

          <p className="hero-description hero-anim hero-anim-6">
            I build reliable, scalable automation solutions that improve software quality and reduce release risk.
            My focus is on creating efficient testing workflows, strengthening release confidence,
            and helping teams deliver better software with consistency.
          </p>

          <div className="social-links hero-anim hero-anim-7">
            <a
              href={portfolioConfig.social.github}
              target="_blank"
              rel="noreferrer"
              className="social-icon"
              aria-label="GitHub"
              title="GitHub"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.65.5.5 5.66.5 12.03c0 5.1 3.3 9.42 7.88 10.95.58.11.79-.25.79-.56 0-.28-.01-1.2-.02-2.18-3.2.7-3.88-1.37-3.88-1.37-.52-1.34-1.28-1.7-1.28-1.7-1.05-.72.08-.71.08-.71 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.56-.29-5.26-1.29-5.26-5.73 0-1.27.45-2.31 1.19-3.13-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.19 1.2a11.03 11.03 0 0 1 5.8 0c2.21-1.51 3.18-1.2 3.18-1.2.63 1.59.23 2.76.11 3.05.74.82 1.19 1.86 1.19 3.13 0 4.45-2.7 5.43-5.28 5.72.42.36.78 1.06.78 2.14 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.54 11.54 0 0 0 23.5 12.03C23.5 5.66 18.35.5 12 .5Z" />
              </svg>
            </a>

            <a
              href={portfolioConfig.social.linkedin}
              target="_blank"
              rel="noreferrer"
              className="social-icon"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5A2.48 2.48 0 1 0 5 8.46a2.48 2.48 0 0 0-.02-4.96ZM3 9h4v12H3V9Zm7 0h3.83v1.64h.05c.53-1 1.84-2.06 3.79-2.06 4.05 0 4.8 2.66 4.8 6.11V21h-4v-5.58c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.95V21h-4V9Z" />
              </svg>
            </a>

            <a
              href={portfolioConfig.social.leetcode}
              target="_blank"
              rel="noreferrer"
              className="social-icon"
              aria-label="LeetCode"
              title="LeetCode"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M15.8 4.2 9.3 10.7a1.8 1.8 0 0 0 0 2.6l6.5 6.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M18.8 12H10.9"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <path
                  d="M12.4 2.9 18 2.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </a>

            <a
              href={portfolioConfig.social.twitter}
              target="_blank"
              rel="noreferrer"
              className="social-icon"
              aria-label="X"
              title="X"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.9 2H22l-6.77 7.74L23 22h-6.1l-4.78-6.25L6.65 22H3.53l7.24-8.27L1 2h6.25l4.32 5.7L18.9 2Zm-1.07 18h1.69L6.33 3.9H4.52L17.83 20Z" />
              </svg>
            </a>
          </div>

          <div className="hero-actions hero-anim hero-anim-8">
            <a className="btn btn-primary liquid-btn connect-btn" href="#contact">
              <span className="btn-liquid" />
              <span className="btn-text">LET&apos;S CONNECT</span>
              <span className="btn-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                  <path d="M8.5 12.5 11 15c1.2 1.2 3.1 1.2 4.2 0l4.3-4.3a2.5 2.5 0 0 0-3.5-3.5l-1.7 1.7" />
                  <path d="m15.5 11.5-2.3-2.3a3 3 0 0 0-4.2 0L4.7 13.5a2.5 2.5 0 1 0 3.5 3.5l1.8-1.8" />
                </svg>
              </span>
            </a>

            <a
              className="btn btn-secondary liquid-btn resume-btn"
              href={portfolioConfig.resume.file}
              target="_blank"
              rel="noreferrer"
            >
              <span className="btn-liquid" />
              <span className="btn-text">GET RESUME</span>
              <span className="btn-icon download-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                  <path d="M12 4v10" />
                  <path d="m8 11 4 4 4-4" />
                  <path d="M5 20h14" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="hero-right">
        <div className="hero-image-wrap hero-image-entry">
          <div className="hero-image-glow" />
          <div className="hero-image-glow hero-image-glow-secondary" />
          <div className="hero-image-orbit hero-image-orbit-1" />
          <div className="hero-image-orbit hero-image-orbit-2" />

          <div className="hero-image-particles">
            <span className="hero-image-particle hero-image-particle-1" />
            <span className="hero-image-particle hero-image-particle-2" />
            <span className="hero-image-particle hero-image-particle-3" />
            <span className="hero-image-particle hero-image-particle-4" />
            <span className="hero-image-particle hero-image-particle-5" />
            <span className="hero-image-particle hero-image-particle-6" />
          </div>

          <div className="hero-image-ring">
            <div className="hero-image-shine" />
            <div className="hero-image-inner">
              <img
                src={profileImg}
                alt="Profile"
                className="hero-profile-image"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
