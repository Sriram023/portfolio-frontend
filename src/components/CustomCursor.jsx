import { useEffect, useRef } from "react";

function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const ring = ringRef.current;

    if (!cursor || !ring) return;

    const isTouch =
      window.matchMedia("(pointer: coarse)").matches;

    if (isTouch) return;

    let mouseX = 0;
    let mouseY = 0;

    let ringX = 0;
    let ringY = 0;

    const moveCursor = (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;

      cursor.style.transform =
        `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      ring.style.transform =
        `translate3d(${ringX}px, ${ringY}px, 0)`;

      requestAnimationFrame(animateRing);
    };

    const interactiveElements =
      document.querySelectorAll(
        "a, button, .magnetic, input, textarea"
      );

    const addHover = () => {
      cursor.classList.add("cursor-active");
      ring.classList.add("cursor-ring-active");
    };

    const removeHover = () => {
      cursor.classList.remove("cursor-active");
      ring.classList.remove("cursor-ring-active");
    };

    window.addEventListener(
      "mousemove",
      moveCursor
    );

    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", addHover);
      element.addEventListener("mouseleave", removeHover);
    });

    animateRing();

    return () => {
      window.removeEventListener(
        "mousemove",
        moveCursor
      );

      interactiveElements.forEach((element) => {
        element.removeEventListener(
          "mouseenter",
          addHover
        );

        element.removeEventListener(
          "mouseleave",
          removeHover
        );
      });
    };
  }, []);

  return (
    <>
      <div
        ref={cursorRef}
        className="custom-cursor"
      />

      <div
        ref={ringRef}
        className="custom-cursor-ring"
      />
    </>
  );
}

export default CustomCursor;