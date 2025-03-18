import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import bottle1 from "../../assets/img/bottle_animation_01.jpg";
import bottle2 from "../../assets/img/bottle_animation_02.png";
import bottle3 from "../../assets/img/bottle_animation_03.png";
import blackbottle from "../../assets/img/bottleBlack.png";
import "./about.scss";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Mobile detection function
const isMobile = () => window.innerWidth <= 1025;

// GSAP Animation Setup
const gsapAboutSetup = () => {
  // Smooth scroll to the section (fix for 'scrollTo' error)
  gsap.to(window, {
    duration: 2,
    scrollTo: { y: "#section01-about", autoKill: true },
    ease: "power2.inOut",
  });

  // Check if the section exists
  if (document.querySelector("#section01-about")) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section01-about",
        pin: true,
        scrub: 1,
        markers: false,
        end: "+=" + window.innerHeight * 5,
      },
    });

    // Animation sequence
    tl.fromTo(
      "#section01-about .animation",
      { marginLeft: isMobile() ? "-300%" : "-115%" },
      { marginLeft: "0%", duration: 4, ease: "power3.inOut" },
      0
    )
      .fromTo(
        "#section01-about .animation img:nth-child(2)",
        { marginLeft: "-400px" },
        { marginLeft: "130px", duration: 4, ease: "power3.inOut" },
        0
      )
      .fromTo(
        "#section01-about .titlehed, #section01-about .text",
        { xPercent: "-300" },
        { xPercent: "0", duration: 4, ease: "power3.inOut" },
        0
      )
      .to("#section01-about .titlehed", { duration: 4 }, 5)
      .to(
        "#section01-about .animation",
        {
          scale: "1.5",
          translateY: isMobile() ? "320px" : "250px",
          duration: 4,
          ease: "power3.inOut",
        },
        6
      )
      .to(
        "#section01-about .text",
        { marginTop: "0px", duration: 4, ease: "power3.inOut" },
        6.5
      )
      .to(
        "#section01-about .animation img:nth-child(2)",
        { marginLeft: "700px", duration: 4, ease: "power3.inOut" },
        8
      )
      .to(
        "#section01-about .animation",
        {
          marginLeft: isMobile() ? "350%" : "150%",
          duration: 4,
          ease: "power3.inOut",
        },
        10
      )
      .to(
        "#section01-about .text",
        { translateX: "200%", duration: 4, ease: "power3.inOut" },
        10
      )
      .to(
        "#section01-about .bottle-container",
        { opacity: "0", duration: 4, ease: "power3.inOut" },
        13
      )
      .to(
        "#section01-about .p2 .bottle-container-p2",
        { translateY: "0vh", duration: 4, ease: "power3.inOut" },
        13
      )
      .to(
        "#section01-about .p2 .text-p2",
        { translateY: "0vh", duration: 4, ease: "power3.inOut" },
        13
      );
  }
};

// About Component
const About = () => {
  useEffect(() => {
    gsapAboutSetup(); // Initialize the GSAP animations

    // Cleanup ScrollTrigger instances on unmount
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section>
      <div id="content" className="smooth-content">
        <div id="section01-about" className="container section">
          <div className="box">
            <div className="wrapper titlehed">
              <h2>Our</h2>
              <h1>Story</h1>
            </div>
            <div className="wrapper text">
              <p className="text01">
                Drip was created with the intention of helping its customers and
                those in need to live longer, healthier lives by combining the
                use of smart technology with water to provide a pure and clean
                solution to water. Drip is on a mission to change how people
                consume their water. With the technology that is available to us
                - pure water should be something that is both desired by and
                accessible to all.
              </p>
            </div>
            <div className="bottle-container">
              <div className="image animation">
                <img src={bottle3} alt="Bottle 3" />
                <img src={bottle2} alt="Bottle 2" />
                <img src={bottle1} alt="Bottle 1" />
              </div>
            </div>
            <div className="p2">
              <div className="wrapper text-p2">
                <p className="text02">
                  Unfortunately, there are still nearly 2 billion people [WBO
                  2023 Report] who do not have access to any form of clean
                  water. This is unacceptable, which is why the long-term vision
                  of Drip Aqua is to contribute significantly into reducing that
                  number to 0.
                </p>
              </div>
              <div className="bottle-container-p2">
                <img src={blackbottle} alt="Black Bottle" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
