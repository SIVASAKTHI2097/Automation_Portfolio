import { useEffect, useRef } from "react";

import "./index.css";
import "./styles/navbar.css";
import "./styles/hero.css";
import "./styles/about.css";
import "./styles/experience.css";
import "./styles/skills.css";
import "./styles/projects.css";
import "./styles/contact.css";

import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import ExperienceSection from "./components/ExperienceSection";
import SkillsSection from "./components/SkillsSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";

function App() {
  const isSnappingRef = useRef(false);
  const snapCooldownRef = useRef<number | null>(null);

  useEffect(() => {
    const revealElements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    if (revealElements.length) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const target = entry.target as HTMLElement;

            if (entry.isIntersecting) {
              target.classList.add("is-visible");
            } else {
              target.classList.remove("is-visible");
            }
          });
        },
        {
          threshold: 0.18,
          rootMargin: "0px 0px -6% 0px",
        }
      );

      revealElements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }
  }, []);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("main > section")
    );

    if (!sections.length) return;

    const getCurrentSectionIndex = () => {
      const viewportCenter = window.innerHeight / 2;

      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      return closestIndex;
    };

    const scrollToSection = (index: number) => {
      if (index < 0 || index >= sections.length) return;

      isSnappingRef.current = true;

      sections[index].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      if (snapCooldownRef.current) {
        window.clearTimeout(snapCooldownRef.current);
      }

      snapCooldownRef.current = window.setTimeout(() => {
        isSnappingRef.current = false;
      }, 850);
    };

    const handleWheel = (e: WheelEvent) => {
      if (isSnappingRef.current) {
        e.preventDefault();
        return;
      }

      const deltaY = e.deltaY;

      if (Math.abs(deltaY) < 8) return;

      const currentIndex = getCurrentSectionIndex();
      const currentSection = sections[currentIndex];

      if (!currentSection) return;

      const rect = currentSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const isTallSection = rect.height > viewportHeight * 0.95;

      if (isTallSection) {
        const canScrollDownInside =
          rect.bottom > viewportHeight + 8;

        const canScrollUpInside =
          rect.top < -8;

        if (deltaY > 0 && canScrollDownInside) {
          return;
        }

        if (deltaY < 0 && canScrollUpInside) {
          return;
        }
      }

      if (deltaY > 0) {
        if (currentIndex < sections.length - 1) {
          e.preventDefault();
          scrollToSection(currentIndex + 1);
        }
      } else {
        if (currentIndex > 0) {
          e.preventDefault();
          scrollToSection(currentIndex - 1);
        }
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isSnappingRef.current) return;

      const key = e.key;
      const isDown =
        key === "ArrowDown" || key === "PageDown" || key === " ";
      const isUp =
        key === "ArrowUp" || key === "PageUp";

      if (!isDown && !isUp) return;

      const currentIndex = getCurrentSectionIndex();
      const currentSection = sections[currentIndex];

      if (!currentSection) return;

      const rect = currentSection.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const isTallSection = rect.height > viewportHeight * 0.95;

      if (isTallSection) {
        const canScrollDownInside =
          rect.bottom > viewportHeight + 8;

        const canScrollUpInside =
          rect.top < -8;

        if (isDown && canScrollDownInside) return;
        if (isUp && canScrollUpInside) return;
      }

      if (isDown && currentIndex < sections.length - 1) {
        e.preventDefault();
        scrollToSection(currentIndex + 1);
      }

      if (isUp && currentIndex > 0) {
        e.preventDefault();
        scrollToSection(currentIndex - 1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);

      if (snapCooldownRef.current) {
        window.clearTimeout(snapCooldownRef.current);
      }
    };
  }, []);

  return (
    <div className="portfolio">
      <div className="bg-orb bg-orb-cyan" aria-hidden="true" />
      <div className="bg-orb bg-orb-blue" aria-hidden="true" />

      <Navbar />

      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>
    </div>
  );
}

export default App;
