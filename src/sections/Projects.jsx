import { useEffect, useRef } from "react";
import * as THREE from "three";

const projects = [
  {
    number: "01",
    category: "BUSINESS WEBSITE",
    title: "BM Oils",
    description:
      "A modern business website designed to present the brand, products and services with a clean digital experience.",
    tech: ["MONGODB", "EXPRESS",   "REACT" , "NODE.JS"],
    status: "LIVE",
    live: "https://balanoilmart.onrender.com/",
    type: "business",
  },

  {
    number: "02",
    category: "RESTAURANT PLATFORM",
    title: "Pizza Palace",
    description:
      "A complete restaurant ordering platform with a customer-facing experience and dedicated admin dashboard.",
    tech: ["MONGODB", "EXPRESS",   "REACT" , "NODE.JS"],
    status: "LIVE",
    live: "https://pizza-palace-tau.vercel.app/",
    type: "restaurant",
  },

  {
    number: "03",
    category: "CRM / BUSINESS SYSTEM",
    title: "BM Oils CRM",
    description:
      "A custom CRM system built to help manage business operations, customers and internal workflows.",
    tech: ["MONGODB", "EXPRESS",   "REACT" , "NODE.JS"],
    status: "LIVE",
    live: "https://balan-oil-frontend.onrender.com/",
    type: "crm",
  },

  {
    number: "04",
    category: "E-COMMERCE",
    title: "E-Commerce Platform",
    description:
      "A full e-commerce experience currently being developed with modern shopping, product and business functionality.",
    tech: ["MONGODB", "EXPRESS",   "REACT" , "NODE.JS"],
    status: "BUILDING",
    live: null,
    type: "ecommerce",
  },
];

