import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./home.scss";
import down from "../../assets/img/caret-down.svg";
import { Link } from "react-router-dom";
import buy from "../../assets/img/btnBuyNow.svg";
import Preloader from "../../components/Preloader/Preloader";

gsap.registerPlugin(ScrollTrigger);

// Preload images dynamically
const totalFrames = 750;
const images = Array.from({ length: totalFrames + 1 }, (_, i) =>
  require(`../../assets/img/desktop/anim_${String(i).padStart(3, "0")}.webp`)
);

// Define sections with frame ranges
const sections = [
  { id: "section-0", startFrame: 0, endFrame: 30 },
  { id: "section-1", startFrame: 31, endFrame: 59 },
  { id: "section-2", startFrame: 60, endFrame: 120 },
  { id: "section-3", startFrame: 121, endFrame: 160 },
  { id: "section-4", startFrame: 161, endFrame: 220 },
  { id: "section-5", startFrame: 221, endFrame: 270 },
  { id: "section-6", startFrame: 271, endFrame: 400 },
  { id: "section-7", startFrame: 401, endFrame: 640 },
  { id: "section-8", startFrame: 641, endFrame: 700 },
  { id: "section-9", startFrame: 701, endFrame: 750 },
  { id: "section-10", startFrame: 751, endFrame: totalFrames },
];

