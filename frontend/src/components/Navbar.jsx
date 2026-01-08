import React, { useState, useEffect } from "react";
import { Menu, X, User, Grid, LogOut, UserCheck } from "lucide-react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleDashboardClick = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/login?redirect=/dashboard");
    }
  };

  return (
    <nav className="w-full bg-white/80 backdrop-blur-md fixed top-0 left-0 z-50 border-b border-orange-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-24">
          
          {/* Logo - Increased to 3xl */}
          <Link to="/" className="flex items-center group">
            <span className="text-3xl font-black tracking-tighter text-[#333] group-hover:text-[#E2852E] transition-colors">
              Link<span className="text-[#E2852E]">Short</span>
            </span>
          </Link>

          {/* Desktop Menu - Items increased from text-sm to text-base */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-[#333] hover:text-[#E2852E] font-semibold text-base transition-all duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#E2852E] after:left-0 after:-bottom-1 hover:after:w-full after:transition-all">Home</Link>
              <Link to="/link" className="text-[#333] hover:text-[#E2852E] font-semibold text-base transition-all duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#E2852E] after:left-0 after:-bottom-1 hover:after:w-full after:transition-all">LinkPop</Link>
              <button
                onClick={handleDashboardClick}
                className="text-[#333] hover:text-[#E2852E] font-semibold text-base transition-all duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#E2852E] after:left-0 after:-bottom-1 hover:after:w-full after:transition-all flex items-center gap-1"
              > 
                Dashboard
              </button>
              <Link to="/contact" className="text-[#333] hover:text-[#E2852E] font-semibold text-base transition-all duration-300 relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-[#E2852E] after:left-0 after:-bottom-1 hover:after:w-full after:transition-all">Contact</Link>
            </div>

            <div className="h-8 w-px bg-gray-200 mx-2"></div>

            <div className="flex items-center space-x-5">
              {user ? (
                <>
                  <div className="flex flex-col items-end">
                    <span className="text-sm text-gray-500 font-medium leading-none">Welcome,</span>
                    <span className="text-[#333] font-bold text-base">{user.displayName || "User"}</span>
                  </div>
                  <Link 
                    to="/profile" 
                    className="p-2.5 rounded-full bg-gray-50 text-[#333] hover:bg-[#FFE2AF] hover:text-[#E2852E] transition-all"
                  >
                    <User size={22} />
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="p-2.5 rounded-full bg-gray-50 text-[#333] hover:bg-red-50 hover:text-red-500 transition-all" 
                    title="Logout"
                  >
                    <LogOut size={22} />
                  </button>
                </>
              ) : (
                <Link 
                  to="/login" 
                  className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#E2852E] text-white font-bold text-base hover:bg-[#333] transition-all shadow-md shadow-orange-200"
                >
                  <UserCheck size={20} />
                  Login
                </Link>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu} 
              className="p-2 rounded-lg text-[#333] hover:bg-gray-100 focus:outline-none transition-colors"
            >
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu - Items increased to text-xl */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-screen opacity-100 border-t border-orange-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white px-8 py-8 flex flex-col space-y-6 shadow-xl">
          <Link to="/" onClick={toggleMenu} className="text-[#333] hover:text-[#E2852E] font-bold text-xl">Home</Link>
          <Link to="/about" onClick={toggleMenu} className="text-[#333] hover:text-[#E2852E] font-bold text-xl">About</Link>
          <button
            onClick={() => { handleDashboardClick(); toggleMenu(); }}
            className="text-[#333] hover:text-[#E2852E] font-bold text-xl flex items-center gap-4"
          >
            <Grid size={24} /> Dashboard
          </button>
          <Link to="/contact" onClick={toggleMenu} className="text-[#333] hover:text-[#E2852E] font-bold text-xl">Contact</Link>

          <div className="pt-6 border-t border-gray-100">
            {user ? (
              <div className="flex flex-col space-y-5">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FFE2AF] flex items-center justify-center text-[#E2852E] font-bold text-lg">
                    {(user.displayName || "U").charAt(0)}
                  </div>
                  <span className="text-[#333] font-bold text-xl">{user.displayName || "User"}</span>
                </div>
                <div className="flex gap-4">
                  <Link 
                    to="/profile" 
                    onClick={toggleMenu}
                    className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-gray-50 text-[#333] font-bold text-base"
                  >
                    <User size={22} /> Profile
                  </Link>
                  <button 
                    onClick={handleLogout} 
                    className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-red-50 text-red-500 font-bold text-base"
                  >
                    <LogOut size={22} /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link 
                to="/login" 
                onClick={toggleMenu}
                className="w-full flex items-center justify-center gap-2 py-5 rounded-xl bg-[#E2852E] text-white font-bold text-xl shadow-lg"
              >
                <UserCheck size={24} /> Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;