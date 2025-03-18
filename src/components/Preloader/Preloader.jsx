import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Preloader.scss";
import logoWave from "../../assets/img/logo-wave.svg";
import logoMask from "../../assets/img/logoMask.png";

const Preloader = ({ onComplete = () => {} }) => {
  const counterRef = useRef(null); // Counter Text Ref
  const progressBarRef = useRef(null); // Progress Bar Ref
  const preloaderContainerRef = useRef(null); // Preloader Container Ref
  const wave01Ref = useRef(null); // Wave 01 Ref
  const wave02Ref = useRef(null); // Wave 02 Ref

  useEffect(() => {
    let progressValue = { value: 0 };

    const progressTween = gsap.to(progressValue, {
      value: 100,
      duration: 3, // Adjust timing for a smooth effect
      ease: "power2.out",
      onUpdate: () => {
        const percentage = Math.round(progressValue.value);

        // Update counter
        if (counterRef.current) {
          counterRef.current.innerText = `${percentage}%`;
        }

        // Update progress bar width
        if (progressBarRef.current) {
          progressBarRef.current.style.width = `${percentage}%`;
        }

        // Update waves effect
        if (wave01Ref.current && wave02Ref.current) {
          wave01Ref.current.style.transform = `translateX(${
            (percentage - 100) / 2
          }%)`;
          wave02Ref.current.style.transform = `translateX(${50 - percentage}%)`;
        }
      },
      onComplete: () => {
        // Preloader fade out animation at the same time as counter reaches 100%
        if (preloaderContainerRef.current) {
          gsap.to(preloaderContainerRef.current, {
            opacity: 0,
            duration: 1,
            onComplete: () => {
              if (preloaderContainerRef.current) {
                preloaderContainerRef.current.style.display = "none";
              }
              onComplete();
            },
          });
        }
      },
    });

    // Cleanup GSAP animation on unmount
    return () => {
      progressTween.kill(); // Kill the GSAP animation
    };
  }, [onComplete]);

  return (
    <div
      id="preloader-container"
      className="preloader-container"
      ref={preloaderContainerRef}
    >
      <div id="preloader" className="fade show">
        <div className="intro-logo-wrapper">
          <img
            id="intro-logo"
            className="intro-logo-image"
            src={logoMask}
            alt="Drip logo"
          />
          <div className="waves-wrapper">
            <img id="wave01" src={logoWave} alt="logo wave" ref={wave01Ref} />
            <img id="wave02" src={logoWave} alt="logo wave" ref={wave02Ref} />
          </div>
        </div>
        <div className="progress-bar-container">
          <div ref={progressBarRef} className="progress-bar"></div>
        </div>
        <div className="counter-container">
          <div className="counter">
            <span ref={counterRef} className="number-slot-ones">
              0%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;
