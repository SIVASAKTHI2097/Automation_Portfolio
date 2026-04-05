import type { CSSProperties } from "react";

type Skill = {
  name: string;
  color: string;
  icon:
    | "playwright"
    | "selenium"
    | "cypress"
    | "restassured"
    | "appium"
    | "apitesting"
    | "bdd"
    | "cucumber"
    | "gherkin"
    | "specflow"
    | "reqnroll"
    | "java"
    | "csharp"
    | "javascript"
    | "typescript"
    | "maven"
    | "testng"
    | "nunit"
    | "postman"
    | "powershell"
    | "jmeter"
    | "graphql"
    | "sql"
    | "jenkins"
    | "docker"
    | "cicd"
    | "git"
    | "yaml"
    | "azure"
    | "agile"
    | "d365"
    | "erp"
    | "jira"
    | "zephyr"
    | "githubactions";
};

const skills: Skill[] = [
  { name: "Playwright", color: "#45ba63", icon: "playwright" },
  { name: "Selenium", color: "#43b02a", icon: "selenium" },
  { name: "Cypress", color: "#00c08b", icon: "cypress" },
  { name: "Rest Assured", color: "#ff6b6b", icon: "restassured" },
  { name: "Appium", color: "#a46cff", icon: "appium" },
  { name: "API Testing", color: "#00bcd4", icon: "apitesting" },
  { name: "BDD", color: "#ffb020", icon: "bdd" },
  { name: "Cucumber", color: "#23b26d", icon: "cucumber" },
  { name: "Gherkin", color: "#84e9ff", icon: "gherkin" },
  { name: "Specflow", color: "#8b5cf6", icon: "specflow" },
  { name: "Reqnroll", color: "#ef6c00", icon: "reqnroll" },
  { name: "Java", color: "#f89820", icon: "java" },
  { name: "C#", color: "#7c4dff", icon: "csharp" },
  { name: "JavaScript", color: "#f7df1e", icon: "javascript" },
  { name: "TypeScript", color: "#3178c6", icon: "typescript" },
  { name: "Maven", color: "#c71a36", icon: "maven" },
  { name: "TestNG", color: "#00c853", icon: "testng" },
  { name: "NUnit", color: "#7cb342", icon: "nunit" },
  { name: "Postman", color: "#ff6c37", icon: "postman" },
  { name: "PowerShell", color: "#5391fe", icon: "powershell" },
  { name: "JMeter", color: "#ff3b3b", icon: "jmeter" },
  { name: "GraphQL", color: "#e535ab", icon: "graphql" },
  { name: "SQL", color: "#00bcd4", icon: "sql" },
  { name: "Jenkins", color: "#d24939", icon: "jenkins" },
  { name: "Docker", color: "#2496ed", icon: "docker" },
  { name: "CI/CD", color: "#84e9ff", icon: "cicd" },
  { name: "Git", color: "#f1502f", icon: "git" },
  { name: "Yaml", color: "#ff7043", icon: "yaml" },
  { name: "Azure", color: "#0078d4", icon: "azure" },
  { name: "Agile", color: "#26c6da", icon: "agile" },
  { name: "Dynamics 365", color: "#6f42c1", icon: "d365" },
  { name: "ERP", color: "#5c6bc0", icon: "erp" },
  { name: "Jira", color: "#2684ff", icon: "jira" },
  { name: "Zephyr", color: "#00acc1", icon: "zephyr" },
  { name: "GitHub Actions", color: "#8b5cf6", icon: "githubactions" },
];

