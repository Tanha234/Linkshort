# LinkShort -  URL Shortener
## 📖 Project Overview
A modern, full-stack URL shortener application built with the MERN stack (MongoDB, Express, React, Node.js). It features a premium glassmorphism UI, advanced analytics, and user authentication via Firebase.
# 📖 Project Overview
**LinkShort** is a sophisticated, full-stack URL shortening service designed with a focus on **visual aesthetics** and **user experience**. Unlike generic shorteners, LinkShort provides a premium "Glassmorphism" interface, detailed analytics, and a seamless flow for managing your digital footprint.

It allows users to:
- Instantly shorten long, complex URLs into clean, shareable links.
- Track performance with real-time analytics (clicks, trends).
- Manage their links via a personal dashboard.
- Customize their profile and view aggregate statistics.

---

## 🛠 How It Works

1.  **Sign Up / Login**: Users create an account using their email and password via **Firebase Authentication**.
2.  **Shorten a Link**:
    - Navigate to the **LinkPop** page (or Home).
    - Paste your long URL > Click **Shorten**.
    - Copy your new short link instantly.
3.  **Share**: Distribute your link on social media, emails, or messages.
4.  **Track**:
    - Go to your **Dashboard** to see a list of all your links.
    - View total clicks, top-performing links, and activity graphs.
5.  **Analyze**: Visit your **Profile** for a visual breakdown of your overall engagement.

---

## 🔐 Authentication & Security

We leverage **Firebase Authentication** to provide robust and secure identity management.

### Key Features:
-   **Email/Password Sign-up**: Secure registration flow.
-   **Password Reset**: Users can request a password reset link via the `/forgot-password` route if they lose access to their account.
-   **Email Verification**: (Supported by Firebase) Accounts are secure, and verification emails can be triggered to ensure valid user identities.
-   **Session Management**: Persistent login sessions using Firebase's efficient observer pattern (`onAuthStateChanged`).

## 🚀 Setup Instructions

### Prerequisites
- Node.js & npm installed
- MongoDB URI (local or Atlas)
- Firebase Project configured

### 1. Clone the repository
```bash
git clone <repository-url>
cd url-shorten
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Start the server:
```bash
node index.js
# The server will run on http://localhost:5000
```

### 3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:
```bash
cd frontend
npm install
```

Start the React development server:
```bash
npm start
# The app will open at http://localhost:3000
```

---

## 📂 Project Structure

/
├── backend/            # Server-side logic & API
│   ├── config/         # Database configuration
│   ├── models/         # Mongoose Data Models (Url.js)
│   ├── routes/         # API Routes (urlRoutes.js, redirect.js)
│   └── index.js        # Server entry point
├── frontend/           # Client-side React application
│   ├── public/         # Static assets
│   ├── src/
│   │   ├── components/ # Reusable UI Components
│   │   ├── pages/      # Page-level Components
│   │   ├── App.js      # Main Application Component & Routing
│   │   └── index.js    # React entry point
│   ├── tailwind.config.js # Styling configuration
│   └── package.json    # Frontend dependencies
├── netlify.toml        # Netlify deployment configuration
├── vercel.json         # Vercel deployment configuration
└── README.md           # Project documentation

## 📡 API Documentation

Base URL: `http://localhost:5000/api/urls`

| Method | Endpoint | Description | Request Body Example |
| :--- | :--- | :--- | :--- |
| **GET** | `/` | Get all URLs (Newest first) | N/A |
| **POST** | `/` | Create a short URL | `{ "originalUrl": "https://google.com", "userId": "uid123", "shortCode": "abc123", "shortUrl": "..." }` |
| **GET** | `/code/:shortCode` | Get original URL by code | N/A |
| **PUT** | `/:id` | Update original URL | `{ "originalUrl": "https://newsite.com" }` |
| **DELETE** | `/:id` | Delete a URL | N/A |

---

## 🎨 Design Decisions

1.  **Glassmorphism UI**: Utilized `backdrop-blur`, translucent whites (`bg-white/50`), and soft gradients to create a modern, depth-rich interface.
2.  **Animation**: `Framer Motion` powers the staggered reveals, hover effects, and smooth page transitions.
3.  **Data Visualization**: `Recharts` integrates beautiful area charts directly into the Profile and Dashboard for instant insights.
4.  **Tailwind CSS**: Efficient utility-first styling allows for rapid responsive design and easy theming (Primary Color: `#E2852E`).

---

## ⚠️ Known Limitations

1.  **Usage Limits**: Free accounts are limited to **100 URLs**. A simulated "Upgrade" flow exists for demonstration.
2.  **Payment Processing**: The upgrade payment process is currently a **simulation** (UI only) and does not process real money.
3.  **Local Development**: Short links generated locally point to `localhost`. Update the base URL in production for live sharing.
