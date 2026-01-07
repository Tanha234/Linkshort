import React from "react";
import howItWorksImg from "../images/how-it-works.png";

const HowItWorks = () => {
  const steps = [
    {
      title: "Create Your Account",
      desc: "Sign up to start shortening your URLs with a personalized dashboard.",
    },
    {
      title: "Setup your Account",
      desc: "Configure your profile and preferences for a tailored experience.",
    },
    {
      title: "Start Shortening",
      desc: "Paste your long URL and get a branded short link instantly.",
    },
    {
      title: "Manage Links",
      desc: "Track real-time clicks and manage your URLs with deep analytics.",
    },
  ];

  return (
    <section className="bg-[#fff8e7] py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Left Side: The Visual Anchor */}
          <div className="w-full lg:w-1/2 relative">
            {/* Unique Decorative Element: Rotating dashed circle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border-2 border-dashed border-[#E2852E]/20 rounded-full animate-spin-slow"></div>
            
            <div className="relative z-10 p-4 bg-white rounded-[2rem] shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700">
              <img
                src={howItWorksImg}
                alt="Process Illustration"
                className="w-full h-auto rounded-2xl shadow-sm"
              />
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-[#E2852E] text-white p-6 rounded-2xl shadow-xl hidden md:block">
                <p className="text-3xl font-black italic">FAST.</p>
                <p className="text-xs uppercase tracking-widest opacity-80">Processing Time</p>
              </div>
            </div>
          </div>

          {/* Right Side: The Unique Step List */}
          <div className="w-full lg:w-1/2">
            <div className="mb-12 space-y-4">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
                How it <span className="text-[#E2852E]">Works.</span>
              </h2>
              <div className="h-1.5 w-20 bg-[#E2852E] rounded-full"></div>
            </div>

            <div className="relative space-y-0">
              {/* Vertical Progress Line */}
              <div className="absolute left-[39px] top-4 bottom-4 w-px bg-gray-200 hidden md:block"></div>

              {steps.map((step, index) => (
                <div 
                  key={index} 
                  className="group relative flex items-start gap-8 py-8 transition-all duration-300"
                >
                  {/* The Number - Outlined Style */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-20 h-20 flex items-center justify-center bg-[#fff8e7] border-2 border-gray-200 rounded-2xl group-hover:border-[#E2852E] group-hover:bg-[#E2852E] group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-[#E2852E]/40">
                      <span className="text-3xl font-black tracking-tighter">
                        0{index + 1}
                      </span>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div className="pt-2">
                    <h4 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-[#E2852E] transition-colors duration-300">
                      {step.title}
                    </h4>
                    <p className="text-gray-600 text-base leading-relaxed max-w-sm">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      <style jsx>{`
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default HowItWorks;