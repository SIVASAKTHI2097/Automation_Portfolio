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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

      const navbarOffset = window.innerWidth <= 900 ? 88 : 104;
      const viewportProbe = navbarOffset + 80;

      let currentSection = "";
      let lastPassedSection = "";

      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;

        const rect = el.getBoundingClientRect();

        if (rect.top <= viewportProbe) {
          lastPassedSection = id;
        }

        if (rect.top <= viewportProbe && rect.bottom > viewportProbe) {
          currentSection = id;
        }
      });

      setActiveSection(currentSection || lastPassedSection || "");
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
    if (!navLinks || window.innerWidth <= 900) return;

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
      if (window.innerWidth > 900) {
        setIsMobileMenuOpen(false);
      }

      const navLinks = navLinksRef.current;
      if (!navLinks || window.innerWidth <= 900) return;

      const targetKey = hoveredSection || activeSection;
      const underline = navLinks.querySelector(
        ".nav-underline"
      ) as HTMLSpanElement | null;

      if (!underline || !targetKey) return;

      const targetLink = linkRefs.current[targetKey];
      if (!targetLink) return;

      const containerRect = navLinks.getBoundingClientRect();
      const targetRect = targetLink.getBoundingClientRect();

      underline.style.width = `${targetRect.width}px`;
      underline.style.transform = `translateX(${targetRect.left - containerRect.left}px)`;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [activeSection, hoveredSection]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string
  ) => {
    e.preventDefault();

    const target = document.getElementById(targetId);
    if (!target) return;

    const navbarOffset = window.innerWidth <= 900 ? 82 : 104;
    const targetTop =
      target.getBoundingClientRect().top + window.scrollY - navbarOffset;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: "smooth",
    });

    setActiveSection(targetId);
    setIsMobileMenuOpen(false);
  };

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setActiveSection("");
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`site-header ${isScrolled ? "is-scrolled" : ""}`}>
      <nav className="navbar" aria-label="Primary">
        <a
          href="#hero"
          className="brand"
          aria-label="Go to top"
          onClick={handleBrandClick}
        >
          <span className="brand-mark">SS</span>
        </a>

        {/* Desktop Nav */}
        <div className="nav-links desktop-nav" ref={navLinksRef}>
          {navItems.map((item) => (
            <a
              key={item.id}
              href={item.href}
              ref={(el) => {
                linkRefs.current[item.id] = el;
              }}
              className={`nav-link ${
                activeSection === item.id ? "is-active" : ""
              }`}
              onMouseEnter={() => setHoveredSection(item.id)}
              onMouseLeave={() => setHoveredSection("")}
              onClick={(e) => handleNavClick(e, item.id)}
            >
              {item.label}
            </a>
          ))}

          <span className="nav-underline" aria-hidden="true" />
        </div>

        {/* Mobile Hamburger */}
{/* Mobile Hamburger / Close */}
<button
  className={`mobile-menu-toggle ${isMobileMenuOpen ? "is-open" : ""}`}
  type="button"
  aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
  aria-expanded={isMobileMenuOpen}
  onClick={() => setIsMobileMenuOpen((prev) => !prev)}
>
  <span />
  <span />
  <span />
</button>
      </nav>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-nav-overlay ${isMobileMenuOpen ? "is-open" : ""}`}>
        <div className="mobile-nav-backdrop" onClick={() => setIsMobileMenuOpen(false)} />

        <div className="mobile-nav-panel">
          <div className="mobile-nav-header" />

          <div className="mobile-nav-links">
            {navItems.map((item, index) => (
              <a
                key={item.id}
                href={item.href}
                className={`mobile-nav-link ${
                  activeSection === item.id ? "is-active" : ""
                }`}
                style={{ transitionDelay: `${index * 0.05}s` }}
                onClick={(e) => handleNavClick(e, item.id)}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
