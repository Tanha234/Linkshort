import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, updateProfile } from "firebase/auth";
import axios from "axios";
import { User, Mail, Globe, Smartphone, Camera } from "lucide-react";

const PerfectProfile = () => {
  const auth = getAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [language, setLanguage] = useState("English (United States)");
  const [timezone, setTimezone] = useState("(GMT-05:00) Eastern Time");
  const [totalLinks, setTotalLinks] = useState(0);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setName(user.displayName || "");
        setEmail(user.email || "");

        try {
          // Fetch total links created by this user
          const res = await axios.get(`http://localhost:5000/api/urls?userId=${user.uid}`);
          setTotalLinks(res.data.length); // count the links
        } catch (error) {
          console.error("Error fetching user links:", error);
        }
      } else {
        setName("");
        setEmail("");
        setTotalLinks(0);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  const handleSave = async () => {
    const user = auth.currentUser;
    if (user) {
      try {
        await updateProfile(user, { displayName: name });
        alert("Your changes have been saved!");
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to save changes.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] pt-24 pb-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100">
          
          {/* Top Banner */}
          <div className="h-44 bg-gradient-to-r from-[#fff8e7] via-white to-blue-50 relative border-b border-slate-50">
            <div className="absolute top-10 left-12">
              <h1 className="text-3xl font-black text-[#333] tracking-tight">Account Settings</h1>
              <p className="text-slate-400 font-semibold text-lg mt-1">
                Manage your personal info & link stats
              </p>
            </div>
          </div>

          {/* Profile Content */}
          <div className="px-12 pb-16 -mt-14 relative z-10">
            
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-8">
              <div className="flex items-center gap-8">
                <div className="relative group">
                  <div className="w-36 h-36 rounded-[2.5rem] border-8 border-white shadow-2xl overflow-hidden bg-slate-50 transition-transform duration-300 group-hover:scale-[1.02]">
                    <img 
                      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400" 
                      alt="User Avatar" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button className="absolute -bottom-2 -right-2 p-3 bg-[#E2852E] text-white rounded-2xl shadow-xl hover:bg-[#333] transition-all border-4 border-white">
                    <Camera size={20} />
                  </button>
                </div>
                <div>
                  <h2 className="text-3xl font-black text-[#333] tracking-tight">{name || "User"}</h2>
                </div>
              </div>

              {/* Save Button */}
              <div className="flex gap-3">
                <button 
                  onClick={handleSave} 
                  className="flex items-center gap-2 px-8 py-4 bg-[#333] text-white rounded-2xl font-bold text-base hover:bg-[#E2852E] transition-all shadow-lg shadow-gray-200"
                >
                  Save Changes
                </button>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
              <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-orange-100 transition-colors">
                <h4 className="text-xl font-bold text-[#333]">Total Links Created</h4>
                <p className="text-3xl font-black text-[#E2852E] mt-3">{totalLinks}</p>
              </div>

              <div className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:border-orange-100 transition-colors">
                <h4 className="text-xl font-bold text-[#333]">Total Clicks</h4>
                <p className="text-3xl font-black text-[#E2852E] mt-3">--</p>
              </div>
            </div>

            {/* Personal Info Form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-14 gap-y-10">
              <div className="space-y-3">
                <label className="text-lg font-black text-[#333] flex items-center gap-2">
                  <User size={18} className="text-[#E2852E]" /> Full Name
                </label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-7 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-[#E2852E] focus:ring-4 focus:ring-orange-50 outline-none transition-all text-lg font-semibold text-slate-700"
                />
              </div>

              <div className="space-y-3">
                <label className="text-lg font-black text-[#333] flex items-center gap-2">
                  <Mail size={18} className="text-[#E2852E]" /> Email Address
                </label>
                <input 
                  type="email" 
                  value={email} 
                  readOnly
                  className="w-full px-7 py-5 bg-slate-100 border border-slate-100 rounded-2xl cursor-not-allowed text-lg font-semibold text-slate-700"
                />
              </div>

              <div className="space-y-3">
                <label className="text-lg font-black text-[#333] flex items-center gap-2">
                  <Globe size={18} className="text-[#E2852E]" /> Platform Language
                </label>
                <select 
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-7 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-[#E2852E] outline-none transition-all text-lg font-semibold text-slate-700 appearance-none"
                >
                  <option>English (United States)</option>
                  <option>Spanish (ES)</option>
                  <option>German (DE)</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-lg font-black text-[#333] flex items-center gap-2">
                  <Smartphone size={18} className="text-[#E2852E]" /> Time Zone
                </label>
                <select 
                  value={timezone} 
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-7 py-5 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:border-[#E2852E] outline-none transition-all text-lg font-semibold text-slate-700 appearance-none"
                >
                  <option>(GMT-05:00) Eastern Time</option>
                  <option>(GMT+00:00) UTC</option>
                  <option>(GMT+05:30) IST</option>
                </select>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfectProfile;
