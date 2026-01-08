import React from "react";
import { motion } from "framer-motion";
import heroImage from "../images/hero-bg1.png";
import { Link, Heart } from "lucide-react"; 

const Hero = () => {

  // Floating animation variants
  const floatVariants = {
    float1: {
      y: [0, -20, 10, -15, 0],
      x: [0, 15, -10, 10, 0],
      rotate: [0, 15, -10, 10, 0],
      transition: { duration: 8, repeat: Infinity, ease: "easeInOut" },
    },
    float2: {
      y: [0, -25, 15, -10, 0],
      x: [0, -20, 10, -15, 0],
      rotate: [0, -15, 10, -10, 0],
      transition: { duration: 10, repeat: Infinity, ease: "easeInOut" },
    },
    float3: {
      y: [0, -15, 10, -10, 0],
      x: [0, 10, -5, 5, 0],
      rotate: [0, 10, -5, 5, 0],
      transition: { duration: 7, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <section className="relative w-full flex flex-col-reverse md:flex-row items-center px-4 sm:px-6 md:px-12 bg-[#FFE2AF] overflow-hidden min-h-[650px] sm:min-h-[700px]">

      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent pointer-events-none" />

      {/* Floating Circles */}
      <div className="absolute top-10 left-5 w-24 h-24 sm:w-32 sm:h-32 bg-[#FDE7B3] blur-3xl rounded-full animate-blob opacity-60"></div>
      <div className="absolute top-40 right-5 w-32 h-32 sm:w-40 sm:h-40 bg-[#E2852E] blur-3xl rounded-full animate-blob animation-delay-2000 opacity-40"></div>
      <div className="absolute bottom-10 left-1/4 w-16 h-16 sm:w-24 sm:h-24 bg-[#FFC400] blur-2xl rounded-full animate-blob animation-delay-1000 opacity-50"></div>

      {/* Floating Link Icons */}
      <div className="absolute top-1/3 left-1/4 w-5 h-5 sm:w-6 sm:h-6 text-[#E2852E]/60 animate-float-slow"><Link /></div>
      <div className="absolute top-1/2 right-1/4 w-5 h-5 sm:w-6 sm:h-6 text-[#FFC400]/60 animate-float animation-delay-500"><Link /></div>

      {/* "Butterflies" using icons */}
      <motion.div
        className="absolute top-20 left-10 text-[#E2852E] w-6 h-6 sm:w-8 sm:h-8"
        animate={floatVariants.float1}
      >
        <Heart />
      </motion.div>
      <motion.div
        className="absolute right-30 left-10 text-[#E2852E] w-6 h-6 sm:w-8 sm:h-8"
        animate={floatVariants.float2}
      >
        <Heart />
      </motion.div>
      <motion.div
        className="absolute top-20 left-10 text-[#E2852E] w-6 h-6 sm:w-8 sm:h-8"
        animate={floatVariants.float1}
      >
        <Heart />
      </motion.div>
      <motion.div
        className="absolute top-40 right-20 text-[#FFC400] w-8 h-8 sm:w-10 sm:h-10"
        animate={floatVariants.float2}
      >
        <Heart />
      </motion.div>
      <motion.div
        className="absolute bottom-20 left-1/2 text-[#FDE7B3] w-5 h-5 sm:w-6 sm:h-6"
        animate={floatVariants.float3}
      >
        <Heart />
      </motion.div>

      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between w-full h-full z-10">

        {/* LEFT: Hero Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-start items-center">
          <img
            src={heroImage}
            alt="Hero Illustration"
            className="w-4/5 sm:w-3/5 md:w-full max-w-[500px] md:max-w-none object-contain drop-shadow-2xl"
          />
        </div>

        {/* RIGHT: Text + CTA */}
        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-4 md:space-y-6 text-center md:text-left px-2 sm:px-0">
          <span className="text-[#E2852E] font-bold tracking-widest uppercase text-xs sm:text-sm">
            Fast • Secure • Analytics
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-[#2D2D2D] leading-snug md:leading-[1.1]">
            Turn Long Links Into <span className="text-[#E2852E]">Smart Shares</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-800 max-w-md sm:max-w-lg leading-relaxed font-medium mx-auto md:mx-0">
            Experience the next-gen URL shortener—secure, fast, and equipped with live analytics to help you grow smarter.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center md:justify-start">
            <button className="bg-[#E2852E] text-white text-base sm:text-lg font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl shadow-lg shadow-[#E2852E]/30 hover:bg-[#c97223] hover:-translate-y-1 transition-all duration-300">
              Get Started Free
            </button>
            <button className="bg-white/40 backdrop-blur-md border-2 border-[#E2852E]/20 text-[#2D2D2D] text-base sm:text-lg font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-2xl hover:bg-white transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
