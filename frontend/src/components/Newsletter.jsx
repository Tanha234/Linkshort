import React from "react";

function NewsletterSection() {
  return (
    <section className="py-16 bg-gradient-to-r from-orange-300 to-orange-50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-40 opacity-20">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSESnmxTgqWkvyGXgQI9ydi4E7PJMbZLVRICQ&s"
          alt="dog"
          className="object-cover"
        />
      </div>

      <div className="absolute bottom-0 right-0 w-40 opacity-20 transform rotate-180">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSESnmxTgqWkvyGXgQI9ydi4E7PJMbZLVRICQ&s"
          alt="dog"
          className="object-cover"
        />
      </div>

      <div className="relative max-w-4xl mx-auto text-center px-4">
        <h4 className="text-orange-500 text-xl font-bold mb-4 uppercase tracking-widest">
          Get In Touch
        </h4>
        
        <h2 className="text-5xl md:text-5xl font-extrabold text-gray-800 mb-10">
          Let’s Connect Our Newsletter
        </h2>

        <div className="flex flex-col md:flex-row items-center justify-center gap-0">
          <input
            type="email"
            placeholder="Type Your Email"
            className="p-5 text-xl rounded-t-full md:rounded-t-none md:rounded-l-full w-full max-w-md border-none focus:outline-none"
          />
          <button className="bg-gradient-to-r from-pink-400 to-orange-400 text-white px-10 py-5 rounded-b-full md:rounded-b-none md:rounded-r-full font-bold text-xl w-full md:w-auto">
            Connect
          </button>
        </div>
      </div>
    </section>
  );
}

export default NewsletterSection;