import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle, ArrowRight } from 'lucide-react';
import Swal from 'sweetalert2';

const ContactPage = () => {
  const [status, setStatus] = useState('idle'); // idle | sending | success

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/meeoygqw", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setStatus('success');
        Swal.fire({
          title: "Success!",
          text: "Message sent successfully!",
          icon: "success",
          confirmButtonColor: "#E2852E",
          background: "#fff8e7",
        });
        form.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        throw new Error("Failed to send");
      }
    } catch (error) {
      setStatus('idle');
      Swal.fire({
        title: "Error!",
        text: "Could not send message. Please try again later.",
        icon: "error",
        confirmButtonColor: "#ef4444",
      });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-[#fff8e7] flex items-center justify-center px-3 sm:px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-7xl w-full bg-white rounded-3xl sm:rounded-[3rem] shadow-2xl overflow-hidden 
                   grid grid-cols-1 lg:grid-cols-2 min-h-[600px] lg:min-h-[700px]"
      >
        {/* LEFT SIDE – IMAGE */}
        <div className="relative bg-[#f9fafb] flex items-center justify-center 
                        min-h-[220px] sm:min-h-[320px] lg:min-h-full">
          <img
            src="https://img.freepik.com/premium-vector/contact-us-concept-with-cartoon-people-flat-design-web-woman-sharing-link-with-business-social-media-other-info-client-vector-illustration-social-media-banner-marketing-material_9209-15035.jpg"
            alt="Contact Illustration"
            className="absolute inset-0 w-full h-full 
                       object-cover sm:object-contain 
                       p-4 sm:p-8 lg:p-10"
          />

          {/* Overlay text – hidden on mobile */}
          <div className="hidden sm:block absolute bottom-10 left-8 right-8 lg:bottom-12 lg:left-12 lg:right-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white/70 backdrop-blur-md p-6 lg:p-8 rounded-3xl border border-white shadow-sm"
            >
              <h2 className="text-2xl lg:text-4xl font-black text-slate-900 leading-tight">
                Link your world <br />
                in <span className="text-[#E2852E]">one click.</span>
              </h2>
              <p className="mt-3 text-slate-600 font-bold text-sm lg:text-base">
                Trusted by 100k+ users worldwide.
              </p>
            </motion.div>
          </div>
        </div>

        {/* RIGHT SIDE – FORM */}
        <div className="p-5 sm:p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {status === 'success' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center px-4"
              >
                <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl sm:text-4xl font-black text-slate-900">
                  Message Sent!
                </h2>
                <p className="text-slate-500 mt-4 text-base sm:text-lg">
                  We'll get back to you shortly.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="mt-10 flex items-center mx-auto space-x-2 text-[#E2852E] font-black hover:gap-4 transition-all"
                >
                  <span>SEND ANOTHER</span>
                  <ArrowRight size={20} />
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants} className="mb-8">
                  <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-slate-900">
                    Get in Touch
                  </h1>
                  <p className="text-slate-400 mt-2 sm:mt-3 text-sm sm:text-lg font-medium">
                    Ready to grow? Let's talk about your project.
                  </p>
                </motion.div>

                <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    <motion.div variants={itemVariants}>
                      <label className="text-[11px] font-black text-[#E2852E] uppercase ml-1">
                        Full Name
                      </label>
                      <input
                        name="name"
                        required
                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold outline-none focus:border-[#E2852E]"
                        placeholder="Your Name"
                      />
                    </motion.div>

                    <motion.div variants={itemVariants}>
                      <label className="text-[11px] font-black text-[#E2852E] uppercase ml-1">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold outline-none focus:border-[#E2852E]"
                        placeholder="email@example.com"
                      />
                    </motion.div>
                  </div>

                  <motion.div variants={itemVariants}>
                    <label className="text-[11px] font-black text-[#E2852E] uppercase ml-1">
                      Subject
                    </label>
                    <input
                      name="subject"
                      required
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold outline-none focus:border-[#E2852E]"
                      placeholder="How can we help?"
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <label className="text-[11px] font-black text-[#E2852E] uppercase ml-1">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows="4"
                      required
                      className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-bold outline-none resize-none focus:border-[#E2852E]"
                      placeholder="Your message here..."
                    />
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={status === 'sending'}
                    className="w-full py-4 sm:py-5 rounded-2xl bg-[#E2852E] text-white font-black 
                               flex items-center justify-center space-x-3 shadow-xl 
                               hover:bg-[#c76d1a] disabled:opacity-50"
                  >
                    {status === 'sending' ? (
                      <Loader2 className="animate-spin" />
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={20} />
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;
