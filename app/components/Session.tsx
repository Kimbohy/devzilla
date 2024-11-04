"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SingUp from "./SingUp";
import SingIn from "./SingIn";

const Session = ({ children }: { children: React.ReactNode }) => {
  const [page, setPage] = useState(false);
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <AnimatePresence initial={false}>
        <div className="flex flex-col w-full h-screen max-w-md p-10 bg-white rounded-lg shadow-md">
          <Image
            src="/logo.svg"
            alt="logo"
            width={20}
            height={20}
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
                  className="relative top-[2px] w-full h-[2px] bg-lime-900"
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
                  className="relative top-[2px] w-full h-[2px] bg-tertiary"
                />
              )}
            </button>
          </div>
          {page ? <SingUp /> : <SingIn />}
          {children}
        </div>
      </AnimatePresence>
    </div>
  );
};
export default Session;
