import React, { useState } from "react";
import faqImg from "../images/hero banner.png"; // replace with your image

const faqQuestions = [
  {
    question: "How Affiliate Works?",
    answer:
      "Affiliates earn commissions by sharing referral links with users and can track performance in their dashboard.",
  },
  {
    question: "How can a subscriber opt out?",
    answer:
      "Subscribers can unsubscribe anytime using the link provided in the email footer.",
  },
  {
    question: "Are there restrictions on regions or IPs?",
    answer:
      "Yes, you can restrict access by country, region, or IP address for compliance.",
  },
  {
    question: "Legal Compliance?",
    answer:
      "All links and campaigns comply with CAN-SPAM, GDPR, and other global regulations.",
  },
  {
    question: "Getting Started",
    answer:
      "Sign up, shorten your first URL, and manage all your links from a simple dashboard.",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-[#fff8e7] py-24">
      <div className="max-w-7xl mx-auto px-6">

        {/* -------- TOP PART: Illustration + Title -------- */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
          {/* Illustration - Significant Size Increase */}
          <div className="lg:w-1/2 flex justify-center">
            <img
              src={faqImg}
              alt="FAQ Illustration"
              className="w-full max-w-2xl drop-shadow-xl" 
            />
          </div>

          {/* Title & Subtitle - Significant Size Increase */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <h2 className="text-5xl md:text-5xl font-black text-gray-900 mb-8 leading-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-600 text-xl md:text-2xl max-w-2xl leading-relaxed">
              Have questions about our URL shortener? Here are some answers that can help you quickly.
            </p>
          </div>
        </div>

        {/* -------- BOTTOM PART: Accordion FAQ List -------- */}
        <div className="max-w-4xl mx-auto space-y-6">
          {faqQuestions.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-10 py-8 flex justify-between items-center text-left hover:bg-gray-50 transition-colors"
              >
                <span className="text-gray-900 font-bold text-xl md:text-xl pr-4">
                  {item.question}
                </span>
                <svg
                  className={`w-8 h-8 text-blue-600 transition-transform duration-300 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openIndex === index && (
                <div className="px-10 pb-8 text-gray-600 text-lg md:text-xl leading-relaxed border-t border-gray-100 pt-4">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;