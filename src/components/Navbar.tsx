import { useEffect, useRef, useState } from "react";

const navItems = [
  { label: "About", href: "#about", id: "about" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Skills", href: "#skills", id: "skills" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Contact", href: "#contact", id: "contact" },
];

function Navbar() {
  const [activeSection, setActiveSection] = useState("");
  const [hoveredSection, setHoveredSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  // safer intro states
  const [showIntro, setShowIntro] = useState(true);
  const [introExit, setIntroExit] = useState(false);

  const navLinksRef = useRef<HTMLDivElement | null>(null);
  const linkRefs = useRef<Record<string, HTMLAnchorElement | null>>({});

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);

    const updateNavbarState = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 24);

      if (
        window.innerHeight + scrollY >=
        document.documentElement.scrollHeight - 8
      ) {
        setActiveSection("contact");
        return;
      }

      if (scrollY < 120) {
        setActiveSection("");
        return;
      }

      const viewportTarget = window.innerHeight * 0.38;

      let closestId = "";
      let closestDistance = Number.POSITIVE_INFINITY;

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distance = Math.abs(sectionCenter - viewportTarget);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestId = id;
        }
      });

      setActiveSection(closestId);
    };

    updateNavbarState();

    window.addEventListener("scroll", updateNavbarState, { passive: true });
    window.addEventListener("resize", updateNavbarState);

    return () => {
      window.removeEventListener("scroll", updateNavbarState);
      window.removeEventListener("resize", updateNavbarState);
    };
  }, []);

  useEffect(() => {
    const navLinks = navLinksRef.current;
    if (!navLinks) return;

    const targetKey = hoveredSection || activeSection;
    const underline = navLinks.querySelector(
      ".nav-underline"
    ) as HTMLSpanElement | null;

    if (!underline) return;

    if (!targetKey) {
      underline.style.opacity = "0";
      underline.style.width = "0px";
      underline.style.transform = "translateX(0px)";
      return;
    }

    const targetLink = linkRefs.current[targetKey];
    if (!targetLink) return;

    const containerRect = navLinks.getBoundingClientRect();
    const targetRect = targetLink.getBoundingClientRect();

    const left = targetRect.left - containerRect.left;
    const width = targetRect.width;

    underline.style.opacity = "1";
    underline.style.width = `${width}px`;
    underline.style.transform = `translateX(${left}px)`;
  }, [activeSection, hoveredSection, isScrolled]);

  useEffect(() => {
    const handleResize = () => {
      const navLinks = navLinksRef.current;
      if (!navLinks) return;

      const targetKey = hoveredSection || activeSection;
      const underline = navLinks.querySelector(
        ".nav-underline"
      ) as HTMLSpanElement | null;

      if (!underline || !targetKey) return;

      const targetLink = linkRefs.current[targetKey];
      if (!targetLink) return;

      const containerRect = navLinks.getBoundingClientRect();
      const targetRect = targetLink.getBoundingClientRect();

      const left = targetRect.left - containerRect.left;
      const width = targetRect.width;

      underline.style.width = `${width}px`;
      underline.style.transform = `translateX(${left}px)`;
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [activeSection, hoveredSection]);

  // intro timing (stable)
  useEffect(() => {
    const exitTimer = window.setTimeout(() => {
      setIntroExit(true);
    }, 2600);

    const removeTimer = window.setTimeout(() => {
      setShowIntro(false);
    }, 3600);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {showIntro && (
        <div
          className={`brand-intro-overlay ${introExit ? "is-exit" : ""}`}
          aria-hidden="true"
        >
          <div className="brand-intro-mark">
            <span className="brand-brace">{`{`}</span>
            <span className="brand-core">SS</span>
            <span className="brand-brace">{`}`}</span>
          </div>
        </div>
      )}

      <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
        <nav className="navbar" data-reveal="zoom">
          <a
            href="#hero"
            className={`brand ${showIntro ? "brand-hidden-until-intro" : "brand-ready"}`}
            aria-label="Go to top"
          >
            <span className="brand-mark" aria-hidden="true">
              <span className="brand-brace">{`{`}</span>
              <span className="brand-core">SS</span>
              <span className="brand-brace">{`}`}</span>
            </span>
          </a>

          <div
            className="nav-links"
            ref={navLinksRef}
            onMouseLeave={() => setHoveredSection("")}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  ref={(el) => {
                    linkRefs.current[item.id] = el;
                  }}
                  className={isActive ? "is-active" : ""}
                  onMouseEnter={() => setHoveredSection(item.id)}
                >
                  <span>{item.label}</span>
                </a>
              );
            })}

            <span className="nav-underline" aria-hidden="true" />
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;