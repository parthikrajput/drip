import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "./shop.scss";
import blackBottol from "../../assets/img/bottleBlack1.png";
import blackBottom from "../../assets/img/bottleBlackBottom.png";

import p1 from "../../assets/img/iconCapacity.png";
import p2 from "../../assets/img/iconMaterial.svg";
import p3 from "../../assets/img/iconBattery.svg";
import p4 from "../../assets/img/iconCharge.svg";
import p5 from "../../assets/img/iconDisinfectant.svg";

// Import images
import black from "../../assets/img/black.jpg";
import blue from "../../assets/img/blue.png";
import white from "../../assets/img/white.jpg";
import o1 from "../../assets/img/o1.jpg";
import o2 from "../../assets/img/o2.jpg";
import o3 from "../../assets/img/o3.jpg";
import s1 from "../../assets/img/s1.jpg";
import s2 from "../../assets/img/s2.jpg";
import s3 from "../../assets/img/s3.jpg";
import s4 from "../../assets/img/s4.jpg";
import s5 from "../../assets/img/s5.jpg";
import s6 from "../../assets/img/s6.jpg";
import s7 from "../../assets/img/s7.jpg";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const products = {
  black: {
    title: "Drip Bottle - Onyx Black",
    price: "59.99",
    deprice: "69.99",
    description: "Self-cleaning water bottle with UV purification.",
    image: black,
  },
  blue: {
    title: "Drip Bottle - Azure Blue",
    price: "59.99",
    deprice: "69.99",
    description: "Advanced self-cleaning and durable bottle.",
    image: blue,
  },
  white: {
    title: "Drip Bottle - Pearl White",
    price: "59.99",
    deprice: "69.99",
    description: "Elegant and hygienic water bottle.",
    image: white,
  },
};

const otherImages = [o1, o2, o3];
const images = [s1, s2, s3, s4, s5, s6, s7];

