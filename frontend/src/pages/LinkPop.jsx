// ShortUrlGenerator.jsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2";
import axios from "axios";
import heroImage from "../images/short-url.png";
import { getAuth } from "firebase/auth";
import {
  FaCopy,
  FaExternalLinkAlt,
  FaTwitter,
  FaWhatsapp,
  FaFacebook,
  FaMagic,
  FaCut
} from "react-icons/fa";

const ShortUrlGenerator = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const auth = getAuth();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Generate random short code
  const generateShortCode = () => {
    const length = Math.floor(Math.random() * 3) + 6; // 6-8 chars
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

  const handleGenerate = async () => {
    if (!longUrl) {
      Swal.fire("Error", "Please enter a URL", "error");
      return;
    }

    const user = auth.currentUser;
    if (!user) {
      Swal.fire("Error", "You must be logged in to save URLs", "error");
      return;
    }

    try {
      // Check usage limits
      const checkRes = await axios.get(`${API_URL}/api/urls?userId=${user.uid}`);

      // Safety filter: Ensure we only count links belonging to THIS user
      const userLinks = checkRes.data.filter(u => u.userId === user.uid);

      if (userLinks.length >= 100) {
        Swal.fire({
          icon: "warning",
          title: "Usage Limit Reached",
          text: `You have reached the free limit of 100 links (Current: ${userLinks.length}). Please upgrade to create more!`,
          confirmButtonText: "Upgrade Now",
          confirmButtonColor: "#E2852E",
          showCancelButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = "/pricing";
          }
        });
        return;
      }

      const code = generateShortCode();
      const fullShortUrl = `${window.location.origin}/${code}`;

      console.log("🚀 SENDING POST /api/urls with UID:", user.uid);
      const res = await axios.post(`${API_URL}/api/urls`, {
        originalUrl: longUrl,
        userId: user.uid,
        shortCode: code,
        shortUrl: fullShortUrl,
      });
      console.log("✅ SAVE SUCCESS:", res.data);

      setShortCode(res.data.shortCode);
      setShortUrl(res.data.shortUrl);
      setLongUrl("");

      Swal.fire({
        icon: "success",
        title: "URL Shortened!",
        text: `Link created for user ${user.uid.slice(0, 6)}...`,
        toast: true,
        position: "top-end",
        timer: 3000,
        showConfirmButton: false,
      });
    } catch (err) {
      console.error("❌ SAVE FAILED:", err);
      const errMsg = err.response?.data?.msg || err.message;
      Swal.fire("Error", `Failed to save URL: ${errMsg}`, "error");
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    Swal.fire({
      title: "Copied!",
      text: "Link ready to share",
      icon: "success",
      toast: true,
      position: "top-end",
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shortUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent("Check this link: " + shortUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shortUrl)}`,
  };

  return (
    <div className="min-h-screen w-full bg-[#fff8e7] relative overflow-hidden flex items-center justify-center p-6 font-sans text-slate-700">
      {/* Background blobs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, 50, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 w-96 h-96 bg-[#E2852E]/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, -60, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl"
      />

      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center z-10">
        {/* Hero Image */}
        <motion.div
          animate={{ y: [0, -20, 0], rotate: [0, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="hidden md:flex justify-center"
        >
          <img src={heroImage} alt="Link Illustration" className="w-1/2 max-w-md drop-shadow-2xl" />
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col space-y-8">
          <header className="space-y-4 text-center md:text-left">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center space-x-2 bg-white px-4 py-1 rounded-full shadow-sm w-fit mx-auto md:mx-0"
            >
              <motion.span animate={{ opacity: [1, 0.5, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <FaMagic className="text-[#E2852E]" />
              </motion.span>
              <span className="text-sm font-bold uppercase tracking-wider">Fast & Simple</span>
            </motion.div>

            <h1 className="text-4xl md:text-5xl font-black leading-tight">
              Clip your <span className="text-[#E2852E]">links</span> in <br /> one click
            </h1>
          </header>

          {/* Input Form */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl space-y-6">
            <input
              type="text"
              placeholder="Paste long link here..."
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              className="w-full pl-6 pr-16 py-5 rounded-full border-2 border-gray-100 focus:border-[#E2852E] outline-none transition-all text-lg ring-0 focus:ring-4 focus:ring-[#E2852E]/10"
            />
            <motion.button
              onClick={handleGenerate}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-400 to-orange-600 text-white font-bold py-3 px-6 mt-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FaCut className="text-lg" />
              <span className="text-lg">Shorten</span>
            </motion.button>

            {/* Results Section */}
            <AnimatePresence>
              {shortUrl && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="space-y-4 pt-4">

                  {/* Short Code */}
                  <div className="bg-[#E2852E]/5 border border-[#E2852E]/20 p-4 rounded-2xl flex justify-between items-center relative overflow-hidden">
                    <div>
                      <p className="text-xs uppercase font-bold opacity-50">Short Code</p>
                      <p className="font-mono text-xl font-bold">{shortCode}</p>
                    </div>
                    <button onClick={() => copyToClipboard(shortCode)} className="p-3 hover:bg-[#E2852E] hover:text-white rounded-xl transition-colors">
                      <FaCopy />
                    </button>
                  </div>

                  {/* Short URL */}
                  <div className="bg-blue-50 border border-blue-100 p-4 rounded-2xl flex justify-between items-center relative overflow-hidden">
                    <div className="truncate mr-4">
                      <p className="text-xs uppercase font-bold opacity-50">Short Link</p>
                      <a href={shortUrl} target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline truncate">{shortUrl}</a>
                    </div>
                    <div className="flex space-x-2">
                      <button onClick={() => copyToClipboard(shortUrl)} className="p-3 bg-white shadow-sm hover:scale-110 transition-transform rounded-xl">
                        <FaCopy />
                      </button>
                      <a href={shortUrl} target="_blank" rel="noreferrer" className="p-3 bg-white shadow-sm hover:scale-110 transition-transform rounded-xl">
                        <FaExternalLinkAlt />
                      </a>
                    </div>
                  </div>

                  {/* Share Buttons */}
                  <div className="flex justify-center space-x-6 pt-4">
                    {[
                      { icon: <FaFacebook />, color: "hover:text-blue-600", link: shareLinks.facebook },
                      { icon: <FaWhatsapp />, color: "hover:text-green-500", link: shareLinks.whatsapp },
                      { icon: <FaTwitter />, color: "hover:text-blue-400", link: shareLinks.twitter }
                    ].map((social, i) => (
                      <motion.button key={i} animate={{ y: [0, -4, 0] }} transition={{ repeat: Infinity, duration: 2, delay: i * 0.2 }} whileHover={{ scale: 1.2, rotate: 10 }} onClick={() => window.open(social.link, "_blank")} className={`w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center text-xl transition-colors ${social.color}`}>
                        {social.icon}
                      </motion.button>
                    ))}
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ShortUrlGenerator;
