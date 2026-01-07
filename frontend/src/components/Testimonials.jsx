import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    name: "John Sadana",
    title: "Digital Marketer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    feedback:
      "This link shortener has completely changed how I track campaigns. Clean links and powerful analytics make my job so much easier.",
  },
  {
    name: "Jane Janeth",
    title: "Content Creator",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    feedback:
      "I love how fast and reliable it is. Shortening links takes seconds, and I can see exactly how my audience is engaging.",
  },
  {
    name: "Mike Anderson",
    title: "Startup Founder",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    feedback:
      "The dashboard is simple yet powerful. Managing multiple links for my startup has never been this smooth.",
  },
  {
    name: "Emily Carter",
    title: "Social Media Manager",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    feedback:
      "The analytics are incredibly detailed. I can track clicks by country and device, which helps optimize our content.",
  },
  {
    name: "David Johnson",
    title: "Affiliate Marketer",
    image: "https://randomuser.me/api/portraits/men/28.jpg",
    feedback:
      "Short links look professional and boost trust. My conversion rates have improved since using this service.",
  },
  {
    name: "Sarah Williams",
    title: "Blogger",
    image: "https://randomuser.me/api/portraits/women/52.jpg",
    feedback:
      "I use it daily for my blog links. Super easy to use, fast, and reliable every time.",
  },
];

function Testimonials() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="py-16 bg-[#fff8e7] md:px-44 sm:px-0 ">
      
      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-5xl font-bold text-gray-700"> {/* Increased to text-5xl */}
          What Our Users Say
        </h2>
        <p className="text-xl text-gray-500 mt-4"> {/* Increased to text-xl */}
          Trusted by marketers, creators, and businesses worldwide
        </p>
      </div>

      {/* Slider */}
      <div className="px-8 max-w-7xl mx-auto">
        <Slider {...settings}>
          {testimonials.map((testimony, index) => (
            <div key={index} className="p-6">
              <div className="bg-yellow-50 p-8 rounded-2xl shadow-lg relative"> {/* Increased padding */}
                <div className="text-6xl text-red-400 absolute -top-4 left-4"> {/* Increased quote size */}
                  “
                </div>
                <p className="text-gray-600 mt-8 text-xl leading-relaxed"> {/* Increased to text-xl and added line spacing */}
                  {testimony.feedback}
                </p>
              </div>

              <div className="flex items-center mt-8">
                <img
                  src={testimony.image}
                  alt={testimony.name}
                  className="w-16 h-16 rounded-full object-cover mr-4" // Increased image size slightly to match text
                />
                <div>
                  <h4 className="text-2xl font-bold text-gray-800"> {/* Increased to text-2xl */}
                    {testimony.name}
                  </h4>
                  <p className="text-gray-500 text-lg"> {/* Increased to text-lg */}
                    {testimony.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default Testimonials;