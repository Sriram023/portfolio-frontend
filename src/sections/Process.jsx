import { useEffect, useRef } from "react";

const processSteps = [
  {
    number: "01",
    title: "DISCOVER",
    description:
      "We start by understanding your business, goals, audience and exactly what the product needs to achieve.",
    label: "STRATEGY",
  },
  {
    number: "02",
    title: "DESIGN",
    description:
      "I turn the requirements into a clear structure and modern interface focused on usability and conversion.",
    label: "EXPERIENCE",
  },
  {
    number: "03",
    title: "BUILD",
    description:
      "The product is developed with clean, scalable code and the right technology for the project.",
    label: "DEVELOPMENT",
  },
  {
    number: "04",
    title: "DEPLOY",
    description:
      "Everything is tested, optimized and launched so your digital product is ready for real users.",
    label: "LAUNCH",
  },
];

function Process() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const steps =
      section.querySelectorAll(".process-step");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "process-step-visible"
            );
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    steps.forEach((step) => {
      observer.observe(step);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="process"
      className="process-section"
    >
      <div className="process-container">

        {/* HEADER */}

        <div className="process-header">

          <div className="process-kicker">
            <span>04</span>
            HOW IT WORKS
          </div>

          <div className="process-heading-row">

  <h2>
    FROM IDEA
    <br />
    <span>TO LAUNCH.</span>
  </h2>

  <div className="process-intro">

    <div className="process-visual">

      <div className="process-orbit orbit-one"></div>
      <div className="process-orbit orbit-two"></div>
      <div className="process-orbit orbit-three"></div>

      <div className="process-core">
        <span>PROCESS</span>
        <strong>04</strong>
      </div>

      <span className="process-particle particle-one"></span>
      <span className="process-particle particle-two"></span>
      <span className="process-particle particle-three"></span>
      <span className="process-particle particle-four"></span>

    </div>

    <p>
      A simple, transparent process designed
      to take your idea from the first
      conversation to a finished digital product.
    </p>

  </div>

</div>

        </div>


        {/* PROCESS */}

        <div className="process-track">

          <div className="process-line">
            <span className="process-line-progress"></span>
          </div>

          {processSteps.map((step, index) => (
            <article
              key={step.number}
              className="process-step"
            >

              <div className="process-node">
                <span></span>
              </div>

              <div className="process-number">
                {step.number}
              </div>

              <div className="process-card">

                <div className="process-card-top">
                  <span>{step.label}</span>

                  <span className="process-arrow">
                    ↗
                  </span>
                </div>

                <h3>
                  {step.title}
                </h3>

                <p>
                  {step.description}
                </p>

              </div>

            </article>
          ))}

        </div>


        {/* BOTTOM STATEMENT */}

        <div className="process-footer">

          <div className="process-footer-line"></div>

          <div className="process-footer-content">

            <span>
              SIMPLE PROCESS.
            </span>

            <strong>
              SERIOUS RESULTS.
            </strong>

            <span>
              04 STEPS
            </span>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Process;