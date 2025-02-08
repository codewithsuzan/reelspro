"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [privacyChecked, setPrivacyChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const router = useRouter();

  // Mouse trail effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const dot = document.createElement("div");
      dot.className =
        "absolute w-3 h-3 bg-green-500 rounded-full pointer-events-none animate-fadeOut";
      document.body.appendChild(dot);

      dot.style.left = `${e.pageX}px`;
      dot.style.top = `${e.pageY}px`;

      setTimeout(() => {
        dot.remove();
      }, 500);
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Form validation
  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("All fields are required");
      return false;
    }

    if (!privacyChecked) {
      toast.error("You must agree to the Privacy Policy");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  // Handle Form Submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          confirmPassword: formData.confirmPassword,
        }),
      });
      const data = await res.json();

      if (!res.ok) {
        // Handle specific error cases
        if (data.error === "Email is already registered") {
          toast.error(
            <div>
              This email is already registered.{" "}
              <button 
                onClick={() => router.push("/login")}
                className="text-blue-400 underline"
              >
                Click here to login
              </button>
            </div>,
            {
              autoClose: 5000, // Give users more time to click the login link
            }
          );
          return;
        }
        throw new Error(data.error || "Registration failed");
      }

      toast.success("Registration successful! Redirecting...");
      setTimeout(() => router.push("/login"), 1500);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Failed to register. Please try again.");
      }
      console.error("Registration Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    
    // Clear email error when user starts typing again
    if (e.target.name === 'email') {
      setEmailError(false);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient flex items-center justify-center p-4">
      <div className="absolute top-4 sm:top-8 text-white text-xl sm:text-2xl font-bold text-center w-full px-4">
        Welcome to <span className="text-white">reelspro</span>
        <span className="text-gray-300 font-extrabold">.com</span>
        <br />
        <br />
        <h1 className="text-gray-300 text-xs sm:text-sm mb-4 px-2">
          Create your account to explore amazing video content!
        </h1>
      </div>

      <div className="text-white p-4 sm:p-8 rounded-lg shadow-lg bg-black bg-opacity-50 w-full max-w-[380px] mt-16 sm:mt-0">
        <h1 className="text-2xl sm:text-3xl font-bold border-b-4 border-purple-500 pb-3 mb-6 w-fit">
          Sign Up
        </h1>

        <form onSubmit={handleSubmit}>
          <div className={`flex items-center border-b-2 ${
            emailError ? 'border-red-500' : 'border-purple-500'
          } mb-6 pb-2`}>
            <Mail className={`w-5 h-5 mr-3 ${emailError ? 'text-red-500' : ''}`} />
            <input
              type="email"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full bg-transparent focus:outline-none text-white placeholder-gray-300 ${
                emailError ? 'text-red-400' : ''
              }`}
              required
              disabled={isLoading}
            />
            {emailError && (
              <span className="text-red-500 text-xs ml-2">
                Email already exists
              </span>
            )}
          </div>

          <div className="flex items-center border-b-2 border-purple-500 mb-6 pb-2 relative">
            <Lock className="w-5 h-5 mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Your Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-transparent focus:outline-none text-white placeholder-gray-300"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center border-b-2 border-purple-500 mb-6 pb-2 relative">
            <Lock className="w-5 h-5 mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full bg-transparent focus:outline-none text-white placeholder-gray-300"
              required
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center mb-4 flex-wrap">
            <input
              type="checkbox"
              checked={privacyChecked}
              onChange={(e) => setPrivacyChecked(e.target.checked)}
              className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500 bg-transparent border-2 border-purple-500 rounded mr-3 cursor-pointer"
              disabled={isLoading}
            />
            <label className="text-gray-300 text-xs sm:text-sm">
              I agree to the <span className="text-purple-400 underline cursor-pointer">Privacy Policy</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 mt-2 text-base sm:text-lg font-bold border-2 border-purple-500 rounded-lg hover:bg-purple-900 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin mr-2" size={20} />
                Signing up...
              </>
            ) : (
              "Sign Up"
            )}
          </button>
        </form>

        <Link 
          href="/login" 
          className={`block mt-4 text-purple-300 text-center hover:underline ${isLoading ? 'pointer-events-none opacity-50' : ''}`}
        >
          Already have an account? Login here.
        </Link>
      </div>
    </div>
  );
}