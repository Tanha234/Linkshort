import React, { useState } from "react";
import Swal from "sweetalert2";

const ShortenURL = ({ backendUrl }) => {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");

  const generateShortCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    for (let i = 0; i < 6; i++) code += chars.charAt(Math.floor(Math.random() * chars.length));
    return code;
  };

  const handleShorten = async () => {
    if (!longUrl) return Swal.fire("Error", "Enter a URL", "error");

    // Generate a short code
    const shortCode = generateShortCode();

    try {
      // Send to backend to save
      const res = await fetch(`${backendUrl}/shorten`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl, shortCode }),
      });

      const data = await res.json();
      if (res.ok) {
        setShortUrl(`${window.location.origin}/${data.shortCode}`);
        Swal.fire("Success", "URL shortened!", "success");
      } else {
        Swal.fire("Error", data.message || "Something went wrong", "error");
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Server error", "error");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    Swal.fire("Copied!", "Short URL copied to clipboard.", "success");
  };

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded shadow mt-6">
      <input
        type="text"
        placeholder="Paste your long URL here"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        className="w-full p-3 border rounded mb-4"
      />
      <button
        onClick={handleShorten}
        className="bg-[#E2852E] text-white px-4 py-2 rounded mr-2"
      >
        Shorten
      </button>

      {shortUrl && (
        <div className="mt-4 flex items-center justify-between border p-3 rounded bg-gray-50">
          <span className="truncate">{shortUrl}</span>
          <button onClick={handleCopy} className="text-blue-600 hover:underline">
            Copy
          </button>
        </div>
      )}
    </div>
  );
};

export default ShortenURL;
