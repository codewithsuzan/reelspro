
"use client";

import Head from 'next/head';
import { useState, useEffect } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

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

  return (
    <>
      <Head>
        <title>Login | ReelsPro - Video Sharing Platform</title>
        <meta
          name="description"
          content="Login to ReelsPro to share, watch, and discover videos on your favorite platform."
        />
        <meta
          name="keywords"
          content="ReelsPro, login, video sharing, video platform, login to ReelsPro"
        />
        <meta
          property="og:title"
          content="Login | ReelsPro - Video Sharing Platform"
        />
        <meta
          property="og:description"
          content="Login to ReelsPro to share, watch, and discover videos on your favorite platform."
        />
        <meta
          property="og:image"
          content="https://example.com/path/to/your/logo.jpg"
        />
        <meta property="og:url" content="https://reelspro.com/login" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-gradient flex items-center justify-center">
        <div className="absolute top-8 text-white text-2xl font-bold">
          <span className="text-white">reelspro</span>
          <span className="text-gray-300 font-extrabold">.com</span> - A Video
          Platform
        </div>

        <div className="text-white p-8 rounded-lg shadow-lg bg-black bg-opacity-50 w-96">
          <h1 className="text-3xl font-bold border-b-4 border-purple-500 pb-3 mb-6 w-fit">
            Login
          </h1>

          <div className="flex items-center border-b-2 border-purple-500 mb-6 pb-2">
            <Mail className="w-5 h-5 mr-3" />
            <input
              type="email"
              placeholder="Enter Your Email"
              className="w-full bg-transparent focus:outline-none text-white placeholder-gray-300"
            />
          </div>

          <div className="flex items-center border-b-2 border-purple-500 mb-6 pb-2 relative">
            <Lock className="w-5 h-5 mr-3" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Your Password"
              className="w-full bg-transparent focus:outline-none text-white placeholder-gray-300"
            />
            <button
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          <button className="w-full py-2 mt-4 text-lg font-bold border-2 border-purple-500 rounded-lg hover:bg-purple-900 hover:text-white transition">
            Login
          </button>
          <Link
            href="/register"
            className="block mt-4 text-purple-300 text-center hover:underline"
          >
            Don't have an account? Register here.
          </Link>
        </div>
      </div>
    </>
  );
}