const Home = () => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const imageRef = useRef(new Image());
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all images
  useEffect(() => {
    const preloadImages = async () => {
      const promises = images.map((src) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      await Promise.all(promises);
      setImagesLoaded(true); // Set imagesLoaded to true after all images are preloaded
    };

    preloadImages();
  }, []);

  // Initialize GSAP and canvas animations after images are loaded
  useEffect(() => {
    if (!imagesLoaded) return; // Exit if images are not loaded

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    contextRef.current = context;

    const image = new Image();
    image.src = images[0];
    image.onload = () => {
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
    imageRef.current = image;

    const render = (index) => {
      const image = new Image();
      image.src = images[index];
      image.onload = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
      };
    };

    // Set up GSAP animations for each section
    sections.forEach(({ id, startFrame, endFrame }) => {
      gsap.to(imageRef, {
        frame: endFrame,
        snap: "frame",
        ease: "none",
        scrollTrigger: {
          trigger: `#${id}`,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          onUpdate: (self) => {
            const frame = Math.round(
              startFrame + self.progress * (endFrame - startFrame)
            );
            render(frame);
          },
        },
      });

      gsap.fromTo(
        `#${id}`,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: `#${id}`,
            start: "top bottom",
            end: "bottom center",
            scrub: 1,
          },
        }
      );

      gsap.to(`#${id}`, {
        opacity: 0,
        scrollTrigger: {
          trigger: `#${id}`,
          start: "bottom center",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    // Section-specific animations
    gsap.fromTo(
      "#section-0 .box",
      { opacity: 1, xPercent: 0 },
      {
        opacity: 0,
        xPercent: 150,
        scrollTrigger: {
          trigger: "#section-0",
          start: "top top",
          end: "bottom center",
          scrub: 2,
        },
      }
    );

    gsap.fromTo(
      "#section-0 .scroll-down-invitation",
      { opacity: 1 },
      {
        opacity: 0,
        scrollTrigger: {
          trigger: "#section-0",
          start: "top top",
          end: "bottom 50%",
          scrub: 2,
        },
      }
    );

    gsap.fromTo(
      "#section-1 .box .wrapper:nth-child(1)",
      { xPercent: -150 },
      {
        xPercent: 0,
        scrollTrigger: {
          trigger: "#section-1",
          start: "top center",
          end: "bottom center",
          scrub: 2,
        },
      }
    );

    gsap.fromTo(
      "#section-1 .box .wrapper:nth-child(2)",
      { xPercent: -150 },
      {
        xPercent: 0,
        scrollTrigger: {
          trigger: "#section-1",
          start: "top center",
          end: "bottom center",
          scrub: 2,
        },
      }
    );
    gsap.fromTo(
      "#section-2 .box .wrapper:nth-child(1)",
      { xPercent: -150 },
      {
        xPercent: 0,
        scrollTrigger: {
          trigger: "#section-2",
          start: "top center",
          end: "bottom center",
          scrub: 2,
        },
      }
    );

    gsap.fromTo(
      "#section-2 .box .wrapper:nth-child(2)",
      { xPercent: 150 },
      {
        xPercent: 0,
        scrollTrigger: {
          trigger: "#section-2",
          start: "top center",
          end: "bottom center",
          scrub: 2,
        },
      }
    );
    gsap.fromTo(
      "#section-3 .box .wrapper:nth-child(2)",
      { opacity: 0, yPercent: -150 }, // Starts from above
      {
        opacity: 1,
        yPercent: 0, // Moves to normal position
        scrollTrigger: {
          trigger: "#section-3",
          start: "top center",
          end: "bottom center",
          scrub: 2, // Smooth transition
        },
      }
    );
    gsap.fromTo(
      "#section-4 .box .wrapper:nth-child(1)",
      { opacity: 0, yPercent: 150 }, // Starts from below
      {
        opacity: 1,
        yPercent: 0, // Moves to normal position
        scrollTrigger: {
          trigger: "#section-4",
          start: "top center",
          end: "bottom center",
          scrub: 2, // Smooth transition
        },
      }
    );

    gsap.fromTo(
      "#section-4 .box .wrapper:nth-child(2)",
      { opacity: 0, yPercent: -150 }, // Starts from above
      {
        opacity: 1,
        yPercent: 0, // Moves to normal position
        scrollTrigger: {
          trigger: "#section-4",
          start: "top center",
          end: "bottom center",
          scrub: 2, // Smooth transition
        },
      }
    );
    gsap.fromTo(
      "#section-5 .box .wrapper:nth-child(1)",
      { opacity: 0, yPercent: 150 }, // Starts from below
      {
        opacity: 1,
        yPercent: 0, // Moves to normal position
        scrollTrigger: {
          trigger: "#section-5",
          start: "top center",
          end: "bottom center",
          scrub: 2, // Smooth transition
        },
      }
    );

    gsap.fromTo(
      "#section-5 .box .wrapper:nth-child(2)",
      { opacity: 0, yPercent: -150 }, // Starts from above
      {
        opacity: 1,
        yPercent: 0, // Moves to normal position
        scrollTrigger: {
          trigger: "#section-5  ",
          start: "top center",
          end: "bottom center",
          scrub: 2, // Smooth transition
        },
      }
    );
    gsap.fromTo(
      "#section-6 .box",
      { opacity: 0, xPercent: 150 }, // Starts from left
      {
        opacity: 1,
        xPercent: 0, // Moves to normal position
        scrollTrigger: {
          trigger: "#section-6",
          start: "top center",
          end: "bottom center",
          scrub: 2, // Smooth transition
        },
      }
    );
    gsap.fromTo(
      "#section-7 .box",
      { opacity: 0, yPercent: 150 }, // Start position (off-screen left)
      {
        opacity: 1,
        yPercent: 0, // Moves to normal position
        scrollTrigger: {
          trigger: "#section-7",
          start: "top center",
          end: "bottom center",
          scrub: 2, // Smooth transition
        },
      }
    );
    gsap.fromTo(
      "#section-8 .box .wrapper:nth-child(1)",
      { opacity: 0, xPercent: -150 }, // Start position (off-screen left)
      {
        opacity: 1,
        xPercent: 0, // Moves to normal position
        scrollTrigger: {
          trigger: "#section-8",
          start: "top center",
          end: "bottom center",
          scrub: 2, // Smooth scroll effect
        },
      }
    );
    gsap.fromTo(
      "#section-8 .box .wrapper:nth-child(2)",
      { opacity: 0, xPercent: 150 }, // Start position (off-screen right)
      {
        opacity: 1,
        xPercent: 0, // Moves to normal position
        scrollTrigger: {
          trigger: "#section-8",
          start: "top center",
          end: "bottom center",
          scrub: 2, // Smooth scroll effect
        },
      }
    );
    gsap.fromTo(
      "#section-9 .box",
      { opacity: 0, yPercent: 150 }, // Start position (above the screen)
      {
        opacity: 1,
        yPercent: 0, // Moves to normal position
        scrollTrigger: {
          trigger: "#section-9",
          start: "top center",
          end: "bottom center",
          scrub: 2, // Smooth scroll effect
        },
      }
    );
    gsap.fromTo(
      "#section-10 .wrapper",
      { opacity: 0, yPercent: -100, scale: 0 }, // Start position (above screen & scaled down)
      {
        opacity: 1,
        yPercent: 0, // Moves to normal position
        scale: 1, // Scales up to normal size
        scrollTrigger: {
          trigger: "#section-10",
          start: "top center",
          end: "bottom center",
          scrub: 2, // Smooth scroll effect
        },
      }
    );
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.killTweensOf(imageRef);
    };
  }, [imagesLoaded]);

  return (
    <>
      {!imagesLoaded && <Preloader />}
      {imagesLoaded && (
        <div className="home">
          <div className="container">
            <div className="landing-canvas">
              <canvas ref={canvasRef} width={1920} height={1080}></canvas>
            </div>
            <div className="sections">
              {sections.map(({ id }) => (
                <div key={id} id={id} className="section">
                  {id === "section-0" && (
                    <div className="fixed-scene-content-container">
                      <div className="box">
                        <div className="wrapper">
                          <h1>The Future</h1>
                          <h2>Of Hydration</h2>
                        </div>
                      </div>
                      <div className="scroll-down-invitation">
                        Scroll Down
                        <img src={down} alt="down" />
                      </div>
                    </div>
                  )}
                  {id === "section-1" && (
                    <div className="fixed-scene-content-container">
                      <div className="box">
                        <div className="wrapper">
                          <h1>UV-C</h1>
                          <h2>Water Bottle</h2>
                        </div>
                        <div className="wrapper">
                          <p>
                            Introducing our UV-C powered water bottle, the
                            ultimate solution for clean, purified water on the
                            go. With a button touch, it purifies your water in 3
                            minutes, ensuring safe and clean drinking water
                            anywhere.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {id === "section-2" && (
                    <div className="fixed-scene-content-container">
                      <div className="box">
                        <div className="wrapper">
                          <h1>Sleek</h1>
                          <h2>Design</h2>
                        </div>
                        <div className="wrapper">
                          <p>
                            Immerse yourself in the sleek and sophisticated
                            design of our stainless steel water bottle,
                            featuring an engraved DRIP logo.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {id === "section-3" && (
                    <div className="fixed-scene-content-container">
                      <div className="box">
                        <div className="wrapper"></div>
                        <div className="wrapper">
                          <p>
                            Drip comes with a rubber padding on the bottom of
                            the bottle to keep the bottle stable, and to prevent
                            unnecessary clanging on harder surfaces.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {id === "section-4" && (
                    <div className="fixed-scene-content-container">
                      <div className="box">
                        <div className="wrapper">
                          <h1>Stainless</h1>
                          <h2>Steel</h2>
                        </div>
                        <div className="wrapper">
                          <h2>Capacity</h2>
                          <h1>600ml</h1>
                        </div>
                      </div>
                    </div>
                  )}
                  {id === "section-5" && (
                    <div className="fixed-scene-content-container">
                      <div className="box">
                        <div className="wrapper">
                          <h1>Long</h1>
                          <h2>Lasting</h2>
                        </div>
                        <div className="wrapper">
                          <p>
                            Crafted with premium quality stainless steel, and
                            coupled with a rubber padding on the bottom to keep
                            the bottle stable and clanging-free, this bottle not
                            only looks stunning but also offers durability and
                            longevity.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {id === "section-6" && (
                    <div className="fixed-scene-content-container">
                      <div className="box">
                        <div className="wrapper">
                          <h2>Charging Type</h2>
                          <h1>USB-C</h1>
                        </div>
                      </div>
                    </div>
                  )}
                  {id === "section-7" && (
                    <div className="fixed-scene-content-container">
                      <div className="box">
                        <div className="wrapper">
                          <h2>
                            Battery
                            <br />
                            Capacity
                          </h2>
                          <h1>5000</h1>
                          <h2>mAh</h2>
                        </div>
                      </div>
                    </div>
                  )}
                  {id === "section-8" && (
                    <div className="fixed-scene-content-container">
                      <div className="box">
                        <div className="wrapper">
                          <h2>
                            Say Goodbye to <br />
                            Single Use
                          </h2>
                          <h1>Water</h1>
                          <h2>Bottles</h2>
                        </div>
                        <div className="wrapper">
                          <p>
                            Our UV-C powered water bottle is not only convenient
                            but also environmentally friendly, helping you
                            reduce your carbon footprint while staying hydrated.
                            Join the movement towards sustainable hydration with
                            our UV-C powered water bottle – the perfect
                            companion for your active lifestyle.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  {id === "section-9" && (
                    <div className="fixed-scene-content-container">
                      <div className="box">
                        <div className="wrapper">
                          <h2>
                            Disinfection
                            <br />
                            Rate
                          </h2>
                          <h1>99%</h1>
                        </div>
                      </div>
                    </div>
                  )}
                  {id === "section-10" && (
                    <div className="fixed-scene-content-container">
                      <div className="box">
                        <div></div>
                        <div className="wrapper center">
                          <h2>Ready to experience smart hydration?</h2>
                          <Link to="/shop" className="button">
                            Buy now <img src={buy} alt="" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
