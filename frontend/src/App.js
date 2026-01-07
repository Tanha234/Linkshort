import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./pages/Footer";

import Home from "./pages/Home";
import About from "./pages/LinkPop";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./pages/ProtectedRoute";
import ContactPage from "./pages/Contact";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Navbar />

      <div className="pt-16 min-h-[calc(100vh-96px)] flex flex-col">
      <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/about" element={<About />} />
  <Route path="/contact" element={<ContactPage />} />
  <Route path="/register" element={<Register />} />
  <Route path="/profile" element={<Profile />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />

  {/* Protected Routes */}
  <Route element={<PrivateRoute />}>
    <Route path="/dashboard" element={<Dashboard />} />
  </Route>

  {/* 404 */}
  <Route path="*" element={<NotFound />} />
</Routes>

      </div>

      <Footer />
    </>
  );
}

export default App;
