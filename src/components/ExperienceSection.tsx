import { useEffect, useRef } from "react";

const experience = [
  {
    periodLabel: "Dr Martens",
    start: "2025",
    end: "Present",
    title: "Senior QA Automation Specialist",
    company: "Web and API",
    bullets: [
      "Performed end-to-end functional testing for Microsoft Dynamics 365 Finance and Dayforce HCM across business-critical workflows",
      "Validated UI behavior, data integrity, and process accuracy to ensure reliable execution across enterprise operations",
      "Managed test cases and defect tracking using Jira and Zephyr Scale to support structured QA delivery",
      "Contributed to stable releases by aligning testing with real business workflows, user scenarios, and cross-functional validation needs",
    ],
  },
  {
    periodLabel: "Beckman Coulter",
    start: "2021",
    end: "2025",
    title: "Senior Software Engineer - QA Automation",
    company: "Playwright, API Automation and Desktop Automation",
    bullets: [
      "Built a Playwright automation framework from scratch using TypeScript, designed for scalable, maintainable, and reliable test execution",
      "Developed and maintained Windows desktop automation using C# and Microsoft Windows API clients for complex product workflows",
      "Improved framework performance and optimized Azure DevOps YAML pipelines to support faster, more stable CI execution and nightly runs",
      "Contributed to release validation, bug analysis, feature quality improvements, and onboarding support across the QA lifecycle",
    ],
  },
  {
    periodLabel: "Symphony Summit",
    start: "2019",
    end: "2021",
    title: "Associate Software Engineer -QA",
    company: "Manual + UI + API Automation and Performance Testing",
    bullets: [
      "Built UI automation using Selenium with C# following BDD practices for maintainable and business-aligned test coverage",
      "Developed API automation with Rest Assured (Java) and validated service responses for functional reliability",
      "Created JMeter performance scripts and integrated automation into Jenkins CI/CD pipelines with Docker-based execution",
      "Contributed to mobile automation with Appium, build deployments, QA sign-off, and close collaboration with product and support teams",
    ],
  },
];

function ExperienceSection() {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const progressLineRef = useRef<HTMLDivElement | null>(null);
  const progressDotWrapRef = useRef<HTMLDivElement | null>(null);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const updateTimelineProgress = () => {
      const timeline = timelineRef.current;
      const progress = progressLineRef.current;
      const dotWrap = progressDotWrapRef.current;
      const rows = rowRefs.current.filter(Boolean) as HTMLDivElement[];

      if (!timeline || !progress || !dotWrap || rows.length === 0) return;

      const timelineRect = timeline.getBoundingClientRect();
      const viewportTarget = window.innerHeight * 0.45;
      const isMobile = window.innerWidth <= 980;

      let activeRow = rows[0];
      let smallestDistance = Number.POSITIVE_INFINITY;

      rows.forEach((row) => {
        const rect = row.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const distance = Math.abs(center - viewportTarget);

        if (distance < smallestDistance) {
          smallestDistance = distance;
          activeRow = row;
        }
      });

      const activeRect = activeRow.getBoundingClientRect();
      const dotY = activeRect.top - timelineRect.top + activeRect.height / 2;

      const minY = 18;
      const maxY = Math.max(timelineRect.height - 18, minY);
      const safeDotY = Math.min(Math.max(dotY, minY), maxY);

      if (isMobile) {
        dotWrap.style.transform = `translateY(${safeDotY}px)`;
      } else {
        dotWrap.style.transform = `translate(-50%, ${safeDotY}px)`;
      }

      progress.style.height = `${safeDotY}px`;
    };

    let raf = 0;

    const requestUpdate = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateTimelineProgress);
    };

    requestUpdate();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
    };
  }, []);

  return (
    <section className="section experience-section" id="experience">
      <div className="projects-showcase-top-pill">
        <span>Experience</span>
      </div>

      <div className="timeline-alt" ref={timelineRef}>
        <div className="timeline-alt-line-base" />
        <div className="timeline-progress-line" ref={progressLineRef} />

        <div className="timeline-progress-dot-wrap" ref={progressDotWrapRef}>
          <div className="timeline-progress-dot" />
        </div>

        {experience.map((item, index) => {
          const side = index % 2 === 0 ? "left" : "right";
          const isLeft = side === "left";

          return (
            <div
              className={`timeline-alt-row ${side}`}
              key={`${item.title}-${index}`}
              ref={(el) => {
                rowRefs.current[index] = el;
              }}
            >
              {/* LEFT COLUMN */}
              <div className="timeline-alt-side timeline-alt-left">
                {isLeft && (
                  <article className="timeline-alt-card timeline-card-left assemble-left">
                    <div
                      className="timeline-alt-float-icon timeline-float-overlap"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                        <rect x="3.5" y="5" width="17" height="11" rx="2.2" />
                        <path d="M8 19h8" />
                        <path d="M10 16.5h4" />
                      </svg>
                    </div>

                    <div className="timeline-alt-period-pill">{item.periodLabel}</div>

                    <h3>{item.title}</h3>
                    <p className="timeline-alt-company">{item.company}</p>

                    <ul className="timeline-alt-points">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>
                          <span className="bullet-arrow" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <path d="M5 12h12" />
                              <path d="M13 6l6 6-6 6" />
                            </svg>
                          </span>
                          <span className="bullet-text">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                )}
              </div>

              {/* CENTER COLUMN */}
              <div className="timeline-alt-center">
                <div
                  className={`timeline-alt-date-float desktop-only timeline-date-enter ${
                    isLeft ? "timeline-date-right" : "timeline-date-left"
                  }`}
                >
                  <span className="timeline-alt-date-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="5" width="18" height="16" rx="2" />
                      <path d="M16 3v4" />
                      <path d="M8 3v4" />
                      <path d="M3 10h18" />
                    </svg>
                  </span>
                  <span>
                    {item.start} - {item.end}
                  </span>
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="timeline-alt-side timeline-alt-right">
                {!isLeft && (
                  <article className="timeline-alt-card timeline-card-right assemble-right">
                    <div
                      className="timeline-alt-float-icon timeline-float-overlap"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                        <rect x="3.5" y="5" width="17" height="11" rx="2.2" />
                        <path d="M8 19h8" />
                        <path d="M10 16.5h4" />
                      </svg>
                    </div>

                    <div className="timeline-alt-period-pill">{item.periodLabel}</div>

                    <h3>{item.title}</h3>
                    <p className="timeline-alt-company">{item.company}</p>

                    <ul className="timeline-alt-points">
                      {item.bullets.map((bullet) => (
                        <li key={bullet}>
                          <span className="bullet-arrow" aria-hidden="true">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <path d="M5 12h12" />
                              <path d="M13 6l6 6-6 6" />
                            </svg>
                          </span>
                          <span className="bullet-text">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </article>
                )}
              </div>

              {/* MOBILE DATE */}
              <div className="timeline-mobile-date-wrap">
                <div className="timeline-alt-date-float mobile-only timeline-date-enter">
                  <span className="timeline-alt-date-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="3" y="5" width="18" height="16" rx="2" />
                      <path d="M16 3v4" />
                      <path d="M8 3v4" />
                      <path d="M3 10h18" />
                    </svg>
                  </span>
                  <span>
                    {item.start} - {item.end}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default ExperienceSection;
