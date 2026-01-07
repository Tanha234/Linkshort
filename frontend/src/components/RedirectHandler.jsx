import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RedirectHandler = () => {
    const { shortCode } = useParams();
    const navigate = useNavigate();
    const API_URL = "http://localhost:5000"; // Should be in env, keeping hardcoded for now matching LinkPop

    useEffect(() => {
        const fetchAndRedirect = async () => {
            try {
                const res = await axios.get(`${API_URL}/api/urls/code/${shortCode}`);
                if (res.data.originalUrl) {
                    // Track click via separate call if needed, or if backend tracks on GET, fine.
                    // Note: Backend /redirect tracking was on GET /:shortCode (the original redirector).
                    // Ideally we should hit that endpoint to count the click, but we can't do that easily via axios if it redirects.
                    // For now, we just redirect. If click tracking is critical, we might need a dedicated "track" endpoint or just accept we use the backend redirector for tracking.
                    // Wait, user wants "shorter link using server port".

                    // Actually, simply doing window.location.href = backendRedirectUrl is better because it hits the backend logic (tracking + redirect).
                    window.location.href = `${API_URL}/${shortCode}`;
                }
            } catch (err) {
                console.error("Redirection error:", err);
                // navigate("/404"); // or show error
            }
        };

        // Optimization: Just redirect blindly to backend? 
        // If we do window.location.href = `http://localhost:5000/${shortCode}`, the backend handles 404s and tracking.
        // This is much simpler and ensures tracking works.
        window.location.href = `${API_URL}/${shortCode}`;

    }, [shortCode, navigate]);

    return (
        <div className="flex items-center justify-center h-screen">
            <p className="text-xl">Redirecting...</p>
        </div>
    );
};

export default RedirectHandler;
