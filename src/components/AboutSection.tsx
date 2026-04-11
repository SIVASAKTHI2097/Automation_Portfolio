import { useRef, useState } from "react";
import profileImg from "../assets/aboutSection.png";

function AboutSection() {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [tiltStyle, setTiltStyle] = useState({
    transform:
      "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)",
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card || window.innerWidth <= 900) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateY = ((x - centerX) / centerX) * 7.5;
    const rotateX = ((centerY - y) / centerY) * 7.5;

    setTiltStyle({
      transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`,
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform:
        "perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px) scale(1)",
    });
  };

  return (
    <section className="section section-focus about-section" id="about">
      <div className="section-focus-inner">
        <div className="projects-showcase-top-pill" data-reveal="up">
          <span>About Me</span>
        </div>

        <div className="about-ref-layout">
          <div
            className="about-left-panel"
            data-reveal="left"
            data-reveal-delay="1"
          >
            <div className="about-panel-frame">
              <div className="about-panel-line" />

              <div className="about-panel-content">
                <p>
                  I&apos;m a Senior QA Automation Engineer with nearly 7 years of
                  experience in manual and automation testing across web, API,
                  mobile, and desktop applications. I specialize in building
                  scalable automation frameworks, improving test efficiency, and
                  supporting reliable software delivery through strong quality
                  engineering practices.
                </p>

                <p>
                  Throughout my career, I&apos;ve built automation frameworks from
                  scratch, improved CI/CD execution, and developed internal tools
                  that simplified test execution and release workflows. I&apos;ve
                  worked closely with cross-functional teams in Agile environments
                  to strengthen product quality, reduce regression effort, and
                  ensure stable releases.
                </p>

                <p>
                  I&apos;m passionate about creating practical, maintainable
                  automation solutions that not only improve software quality but
                  also help teams work smarter and deliver with confidence.
                </p>
              </div>

              <div className="about-stats">
                <div className="about-stat">
                  <h4>7+</h4>
                  <span>Years Experience</span>
                </div>

                <div className="about-stat">
                  <h4>6+</h4>
                  <span>Projects Worked</span>
                </div>

                <div className="about-stat">
                  <h4>QA + SDET</h4>
                  <span>Automation Mindset</span>
                </div>
              </div>
            </div>
          </div>

          <div
            className="about-photo-wrap"
            data-reveal="right"
            data-reveal-delay="2"
          >
            <div
              ref={cardRef}
              className="about-photo-card about-photo-card-tilt"
              style={tiltStyle}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="about-photo-orb about-photo-orb-1" />
              <div className="about-photo-orb about-photo-orb-2" />
              <div className="about-photo-shine" />

              <div className="about-photo-frame">
                <img
                  src={profileImg}
                  alt="Sakthi Siva"
                  className="about-photo-img"
                />
              </div>

              <div className="about-photo-footer">
                <span>BUILT FOR QUALITY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutSection;
