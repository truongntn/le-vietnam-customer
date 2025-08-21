"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "./confetti";
import Image from "next/image";

interface SuccessScreenProps {
  points: number;
  customerName: string;
  customerPhone: string;
  setCurrentScreen: (
    screen: "welcome" | "checkin" | "success" | "kitchen" | "order"
  ) => void;
}

export default function SuccessScreen({
  points,
  customerName,
  customerPhone,
  setCurrentScreen,
}: SuccessScreenProps) {
  const [showPoints, setShowPoints] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showFinalElements, setShowFinalElements] = useState(false);

  useEffect(() => {
    // Sequence the animations
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 500);

    const pointsTimer = setTimeout(() => {
      setShowPoints(true);
    }, 1500);

    const finalTimer = setTimeout(() => {
      setShowFinalElements(true);
    }, 2500);

    // Navigate back to the welcome screen after 8 seconds
    const backToWelcomeTimer = setTimeout(() => {
      setCurrentScreen("order");
    }, 6000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(pointsTimer);
      clearTimeout(finalTimer);
      clearTimeout(backToWelcomeTimer);
    };
  }, []);

  // Generate random positions for floating elements
  const generateRandomPositions = (count: number) => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 5 + Math.random() * 15,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 5,
    }));
  };

  const floatingElements = generateRandomPositions(10);

  // Matrix effect data
  const matrixEffect = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.querySelector(".matrix-container")?.appendChild(canvas);

    const chars = "0123456789ABCDEF";
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
      if (!ctx) return;
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#F3B5FD";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < drops.length; i++) {
        const text = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    }

    setInterval(draw, 33);

    return () => {
      canvas.remove();
    };
  };

  useEffect(() => {
    const cleanup = matrixEffect();
    return cleanup;
  }, []);

  return (
    <div
      className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden matrix-container"
      style={{ backgroundColor: "#000" }}
    >
      {/* Main content */}
      <motion.div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center">
        <motion.span
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.3 }}
          style={{
            color: "#F3B5FD",
            textShadow: "0 0 5px #F3B5FD, 0 0 10px #F3B5FD, 0 0 15px #F3B5FD",
            fontFamily: "monospace",
            fontWeight: 700,
            display: "block",
            fontSize: "5.4rem",
          }}
        >
          Matrix has you...
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.3 }}
          style={{
            color: "#F3B5FD",
            textShadow: "0 0 5px #0F0, 0 0 10px #F3B5FD, 0 0 15px #F3B5FD",
            fontFamily: "monospace",
            fontWeight: 900,
            fontSize: "5.4rem",
          }}
        >
          Loading…
        </motion.span>
      </motion.div>
    </div>
  );
}
