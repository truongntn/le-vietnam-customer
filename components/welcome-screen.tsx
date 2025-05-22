"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import axios from 'axios';

interface WelcomeScreenProps {
  onTap: () => void;
}

export default function WelcomeScreen({ onTap }: WelcomeScreenProps) {
  
  return (
    <motion.div
      className="relative w-full h-full overflow-hidden cursor-pointer"
      onClick={onTap}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background layers */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "#ffda44" }}
      ></div>

      {/* Centered smaller background circles */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{ backgroundColor: "#ffb347" }}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 1, 0],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        ></motion.div>

        <motion.div
          className="absolute w-[400px] h-[400px] rounded-full"
          style={{ backgroundColor: "#f05122" }}
          animate={{
            scale: [1, 1.03, 1],
            rotate: [0, -1, 0],
          }}
          transition={{
            duration: 7,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 0.5,
          }}
        ></motion.div>

        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full"
          style={{ backgroundColor: "#e63946" }}
          animate={{
            scale: [1, 1.02, 1],
            rotate: [0, 0.5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        ></motion.div>

        <motion.div
          className="absolute w-[200px] h-[200px] rounded-full"
          style={{ backgroundColor: "#000000" }}
          animate={{
            scale: [1, 1.01, 1],
            rotate: [0, -0.5, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1.5,
          }}
        ></motion.div>
      </div>

      {/* Center content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <div className="absolute top-10 px-6 py-3 rounded-full flex flex-col items-center">
          <div className="w-40 h-auto">
            <Image
              src="images/le-vietnam.png"
              alt="Le Vietnam Logo"
              width={200}
              height={80}
              priority
            />
          </div>
        </div>

        {/* TAP TO CHECKIN text */}
        <motion.div
          className="text-center z-10"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <h1 className="text-4xl font-bold mb-2">TAP TO</h1>
          <h1 className="text-5xl font-bold">VIEW ORDERS</h1>
        </motion.div>

        {/* Beauty Icons */}
        {/* Nail Polish Icon */}
        <motion.div
          className="absolute left-16 top-1/4"
          animate={{
            y: [0, -10, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="m4.6 13.11 5.79-3.21c1.89-1.05 4.79 1.78 3.71 3.71l-3.22 5.81C8.8 23.16.79 15.23 4.6 13.11Z"></path>
            <path d="m10.5 9.5-1-2.29C9.2 6.48 8.8 6 8 6H4.5C2.79 6 2 6.5 2 8.5a7.71 7.71 0 0 0 2 4.83"></path>
            <path d="M8 6c0-1.55.24-4-2-4-2 0-2.5 2.17-2.5 4"></path>
            <path d="m14.5 13.5 2.29 1c.73.3 1.21.7 1.21 1.5v3.5c0 1.71-.5 2.5-2.5 2.5a7.71 7.71 0 0 1-4.83-2"></path>
            <path d="M18 16c1.55 0 4-.24 4 2 0 2-2.17 2.5-4 2.5"></path>
          </svg>
        </motion.div>

        {/* Nail File Icon */}
        <motion.div
          className="absolute right-16 top-1/4"
          animate={{
            y: [0, 10, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 0.5,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path d="m4.6 13.11 5.79-3.21c1.89-1.05 4.79 1.78 3.71 3.71l-3.22 5.81C8.8 23.16.79 15.23 4.6 13.11Z"></path>
            <path d="m10.5 9.5-1-2.29C9.2 6.48 8.8 6 8 6H4.5C2.79 6 2 6.5 2 8.5a7.71 7.71 0 0 0 2 4.83"></path>
            <path d="M8 6c0-1.55.24-4-2-4-2 0-2.5 2.17-2.5 4"></path>
            <path d="m14.5 13.5 2.29 1c.73.3 1.21.7 1.21 1.5v3.5c0 1.71-.5 2.5-2.5 2.5a7.71 7.71 0 0 1-4.83-2"></path>
            <path d="M18 16c1.55 0 4-.24 4 2 0 2-2.17 2.5-4 2.5"></path>
          </svg>
        </motion.div>

        {/* Hand with Nails Icon */}
        <motion.div
          className="absolute left-20 bottom-1/4"
          animate={{
            y: [0, 8, 0],
            rotate: [0, 3, 0],
          }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="8" cy="21" r="1"></circle>
            <circle cx="19" cy="21" r="1"></circle>
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
          </svg>
        </motion.div>

        {/* Makeup Brush Icon */}
        <motion.div
          className="absolute right-20 bottom-1/4"
          animate={{
            y: [0, -8, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 4.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1.5,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            /*stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"*/
          >
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path>
            <path d="M8.5 8.5v.01"></path>
            <path d="M16 15.5v.01"></path>
            <path d="M12 12v.01"></path>
            <path d="M11 17v.01"></path>
            <path d="M7 14v.01"></path>
          </svg>
        </motion.div>

        {/* Lipstick Icon */}
        <motion.div
          className="absolute left-1/4 top-1/3"
          animate={{
            y: [0, 5, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 0.7,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            /*stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"*/
          >
            <path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"></path>
            <path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"></path>
            <path d="M2 21h20"></path>
            <path d="M7 8v3"></path>
            <path d="M12 8v3"></path>
            <path d="M17 8v3"></path>
            <path d="M7 4h.01"></path>
            <path d="M12 4h.01"></path>
            <path d="M17 4h.01"></path>
          </svg>
        </motion.div>

        {/* Scissors Icon */}
        <motion.div
          className="absolute right-1/4 top-1/3"
          animate={{
            y: [0, -5, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 3.5,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1.2,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            /*stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"*/
          >
            <path d="m16 2-2.3 2.3a3 3 0 0 0 0 4.2l1.8 1.8a3 3 0 0 0 4.2 0L22 8"></path>
            <path d="M15 15 3.3 3.3a4.2 4.2 0 0 0 0 6l7.3 7.3c.7.7 2 .7 2.8 0L15 15Zm0 0 7 7"></path>
            <path d="m2.1 21.8 6.4-6.3"></path>
            <path d="m19 5-7 7"></path>
          </svg>
        </motion.div>

        {/* Perfume Icon */}
        <motion.div
          className="absolute left-1/3 bottom-1/3"
          animate={{
            y: [0, -7, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 0.3,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            /*stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"*/
          >
            <path d="M10 2v2"></path>
            <path d="M14 2v2"></path>
            <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1"></path>
            <path d="M6 2v2"></path>
          </svg>
        </motion.div>

        {/* Mirror Icon */}
        <motion.div
          className="absolute right-1/3 bottom-1/3"
          animate={{
            y: [0, 7, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            delay: 1.8,
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="60"
            height="60"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            /*stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"*/
          >
            <path d="m4.6 13.11 5.79-3.21c1.89-1.05 4.79 1.78 3.71 3.71l-3.22 5.81C8.8 23.16.79 15.23 4.6 13.11Z"></path>
            <path d="m10.5 9.5-1-2.29C9.2 6.48 8.8 6 8 6H4.5C2.79 6 2 6.5 2 8.5a7.71 7.71 0 0 0 2 4.83"></path>
            <path d="M8 6c0-1.55.24-4-2-4-2 0-2.5 2.17-2.5 4"></path>
            <path d="m14.5 13.5 2.29 1c.73.3 1.21.7 1.21 1.5v3.5c0 1.71-.5 2.5-2.5 2.5a7.71 7.71 0 0 1-4.83-2"></path>
            <path d="M18 16c1.55 0 4-.24 4 2 0 2-2.17 2.5-4 2.5"></path>
          </svg>
        </motion.div>
      </div>
    </motion.div>
  );
}
