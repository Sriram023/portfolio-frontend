import { useEffect, useRef } from "react";

const services = [
  {
    number: "01",
    title: "Business",
    highlight: "Websites.",
    description:
      "High-quality websites that give businesses a strong digital presence and turn visitors into customers.",
    tags: ["Responsive", "SEO Ready", "Modern UI"],
  },
  {
    number: "02",
    title: "MERN",
    highlight: "Applications.",
    description:
      "Full-stack web applications built with MongoDB, Express.js, React and Node.js for real business requirements.",
    tags: ["MongoDB", "Express.js", "React", "Node.js"],
  },
  {
    number: "03",
    title: "E-Commerce",
    highlight: "Platforms.",
    description:
      "Scalable online stores with product management, customer experiences, orders and business functionality.",
    tags: ["Products", "Orders", "Payments", "Admin"],
  },
  {
    number: "04",
    title: "CRM &",
    highlight: "Admin Systems.",
    description:
      "Custom dashboards and business systems that make operations easier to manage, track and grow.",
    tags: ["Dashboard", "Analytics", "Management"],
  },
];

function Services() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const cards =
      section.querySelectorAll(".service-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "service-visible"
            );
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    cards.forEach((card) => {
      observer.observe(card);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleMove = (event) => {
    const card = event.currentTarget;

    const rect =
      card.getBoundingClientRect();

    const x =
      event.clientX - rect.left;

    const y =
      event.clientY - rect.top;

    const rotateX =
      ((y - rect.height / 2) /
        rect.height) *
      -5;

    const rotateY =
      ((x - rect.width / 2) /
        rect.width) *
      5;

    card.style.transform = `
      perspective(1000px)
      rotateX(${rotateX}deg)
      rotateY(${rotateY}deg)
      translateY(-8px)
    `;

    card.style.setProperty(
      "--mouse-x",
      `${x}px`
    );

    card.style.setProperty(
      "--mouse-y",
      `${y}px`
    );
  };

  const handleLeave = (event) => {
    event.currentTarget.style.transform = "";

    event.currentTarget.style.setProperty(
      "--mouse-x",
      "50%"
    );

    event.currentTarget.style.setProperty(
      "--mouse-y",
      "50%"
    );
  };

  return (
    <section
      ref={sectionRef}
      id="services"
      className="services-section"
    >
      <div className="services-container">

        {/* HEADER */}

        <div className="services-header">

          <div className="services-kicker">
            <span>03</span>
            WHAT I BUILD
          </div>

          <div className="services-heading-row">

            <h2>
              DIGITAL
              <br />
              <span>SOLUTIONS.</span>
            </h2>

            <div className="services-intro">

              <div className="services-orbit">
                <span></span>
                <span></span>
                <span></span>
              </div>

              <p>
                From business websites to
                complete web applications,
                I build digital products
                designed around real
                business needs.
              </p>

            </div>

          </div>

        </div>

        {/* SERVICES */}

        <div className="services-grid">

          {services.map((service) => (
            <article
              key={service.number}
              className="service-card"
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
            >

              <div className="service-card-glow"></div>

              <div className="service-top">

                <span
  className="service-number"
  data-number={service.number}
>
  {service.number}
</span>

                <span className="service-arrow">
                  ↗
                </span>

              </div>

              <div className="service-content">

                <h3>
                  {service.title}
                  <br />

                  <span>
                    {service.highlight}
                  </span>
                </h3>

                <p>
                  {service.description}
                </p>

              </div>

              <div className="service-bottom">

                <div className="service-tags">
                  {service.tags.map(
                    (tag) => (
                      <span key={tag}>
                        {tag}
                      </span>
                    )
                  )}
                </div>

                <div className="service-line">
                  <span></span>
                </div>

              </div>

            </article>
          ))}

        </div>

        {/* FOOTER */}

        <div className="services-footer">

          <span>
            HAVE AN IDEA? LET'S BUILD IT.
          </span>

          <span>
            04 SERVICES
          </span>

        </div>

      </div>
    </section>
  );
}

export default Services;