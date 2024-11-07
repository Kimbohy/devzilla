"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SingUp from "./SingUp";
import SingIn from "./SingIn";
import { redirect } from "next/navigation";
import AuthButtons from "./AuthButtons";
import { Session } from "next-auth";

const SessionClient = ({ session }: { session: Session | null }) => {
  const [page, setPage] = useState(false);

  if (session?.user) {
    redirect("/");
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 to-primary/20 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
      >
        <div className="p-6 text-center bg-primary/10">
          <Image
            src="/logo.svg"
            alt="logo"
            width={100}
            height={100}
            className="mx-auto mb-4"
          />
          <h2 className="text-2xl font-bold text-primary">
            Welcome to Talent Platform
          </h2>
        </div>

        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setPage(false)}
            className={`flex-1 py-3 text-center transition-colors duration-300 ${
              !page ? "text-primary font-semibold" : "text-gray-500"
            }`}
          >
            Sign In
            {!page && (
              <motion.div
                layoutId="tab-underline"
                className="h-1 bg-primary w-full mt-2 rounded-full"
              />
            )}
          </button>
          <button
            onClick={() => setPage(true)}
            className={`flex-1 py-3 text-center transition-colors duration-300 ${
              page ? "text-primary font-semibold" : "text-gray-500"
            }`}
          >
            Sign Up
            {page && (
              <motion.div
                layoutId="tab-underline"
                className="h-1 bg-primary w-full mt-2 rounded-full"
              />
            )}
          </button>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait">
            {page ? <SingUp key="signup" /> : <SingIn key="signin" />}
          </AnimatePresence>
        </div>

        <div className="px-6 pb-6">
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <AuthButtons />
        </div>
      </motion.div>
    </div>
  );
};

export default SessionClient;
