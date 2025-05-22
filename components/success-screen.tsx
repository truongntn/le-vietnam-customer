"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Confetti from "./confetti"

interface SuccessScreenProps {
  points: number,
  customerName: string,
  customerPhone: string,
}

export default function SuccessScreen({ points, customerName, customerPhone }: SuccessScreenProps) {
  const [showPoints, setShowPoints] = useState(false)
  const [showText, setShowText] = useState(false)
  const [showFinalElements, setShowFinalElements] = useState(false)

  useEffect(() => {
    // Sequence the animations
    const textTimer = setTimeout(() => {
      setShowText(true)
    }, 500)

    const pointsTimer = setTimeout(() => {
      setShowPoints(true)
    }, 1500)

    const finalTimer = setTimeout(() => {
      setShowFinalElements(true)
    }, 2500)

    return () => {
      clearTimeout(textTimer)
      clearTimeout(pointsTimer)
      clearTimeout(finalTimer)
    }
  }, [])

  // Generate random positions for floating elements
  const generateRandomPositions = (count: number) => {
    return Array.from({ length: count }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 5 + Math.random() * 15,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 5,
    }))
  }

  const floatingElements = generateRandomPositions(10)

  return (
    <div className="relative w-full h-full bg-white flex flex-col items-center justify-center overflow-hidden">
      <Confetti />

      {/* Background animated elements */}
      {showFinalElements && (
        <>
          {floatingElements.map((el, index) => (
            <motion.div
              key={`float-${index}`}
              className="absolute rounded-full"
              style={{
                left: `${el.x}%`,
                top: `${el.y}%`,
                width: `${el.size}px`,
                height: `${el.size}px`,
                backgroundColor: index % 2 === 0 ? "#f05122" : "#ffb347",
                opacity: 0.3,
              }}
              animate={{
                y: [`${el.y}%`, `${el.y - 10}%`, `${el.y}%`],
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: el.duration,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
                delay: el.delay,
              }}
            />
          ))}
        </>
      )}

      {/* Radial pulse animation */}
      <AnimatePresence>
        {showPoints && (
          <motion.div
            className="absolute"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: [0, 0.5, 0], scale: [0, 2, 3] }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatDelay: 1,
            }}
          >
            <div
              className="w-64 h-64 rounded-full"
              style={{ background: "radial-gradient(circle, #f05122 0%, rgba(240, 81, 34, 0) 70%)" }}
            ></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        className="text-center z-10 max-w-lg px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence>
          {showText && (
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              style={{ color: "#000000" }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacitycolor: "#000000" }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 10,
              }}
            >
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.3 }}>
                You
              </motion.span>{" "}
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.3 }}>
                have
              </motion.span>{" "}
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 0.3 }}>
                checked
              </motion.span>{" "}
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.3 }}>
                in
              </motion.span>{" "}
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0, duration: 0.3 }}>
                successfully!
              </motion.span>
            </motion.h1>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showText && (
            <motion.p
              className="text-xl mb-6"
              style={{ color: "#333333" }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              {customerName}, your number of visits:
            </motion.p>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showPoints && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              <motion.div
                className="relative mx-auto w-32 h-32 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#ffda44" }}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
              >
                {/* Animated ring around points */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    border: "2px dashed #f05122",
                    width: "calc(100% + 16px)",
                    height: "calc(100% + 16px)",
                    top: "-8px",
                    left: "-8px",
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                />

                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: "#ffb347" }}
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                  }}
                />

                <motion.div
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
                    <path d="M0 0 L20 20 L40 0 Z" fill="#f05122" />
                  </svg>
                </motion.div>

                <motion.span
                  className="relative text-6xl font-bold"
                  style={{ color: "#f05122" }}
                  initial={{ scale: 0 }}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    delay: 0.3,
                    duration: 0.5,
                    times: [0, 0.5, 1],
                    repeat: 1,
                  }}
                >
                  {points}
                </motion.span>
              </motion.div>

              {/* Animated stars around points */}
              {showFinalElements && (
                <>
                  {[0, 1, 2, 3, 4, 5].map((i) => {
                    const angle = (i * 60 * Math.PI) / 180
                    const x = Math.cos(angle) * 100
                    const y = Math.sin(angle) * 100
                    return (
                      <motion.div
                        key={`star-${i}`}
                        className="absolute"
                        style={{
                          left: "calc(50% + 0px)",
                          top: "calc(50% + 0px)",
                          zIndex: 5,
                        }}
                        animate={{
                          x: [0, x, 0],
                          y: [0, y, 0],
                          opacity: [0, 1, 0],
                          scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          delay: i * 0.3,
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="#f05122">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                        </svg>
                      </motion.div>
                    )
                  })}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
