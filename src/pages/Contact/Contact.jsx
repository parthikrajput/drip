import React, { useState } from "react";
import "./contact.scss";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import office from "../../assets/img/iconOffice.svg";
import Address from "../../assets/img/iconAddress.svg";
import Phone from "../../assets/img/iconPhone.svg";

const Contact = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  // State for validation errors
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.subject) {
      newErrors.subject = "Subject is required";
    }

    if (!formData.message) {
      newErrors.message = "Message is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Form is valid, proceed with submission
      console.log("Form submitted:", formData);
      alert("Form submitted successfully!");
      // Reset form
      setFormData({ email: "", subject: "", message: "" });
      setErrors({});
    } else {
      console.log("Form has errors");
    }
  };
  // FAQ data
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

  // State to track which FAQ is open
  const [activeIndex, setActiveIndex] = useState(null);

  // Toggle FAQ answer visibility
  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Close the FAQ if it's already open
    } else {
      setActiveIndex(index); // Open the clicked FAQ
    }
  };
  return (
    <>
      <section className="contact">
        <h2>Contact Us</h2>
        <p>
          We use an agile approach to test assumptions and connect with the
          needs of <br /> your audience early and often.
        </p>
      </section>
      <div className="page-contact">
        <div className="wrapper">
          <div className="faq">
            <h3>How do I know it’s running out of battery?</h3>
            <p className="subtitle">
              The button will start to show a red light, indicating that you
              should charge at your earliest convenience with the USB-C wire
              provided.
            </p>
            <div className="faq-list">
              {faqData.map((faq, index) => (
                <div
                  key={index}
                  className={`faq-item ${
                    activeIndex === index ? "active" : ""
                  }`}
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
          <div className="from">
            <h3>get in touch</h3>
            <p className="subtitle">
              Got a technical issue? Want to send feedback about a beta feature?
              Need details about our Business plan? Let us know.
            </p>{" "}
            <form onSubmit={handleSubmit} noValidate>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Enter your email"
                  className={errors.email ? "error" : ""}
                />
                {errors.email && (
                  <span className="error-message">{errors.email}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Enter the subject"
                  className={errors.subject ? "error" : ""}
                />
                {errors.subject && (
                  <span className="error-message">{errors.subject}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Enter your message"
                  className={errors.message ? "error" : ""}
                />
                {errors.message && (
                  <span className="error-message">{errors.message}</span>
                )}
              </div>

              <button type="submit" className="submit-btn btn">
                Send Message
              </button>
            </form>
          </div>
        </div>
        <div className="address">
          <div className="column">
            <img src={office} alt="" />
            <b>Company information:</b>
            <p>Drip Aqua Ltd</p>
            <Link to="mailto:info@dripaqua.com">info@dripaqua.com</Link>
          </div>
          <div className="column">
            <img src={Address} alt="" />
            <b>Address:</b>
            <p>
              Mynshull House, Manchester
              <br />
              78 Churchgate
              <br /> SK1 1YJ
            </p>
          </div>
          <div className="column">
            <img src={Phone} alt="" />
            <b>Contact us:</b>
            <p>
              Email us for general queries, including marketing and partnership
              opportunities.
            </p>
            <Link to="mailto:info@dripaqua.com">info@dripaqua.com</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
