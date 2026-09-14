import { useEffect } from "react";

import Navbar from "./components/Navbar";
import CustomCursor from "./components/CustomCursor";

import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Services from "./sections/Services";
import Process from "./sections/Process";
import About from "./sections/About";
import Contact from "./sections/Contact";

function App() {
  // Magnetic button interaction
  useEffect(() => {
    const magneticElements =
      document.querySelectorAll(".magnetic");

    const handlers = [];

    magneticElements.forEach((element) => {
      const move = (event) => {
        const rect =
          element.getBoundingClientRect();

        const x =
          event.clientX -
          rect.left -
          rect.width / 2;

        const y =
          event.clientY -
          rect.top -
          rect.height / 2;

        element.style.transform =
          `translate(${x * 0.12}px, ${y * 0.12}px)`;
      };

      const leave = () => {
        element.style.transform = "";
      };

      element.addEventListener(
        "mousemove",
        move
      );

      element.addEventListener(
        "mouseleave",
        leave
      );

      handlers.push({
        element,
        move,
        leave,
      });
    });

    return () => {
      handlers.forEach(
        ({ element, move, leave }) => {
          element.removeEventListener(
            "mousemove",
            move
          );

          element.removeEventListener(
            "mouseleave",
            leave
          );
        }
      );
    };
  }, []);

  // Scroll progress
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;

      const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

      const progress =
        documentHeight > 0
          ? (scrollTop / documentHeight) * 100
          : 0;

      document.documentElement.style.setProperty(
        "--scroll-progress",
        `${progress}%`
      );
    };

    window.addEventListener(
      "scroll",
      updateProgress,
      {
        passive: true,
      }
    );

    updateProgress();

    return () => {
      window.removeEventListener(
        "scroll",
        updateProgress
      );
    };
  }, []);

  return (
    <>
      {/* Scroll progress */}
      <div className="scroll-progress" />

      {/* Custom cursor */}
      <CustomCursor />

      {/* Navigation */}
      <Navbar />

      {/* Main website */}
      <main>
        <Hero />

        <Projects />

        <Services />

        <Process />

        <About />

        <Contact />
      </main>
    </>
  );
}

export default App;