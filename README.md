# LinkShort - Premium URL Shortener

A modern, full-stack URL shortener application built with the MERN stack (MongoDB, Express, React, Node.js). It features a premium glassmorphism UI, advanced analytics, and user authentication via Firebase.

## 🚀 Setup Instructions

### Prerequisites
- Node.js & npm installed
- MongoDB URI (local or Atlas)
- Firebase Project (for authentication)

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

```text
/backend
  ├── index.js          # Entry point (Serverless ready)
  ├── routes/           # API Routes
  │   ├── urlRoutes.js  # CRUD for URLs
  │   └── redirect.js   # Handle short link redirections
  └── models/           # Mongoose Data Models

/frontend
  ├── src/
  │   ├── components/   # Reusable UI components (Navbar, Pricing, etc.)
  │   ├── pages/        # Main pages (LinkPop generator, Dashboard, Profile)
  │   ├── images/       # Static assets
  │   └── styles/       # Tailwind & CSS configurations
  └── package.json      # Dependencies (React, Framer Motion, Recharts)
```

---

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

1.  **Glassmorphism UI**: We utilized a modern design language with translucent backgrounds (`backdrop-blur`), soft gradients, and floating 3D elements to create a premium feel.
2.  **Animation**: `Framer Motion` is used extensively for smooth page transitions, staggered entrance animations, and interactive hover states.
3.  **Data Visualization**: `Recharts` provides interactive area charts on the profile page to maximize user engagement with analytics.
4.  **Tailwind CSS**: Chosen for rapid styling and ease of implementing responsive designs and complex gradients (e.g., `#E2852E` orange theme).
5.  **Firebase Auth**: Delegated authentication logic to Firebase for secure and easy-to-manage user sessions.

---

## ⚠️ Known Limitations

1.  **Usage Limits**: The "Free" tier is currently hard-coded to a limit of **100 URLs per user**. Users exceeding this will be prompted to upgrade via a simulated pricing page.
2.  **Simulated Payments**: The "Upgrade to Pro" button on the pricing page currently runs a simulated payment animation using `SweetAlert2` and does not actually process real payments.
3.  **Localhost Usage**: The generated short URLs currently default to `localhost` origin. For production, this should be updated to the deployed domain.
