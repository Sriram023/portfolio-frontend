import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";

function Hero() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );

    camera.position.z = 5.5;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 1.8)
    );

    renderer.setSize(
      window.innerWidth,
      window.innerHeight
    );

    /* -------------------------
       Main sculpture
    ------------------------- */

    const geometry = new THREE.TorusKnotGeometry(
      1.25,
      0.055,
      180,
      24,
      2,
      3
    );

    const material = new THREE.MeshStandardMaterial({
      color: 0x0b2530,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: true,
      transparent: true,
      opacity: 0.8,
    });

    const sculpture = new THREE.Mesh(
      geometry,
      material
    );

    scene.add(sculpture);

    /* -------------------------
       Inner sphere
    ------------------------- */

    const sphereGeometry =
      new THREE.IcosahedronGeometry(0.8, 2);

    const sphereMaterial =
      new THREE.MeshBasicMaterial({
        color: 0x00d9ff,
        wireframe: true,
        transparent: true,
        opacity: 0.18,
      });

    const innerSphere = new THREE.Mesh(
      sphereGeometry,
      sphereMaterial
    );

    scene.add(innerSphere);

    /* -------------------------
       Small orbit rings
    ------------------------- */

    const ringGeometry =
      new THREE.TorusGeometry(
        1.65,
        0.012,
        16,
        100
      );

    const ringMaterial =
      new THREE.MeshBasicMaterial({
        color: 0x00d9ff,
        transparent: true,
        opacity: 0.35,
      });

    const ringOne = new THREE.Mesh(
      ringGeometry,
      ringMaterial
    );

    ringOne.rotation.x = Math.PI / 2.7;

    scene.add(ringOne);

    const ringTwo = new THREE.Mesh(
      ringGeometry.clone(),
      ringMaterial.clone()
    );

    ringTwo.rotation.y = Math.PI / 2.2;

    scene.add(ringTwo);

    /* -------------------------
       Particles
    ------------------------- */

    const particleCount = 500;

    const positions = new Float32Array(
      particleCount * 3
    );

    for (
      let i = 0;
      i < particleCount * 3;
      i += 3
    ) {
      positions[i] =
        (Math.random() - 0.5) * 7;

      positions[i + 1] =
        (Math.random() - 0.5) * 6;

      positions[i + 2] =
        (Math.random() - 0.5) * 4;
    }

    const particleGeometry =
      new THREE.BufferGeometry();

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(
        positions,
        3
      )
    );

    const particleMaterial =
      new THREE.PointsMaterial({
        color: 0x00d9ff,
        size: 0.012,
        transparent: true,
        opacity: 0.4,
      });

    const particles = new THREE.Points(
      particleGeometry,
      particleMaterial
    );

    scene.add(particles);

    /* -------------------------
       Lights
    ------------------------- */

    const cyanLight =
      new THREE.PointLight(
        0x00d9ff,
        8,
        8
      );

    cyanLight.position.set(
      2,
      2,
      3
    );

    scene.add(cyanLight);

    const purpleLight =
      new THREE.PointLight(
        0x7c3aed,
        5,
        7
      );

    purpleLight.position.set(
      -2,
      -1,
      2
    );

    scene.add(purpleLight);

    /* -------------------------
       Mouse
    ------------------------- */

    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (event) => {
      targetX =
        (event.clientX /
          window.innerWidth -
          0.5) *
        0.7;

      targetY =
        (event.clientY /
          window.innerHeight -
          0.5) *
        0.5;
    };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    /* -------------------------
       Entrance
    ------------------------- */

    sculpture.scale.set(
      0.2,
      0.2,
      0.2
    );

    gsap.to(sculpture.scale, {
      x: 1,
      y: 1,
      z: 1,
      duration: 1.8,
      ease: "expo.out",
    });

    /* -------------------------
       Animation
    ------------------------- */

    let frame;

    const animate = () => {
      frame =
        requestAnimationFrame(
          animate
        );

      sculpture.rotation.x += 0.001;
      sculpture.rotation.y += 0.002;

      innerSphere.rotation.x -= 0.0015;
      innerSphere.rotation.y += 0.002;

      ringOne.rotation.z += 0.0015;
      ringTwo.rotation.x -= 0.001;

      particles.rotation.y += 0.00015;

      sculpture.rotation.y +=
        (targetX -
          sculpture.rotation.y) *
        0.02;

      sculpture.rotation.x +=
        (targetY -
          sculpture.rotation.x) *
        0.02;

      renderer.render(
        scene,
        camera
      );
    };

    animate();

    /* -------------------------
       Resize
    ------------------------- */

    const handleResize = () => {
      camera.aspect =
        window.innerWidth /
        window.innerHeight;

      camera.updateProjectionMatrix();

      renderer.setSize(
        window.innerWidth,
        window.innerHeight
      );

      renderer.setPixelRatio(
        Math.min(
          window.devicePixelRatio,
          1.8
        )
      );
    };

    window.addEventListener(
      "resize",
      handleResize
    );

    return () => {
      cancelAnimationFrame(frame);

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "resize",
        handleResize
      );

      geometry.dispose();
      material.dispose();

      sphereGeometry.dispose();
      sphereMaterial.dispose();

      ringGeometry.dispose();
      ringMaterial.dispose();

      particleGeometry.dispose();
      particleMaterial.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <section
      id="home"
      className="hero"
    >
      <canvas
        ref={canvasRef}
        className="hero-canvas"
      />

      <div className="hero-noise" />

      <div className="hero-grid" />

      <div className="ambient ambient-cyan" />
      <div className="ambient ambient-purple" />

      <div className="hero-content">

        <div className="availability">
          <span />
          AVAILABLE FOR FREELANCE PROJECTS
        </div>

        <div className="hero-layout">

          <div className="hero-copy">

            <div className="eyebrow">
              FULL STACK DEVELOPER
            </div>

            <h1>
              I BUILD
              <br />

              <span>DIGITAL</span>
              <br />

              <span className="outline">
                PRODUCTS.
              </span>
            </h1>

            <p className="hero-description">
              I turn business ideas into modern
              websites, web applications and
              digital products that are built to
              make an impact.
            </p>

            <div className="hero-actions">

              <a
                href="#contact"
                className="hero-button primary"
              >
                <span>
                  START A PROJECT
                </span>

                <span>↗</span>
              </a>

              <a
                href="#work"
                className="hero-button secondary"
              >
                <span>
                  EXPLORE WORK
                </span>

                <span>↓</span>
              </a>

            </div>

          </div>

          <div className="hero-visual">

            <div className="visual-label">
              <span>01</span>
              <span>CREATIVE / DIGITAL</span>
            </div>

            <div className="visual-caption">
              <span>
                DESIGN
              </span>

              <span>
                DEVELOP
              </span>

              <span>
                DELIVER
              </span>
            </div>

          </div>

        </div>
      </div>

      <div className="hero-bottom">

        <span>
          SCROLL TO EXPLORE
        </span>

        <span className="scroll-arrow">
          ↓
        </span>

        <span>
          INDIA — 2026
        </span>

      </div>
    </section>
  );
}

export default Hero;