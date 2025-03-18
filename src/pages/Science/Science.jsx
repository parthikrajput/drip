import React, { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link, useLocation } from "react-router-dom";
import "./science.scss";

import s1 from "../../assets/img/s1.jpg";
import s2 from "../../assets/img/s2.jpg";
import s3 from "../../assets/img/s3.jpg";
import s4 from "../../assets/img/s4.jpg";
import s5 from "../../assets/img/s5.jpg";
import s6 from "../../assets/img/s6.jpg";
import s7 from "../../assets/img/s7.jpg";
import arrow from "../../assets/img/arrow.svg";
import blackBottel from "../../assets/img/bottleBlack1.png";
import arrow3 from "../../assets/img/arrow3.svg";
import arrow2 from "../../assets/img/arrow2.svg";
import lid from "../../assets/img/bottleLid.png";
import watre from "../../assets/img/iconWater.svg";
import hand from "../../assets/img/iconHand.svg";
import time from "../../assets/img/iconTime.svg";
import drop from "../../assets/img/iconDrop.svg";
import check from "../../assets/img/iconCheck.svg";
import close from "../../assets/img/iconClose.svg";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";

const images = [s1, s2, s3, s4, s5, s6, s7];

const Science = () => {
  const swiperRef = useRef(null);
  const location = useLocation();

  const faqData = [
    {
      question: "What is your return policy?",
      answer:
        "Our return policy allows you to return products within 30 days of purchase for a full refund.",
    },
    {
      question: "How do I track my order?",
      answer:
        "You can track your order by logging into your account and visiting the 'Order History' section.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping to most countries. Shipping costs and delivery times vary by location.",
    },
    {
      question: "How can I contact customer support?",
      answer:
        "You can contact our customer support team via email at support@example.com or by calling +1-800-123-4567.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, PayPal, and Apple Pay for your convenience.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  gsap.registerPlugin(ScrollTrigger);

  useEffect(() => {
    if (location.pathname === "/science") {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      gsap.registerPlugin(ScrollTrigger);

      const featuresSection02 = gsap.utils.toArray(
        "#section02-science .features .feature"
      );
      gsap.set(featuresSection02, { scale: 0, opacity: 0 });

      gsap.to(featuresSection02, {
        scale: 1,
        opacity: 1,
        ease: "power1.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#section02-science",
          start: "top 80%",
          end: "bottom top",
          scrub: true,
          markers: false,
        },
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: "#section02-header",
          pin: true,
          scrub: 1,
          markers: false,
          immediateRender: true,
        },
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#section02-science",
            pin: true,
            scrub: 1,
            markers: false,
            end: "+=" + window.innerHeight * 4,
            immediateRender: true,
          },
        })
        .to(
          "#section02-science .product",
          {
            scale: 0,
            duration: 2,
            ease: "power1.inOut",
          },
          0.15
        );

      const featuresSection03 = gsap.utils.toArray(
        "#section03-science .features .feature"
      );

      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#section03-science",
            pin: true,
            scrub: 1,
            markers: false,
            end: "+=" + window.innerHeight * 1.8,
            immediateRender: true,
          },
        })
        .fromTo(
          "#section03-science .lid",
          {
            display: "none",
            marginTop: "-100vh",
          },
          {
            display: "block",
            marginTop: "35vh",
            ease: "power1.inOut",
          },
          0
        )
        .to(
          "#section03-science .lid",
          {
            scale: 1,
            ease: "power1.inOut",
          },
          0.5
        );

      featuresSection03.forEach((feature, i) => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: "#section03-science",
              pin: false,
              scrub: true,
              markers: false,
              end: "+=" + window.innerHeight * 2,
              immediateRender: true,
            },
          })
          .to(
            feature,
            {
              scale: 1,
              ease: "power1.inOut",
              delay: i * 0.5,
            },
            3
          );
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: "#section04-science",
          pin: true,
          scrub: 1,
          start: "top top",
          end: "+=" + window.innerHeight * 2, // Adjust timing to allow full animation
          markers: false,
          immediateRender: true,
        },
      });

      // Animate each card appearing sequentially
      gsap.fromTo(
        "#section04-science .cards .card",
        {
          translateY: "40px",
          opacity: 0,
        },
        {
          translateY: "0px",
          opacity: 1,
          duration: 1.5,
          stagger: 0.5, // Delay between each card
          ease: "power2.out",
          scrollTrigger: {
            trigger: "#section04-science",
            start: "top 60%", // Starts earlier for smoother transition
            end: "bottom top",
            scrub: true,
            markers: false,
            invalidateOnRefresh: true,
            onComplete: () => {
              console.log(
                "Section 4 animation completed, moving to next section"
              );
            },
          },
        }
      );

      // Fade out cards before transition to next section
      gsap.to("#section04-science .cards", {
        opacity: 0,
        duration: 1,
        delay: 2, // Extra delay to ensure animation is seen
        scrollTrigger: {
          trigger: "#section04-science",
          start: "bottom 30%",
          end: "bottom top",
          scrub: true,
          markers: false,
          onLeave: () => {
            console.log("Section 4 completed, now scrolling to next section");
          },
        },
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: "#section05-science",
          pin: true,
          scrub: 1,
          markers: false,
          immediateRender: true,
        },
      });

      gsap.timeline({
        scrollTrigger: {
          trigger: "#section06-science",
          pin: true,
          scrub: 1,
          markers: false,
          immediateRender: true,
        },
      });
    }
  }, [location.pathname]);

  return (
    <div className="page-science">
      <div className="wrapper">
        <div id="section01-header" className="header">
          <h1>Make every sip as pure as possible.</h1>
          <p>
            Discover the Drip Aqua Purification Bottle, designed for style and
            health. Using UV-C technology, it purifies water in 3 minutes,
            eliminating 99.9% of bacteria.
          </p>
          <Link to="/shop" className="btn">
            Shop now
          </Link>
        </div>
        <div className="slider">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={false}
            pagination={{ clickable: false }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <img src={img} alt={`Slide ${index}`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
        <div id="section02-science" className="product-features">
          <h1>Product features</h1>
          <p> Where Innovation Flows, Hydration Glows</p>
          <div className="product">
            <div className="features">
              <div className="feature led">
                <img src={arrow} alt="" />
                <p>UV LED Sterilization with press of touchpad.</p>
              </div>
              <div className="feature aluminium inverted">
                <img src={arrow} alt="" />
                <p>Double walled aluminium.</p>
              </div>
              <div className="feature capacity inverted">
                <img src={arrow} alt="" />
                <p>600ML Capacity.</p>
              </div>
              <div className="feature sterilization">
                <img src={arrow} alt="" />
                <p>3Mins sterilization time.</p>
              </div>
              <div className="feature keeps inverted">
                <img src={arrow} alt="" />
                <p>Keeps water hot for 12hrs or cold for 24hrs.</p>
              </div>
              <div className="feature rubber">
                <img src={arrow} alt="" />
                <p>Rubber grip base.</p>
              </div>
            </div>
            <img className="main-image" src={blackBottel} alt="" />
          </div>
        </div>
        <div id="section03-science" className="product-features">
          <div className="lid">
            <div className="features">
              <div className="feature waterproof">
                <img src={arrow3} alt="" />
                <p>Waterproof rubber stopper.</p>
              </div>
              <div className="feature usbc inverted">
                <img src={arrow3} alt="" />
                <p>USB-C charging port</p>
              </div>
              <div className="feature uvc">
                <img src={arrow2} alt="" />
                <p>UVC light that kill 99.9% of bacteria</p>
              </div>
            </div>
            <img src={lid} alt="" />
          </div>
        </div>
      </div>
      <div className="wrapper gray">
        <div id="section04-science" className="how">
          <h1>How it works</h1>
          <p>Clarity through simplicity, that's how it works.</p>
          <div className="cards">
            <div className="card">
              <img src={watre} alt="" />
              <p>Fill your water from anywhere</p>
            </div>
            <div className="card">
              <img src={hand} alt="" />
              <p>
                Simply tap or double tap the touch screen located on the bottle
                lid.
              </p>
            </div>
            <div className="card">
              <img src={time} alt="" />
              <p>Allow 3 minutes for the bottle to purify your water</p>
            </div>
            <div className="card">
              <img src={drop} alt="" />
              <p>Enjoy your newly purified water!</p>
            </div>
          </div>
        </div>
      </div>
      <div id="section05-science" className="wrapper">
        <div className="comparison">
          <h1>Drip Bottle vs Plastic Bottle</h1>
          <p> Pure, Sustainable, and Stylish vs. Ordinary Plastic</p>
          <table>
            <tbody>
              <tr className="title">
                <th>Features</th>
                <th>Drip Bottle</th>
                <th>Plastic Bottle</th>
              </tr>
              <tr>
                <th>Kills Bacteria</th>
                <th>
                  <img src={check} alt="" />
                </th>
                <th>
                  <img src={close} alt="" />
                </th>
              </tr>
              <tr>
                <th>No bad odor</th>
                <th>
                  <img src={check} alt="" />
                </th>
                <th>
                  <img src={close} alt="" />
                </th>
              </tr>
              <tr>
                <th>Temperature Control</th>
                <th>
                  <img src={check} alt="" />
                </th>
                <th>
                  <img src={close} alt="" />
                </th>
              </tr>
              <tr>
                <th>Eco-Friendly</th>
                <th>
                  <img src={check} alt="" />
                </th>
                <th>
                  <img src={close} alt="" />
                </th>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div id="section06-science" className="wrapper">
        <div className="faq">
          <h1>FAQ</h1>
          <p>Got Questions? We've Got Answers!</p>
          <div className="faq-list">
            {faqData.map((faq, index) => (
              <div
                key={index}
                className={`faq-item ${activeIndex === index ? "active" : ""}`}
                onClick={() => toggleFAQ(index)}
              >
                <div className="faq-question">
                  <h3>{faq.question}</h3>
                  <span className="faq-icon">
                    {activeIndex === index ? (
                      <FaChevronUp />
                    ) : (
                      <FaChevronDown />
                    )}
                  </span>
                </div>
                {activeIndex === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Science;