const Shop = ({ addToCart }) => {
  const [selectedColor, setSelectedColor] = useState("black");
  const [mainImage, setMainImage] = useState(products[selectedColor].image);
  const [quantity, setQuantity] = useState(1);
  const swiperRef = useRef(null);
  const sectionRef = useRef(null);
  const [added, setAdded] = useState(false);

  // Handle color change
  const handleColorChange = (color) => {
    setSelectedColor(color);
    setMainImage(products[color].image);
  };

  // Quantity Controls
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () => setQuantity((prev) => Math.max(1, prev - 1));

  // Add to Cart
  const handleAddToCart = () => {
    const product = {
      ...products[selectedColor],
      color: selectedColor,
      quantity,
    };
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    localStorage.setItem("cart", JSON.stringify([...existingCart, product]));
    addToCart(product);
    setAdded(true);

    // Reset the button text after 2 seconds
    setTimeout(() => setAdded(false), 2000);
  };

  // GSAP Animations
  useEffect(() => {
    // Normalize scroll for mobile devices
    ScrollTrigger.normalizeScroll(true);

    // Section 1 Animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#section01-shop",
        start: "top center",
        end: "bottom center",
        scrub: 1,
        markers: false,
      },
    });

    tl.fromTo(
      ".gallery",
      { y: "20vh", opacity: 0 },
      { y: "0vh", opacity: 1, duration: 2, ease: "power4.out" }
    ).fromTo(
      ".content",
      { y: "-20vh", opacity: 0 },
      { y: "0vh", opacity: 1, duration: 2, ease: "power4.out" },
      "<"
    );

    // Section 2 Animations
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section02-shop",
        start: "top 70%",
        end: "bottom 85%",
        scrub: 1.25,
        markers: false,
      },
    });

    tl2
      .fromTo(
        ".header",
        { y: "-7vh", opacity: 0 },
        { opacity: 1, y: "0vh", duration: 2, ease: "power4.out" }
      )
      .fromTo(
        ".swiper",
        { y: "5vh", opacity: 0 },
        { opacity: 1, y: "0vh", duration: 2, ease: "power4.out" },
        0
      );

    // Section 3 Animations
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: "#section03-shop",
        start: "top center",
        end: "+=200vh",
        scrub: 2,
        pin: true,
        markers: false,
      },
    });

    tl3
      .fromTo("#section03-shop", { opacity: 0 }, { opacity: 1, duration: 2 }, 0)
      .fromTo(
        "#section03-shop .wrapper:nth-child(1), #section03-shop .wrapper:nth-child(2)",
        { y: "50vh", opacity: 0 },
        { y: "0vh", opacity: 1, duration: 4, ease: "power2.inOut" },
        1
      )
      .fromTo(
        "#section03-shop .bottle-container",
        { y: "-30vh", opacity: 0, rotateZ: "-45deg" },
        {
          y: "10vh",
          opacity: 1,
          rotateZ: "0deg",
          duration: 5,
          ease: "power2.inOut",
        },
        "<+=0.5"
      )
      .to(
        "#section03-shop .wrapper:nth-child(1), #section03-shop .wrapper:nth-child(2)",
        { y: "-20vh", opacity: 0, duration: 3, ease: "power2.inOut" },
        "+=1"
      )
      .to(
        "#section03-shop .bottle-container",
        { scale: 2, y: "-10vh", duration: 5, ease: "power2.inOut" },
        "<"
      )
      .fromTo(
        "#section03-shop .wrapper:nth-child(4), #section03-shop .wrapper:nth-child(5)",
        { y: "20vh", opacity: 0 },
        { y: "0vh", opacity: 1, duration: 5, ease: "power2.inOut" },
        "-=2"
      )
      .to(
        "#section03-shop .wrapper:nth-child(4), #section03-shop .wrapper:nth-child(5)",
        { y: "-30vh", opacity: 0, duration: 5, ease: "power2.inOut" },
        "+=2"
      )
      .to(
        "#section03-shop .bottle-container",
        { y: "50vh", opacity: 0, duration: 5, ease: "power2.inOut" },
        "<"
      );

    // Cleanup GSAP instances on unmount
    return () => {
      tl.kill();
      tl2.kill();
      tl3.kill();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* Section 1 - Product Details */}
      <section className="shop-page" id="section01-shop">
        <div className="row">
          {/* Gallery */}
          <div className="gallery">
            <div className="main-img">
              <img src={mainImage} alt={products[selectedColor].title} />
            </div>
            <div className="gallery-group">
              {otherImages.map((img, index) => (
                <div
                  className="other-image"
                  key={index}
                  onClick={() => setMainImage(img)}
                >
                  <img src={img} alt="Thumbnail" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="content">
            <h2>{products[selectedColor].title}</h2>
            <div className="price">
              <span className="main">£{products[selectedColor].price}</span>
              <span className="deprice">
                £{products[selectedColor].deprice}
              </span>
            </div>
            <p className="desc">{products[selectedColor].description}</p>

            {/* Color Selection */}
            <div className="colors">
              <p>Pick color</p>
              {Object.keys(products).map((color) => (
                <button
                  key={color}
                  className={`color-btn ${color} ${
                    selectedColor === color ? "active" : ""
                  }`}
                  onClick={() => handleColorChange(color)}
                ></button>
              ))}
            </div>

            {/* Quantity & Add to Cart */}
            <div className="qua-cart">
              <div className="quantity-control">
                <button onClick={decreaseQuantity}>-</button>
                <span>{quantity}</span>
                <button onClick={increaseQuantity}>+</button>
              </div>
              <button
                className="add-to-cart btn"
                onClick={handleAddToCart}
                disabled={added}
              >
                {added ? "Added to Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2 - Swiper Gallery */}
      <section id="section02-shop" ref={sectionRef}>
        <div className="row">
          <div className="header">
            <h2>Explore Drip in Action</h2>
            <p>Experience the Innovation and Elegance of Drip</p>
          </div>

          <div className="slider">
            <Swiper
              modules={[Navigation]}
              spaceBetween={10}
              slidesPerView={1}
              loop={true}
              onSwiper={(swiper) => (swiperRef.current = swiper)}
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img src={img} alt={`Slide ${index}`} />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Swiper Navigation */}
            <button
              className="prev"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              ❮
            </button>
            <button
              className="next"
              onClick={() => swiperRef.current?.slideNext()}
            >
              ❯
            </button>
          </div>
        </div>
      </section>

      {/* Section 3 - Bottle Animation */}
      <section id="section03-shop">
        <div className="wrapper">
          <h1>Purify</h1>
          <h2>in Style</h2>
        </div>
        <div className="wrapper">
          <p>
            The Drip Aqua Purification Bottle has been specifically designed to
            have an aesthetic look and feel - whilst providing clear health
            benefits; removing up to 99.9% of harmful bacteria. Drip uses UV-C
            technology to purify your water in just 3 minutes.
          </p>
        </div>
        <div className="bottle-container">
          <div className="image">
            <img className="bottle" src={blackBottol} alt="Drip Bottle" />
            <img className="base" src={blackBottom} alt="Drip Base" />
          </div>
        </div>
        <div className="wrapper">
          <h1>Stable</h1>
          <h2>Bottom</h2>
        </div>
        <div className="wrapper">
          <p>
            Drip comes with a rubber padding on the bottom of the bottle - to
            keep the bottle stable, and to prevent unnecessary clanging on
            harder surfaces.
          </p>
        </div>
      </section>

      {/* Section 4 - Product Information */}
      <section id="section04-shop">
        <div className="wrapper black">
          <h2>Product Information:</h2>
          <div className="product-information">
            <div className="pin">
              <img src={p1} alt="" />
              <h4>Capacity</h4>
              <h5>600ml</h5>
            </div>
            <div className="pin">
              <img src={p2} alt="" />
              <h4>Material</h4>
              <h5>Stainless steel</h5>
            </div>
            <div className="pin">
              <img src={p3} alt="" />
              <h4>Battery capacity</h4>
              <h5>5000mAh</h5>
            </div>
            <div className="pin">
              <img src={p4} alt="" />
              <h4>Charge Mode</h4>
              <h5>USB</h5>
            </div>
            <div className="pin">
              <img src={p5} alt="" />
              <h4>Disinfectant Rate</h4>
              <h5>99.9%</h5>
            </div>
          </div>

          <h2>How it Works:</h2>
          <div className="table">
            <div className="table-title">
              <p>
                <span>01.</span> Fill you water from anywhere
              </p>
            </div>
            <div className="table-title">
              <p>
                <span>02.</span> Simply tap or double tap the touch screen
                located on the bottle lid.
              </p>
            </div>
            <div className="table-title">
              <p>
                <span>03.</span> Allow 3 minutes for the bottle to purify your
                water
              </p>
            </div>
            <div className="table-title">
              <p>
                <span>04.</span> Enjoy your newly purified water!
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Shop;