function Projects() {
  const sectionRef = useRef(null);
  const objectCanvasRef = useRef(null);

  /* =========================================================
     PROJECT CARD REVEAL + DYNAMIC HEADING CURSOR
  ========================================================= */

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const cards =
      section.querySelectorAll(".project-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              "project-visible"
            );
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    cards.forEach((card) =>
      observer.observe(card)
    );

    /* -----------------------------------------
       Cursor controls the REAL WORLD light
    ----------------------------------------- */

    const handleSectionMouseMove = (event) => {
      const rect =
        section.getBoundingClientRect();

      const x =
        ((event.clientX - rect.left) /
          rect.width) *
        100;

      const y =
        ((event.clientY - rect.top) /
          rect.height) *
        100;

      section.style.setProperty(
        "--cursor-x",
        `${x}%`
      );

      section.style.setProperty(
        "--cursor-y",
        `${y}%`
      );

      section.style.setProperty(
        "--accent-x",
        `${x}%`
      );
    };

    section.addEventListener(
      "mousemove",
      handleSectionMouseMove
    );

    return () => {
      observer.disconnect();

      section.removeEventListener(
        "mousemove",
        handleSectionMouseMove
      );
    };
  }, []);

  /* =========================================================
     THREE.JS — SMALL PROJECT HEADING OBJECT
  ========================================================= */

  useEffect(() => {
    const canvas =
      objectCanvasRef.current;

    if (!canvas) return;

    /* -----------------------------------------
       Scene
    ----------------------------------------- */

    const scene =
      new THREE.Scene();

    /* -----------------------------------------
       Camera
    ----------------------------------------- */

    const camera =
      new THREE.PerspectiveCamera(
        35,
        1,
        0.1,
        100
      );

    camera.position.z = 4;

    /* -----------------------------------------
       Renderer
    ----------------------------------------- */

    const renderer =
      new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });

    renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        2
      )
    );

    /* -----------------------------------------
       Responsive resize
    ----------------------------------------- */

    const resize = () => {
      const width =
        canvas.clientWidth;

      const height =
        canvas.clientHeight;

      if (!width || !height) return;

      camera.aspect =
        width / height;

      camera.updateProjectionMatrix();

      renderer.setSize(
        width,
        height,
        false
      );
    };

    resize();

    window.addEventListener(
      "resize",
      resize
    );

    /* =====================================================
       OBJECT GROUP
    ===================================================== */

    const objectGroup =
      new THREE.Group();

    scene.add(objectGroup);

    /* =====================================================
       OUTER CRYSTAL
    ===================================================== */

    const crystalGeometry =
      new THREE.IcosahedronGeometry(
        0.9,
        1
      );

    const crystalMaterial =
      new THREE.MeshBasicMaterial({
        color: 0x00d9ff,
        wireframe: true,
        transparent: true,
        opacity: 0.7,
      });

    const crystal =
      new THREE.Mesh(
        crystalGeometry,
        crystalMaterial
      );

    objectGroup.add(crystal);

    /* =====================================================
       INNER CRYSTAL
    ===================================================== */

    const innerGeometry =
      new THREE.IcosahedronGeometry(
        0.52,
        1
      );

    const innerMaterial =
      new THREE.MeshBasicMaterial({
        color: 0x7c3aed,
        wireframe: true,
        transparent: true,
        opacity: 0.42,
      });

    const inner =
      new THREE.Mesh(
        innerGeometry,
        innerMaterial
      );

    objectGroup.add(inner);

    /* =====================================================
       ORBIT RING
    ===================================================== */

    const ringGeometry =
      new THREE.TorusGeometry(
        1.15,
        0.012,
        12,
        80
      );

    const ringMaterial =
      new THREE.MeshBasicMaterial({
        color: 0x00d9ff,
        transparent: true,
        opacity: 0.4,
      });

    const ring =
      new THREE.Mesh(
        ringGeometry,
        ringMaterial
      );

    ring.rotation.x =
      Math.PI / 2.5;

    objectGroup.add(ring);

    /* =====================================================
       SECOND ORBIT RING
    ===================================================== */

    const secondRingGeometry =
      new THREE.TorusGeometry(
        1.05,
        0.009,
        10,
        80
      );

    const secondRingMaterial =
      new THREE.MeshBasicMaterial({
        color: 0x7c3aed,
        transparent: true,
        opacity: 0.25,
      });

    const secondRing =
      new THREE.Mesh(
        secondRingGeometry,
        secondRingMaterial
      );

    secondRing.rotation.y =
      Math.PI / 2.2;

    secondRing.rotation.z =
      Math.PI / 5;

    objectGroup.add(
      secondRing
    );

    /* =====================================================
       CURSOR INTERACTION
    ===================================================== */

    let targetRotationX = 0;
    let targetRotationY = 0;

    let currentRotationX = 0;
    let currentRotationY = 0;

    const handleMouseMove = (
      event
    ) => {
      const rect =
        canvas.getBoundingClientRect();

      const mouseX =
        (event.clientX -
          rect.left) /
        rect.width -
        0.5;

      const mouseY =
        (event.clientY -
          rect.top) /
        rect.height -
        0.5;

      targetRotationY =
        mouseX * 0.8;

      targetRotationX =
        mouseY * 0.55;
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    /* =====================================================
       ANIMATION
    ===================================================== */

    let animationFrame;

    const animate = () => {
      animationFrame =
        requestAnimationFrame(
          animate
        );

      /* Automatic rotation */

      crystal.rotation.y +=
        0.0035;

      crystal.rotation.x +=
        0.0018;

      inner.rotation.y -=
        0.0025;

      inner.rotation.x +=
        0.0015;

      ring.rotation.z +=
        0.003;

      secondRing.rotation.z -=
        0.002;

      /* Smooth cursor movement */

      currentRotationX +=
        (targetRotationX -
          currentRotationX) *
        0.045;

      currentRotationY +=
        (targetRotationY -
          currentRotationY) *
        0.045;

      objectGroup.rotation.x =
        currentRotationX;

      objectGroup.rotation.y =
        currentRotationY;

      /* Small floating movement */

      const time =
        performance.now() *
        0.001;

      objectGroup.position.y =
        Math.sin(time * 1.2) *
        0.045;

      objectGroup.position.x =
        Math.cos(time * 0.8) *
        0.025;

      /* Render */

      renderer.render(
        scene,
        camera
      );
    };

    animate();

    /* =====================================================
       CLEANUP
    ===================================================== */

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      window.removeEventListener(
        "resize",
        resize
      );

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      crystalGeometry.dispose();
      crystalMaterial.dispose();

      innerGeometry.dispose();
      innerMaterial.dispose();

      ringGeometry.dispose();
      ringMaterial.dispose();

      secondRingGeometry.dispose();
      secondRingMaterial.dispose();

      renderer.dispose();
    };
  }, []);

  /* =========================================================
     PROJECT CARD TILT
  ========================================================= */

  const handleMove = (event) => {
    const card =
      event.currentTarget;

    const rect =
      card.getBoundingClientRect();

    const x =
      event.clientX -
      rect.left;

    const y =
      event.clientY -
      rect.top;

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
  };

  const handleLeave = (event) => {
    event.currentTarget.style.transform =
      "";
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className="projects-section"
    >
      <div className="projects-container">

        {/* =================================================
            HEADING
        ================================================= */}

        <div className="projects-heading">

          <div className="projects-kicker">
            <span>02</span>
            SELECTED WORK
          </div>

          <div className="projects-heading-row">

            <div className="projects-title-wrap">

              <h2>
                BUILT FOR
                <br />

                <span className="projects-accent">
                  REAL WORLD.
                </span>
              </h2>

            </div>

            <div className="projects-heading-side">

              {/* THREE.JS OBJECT */}

              <div className="projects-3d-object">
                <canvas
                  ref={objectCanvasRef}
                />
              </div>

              <p>
                A selection of websites,
                applications and digital
                systems I've built for
                businesses and real-world
                use cases.
              </p>

            </div>

          </div>

        </div>

        {/* =================================================
            PROJECT LIST
        ================================================= */}

        <div className="projects-list">

          {projects.map((project) => (
            <article
              className={`project-card project-${project.type}`}
              key={project.number}
              onMouseMove={handleMove}
              onMouseLeave={handleLeave}
            >

              {/* CARD TOP */}

              <div className="project-card-top">

                <span className="project-number">
                  {project.number}
                </span>

                <span className="project-category">
                  {project.category}
                </span>

                <span
                  className={`project-status ${
                    project.status ===
                    "BUILDING"
                      ? "building"
                      : ""
                  }`}
                >
                  <i></i>

                  {project.status ===
                  "BUILDING"
                    ? "BUILDING IN PROGRESS"
                    : "LIVE PROJECT"}
                </span>

              </div>

              {/* PROJECT MAIN */}

              <div className="project-main">

                {/* PROJECT PREVIEW */}

                <div className="project-preview">

                  <div className="preview-grid"></div>

                  <div className="preview-glow"></div>

                  <div className="preview-window">

                    <div className="window-top">

                      <span></span>
                      <span></span>
                      <span></span>

                      <div className="window-url">

                        {project.type ===
                          "business" &&
                          "balanoilmart.onrender.com"}

                        {project.type ===
                          "restaurant" &&
                          "pizza-palace-tau.vercel.app"}

                        {project.type ===
                          "crm" &&
                          "balan-oil-frontend.onrender.com"}

                        {project.type ===
                          "ecommerce" &&
                          "ecommerce — in development"}

                      </div>

                    </div>

                    <div className="preview-content">

  {/* BM OILS WEBSITE */}

  {project.type === "business" && (
    <img
      src="/projects/spa.png"
      alt="BM Oils website"
      className="project-screenshot"
    />
  )}

  {/* PIZZA PALACE */}

  {project.type === "restaurant" && (
    <img
      src="/projects/pizza.png"
      alt="Pizza Palace application"
      className="project-screenshot"
    />
  )}

  {/* BM OILS CRM */}

  {project.type === "crm" && (
    <img
      src="/projects/erp.png"
      alt="BM Oils CRM"
      className="project-screenshot"
    />
  )}

  {/* ECOMMERCE — KEEP BUILDING */}

  {project.type === "ecommerce" && (
    <>
      <small>
        NEW PROJECT
      </small>

      <strong>
        COMING
        <br />
        SOON.
      </strong>

      <div className="ecommerce-orbit">
        <span></span>
      </div>
    </>
  )}

</div>

                  </div>

                  <div className="preview-index">
                    {project.number}
                  </div>

                </div>

                {/* PROJECT INFO */}

                <div className="project-info">

                  <div>

                    <h3>
                      {project.title}
                    </h3>

                    <p>
                      {project.description}
                    </p>

                  </div>

                  <div className="project-bottom">

                    <div className="project-tech">

                      {project.tech.map(
                        (technology) => (
                          <span
                            key={technology}
                          >
                            {technology}
                          </span>
                        )
                      )}

                    </div>

                    {project.live ? (
                      <a
                        href={
                          project.live
                        }
                        target="_blank"
                        rel="noreferrer"
                        className="project-link"
                      >
                        <span>
                          VIEW LIVE
                        </span>

                        <span>
                          ↗
                        </span>
                      </a>
                    ) : (
                      <span className="project-building">
                        IN DEVELOPMENT
                        <span>↗</span>
                      </span>
                    )}

                  </div>

                </div>

              </div>

            </article>
          ))}

        </div>

        {/* =================================================
            FOOTER
        ================================================= */}

        <div className="projects-footer">

          <span>
            MORE PROJECTS ARE ON THE WAY
          </span>

          <span>
            04 / 04
          </span>

        </div>

      </div>
    </section>
  );
}

export default Projects;