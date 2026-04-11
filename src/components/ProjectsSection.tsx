import { useEffect, useRef } from "react";
import { portfolioConfig } from "../data/portfolioConfig";

const projects = [
  {
    title: "Playwright UI Automation Framework",
    description:
      "A scalable end-to-end UI automation framework built with Playwright, TypeScript, and Node.js using reusable page objects, fixtures, environment-driven configuration, tagging strategy, reporting, and CI-ready execution.",
    tech: ["Playwright", "TypeScript", "Node.js", "GitHub Actions"],
    link: { text: "View on GitHub", url: portfolioConfig.social.playwrightrepo },
  },
  {
    title: "Selenium C# Automation Framework",
    description:
      "A maintainable Selenium automation framework built using C# and NUnit with reusable test structure, utility layers, test data support, reporting integration, and strong cross-browser regression coverage.",
    tech: ["Selenium", "C#", "NUnit", "POM"],
    link: { text: "View on GitHub", url: portfolioConfig.social.csharpseleniumrepo },
  },
  {
    title: "API Automation Framework",
    description:
      "A robust API automation framework for request validation, authentication handling, reusable API clients, positive and negative test scenarios, and backend verification designed for scalable QA validation.",
    tech: ["Rest Assured", "Java", "API Testing", "JSON"],
    link: { text: "View on GitHub", url: portfolioConfig.social.javaapirepo },
  },
];

function ProjectsSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateActiveState = () => {
      const rect = section.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.5;
      const isActive = rect.top <= viewportCenter && rect.bottom >= viewportCenter;

      if (isActive) {
        section.classList.add("is-projects-active");
      } else {
        section.classList.remove("is-projects-active");
      }
    };

    let raf = 0;

    const requestUpdate = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(updateActiveState);
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
    <section
      className="section section-focus projects-showcase-section"
      id="projects"
      ref={sectionRef}
    >
      <div className="section-focus-inner">
        <div className="projects-showcase-top-pill" data-reveal="up">
          <span>Projects Showcase</span>
        </div>

        <div className="projects-showcase-header" data-reveal="up" data-reveal-delay="1">
          <p className="projects-showcase-kicker">Portfolio</p>

          <h2 className="projects-showcase-title">
            <span className="projects-title-white">Featured</span>{" "}
            <span className="projects-title-red">Creations</span>
          </h2>

          <p className="projects-showcase-subtitle">
            Public QA automation work focused on scalable frameworks, maintainable
            architecture, and practical engineering patterns.
          </p>
        </div>

        <div className="projects-showcase-grid">
          {projects.map((project, index) => (
            <article
              className="showcase-project-card hover-lift"
              key={project.title}
              data-reveal={index === 1 ? "up" : index === 0 ? "left" : "right"}
              data-reveal-delay={String(index + 1)}
            >
              <div className="showcase-project-ambient-glow" aria-hidden="true" />
              <div className="showcase-project-shine" aria-hidden="true" />

              <div className="showcase-project-image">
                <div className="showcase-project-image-overlay" />

                <div className="showcase-project-image-content">
                  <span className="showcase-project-badge">QA Project</span>
                  <h3>{project.title}</h3>
                </div>
              </div>

              <div className="showcase-project-body">
                <p>{project.description}</p>

                <div className="showcase-project-tech">
                  {project.tech.map((tech) => (
                    <span key={tech}>{tech}</span>
                  ))}
                </div>

                <div className="showcase-project-actions">
                  <a
                    href={project.link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="showcase-project-btn source"
                  >
                    &lt;/&gt; Source Code
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="projects-showcase-footer" data-reveal="up" data-reveal-delay="4">
          <a
            href={portfolioConfig.social.allgithubrepo}
            target="_blank"
            rel="noreferrer"
            className="projects-archive-btn"
          >
            Explore Full Archive ↗
          </a>
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
