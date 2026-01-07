import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { auth, googleProvider } from "../firebase";
import howItWorksImg from "../images/registrationn.png";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isValidPassword = (pwd) => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[.,!@#$%^&*]).{6,}$/;
    return regex.test(pwd);
  };

  const handleRegister = async () => {
    if (!name.trim()) {
      Swal.fire({
        icon: "error",
        title: "Name Required",
        text: "Please enter your full name.",
      });
      return;
    }

    if (!isValidPassword(password)) {
      Swal.fire({
        icon: "error",
        title: "Invalid Password",
        text: "Password must be at least 6 characters and include letters, numbers, and special characters like ., ! @ #",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        icon: "error",
        title: "Passwords do not match",
        text: "Confirm password must match your password.",
      });
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Save the user's name to Firebase profile
      await updateProfile(userCredential.user, { displayName: name });

      await sendEmailVerification(userCredential.user);

      Swal.fire({
        icon: "success",
        title: "Verification Email Sent",
        text: "Please check your email and verify your account before logging in.",
      });

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      await auth.signOut();
      navigate("/login");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Registration Failed",
        text: error.message,
      });
    }
    setLoading(false);
  };

  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
  
      Swal.fire({
        icon: "success",
        title: "Signed Up",
        text: "Signed up successfully with Google!",
        timer: 1500,
        showConfirmButton: false,
      });
  
      // Redirect directly to dashboard after Google sign-in
      navigate("/dashboard", { replace: true });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Signup Failed",
        text: error.message,
      });
    }
  };
  
  return (
    <div className="min-h-screen bg-[#fff8e7] flex items-center justify-center px-4 py-6  rounded-2xl shadow-xl">
      <div className="bg-white rounded-2xl shadow-xl flex flex-col md:flex-row overflow-hidden max-w-5xl w-full">

        {/* Form Section */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 lg:p-10 flex flex-col justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#E2852E] mb-6 mt-6 sm:mt-12">
            Create Account
          </h2>

          <div className="space-y-4">
            {/* Name */}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
            />

            {/* Email */}
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
            />

            {/* Password */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showConfirmPassword ? <EyeSlashIcon className="w-5 h-5" /> : <EyeIcon className="w-5 h-5" />}
              </button>
            </div>

            {/* Register Button */}
            <button
              onClick={handleRegister}
              disabled={loading}
              className="w-full bg-[#E2852E] text-white font-semibold py-3 rounded-lg transition duration-200 mt-4 sm:mt-6"
            >
              {loading ? "Creating..." : "Register"}
            </button>

            <div className="text-center text-gray-400 my-2 text-sm sm:text-base">OR</div>

            {/* Google Signup */}
            <button
              onClick={handleGoogleSignup}
              className="w-full border border-gray-300 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100 text-sm sm:text-base"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-4 sm:w-5"
              />
              Sign up with Google
            </button>
          </div>

          <p className="text-center text-sm sm:text-base text-gray-600 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-indigo-600 hover:underline cursor-pointer"
            >
              Login here
            </span>
          </p>
        </div>

        {/* Image Section */}
        <div className="w-full md:w-1/2 flex-shrink-0">
          <img
            src={howItWorksImg}
            alt="Register"
            className="w-full h-full object-contain"
          />
        </div>

      </div>
    </div>
  );
};

export default Register;
