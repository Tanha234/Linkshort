import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trash2,
  ExternalLink,
  BarChart3,
  Link as LinkIcon,
  Calendar,
  MousePointer2,
  RefreshCw,
  Copy,
  Edit2,
  Check,
  X,
  TrendingUp,
  Activity
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from "recharts";

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  // Edit State
  const [editingId, setEditingId] = useState(null);
  const [editValue, setEditValue] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Fetch all URLs
  const fetchUrls = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/urls`);
      setUrls(res.data);
    } catch (err) {
      console.error("Failed to fetch URLs", err);
      // Silent error or toast
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();
    const interval = setInterval(fetchUrls, 5000); // Polling for real-time updates
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // -------------------------
  // Analytics Calculations
  // -------------------------

  // 1. Total Links
  const totalLinks = urls.length;

  // 2. Total Clicks
  const totalClicks = urls.reduce((acc, url) => acc + (url.clicks || 0), 0);

  // 3. Top Clicked Link
  const topLink = urls.reduce((max, url) => (url.clicks > (max.clicks || 0) ? url : max), {});

  // 4. Today's Clicks & Growth
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  let clicksToday = 0;
  let clicksYesterday = 0;

  // Chart Data (Last 7 Days)
  const last7Days = [...Array(7)].map((_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() - (6 - i));
    return {
      date: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      fullDate: d.toDateString(),
      clicks: 0
    };
  });

  urls.forEach(url => {
    if (url.clickHistory && Array.isArray(url.clickHistory)) {
      url.clickHistory.forEach(dateStr => {
        const clickDate = new Date(dateStr);
        const clickDateZero = new Date(clickDate);
        clickDateZero.setHours(0, 0, 0, 0);

        // Today/Yesterday counts
        if (clickDateZero.getTime() === today.getTime()) clicksToday++;
        if (clickDateZero.getTime() === yesterday.getTime()) clicksYesterday++;

        // Chart Data mapping
        const dayStat = last7Days.find(d => d.fullDate === clickDateZero.toDateString());
        if (dayStat) dayStat.clicks++;
      });
    }
  });

  // Growth Calculation
  let growthPercent = 0;
  if (clicksYesterday > 0) {
    growthPercent = ((clicksToday - clicksYesterday) / clicksYesterday) * 100;
  } else if (clicksToday > 0) {
    growthPercent = 100; // Infinite growth technically
  }

  // -------------------------
  // Actions
  // -------------------------

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Delete this link?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      confirmButtonText: "Delete",
      customClass: { popup: "rounded-[2rem]" }
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`${API_URL}/api/urls/${id}`);
      setUrls(urls.filter((url) => url._id !== id));
      Swal.fire({ icon: "success", title: "Deleted", toast: true, position: "top-end", showConfirmButton: false, timer: 1500 });
    } catch (err) {
      Swal.fire("Error", "Failed to delete", "error");
    }
  };

  const handleStartEdit = (url) => {
    setEditingId(url._id);
    setEditValue(url.originalUrl);
  };

  const handleSaveEdit = async (id) => {
    if (!editValue.trim()) return;
    try {
      const res = await axios.put(`${API_URL}/api/urls/${id}`, { originalUrl: editValue });
      setUrls(urls.map(u => u._id === id ? res.data : u));
      setEditingId(null);
      Swal.fire({ icon: "success", title: "Updated", toast: true, position: "top-end", showConfirmButton: false, timer: 1500 });
    } catch (err) {
      Swal.fire("Error", "Failed to update", "error");
    }
  };

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    Swal.fire({ icon: "success", title: "Copied!", toast: true, position: "top-end", showConfirmButton: false, timer: 1500 });
  };


  return (
    <div className="min-h-screen w-full bg-[#faefe0] relative overflow-hidden font-sans text-slate-700 p-4 sm:p-8">
      {/* Background */}
      <motion.div animate={{ x: [0, 30, 0], y: [0, 50, 0] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }} className="fixed top-0 left-0 w-[500px] h-[500px] bg-[#E2852E]/5 rounded-full blur-[100px] -z-10" />

      <div className="max-w-7xl mx-auto z-10 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-black text-slate-800 flex items-center gap-3">
              <span className="bg-white p-2 rounded-2xl shadow-sm">
                <BarChart3 className="text-[#E2852E]" size={32} />
              </span>
              Dashboard
            </h1>
            <p className="text-slate-500 mt-2 font-medium ml-1">Overview</p>
          </div>
          <button onClick={fetchUrls} className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all text-slate-600">
            <RefreshCw size={20} className={loading ? "animate-spin" : ""} />
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Links */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-[2rem] border border-white shadow-sm hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-orange-50 rounded-2xl text-[#E2852E]">
                <LinkIcon size={24} />
              </div>
              <span className="text-xs font-bold uppercase text-slate-400 bg-white px-2 py-1 rounded-lg">All Time</span>
            </div>
            <p className="text-4xl font-black text-slate-800">{totalLinks}</p>
            <p className="text-sm text-slate-500 font-medium mt-1">Total Links</p>
          </div>

          {/* Total Clicks */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-[2rem] border border-white shadow-sm hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 rounded-2xl text-blue-500">
                <MousePointer2 size={24} />
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg">
                <TrendingUp size={14} />
                <span>Activity</span>
              </div>
            </div>
            <p className="text-4xl font-black text-slate-800">{totalClicks}</p>
            <p className="text-sm text-slate-500 font-medium mt-1">Total Clicks</p>
          </div>

          {/* Today's Clicks & Growth */}
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-[2rem] border border-white shadow-sm hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-green-50 rounded-2xl text-green-600">
                <Activity size={24} />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg ${growthPercent >= 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-600'}`}>
                {growthPercent > 0 ? '+' : ''}{growthPercent.toFixed(0)}%
              </span>
            </div>
            <p className="text-4xl font-black text-slate-800">{clicksToday}</p>
            <p className="text-sm text-slate-500 font-medium mt-1">Clicks Today</p>
          </div>

          {/* Top Link */}
          <div className="bg-gradient-to-br from-[#E2852E] to-[#d6731e] text-white p-6 rounded-[2rem] shadow-lg shadow-orange-200">
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-md">
                <BarChart3 size={24} />
              </div>
              <span className="text-xs font-bold uppercase opacity-80 bg-black/10 px-2 py-1 rounded-lg">Top Performer</span>
            </div>
            <p className="text-3xl font-black truncate">{topLink.clicks || 0}</p>
            <p className="text-sm opacity-90 font-medium mt-1 truncate w-full">
              {topLink.shortCode ? `/${topLink.shortCode}` : "No data"}
            </p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="bg-white/70 backdrop-blur-xl border border-white rounded-[2.5rem] p-8 mb-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <TrendingUp size={20} className="text-[#E2852E]" />
              Click Activity
            </h3>
            <select className="bg-white border border-slate-200 text-sm rounded-lg px-3 py-1 text-slate-500 outline-none">
              <option>Last 7 Days</option>
            </select>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={last7Days}>
                <defs>
                  <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E2852E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#E2852E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis
                  dataKey="date"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#94a3b8', fontSize: 12 }}
                />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area
                  type="monotone"
                  dataKey="clicks"
                  stroke="#E2852E"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorClicks)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>


        {/* Links Table */}
        <div className="bg-white/60 backdrop-blur-xl border border-white/40 rounded-[2.5rem] shadow-2xl overflow-hidden p-6 md:p-8">
          <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
            <LinkIcon size={20} className="text-slate-400" />
            Your Links
          </h3>

          {urls.length === 0 ? (
            <div className="text-center py-10 opacity-60">No links found.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-xs uppercase font-bold text-slate-400 border-b border-slate-200/60">
                    <th className="px-4 py-4 w-1/3">Original URL</th>
                    <th className="px-4 py-4">Short Link</th>
                    <th className="px-4 py-4 text-center">Clicks</th>
                    <th className="px-4 py-4">Date</th>
                    <th className="px-4 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <AnimatePresence>
                    {urls.map((url) => (
                      <motion.tr
                        key={url._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="group hover:bg-white/50 transition-colors"
                      >
                        {/* Original */}
                        <td className="px-4 py-4">
                          {editingId === url._id ? (
                            <div className="flex gap-2">
                              <input
                                value={editValue}
                                onChange={(e) => setEditValue(e.target.value)}
                                className="w-full p-2 rounded-lg border border-orange-300 outline-none"
                              />
                              <button onClick={() => handleSaveEdit(url._id)} className="text-green-500 hover:bg-green-100 p-2 rounded-lg"><Check size={16} /></button>
                              <button onClick={() => setEditingId(null)} className="text-red-500 hover:bg-red-100 p-2 rounded-lg"><X size={16} /></button>
                            </div>
                          ) : (
                            <div className="truncate max-w-[250px] text-sm font-medium text-slate-700" title={url.originalUrl}>
                              {url.originalUrl}
                            </div>
                          )}
                        </td>

                        {/* Short */}
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-2 group/copy">
                            <a href={url.shortUrl || `${window.location.origin}/${url.shortCode}`} target="_blank" rel="noreferrer" className="text-[#E2852E] font-bold text-sm">
                              /{url.shortCode}
                            </a>
                            <button onClick={() => handleCopy(url.shortUrl || `${window.location.origin}/${url.shortCode}`)} className="opacity-0 group-hover/copy:opacity-100 text-slate-400 hover:text-orange-500">
                              <Copy size={14} />
                            </button>
                          </div>
                        </td>

                        {/* Clicks */}
                        <td className="px-4 py-4 text-center">
                          <span className="bg-orange-100 text-[#E2852E] font-bold px-2 py-1 rounded-md text-sm">{url.clicks}</span>
                        </td>

                        {/* Date */}
                        <td className="px-4 py-4 text-xs text-slate-500">
                          {new Date(url.createdAt).toLocaleDateString()}
                        </td>

                        {/* Actions */}
                        <td className="px-4 py-4 text-right">
                          {editingId !== url._id && (
                            <div className="flex justify-end gap-2">
                              <button onClick={() => handleStartEdit(url)} className="p-2 hover:bg-blue-50 text-slate-400 hover:text-blue-500 rounded-lg"><Edit2 size={16} /></button>
                              <button onClick={() => handleDelete(url._id)} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-lg"><Trash2 size={16} /></button>
                            </div>
                          )}
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