function SkillIcon({ skill }: { skill: Skill }) {
  const badge = (text: string) => (
    <div className="tech-skill-icon tech-skill-icon-text" aria-hidden="true">
      {text}
    </div>
  );

  switch (skill.icon) {
    case "git":
      return (
        <div className="tech-skill-icon tech-skill-icon-logo" aria-hidden="true">
          <svg viewBox="0 0 97.6 97.6" className="tech-logo-svg">
            <path
              d="M92.7 44.4 53.2 4.9a16.7 16.7 0 0 0-23.7 0L21.3 13l10.4 10.4a9.9 9.9 0 0 1 12.5 1.3 10 10 0 0 1 2.2 10.2l10 10a10 10 0 0 1 10.4 2.1 10 10 0 1 1-16.8 9.3l-9.3-9.3v24.6a10 10 0 0 1 2.7 1.9 10 10 0 1 1-14.2 0 10 10 0 0 1 2.5-1.8V46.9a10 10 0 0 1-2.7-16.3L18.7 20.3 4.9 34.1a16.7 16.7 0 0 0 0 23.7l39.5 39.5a16.7 16.7 0 0 0 23.7 0l24.6-24.6a16.7 16.7 0 0 0 0-23.7Z"
              fill="currentColor"
            />
          </svg>
        </div>
      );

    case "jenkins":
      return (
        <div className="tech-skill-icon tech-skill-icon-logo" aria-hidden="true">
          <svg viewBox="0 0 64 64" className="tech-logo-svg">
            <circle cx="32" cy="32" r="18" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <path d="M26 24c0-4 3-7 6-7s6 3 6 7v8c0 4-3 7-6 7s-6-3-6-7v-8Z" fill="currentColor" opacity="0.9" />
            <path d="M22 47c2.5-4 6.5-6 10-6s7.5 2 10 6" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M26 21l-4-5M38 21l4-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
          </svg>
        </div>
      );

    case "docker":
      return (
        <div className="tech-skill-icon tech-skill-icon-logo" aria-hidden="true">
          <svg viewBox="0 0 64 64" className="tech-logo-svg">
            <rect x="10" y="26" width="8" height="8" rx="1.5" fill="currentColor" />
            <rect x="20" y="26" width="8" height="8" rx="1.5" fill="currentColor" />
            <rect x="30" y="26" width="8" height="8" rx="1.5" fill="currentColor" />
            <rect x="20" y="16" width="8" height="8" rx="1.5" fill="currentColor" />
            <rect x="30" y="16" width="8" height="8" rx="1.5" fill="currentColor" />
            <path d="M10 38c3 7 9 10 18 10 10 0 18-4 24-12-2-1-4-2-6-2-1.5-4-5-6-9-6H10v10Z" fill="currentColor" opacity="0.95" />
          </svg>
        </div>
      );

    case "postman":
      return (
        <div className="tech-skill-icon tech-skill-icon-logo" aria-hidden="true">
          <svg viewBox="0 0 64 64" className="tech-logo-svg">
            <circle cx="32" cy="32" r="18" fill="none" stroke="currentColor" strokeWidth="3" />
            <path d="M26 38l14-12" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
            <circle cx="26" cy="38" r="2.5" fill="currentColor" />
          </svg>
        </div>
      );

    case "jira":
      return (
        <div className="tech-skill-icon tech-skill-icon-logo" aria-hidden="true">
          <svg viewBox="0 0 64 64" className="tech-logo-svg">
            <path d="M24 12h16l-8 8-8-8Z" fill="currentColor" opacity="0.9" />
            <path d="M16 24h16l-8 8-8-8Z" fill="currentColor" opacity="0.8" />
            <path d="M32 24h16l-8 8-8-8Z" fill="currentColor" />
            <path d="M24 36h16l-8 8-8-8Z" fill="currentColor" opacity="0.9" />
          </svg>
        </div>
      );

    case "githubactions":
      return (
        <div className="tech-skill-icon tech-skill-icon-logo" aria-hidden="true">
          <svg viewBox="0 0 64 64" className="tech-logo-svg">
            <path d="M20 18h22l-7 8h9L26 46l7-10h-9l-4 6" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      );

    case "azure":
      return (
        <div className="tech-skill-icon tech-skill-icon-logo" aria-hidden="true">
          <svg viewBox="0 0 64 64" className="tech-logo-svg">
            <path d="M28 10h10l12 34H38l-4-12-8 12H14L28 10Z" fill="currentColor" />
          </svg>
        </div>
      );

    case "graphql":
      return (
        <div className="tech-skill-icon tech-skill-icon-logo" aria-hidden="true">
          <svg viewBox="0 0 64 64" className="tech-logo-svg">
            <polygon points="32,10 46,18 46,34 32,42 18,34 18,18" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <circle cx="32" cy="10" r="3" fill="currentColor" />
            <circle cx="46" cy="18" r="3" fill="currentColor" />
            <circle cx="46" cy="34" r="3" fill="currentColor" />
            <circle cx="32" cy="42" r="3" fill="currentColor" />
            <circle cx="18" cy="34" r="3" fill="currentColor" />
            <circle cx="18" cy="18" r="3" fill="currentColor" />
          </svg>
        </div>
      );

    case "sql":
      return (
        <div className="tech-skill-icon tech-skill-icon-logo" aria-hidden="true">
          <svg viewBox="0 0 64 64" className="tech-logo-svg">
            <ellipse cx="32" cy="18" rx="14" ry="6" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <path d="M18 18v20c0 3 6 6 14 6s14-3 14-6V18" fill="none" stroke="currentColor" strokeWidth="2.5" />
            <path d="M18 28c0 3 6 6 14 6s14-3 14-6" fill="none" stroke="currentColor" strokeWidth="2.5" />
          </svg>
        </div>
      );

    case "typescript":
      return badge("TS");
    case "javascript":
      return badge("JS");
    case "java":
      return badge("JV");
    case "csharp":
      return badge("C#");
    case "playwright":
      return badge("PW");
    case "selenium":
      return badge("SE");
    case "cypress":
      return badge("CY");
    case "restassured":
      return badge("RA");
    case "appium":
      return badge("AP");
    case "apitesting":
      return badge("API");
    case "bdd":
      return badge("BDD");
    case "cucumber":
      return badge("CU");
    case "gherkin":
      return badge("GH");
    case "specflow":
      return badge("SF");
    case "reqnroll":
      return badge("RQ");
    case "maven":
      return badge("MV");
    case "testng":
      return badge("TG");
    case "nunit":
      return badge("NU");
    case "powershell":
      return badge("PS");
    case "jmeter":
      return badge("JM");
    case "cicd":
      return badge("CI");
    case "yaml":
      return badge("YM");
    case "agile":
      return badge("AG");
    case "d365":
      return badge("D365");
    case "erp":
      return badge("ERP");
    case "zephyr":
      return badge("ZP");
    default:
      return badge(skill.name.slice(0, 2).toUpperCase());
  }
}

