import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { portfolioConfig } from "../data/portfolioConfig";

function ContactSection() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errorText, setErrorText] = useState("");
  const [successText, setSuccessText] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const updateActiveState = () => {
      const rect = section.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.5;
      const isActive = rect.top <= viewportCenter && rect.bottom >= viewportCenter;

      if (isActive) {
        section.classList.add("is-contact-active");
      } else {
        section.classList.remove("is-contact-active");
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

  const validateForm = () => {
    const missingFields: string[] = [];

    if (!name.trim()) missingFields.push("your name");
    if (!email.trim()) missingFields.push("your email");
    if (!message.trim()) missingFields.push("your message");

    if (missingFields.length > 0) {
      if (missingFields.length === 1) {
        return `Oops! Please enter ${missingFields[0]}.`;
      }

      if (missingFields.length === 2) {
        return `Oops! Please enter ${missingFields[0]} and ${missingFields[1]}.`;
      }

      return `Oops! Please enter ${missingFields
        .slice(0, -1)
        .join(", ")} and ${missingFields[missingFields.length - 1]}.`;
    }

    const trimmedEmail = email.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      return "Oops! Please enter a valid email address (example: name@gmail.com).";
    }

    return "";
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSuccessText("");

    const validationError = validateForm();

    if (validationError) {
      setErrorText(validationError);
      return;
    }

    setErrorText("");
    setIsSending(true);

    try {
      await emailjs.sendForm(
        "service_pg935xi",
        "template_fms7377",
        formRef.current!,
        "7F2wNo81gVNMiwmok"
      );

      setName("");
      setEmail("");
      setMessage("");
      setSuccessText("Message sent successfully. I’ll get back to you soon!");
    } catch (error) {
      console.error("EmailJS Error:", error);
      setErrorText("Oops! Something went wrong while sending your message. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section
      className="section section-focus contact-section"
      id="contact"
      ref={sectionRef}
    >
      <div className="section-focus-inner">
        <div className="section-heading" data-reveal="up">
          <div className="projects-showcase-top-pill">
            <span>Contact</span>
          </div>

          <h2 className="section-title split-heading">
            <span className="heading-line heading-line-1">Let&apos;s connect for</span>
            <span className="heading-line heading-line-2">QA / SDET opportunities</span>
          </h2>
        </div>

        <div className="contact-panel">
          {/* LEFT SIDE */}
          <div className="contact-left" data-reveal="left" data-reveal-delay="1">
            <div className="contact-card-glow" />
            <div className="contact-card-shine" aria-hidden="true" />
            <div className="contact-left-topline" />

            <div className="contact-left-header">
              <h3>Send a Message</h3>
              <p>I&apos;ll get back to you within 24 hours.</p>
            </div>

            <form className="contact-form-preview" ref={formRef} onSubmit={handleSubmit}>
              <div className="contact-form-row">
                <label htmlFor="contact-name">Your Name</label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  className="contact-real-input"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>

              <div className="contact-form-row">
                <label htmlFor="contact-email">Your Email</label>
                <input
                  id="contact-email"
                  type="email"
                  name="email"
                  className="contact-real-input"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>

              <div className="contact-form-row">
                <label htmlFor="contact-message">Your Message</label>
                <textarea
                  id="contact-message"
                  name="message"
                  className="contact-real-textarea"
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={5}
                />
              </div>

              <input type="hidden" name="title" value="From Portfolio" />

              {errorText && <div className="contact-form-error">{errorText}</div>}
              {successText && <div className="contact-form-success">{successText}</div>}

              <button type="submit" className="contact-send-btn" disabled={isSending}>
                <span>{isSending ? "Sending..." : "Send Message"}</span>
                <span className="contact-send-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 2 11 13" />
                    <path d="M22 2 15 22 11 13 2 9 22 2z" />
                  </svg>
                </span>
              </button>
            </form>
          </div>

          {/* RIGHT SIDE */}
          <div className="contact-right" data-reveal="right" data-reveal-delay="2">
            <div className="contact-right-block">
              <h4 className="contact-right-title">Direct Contact</h4>

              <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${portfolioConfig.contact.email}&su=Portfolio%20Contact%20-%20QA%20%2F%20SDET%20Opportunity&body=Hello%20Sakthi%2C`}
                target="_blank"
                rel="noreferrer"
                className="contact-link-card"
              >
                <span className="contact-link-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                    <path d="M4 6h16v12H4z" />
                    <path d="m5 7 7 6 7-6" />
                  </svg>
                </span>
                <span className="contact-link-content">
                  <span className="contact-link-label">Email</span>
                  <span className="contact-link-value">{portfolioConfig.contact.email}</span>
                </span>
              </a>

              <a href={`tel:${portfolioConfig.contact.phone}`} className="contact-link-card">
                <span className="contact-link-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.35 1.78.68 2.61a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.47-1.25a2 2 0 0 1 2.11-.45c.83.33 1.71.56 2.61.68A2 2 0 0 1 22 16.92z" />
                  </svg>
                </span>
                <span className="contact-link-content">
                  <span className="contact-link-label">Phone</span>
                  <span className="contact-link-value">{portfolioConfig.contact.phone}</span>
                </span>
              </a>

              <a
                href={portfolioConfig.resume.file}
                target="_blank"
                rel="noreferrer"
                className="contact-link-card"
              >
                <span className="contact-link-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                    <path d="M14 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7z" />
                    <path d="M14 2v5h5" />
                    <path d="M12 12v6" />
                    <path d="m9 15 3 3 3-3" />
                  </svg>
                </span>
                <span className="contact-link-content">
                  <span className="contact-link-label">Resume</span>
                  <span className="contact-link-value">Download PDF</span>
                </span>
              </a>
            </div>

            <div className="contact-right-block">
              <h4 className="contact-right-title">Social Presence</h4>

              <div className="contact-social-row">
                <a
                  href={portfolioConfig.social.github}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-btn"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                    <path d="M9 19c-4 1.5-4-2-6-2" />
                    <path d="M15 22v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.1-1.5 6.1-6.8A5.3 5.3 0 0 0 18.7 5 4.9 4.9 0 0 0 18.6 1S17.4.7 15 2.3a13.4 13.4 0 0 0-6 0C6.6.7 5.4 1 5.4 1A4.9 4.9 0 0 0 5.3 5 5.3 5.3 0 0 0 3.8 8.7c0 5.3 3.1 6.5 6.1 6.8a3.4 3.4 0 0 0-.9 2.6V22" />
                  </svg>
                </a>

                <a
                  href={portfolioConfig.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-btn"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
                    <path d="M2 9h4v12H2z" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>

                <a
                  href={portfolioConfig.social.leetcode}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-btn"
                  aria-label="LeetCode"
                  title="LeetCode"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                    <path d="M15.5 4 8 11.5 15.5 19" />
                    <path d="M20 12H10.5" />
                    <path d="M13.5 6.5 18 2" />
                  </svg>
                </a>

                <a
                  href={portfolioConfig.social.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-social-btn"
                  aria-label="Twitter"
                  title="Twitter"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
                    <path d="M4 4l16 16" />
                    <path d="M20 4 4 20" />
                  </svg>
                </a>
              </div>

              <div className="linkedin-note-card">
                <span className="linkedin-note-dot" />
                <span>
                  Made with <span className="made-heart">❤</span> in India
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
