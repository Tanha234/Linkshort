import { Link, Zap, ShieldCheck, BarChart3 } from "lucide-react";
import howItWorksImg from "../images/whychoseus.png";

export default function WhyChooseUs() {
  return (
    <section className="bg-[#fff8e7] py-24">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
            Why choose us?
          </h2>
          <p className="mt-5 text-gray-600 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            From simple link shortening to advanced analytics, we help you
            manage and grow your links effortlessly.
          </p>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16 items-center">
          
          {/* Left features */}
          <div className="space-y-12">
            <Feature
              icon={<Zap size={28} />}
              title="Fast Shortening"
              text="Create short links instantly with our high-speed infrastructure."
            />
            <Feature
              icon={<ShieldCheck size={28} />}
              title="Secure Links"
              text="All links are protected with HTTPS and advanced security."
            />
          </div>

          {/* Center image */}
          <div className="flex justify-center relative">
            {/* Added a subtle glow behind the image */}
            <div className="absolute inset-0 bg-orange-200 blur-3xl opacity-20 rounded-full"></div>
            <img
              src={howItWorksImg}
              alt="Dashboard"
              className="relative z-10 rounded-2xl shadow-2xl max-h-80 object-cover transform hover:scale-105 transition duration-500"
            />
          </div>

          {/* Right features */}
          <div className="space-y-12">
            <Feature
              icon={<BarChart3 size={28} />}
              title="Detailed Analytics"
              text="Track clicks, locations, and performance in real time."
            />
            <Feature
              icon={<Link size={28} />}
              title="Easy Management"
              text="Organize, edit, and manage all your links in one place."
            />
          </div>
        </div>

        {/* Button */}
        <div className="text-center mt-16">
          <button className="bg-[#E2852E] hover:bg-[#c96f1e] text-white px-10 py-4 rounded-lg text-lg font-bold shadow-lg hover:shadow-xl transition-all active:scale-95">
            Get Started Free
          </button>
        </div>
      </div>
    </section>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="flex gap-5 items-start group">
      <div className="bg-white text-[#E2852E] p-4 rounded-xl shadow-md group-hover:bg-[#E2852E] group-hover:text-white transition-colors duration-300">
        {icon}
      </div>
      <div>
        <h4 className="text-xl font-bold text-gray-900 mb-2">{title}</h4>
        <p className="text-gray-600 text-base md:text-lg leading-snug">
          {text}
        </p>
      </div>
    </div>
  );
}