function SkillsSection() {
  const topRowSkills = skills.slice(0, Math.ceil(skills.length / 2));
  const bottomRowSkills = skills.slice(Math.ceil(skills.length / 2));

  return (
    <section className="section skills-marquee-section" id="skills">
      <div className="skills-stack-header">
             <div className="projects-showcase-top-pill">
        <span>Inventry</span>
      </div>
        <h2 className="skills-stack-title">
          <span className="skills-stack-title-white">The</span>{" "}
          <span className="skills-stack-title-red">Tech Stack</span>
        </h2>
      </div>

      <div className="skills-marquee-shell">
        <div className="skills-marquee-row row-left">
          <div className="skills-marquee-track">
            {[...topRowSkills, ...topRowSkills].map((skill, index) => (
              <article
                key={`top-${skill.name}-${index}`}
                className="tech-skill-card"
                style={{ "--skill-color": skill.color } as CSSProperties}
              >
                <SkillIcon skill={skill} />

                <div className="tech-skill-text">
                  <h3>{skill.name}</h3>
                  <p>Technology</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="skills-marquee-row row-right">
          <div className="skills-marquee-track">
            {[...bottomRowSkills, ...bottomRowSkills].map((skill, index) => (
              <article
                key={`bottom-${skill.name}-${index}`}
                className="tech-skill-card"
                style={{ "--skill-color": skill.color } as CSSProperties}
              >
                <SkillIcon skill={skill} />

                <div className="tech-skill-text">
                  <h3>{skill.name}</h3>
                  <p>Technology</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;