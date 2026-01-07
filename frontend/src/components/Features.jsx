import React, { useState } from "react";

const Features = () => {
  const [hovered, setHovered] = useState(null);

  const features = [
    { icon: "🔐", title: "Secure Authentication", desc: "Protected dashboard with user login and access control.", size: "small" },
    { icon: "📊", title: "Click Analytics", desc: "Track total clicks, devices, and locations in real time.", size: "large" },
    { icon: "📋", title: "Instant Copy", desc: "Copy shortened links instantly with a single click.", size: "small" },
    { icon: "⚡", title: "Fast Redirects", desc: "Ultra-fast redirects with optimized infrastructure.", size: "small" },
    { icon: "🧹", title: "Link Management", desc: "Edit, delete, and organize links effortlessly.", size: "small" },
    { icon: "🚫", title: "Usage Limits", desc: "Free users can create up to 100 short links.", size: "small" },
  ];

  const styles = {
    section: {
      backgroundColor: "#fcfcfd",
      padding: "100px 24px",
      fontFamily: "'Inter', sans-serif",
      overflow: "hidden",
    },
    container: {
      maxWidth: "1100px",
      margin: "0 auto",
    },
    header: {
      textAlign: "center",
      marginBottom: "60px",
    },
    title: {
      fontSize: "clamp(32px, 5vw, 48px)",
      fontWeight: "800",
      color: "#111827",
      letterSpacing: "-0.03em",
      marginBottom: "16px",
      animation: "fadeInDown 0.8s ease-out forwards",
    },
    subtitle: {
      fontSize: "18px",
      color: "#6b7280",
      maxWidth: "600px",
      margin: "0 auto",
      lineHeight: "1.6",
      animation: "fadeIn 1s ease-out 0.2s forwards",
      opacity: 0,
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
      gap: "24px",
      gridAutoRows: "minmax(180px, auto)",
    },
    card: (isHovered, index) => ({
      position: "relative",
      padding: "32px",
      background: "#ffffff",
      borderRadius: "24px",
      border: "1px solid #f3f4f6",
      boxShadow: isHovered 
        ? "0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
        : "0 4px 6px -1px rgba(0, 0, 0, 0.02)",
      transition: "all 0.5s cubic-bezier(0.19, 1, 0.22, 1)",
      transform: isHovered ? "translateY(-12px)" : "translateY(0)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      cursor: "pointer",
      // Entry Animation
      opacity: 0,
      animation: `revealUp 0.6s cubic-bezier(0.23, 1, 0.32, 1) forwards`,
      animationDelay: `${index * 0.1}s`,
    }),
    iconBox: {
      width: "56px",
      height: "56px",
      background: "#f9fafb",
      borderRadius: "16px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "26px",
      marginBottom: "24px",
      border: "1px solid #f3f4f6",
      transition: "all 0.3s ease",
    },
    h3: {
      fontSize: "20px",
      fontWeight: "700",
      color: "#1f2937",
      marginBottom: "12px",
    },
    p: {
      fontSize: "16px",
      color: "#4b5563",
      lineHeight: "1.5",
      margin: 0,
    }
  };

  return (
    <div style={styles.section}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;800&display=swap');
          
          /* Reveal cards from bottom */
          @keyframes revealUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes fadeInDown {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes fadeIn {
            to { opacity: 1; }
          }

          .feature-card:hover .icon-inner {
            transform: scale(1.15) rotate(-8deg);
            background: #6366f1 !important; /* Soft Indigo pop on hover */
            color: white;
            box-shadow: 0 10px 15px -3px rgba(99, 102, 241, 0.3);
          }

          .feature-card:active {
            transform: scale(0.98) translateY(-8px) !important;
          }
        `}
      </style>
      
      <div style={styles.container}>
        <div style={styles.header}>
          <h2 style={styles.title}>Powering your links</h2>
          <p style={styles.subtitle}>
            A comprehensive suite of tools designed to give you total control and 
            deep insights into every link you share.
          </p>
        </div>

        <div style={styles.grid}>
          {features.map((f, i) => (
            <div
              key={i}
              className="feature-card"
              style={styles.card(hovered === i, i)}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="icon-inner" style={styles.iconBox}>
                {f.icon}
              </div>
              <h3 style={styles.h3}>{f.title}</h3>
              <p style={styles.p}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;