import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Unplug, AlertTriangle, ArrowRight } from "lucide-react";

const RedirectHandler = () => {
    const { shortCode } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null); // 'not_found' | 'server_error'
    const [loading, setLoading] = useState(true);

    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

    useEffect(() => {
        const checkAndRedirect = async () => {
            try {
                // 1. Check if the URL exists by querying the API (not the redirect route)
                // We use the endpoint we verified earlier: GET /api/urls/code/:shortCode
                await axios.get(`${API_URL}/api/urls/code/${shortCode}`);

                // 2. If successful, it exists! Now initiate the ACTUAL redirect 
                // which handles the click tracking logic on the backend.
                window.location.href = `${API_URL}/${shortCode}`;

            } catch (err) {
                console.error("Redirection Check Failed:", err);
                setLoading(false);
                if (err.response && err.response.status === 404) {
                    setError("not_found");
                } else {
                    setError("server_error");
                }
            }
        };

        if (shortCode) {
            checkAndRedirect();
        }
    }, [shortCode, API_URL]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen bg-[#faefe0]">
                <div className="w-16 h-16 border-4 border-[#E2852E] border-t-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-slate-600 font-medium animate-pulse">Redirecting you...</p>
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
