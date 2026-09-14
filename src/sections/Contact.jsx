import { useEffect, useRef } from "react";

function Contact() {
  const sectionRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const glow = glowRef.current;

    if (!section || !glow) return;

    const handleMouseMove = (event) => {
      const rect = section.getBoundingClientRect();

      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      glow.style.transform = `translate(${x - 250}px, ${y - 250}px)`;
    };

    section.addEventListener("mousemove", handleMouseMove);

    const revealElements =
      section.querySelectorAll(".contact-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("contact-visible");
          }
        });
      },
      {
        threshold: 0.12,
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      section.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      observer.disconnect();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="contact-section"
    >
      <div
        ref={glowRef}
        className="contact-mouse-glow"
      ></div>

      <div className="contact-grid"></div>

      <div className="contact-container">

        {/* HEADER */}

        <div className="contact-kicker contact-reveal">
          <span>06</span>
          LET'S BUILD SOMETHING
        </div>


        {/* MAIN */}

        <div className="contact-main">

          <div className="contact-heading contact-reveal">

            <h2>
              HAVE A
              <br />
              <span>PROJECT</span>
              <br />
              IN MIND?
            </h2>

          </div>


          {/* 3D ORB */}

          <div className="contact-visual contact-reveal">

            <div className="contact-orbit orbit-a"></div>
            <div className="contact-orbit orbit-b"></div>
            <div className="contact-orbit orbit-c"></div>

            <div className="contact-core">

              <div className="contact-core-inner">
                <span>START</span>
                <strong>PROJECT</strong>
              </div>

            </div>

            <span className="contact-particle particle-a"></span>
            <span className="contact-particle particle-b"></span>
            <span className="contact-particle particle-c"></span>

          </div>

        </div>


        {/* CTA */}

        <div className="contact-cta contact-reveal">

          <div className="contact-cta-text">
            <span>READY WHEN YOU ARE.</span>

            <p>
              Tell me about your idea, business or
              project and let's turn it into something real.
            </p>
          </div>

          <a
            href="mailto:your-email@example.com"
            className="contact-button"
          >
            <span>START A PROJECT</span>
            <strong>↗</strong>
          </a>

        </div>


        {/* CONTACT INFORMATION */}

        <div className="contact-info contact-reveal">

          <a
            href="mailto:Sriramravichandran7@gmail.com"
            className="contact-email"
          >
            Sriramravichandran7@gmail.com
          </a>

          <div className="contact-meta">

            <span>INDIA • REMOTE</span>

            <span>
              AVAILABLE FOR FREELANCE
            </span>

          </div>

        </div>


        {/* SERVICES */}

        <div className="contact-services contact-reveal">

          <span>WEB DEVELOPMENT</span>
          <span>WEB APPLICATIONS</span>
          <span>E-COMMERCE</span>
          <span>BUSINESS SYSTEMS</span>
          <span>CRM / ADMIN</span>

        </div>


        {/* FOOTER */}

        <div className="contact-footer contact-reveal">

          <span>
            LET'S BUILD SOMETHING USEFUL.
          </span>

          <strong>
            06 / CONTACT
          </strong>

        </div>

      </div>
    </section>
  );
}

export default Contact;