import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { gsap } from "gsap";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";

function PageWrapper() {
  const location = useLocation();

  // Smooth GSAP Page Transition Animation
  useEffect(() => {
    gsap.from(".page", { opacity: 1, duration: 1, y: 20, ease: "power2.out" });
  }, [location]);

  // Dynamic Page Titles
  useEffect(() => {
    const pageTitles = {
      "/": "Home - Drip",
      "/about": "About - Drip",
      "/shop": "Shop - Drip",
      "/login": "Login - Drip",
      "/signup": "Signup - Drip",
    };
    document.title = pageTitles[location.pathname] || "Drip";
  }, [location]);

  return (
    <div className="page">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default PageWrapper;
