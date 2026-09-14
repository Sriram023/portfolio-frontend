import { useEffect, useRef } from "react";

function About() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const elements =
      section.querySelectorAll(".about-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("about-visible");
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-section"
    >
      <div className="about-container">

        {/* SECTION LABEL */}

        <div className="about-kicker about-reveal">
          <span>05</span>
          THE PERSON BEHIND THE CODE
        </div>


        {/* HEADER */}

        <div className="about-header">

          <h2 className="about-title about-reveal">
            I BUILD
            <br />
            <span>DIGITAL PRODUCTS.</span>
          </h2>

          <div className="about-intro about-reveal">

            <div className="about-orbit-visual">

              <div className="about-orbit about-orbit-one"></div>
              <div className="about-orbit about-orbit-two"></div>
              <div className="about-orbit about-orbit-three"></div>

              <div className="about-core">
  <span className="core-name">SRIRAM</span>
  <strong>DEV</strong>
</div>

              <span className="about-dot about-dot-one"></span>
              <span className="about-dot about-dot-two"></span>
              <span className="about-dot about-dot-three"></span>

            </div>

            <p>
              I'm a Full Stack Developer and Freelancer
              focused on turning business ideas into
              modern websites, web applications and
              digital products.
            </p>

          </div>

        </div>


        {/* MAIN CONTENT */}

        <div className="about-grid">

          {/* STORY */}

          <div className="about-story about-reveal">

            <span className="about-small-label">
              WHAT I DO
            </span>

            <h3>
              FROM IDEA
              <br />
              <span>TO REAL PRODUCT.</span>
            </h3>

            <p>
              I enjoy building digital experiences that
              are not only visually strong, but also useful
              for real businesses.
            </p>

            <p>
              From a simple business website to a complete
              web application with authentication,
              dashboards, databases and business
              functionality — I focus on building things
              that actually solve problems.
            </p>

          </div>


          {/* INFO CARD */}

          <div className="about-card about-reveal">

            <div className="about-card-glow"></div>

            <div className="about-card-top">
              <span>PROFILE</span>

              <span className="about-status">
                <i></i>
                AVAILABLE
              </span>
            </div>

            <div className="about-profile">

              <div className="about-profile-mark">
  <span className="profile-name">SRIRAM</span>
  <span className="profile-role">DEV</span>
</div>

              <div>
                <h4>Sriram</h4>

                <p>
                  Full Stack Developer
                  <br />
                  & Freelancer
                </p>
              </div>

            </div>

            <div className="about-divider"></div>

            <div className="about-details">

              <div>
                <span>FOCUS</span>
                <strong>WEB DEVELOPMENT</strong>
              </div>

              <div>
                <span>STACK</span>
                <strong>MERN</strong>
              </div>

              <div>
                <span>WORK</span>
                <strong>FREELANCE</strong>
              </div>

              <div>
                <span>LOCATION</span>
                <strong>INDIA • REMOTE</strong>
              </div>

            </div>

          </div>

        </div>


        {/* TECHNOLOGY STRIP */}

        <div className="about-tech about-reveal">

          <div className="about-tech-label">
            TECHNOLOGIES I WORK WITH
          </div>

          <div className="about-tech-list">

            <span>HTML</span>
            <span>CSS</span>
            <span>JAVASCRIPT</span>
            <span>REACT</span>
            <span>NODE.JS</span>
            <span>EXPRESS</span>
            <span>MONGODB</span>

          </div>

        </div>


        {/* BOTTOM STATEMENT */}

        <div className="about-footer about-reveal">

          <span>
            CODE WITH PURPOSE.
          </span>

          <strong>
            BUILT FOR REAL WORLD.
          </strong>

          <span>
            05 / ABOUT
          </span>

        </div>

      </div>
    </section>
  );
}

export default About;