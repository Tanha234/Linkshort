import React from "react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[#fff8e7] py-24 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-4 tracking-tighter">
            Choose your <span className="text-[#E2852E]">Power.</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Simple, transparent pricing for creators and teams.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-0">
          
          {/* Free Plan */}
          <div className="w-full lg:w-1/3 bg-white/50 backdrop-blur-md p-10 rounded-t-[3rem] lg:rounded-l-[3rem] lg:rounded-tr-none border border-white/50 shadow-xl relative z-10">
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 uppercase tracking-widest mb-2">Basic</h3>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-black text-gray-900">$0</span>
                <span className="text-gray-500 font-medium">/forever</span>
              </div>
            </div>

            <ul className="space-y-4 mb-10">
              {["50 Links / month", "Basic Analytics", "Standard Support", "7-day Link History"].map((feat) => (
                <li key={feat} className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                  {feat}
                </li>
              ))}
            </ul>

            <button className="w-full py-4 px-8 rounded-2xl border-2 border-gray-200 font-bold text-gray-600 hover:bg-gray-50 transition-all">
              Get Started
            </button>
          </div>

          {/* Premium Plan */}
          <div className="w-full lg:w-1/2 bg-white p-12 rounded-[3rem] border-4 border-[#E2852E] shadow-[0_40px_80px_rgba(226,133,46,0.2)] relative z-20 lg:-mx-4 transform lg:scale-110">
            {/* Popular Badge */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#E2852E] text-white px-6 py-2 rounded-full text-sm font-black uppercase tracking-[0.2em] shadow-lg">
              Most Popular
            </div>

            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
              <div>
                <h3 className="text-2xl font-black text-gray-900 uppercase tracking-widest mb-2">Premium</h3>
                <p className="text-[#E2852E] font-bold">Everything you need to scale</p>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-6xl font-black text-gray-900">$19</span>
                <span className="text-gray-500 font-medium">/mo</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {[
                "Unlimited Short Links",
                "Advanced Geo-Tracking",
                "Custom Branded Domains",
                "Password Protected Links",
                "Bulk URL Uploads",
                "Priority 24/7 Support",
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-3 text-gray-600">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                  {feat}
                </div>
              ))}
            </div>

            {/* Upgrade Button */}
            <button
              onClick={() => navigate("/coming-soon")}
              className="w-full py-4 px-8 rounded-2xl bg-[#E2852E] text-white font-bold hover:bg-orange-600 transition-all"
            >
              Upgrade to Pro
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
