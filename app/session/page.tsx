"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SingUp from "../../components/SingUp";
import SingIn from "../../components/SingIn";
import NextAuth from "@/components/NextAuth";

const Session = () => {
  const [page, setPage] = useState(false);
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <AnimatePresence initial={false}>
        <div className="flex flex-col w-full h-screen max-w-md p-10 bg-white rounded-lg shadow-md">
          <Image
            src="/logo.svg"
            alt="logo"
            width={100}
            height={100}
            className=" mx-auto mb-5"
          />

          <div className="flex justify-start gap-3 mb-5 border-b-2 border-gray-600">
            <button
              onClick={() => setPage(false)}
              className={` rounded-lg ${page && "text-gray-600"}`}
            >
              <span>Sign in</span>
              {!page && (
                <motion.div
                  layoutId="underLine"
                  className="relative top-[2px] w-full h-[2px] bg-accent"
                />
              )}
            </button>

            <button
              onClick={() => setPage(true)}
              className={` rounded-lg ${!page && "text-gray-600"}`}
            >
              <span>Sign up</span>
              {page && (
                <motion.div
                  layoutId="underLine"
                  className="relative top-[2px] w-full h-[2px] bg-accent"
                />
              )}
            </button>
          </div>
          {page ? <SingUp /> : <SingIn />}
          <NextAuth />
        </div>
      </AnimatePresence>
    </div>
  );
};
export default Session;
