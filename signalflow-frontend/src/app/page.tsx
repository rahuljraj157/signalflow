

"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">

     
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_200%]"
        animate={{ backgroundPosition: ["0% 50%", "100% 50%"] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

    
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative text-center text-white z-10"
      >
        <h1 className="text-5xl font-bold mb-4">
          SignalFlow 🚀
        </h1>

        <p className="mb-8 text-lg">
          Real-time trading alert system
        </p>

       
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => router.push("/register")}
          className="bg-white text-black px-8 py-3 rounded shadow-lg"
        >
          Get Started →
        </motion.button>

   
        <p className="mt-4 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="underline cursor-pointer font-semibold"
          >
            Login
          </span>
        </p>
      </motion.div>
    </div>
  );
}