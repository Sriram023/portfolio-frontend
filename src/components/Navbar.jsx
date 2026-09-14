import { useEffect, useState } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header
      className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}
    >
      <a
        href="#home"
        className="brand"
        onClick={closeMenu}
      >
        SRIRAM<span>.</span>
      </a>

      <nav
        className={`nav-links ${
          menuOpen ? "nav-open" : ""
        }`}
      >
        <a href="#home" onClick={closeMenu}>
          Home
        </a>

        <a href="#work" onClick={closeMenu}>
          Work
        </a>

        <a href="#services" onClick={closeMenu}>
          Services
        </a>

        <a href="#about" onClick={closeMenu}>
          About
        </a>

        <a href="#contact" onClick={closeMenu}>
          Contact
        </a>
      </nav>

      <a
        href="#contact"
        className="nav-cta magnetic"
        onClick={closeMenu}
      >
        Let's Talk <span>↗</span>
      </a>

      <button
        type="button"
        className={`menu-button ${
          menuOpen ? "active" : ""
        }`}
        onClick={() =>
          setMenuOpen((open) => !open)
        }
        aria-label={
          menuOpen
            ? "Close navigation"
            : "Open navigation"
        }
        aria-expanded={menuOpen}
      >
        <span />
        <span />
      </button>
    </header>
  );
}

export default Navbar;