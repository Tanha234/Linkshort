import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Unplug, AlertTriangle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const RedirectHandler = () => {
    const { shortCode } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null); // 'not_found' | 'server_error'
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const hasStartedRef = React.useRef(false);

    const API_URL = process.env.REACT_APP_API_URL ||
        (window.location.hostname === "localhost" ? "http://localhost:5000" : "");

    useEffect(() => {
        if (!shortCode || hasStartedRef.current) return;
        hasStartedRef.current = true;

        let progressInterval = setInterval(() => {
            setProgress((prev) => (prev < 95 ? prev + Math.random() * 15 : prev));
        }, 80);

        const checkAndRedirect = async () => {
            try {
                // 1. Check if the URL exists
                await axios.get(`${API_URL}/api/urls/code/${shortCode}`);

                // Finish progress bar before redirect
                setProgress(100);
                clearInterval(progressInterval);

                setTimeout(() => {
                    window.location.href = `${API_URL}/api/r/${shortCode}`;
                }, 400);

            } catch (err) {
                console.error("Redirection Check Failed:", err);
                clearInterval(progressInterval);
                setLoading(false);
                if (err.response && err.response.status === 404) {
                    setError("not_found");
                } else {
                    setError("server_error");
                }
            }
        };

        checkAndRedirect();

        return () => {
            if (progressInterval) clearInterval(progressInterval);
        };
    }, [shortCode, API_URL]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-[#faefe0] p-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="w-full max-w-md bg-white p-8 rounded-[2.5rem] shadow-2xl border border-white"
                >
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-sm font-bold text-[#E2852E] uppercase tracking-widest">Verifying Link</span>
                        <span className="text-sm font-black text-slate-400">{Math.round(progress)}%</span>
                    </div>

                    {/* Progress Bar Container */}
                    <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden mb-6 relative">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                            className="h-full bg-gradient-to-r from-orange-400 to-[#E2852E] rounded-full shadow-[0_0_15px_rgba(226,133,46,0.3)]"
                        />
                    </div>

                    <p className="text-slate-600 font-bold mb-2">Redirecting you to your destination</p>
                    <p className="text-slate-400 text-sm">Please wait while we secure your connection...</p>
                </motion.div>
            </div>
        );
    }

    if (error === "not_found") {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-[#faefe0] p-4 text-center">
                <div className="bg-red-100 p-6 rounded-full mb-6 text-red-500">
                    <Unplug size={64} />
                </div>
                <h1 className="text-3xl font-black text-slate-800 mb-2">Link Not Found</h1>
                <p className="text-slate-500 max-w-md mb-8">
                    The short link you are trying to access doesn't exist or has been deleted.
                </p>
                <button
                    onClick={() => navigate("/")}
                    className="flex items-center gap-2 bg-[#E2852E] text-white px-8 py-3 rounded-2xl font-bold hover:shadow-lg hover:shadow-orange-200 transition-all"
                >
                    Go to Homepage <ArrowRight size={20} />
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-[#faefe0] p-4 text-center">
            <div className="bg-yellow-100 p-6 rounded-full mb-6 text-yellow-600">
                <AlertTriangle size={64} />
            </div>
            <h1 className="text-3xl font-black text-slate-800 mb-2">Connection Issue</h1>
            <p className="text-slate-500 max-w-md mb-8">
                We couldn't connect to the server to verify this link. Please check if the backend is running.
            </p>
            <button
                onClick={() => window.location.reload()}
                className="text-slate-600 font-bold hover:underline"
            >
                Try Again
            </button>
        </div>
    );
};

export default RedirectHandler;
