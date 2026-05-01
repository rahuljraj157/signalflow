"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/src/lib/api";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async () => {
    try {
      await api.post("/auth/register", {
        email,
        password,
      });

      alert("Registered successfully ✅");
      router.push("/login");
    } catch (err: any) {
      alert(err?.response?.data?.msg || "Registration failed ❌");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-purple-600 to-indigo-600">
      
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        
        <h2 className="text-2xl font-semibold mb-6 text-center text-purple-700">
          Create Account
        </h2>

        <input
          className="w-full border border-gray-300 p-2 mb-3 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full border border-gray-300 p-2 mb-4 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleRegister}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded"
        >
          Register
        </button>

        {/* Login Link */}
        <p className="mt-4 text-sm text-center">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-purple-600 font-semibold cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>
    </div>
  );
}