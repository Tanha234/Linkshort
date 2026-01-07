import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, ExternalLink, BarChart3, Link as LinkIcon, Calendar, MousePointer2, RefreshCw } from "lucide-react";

const Dashboard = () => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all URLs
  const fetchUrls = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/urls");
      setUrls(res.data);
      console.log("Fetched URLs:", res.data); // Debug
    } catch (err) {
      console.error("Failed to fetch URLs", err);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to fetch URLs",
        background: "#FCFAF7",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls();

    // Optional: poll every 3 seconds to update clicks
    const interval = setInterval(() => fetchUrls(), 3000);
    return () => clearInterval(interval);
  }, []);

  // Delete a URL
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#94a3b8",
      confirmButtonText: "Yes, delete it!",
      customClass: { popup: "rounded-[2rem]" },
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(`http://localhost:5000/api/urls/${id}`);
      setUrls(urls.filter((url) => url._id !== id));
      Swal.fire({
        title: "Deleted!",
        icon: "success",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (err) {
      Swal.fire("Error", "Failed to delete URL", "error");
    }
  };

  // Handle clicking short URL
  const handleClickShortUrl = async (shortCode, urlId) => {
    
    try {
      const res =await axios.post(`http://localhost:5000/api/urls/click/${shortCode}`);

      setUrls((prev) =>
        prev.map((u) => (u._id === urlId ? { ...u, clicks: res.data.clicks } : u))
      );
  
      const clickedUrl = urls.find((u) => u._id === urlId);
      if (clickedUrl) window.open(clickedUrl.originalUrl, "_blank");
    } catch (err) {
      console.error("Failed to increment clicks:", err.response?.data || err.message);
      Swal.fire("Error", "Failed to increment clicks", "error");
    }
  };
  
  

  // ----------------------------
  // Derived stats
  // ----------------------------
  const totalLinks = urls.length;
  const totalClicks = urls.reduce((sum, url) => sum + (url.clicks || 0), 0);
  const topClickedLink = urls.reduce(
    (max, url) => (url.clicks > (max.clicks || 0) ? url : max),
    {}
  );
  const recentlyShortened = [...urls]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
  const totalShares = urls.reduce((sum, url) => sum + (url.shares || 0), 0);

  // Peak click hour
  const clicksByHour = {};
  urls.forEach((url) => {
    if (url.clickHistory) {
      url.clickHistory.forEach((click) => {
        const hour = new Date(click).getHours();
        clicksByHour[hour] = (clicksByHour[hour] || 0) + 1;
      });
    }
  });
  const peakClickHour =
    Object.keys(clicksByHour).length > 0
      ? Object.keys(clicksByHour).reduce((a, b) =>
          clicksByHour[a] > clicksByHour[b] ? a : b
        )
      : null;

  // Milestones
  const milestones = [];
  if (totalLinks >= 100) milestones.push("100 Links Created!");
  if (totalClicks >= 1000) milestones.push("1,000 Clicks Reached!");

  return (
    <div className="min-h-screen bg-[#FCFAF7] p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 flex items-center gap-3">
              <BarChart3 className="text-[#E2852E]" size={32} />
              Analytics Dashboard
            </h1>
            <p className="text-slate-500 mt-1">Track and manage your shortened links</p>
          </div>
          <button
            onClick={fetchUrls}
            className="flex items-center justify-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-2xl text-slate-600 hover:bg-slate-50 transition-all shadow-sm"
          >
            <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
            Refresh Data
          </button>
        </div>

        {/* ------------------------
            Stats Cards
        ------------------------ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          {/* Total Links */}
          <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-center">
            <LinkIcon size={28} className="text-[#E2852E] mb-2" />
            <span className="text-xs uppercase text-slate-400">Total Links</span>
            <span className="text-2xl font-bold text-slate-800">{totalLinks}</span>
          </div>

          {/* Total Clicks */}
          <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-center">
            <MousePointer2 size={28} className="text-[#E2852E] mb-2" />
            <span className="text-xs uppercase text-slate-400">Total Clicks</span>
            <span className="text-2xl font-bold text-slate-800">{totalClicks}</span>
          </div>

          {/* Top Clicked Link */}
          <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-center">
            <BarChart3 size={28} className="text-[#E2852E] mb-2" />
            <span className="text-xs uppercase text-slate-400">Top Clicked Link</span>
            <span className="text-sm font-medium text-slate-700 truncate">
              {topClickedLink?.shortUrl || "-"}
            </span>
            <span className="text-xs text-slate-400">
              {topClickedLink?.clicks || 0} clicks
            </span>
          </div>

          {/* Recently Shortened */}
          <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-center">
            <RefreshCw size={28} className="text-[#E2852E] mb-2" />
            <span className="text-xs uppercase text-slate-400">Recently Shortened</span>
            <div className="flex flex-col space-y-1 mt-1">
              {recentlyShortened.map((url) => (
                <span key={url._id} className="text-sm text-slate-700 truncate">
                  {url.shortUrl}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Second row: Social Shares, Peak Click Hour, Milestones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-center">
            <BarChart3 size={28} className="text-[#E2852E] mb-2" />
            <span className="text-xs uppercase text-slate-400">Social Shares</span>
            <span className="text-2xl font-bold text-slate-800">{totalShares}</span>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-center">
            <Calendar size={28} className="text-[#E2852E] mb-2" />
            <span className="text-xs uppercase text-slate-400">Peak Click Hour</span>
            <span className="text-2xl font-bold text-slate-800">
              {peakClickHour !== null ? `${peakClickHour}:00` : "-"}
            </span>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm flex flex-col items-center">
            <BarChart3 size={28} className="text-[#E2852E] mb-2" />
            <span className="text-xs uppercase text-slate-400">Milestones</span>
            {milestones.length > 0 ? (
              <ul className="text-sm text-slate-700 mt-1 list-disc list-inside">
                {milestones.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            ) : (
              <span className="text-sm text-slate-400 mt-1">No milestones yet</span>
            )}
          </div>
        </div>

        {/* ------------------------
            Table Section (unchanged)
        ------------------------ */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="w-12 h-12 border-4 border-[#E2852E] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium">Fetching your links...</p>
          </div>
        ) : urls.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20 bg-white rounded-[3rem] border-2 border-dashed border-slate-200"
          >
            <div className="bg-orange-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <LinkIcon size={40} className="text-[#E2852E]" />
            </div>
            <h3 className="text-xl font-bold text-slate-700">No URLs found</h3>
            <p className="text-slate-500">
              Start shortening to see your analytics here!
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            <div className="hidden md:grid grid-cols-12 px-8 py-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              <div className="col-span-5">Original Link</div>
              <div className="col-span-3">Shortened</div>
              <div className="col-span-1 text-center">Clicks</div>
              <div className="col-span-2 text-center">Created</div>
              <div className="col-span-1 text-right">Action</div>
            </div>

            <AnimatePresence>
              {urls.map((url, index) => (
                <motion.div
                  key={url._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white group border border-slate-100 p-4 md:px-8 md:py-6 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-orange-500/5 transition-all grid grid-cols-1 md:grid-cols-12 items-center gap-4"
                >
                  <div className="col-span-5 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                      <LinkIcon size={20} />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-sm font-medium text-slate-700 truncate">
                        {url.originalUrl}
                      </p>
                      <span className="text-[10px] text-slate-400 font-mono uppercase tracking-tighter">
                        Original Destination
                      </span>
                    </div>
                  </div>

                  <div className="col-span-3">
                    <button
                      onClick={() => handleClickShortUrl(url.shortCode, url._id)}
                      className="flex items-center gap-2 text-[#E2852E] font-bold hover:underline group/link"
                    >
                      <span className="truncate">{url.shortUrl}</span>
                      <ExternalLink
                        size={14}
                        className="opacity-0 group-hover/link:opacity-100 transition-opacity"
                      />
                    </button>
                    <p className="text-[10px] text-slate-400 font-mono uppercase">
                      Code: {url.shortCode}
                    </p>
                  </div>

                  <div className="col-span-1 text-center">
                    <div className="inline-flex flex-col items-center px-3 py-1 bg-orange-50 rounded-xl">
                      <span className="text-lg font-black text-[#E2852E]">{url.clicks || 0}</span>
                      <MousePointer2 size={12} className="text-[#E2852E]" />
                    </div>
                  </div>

                  <div className="col-span-2 text-center text-slate-500 text-sm">
                    <div className="flex items-center justify-center gap-1.5">
                      <Calendar size={14} />
                      {new Date(url.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="col-span-1 text-right">
                    <button
                      onClick={() => handleDelete(url._id)}
                      className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                      title="Delete Link"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
