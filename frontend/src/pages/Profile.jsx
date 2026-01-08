import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import axios from "axios";
import {
  User, Mail, Globe, Smartphone, Camera,
  Activity, Shield, Zap, Award
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const PerfectProfile = () => {
  const auth = getAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("English (United States)");
  const [timezone, setTimezone] = useState("(GMT-05:00) Eastern Time");
  const [totalLinks, setTotalLinks] = useState(0);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock data for the chart - in a real app this would come from the API
  const activityData = [
    { name: 'Mon', clicks: 240 },
    { name: 'Tue', clicks: 139 },
    { name: 'Wed', clicks: 980 },
    { name: 'Thu', clicks: 390 },
    { name: 'Fri', clicks: 480 },
    { name: 'Sat', clicks: 380 },
    { name: 'Sun', clicks: 430 },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setName(user.displayName || "");
        setEmail(user.email || "");

        try {
          const res = await axios.get(`http://localhost:5000/api/urls?userId=${user.uid}`);
          setTotalLinks(res.data.length);
        } catch (error) {
          console.error("Error fetching user links:", error);
        }
      } else {
        setName("");
        setEmail("");
        setTotalLinks(0);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await updateProfile(user, { displayName: name });
        // You would typically use a toast notification here
        alert("Profile updated successfully!");
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-hidden pt-28 pb-12 px-4 sm:px-6">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-[#E2852E] via-orange-400 to-amber-300 rounded-b-[4rem] opacity-10" />
      <div className="absolute top-20 right-20 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
      <div className="absolute top-40 left-20 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-32 left-1/2 w-96 h-96 bg-red-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto relative z-10"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="flex flex-col md:flex-row items-center md:items-end justify-between gap-8 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative group">
              <div className="w-40 h-40 rounded-full p-1 bg-gradient-to-tr from-orange-400 via-[#E2852E] to-amber-500">
                <div className="w-full h-full rounded-full border-4 border-white overflow-hidden bg-white">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400"
                    alt="Profile"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
              <button className="absolute bottom-2 right-2 p-3 bg-[#E2852E] text-white rounded-full shadow-lg hover:bg-slate-800 transition-all border-4 border-white group-hover:scale-110">
                <Camera size={18} />
              </button>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-black text-slate-800 tracking-tight mb-2">{name || "Loading..."}</h1>
              <p className="text-slate-500 font-medium text-lg flex items-center justify-center md:justify-start gap-2">
                <Shield size={18} className="text-[#E2852E]" /> Pro Account
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="px-6 py-3 bg-white text-slate-700 rounded-xl font-bold shadow-sm hover:shadow-md transition-all border border-slate-200">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-8 py-3 bg-slate-900 text-white rounded-xl font-bold shadow-lg shadow-orange-200 hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2"
            >
              Save Changes
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left Column - Navigation & Quick Stats */}
          <motion.div variants={itemVariants} className="space-y-6">
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 border border-white/50 shadow-xl shadow-slate-200/50">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab("overview")}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl font-bold transition-all ${activeTab === 'overview' ? 'bg-orange-50 text-[#E2852E]' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  <User size={20} /> Personal Info
                </button>
                <button
                  onClick={() => setActiveTab("security")}
                  className={`w-full flex items-center gap-4 px-6 py-4 rounded-xl font-bold transition-all ${activeTab === 'security' ? 'bg-orange-50 text-[#E2852E]' : 'text-slate-500 hover:bg-slate-50'}`}
                >
                  <Shield size={20} /> Security
                </button>
                <button className="w-full flex items-center gap-4 px-6 py-4 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all">
                  <Award size={20} /> Achievements
                </button>
              </nav>
            </div>

            {/* Mini Stats */}
            <div className="bg-[#E2852E] rounded-3xl p-8 text-white shadow-xl shadow-orange-200 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -mr-10 -mt-10" />
              <div className="relative z-10">
                <h3 className="text-orange-100 font-medium mb-1">Total Links</h3>
                <div className="text-5xl font-black mb-6">{totalLinks}</div>
                <div className="h-1 w-full bg-orange-600/30 rounded-full mb-4">
                  <div className="h-full w-[70%] bg-white rounded-full" />
                </div>
                <p className="text-sm text-orange-100">Top 5% of creators this week!</p>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Main Content */}
          <motion.div variants={itemVariants} className="lg:col-span-2 space-y-8">

            {/* Chart Section */}
            <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-white/50 shadow-xl shadow-slate-200/50">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h3 className="text-xl font-bold text-slate-800">Activity Overview</h3>
                  <p className="text-slate-400 font-medium">Your link performance over time</p>
                </div>
                <div className="p-2 bg-orange-50 text-[#E2852E] rounded-lg">
                  <Zap size={20} />
                </div>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={activityData}>
                    <defs>
                      <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#E2852E" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#E2852E" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8' }} />
                    <Tooltip
                      contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }}
                      cursor={{ stroke: '#E2852E', strokeWidth: 2 }}
                    />
                    <Area type="monotone" dataKey="clicks" stroke="#E2852E" strokeWidth={3} fillOpacity={1} fill="url(#colorClicks)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Form Section */}
            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl shadow-slate-200/50">
              <h3 className="text-2xl font-bold text-slate-800 mb-8">Profile Details</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-slate-700 focus:border-[#E2852E] focus:bg-white transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                      type="email"
                      value={email}
                      readOnly
                      className="w-full pl-12 pr-4 py-4 bg-slate-100/50 border-2 border-slate-100 rounded-2xl font-bold text-slate-500 cursor-not-allowed outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Language</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-slate-700 focus:border-[#E2852E] focus:bg-white transition-all outline-none appearance-none cursor-pointer"
                    >
                      <option>English (United States)</option>
                      <option>Spanish (ES)</option>
                      <option>German (DE)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-400 uppercase tracking-wider">Timezone</label>
                  <div className="relative">
                    <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl font-bold text-slate-700 focus:border-[#E2852E] focus:bg-white transition-all outline-none appearance-none cursor-pointer"
                    >
                      <option>(GMT-05:00) Eastern Time</option>
                      <option>(GMT+00:00) UTC</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

          </motion.div>
        </div>

      </motion.div>
    </div>
  );
};

export default PerfectProfile;
