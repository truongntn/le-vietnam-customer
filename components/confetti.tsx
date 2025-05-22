"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface ConfettiPiece {
  id: number
  x: number
  y: number
  size: number
  rotation: number
  color: string
  delay: number
  duration: number
  type: "square" | "circle" | "triangle" | "line" | "star" | "dot"
}

export default function Confetti() {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([])

  useEffect(() => {
    const colors = [
      "#f05122", // main orange-red
      "#FF5252", // red
      "#40C4FF", // light blue
      "#E040FB", // pink/purple
      "#69F0AE", // green
      "#ffb347", // orange
      "#ffda44", // yellow
    ]

    const types: ("square" | "circle" | "triangle" | "line" | "star" | "dot")[] = [
      "dot",
      "star",
      "dot",
      "square",
      "star",
      "triangle",
    ]

    const newPieces: ConfettiPiece[] = []

    // Generate confetti pieces that fall from top
    for (let i = 0; i < 100; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * 100, // random x position (0-100%)
        y: -10 - Math.random() * 20, // start above the viewport
        size: 5 + Math.random() * 15, // random size
        rotation: Math.random() * 360, // random rotation
        color: colors[Math.floor(Math.random() * colors.length)], // random color
        delay: Math.random() * 3, // random delay
        duration: 3 + Math.random() * 5, // random duration
        type: types[Math.floor(Math.random() * types.length)], // random shape
      })
    }

    // Generate confetti pieces that explode from center
    for (let i = 100; i < 150; i++) {
      const angle = Math.random() * Math.PI * 2
      const distance = 30 + Math.random() * 200
      const x = 50 + (Math.cos(angle) * distance) / 10
      const y = 50 + (Math.sin(angle) * distance) / 10

      newPieces.push({
        id: i,
        x: 50, // start at center
        y: 50, // start at center
        size: 5 + Math.random() * 10, // random size
        rotation: Math.random() * 360, // random rotation
        color: colors[Math.floor(Math.random() * colors.length)], // random color
        delay: Math.random() * 0.5, // shorter delay for explosion
        duration: 1 + Math.random() * 2, // faster for explosion effect
        type: types[Math.floor(Math.random() * types.length)], // random shape
      })
    }

    setPieces(newPieces)
  }, [])

  const renderShape = (piece: ConfettiPiece) => {
    switch (piece.type) {
      case "square":
        return (
          <div
            style={{
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              backgroundColor: piece.color,
              borderRadius: "2px",
            }}
          />
        )
      case "circle":
        return (
          <div
            style={{
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              backgroundColor: piece.color,
              borderRadius: "50%",
            }}
          />
        )
      case "triangle":
        return (
          <div
            style={{
              width: 0,
              height: 0,
              borderLeft: `${piece.size / 2}px solid transparent`,
              borderRight: `${piece.size / 2}px solid transparent`,
              borderBottom: `${piece.size}px solid ${piece.color}`,
            }}
          />
        )
      case "line":
        return (
          <div
            style={{
              width: `${piece.size}px`,
              height: `${piece.size / 3}px`,
              backgroundColor: piece.color,
            }}
          />
        )
      case "star":
        return (
          <svg width={piece.size} height={piece.size} viewBox="0 0 24 24" fill={piece.color}>
            <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
          </svg>
        )
      case "dot":
        return (
          <div
            style={{
              width: `${piece.size}px`,
              height: `${piece.size}px`,
              backgroundColor: piece.color,
              borderRadius: "50%",
            }}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {pieces.map((piece) => {
        // Different animation for explosion pieces vs falling pieces
        const isExplosion = piece.id >= 100

        return (
          <motion.div
            key={piece.id}
            className="absolute"
            style={{
              left: `${piece.x}%`,
              top: `${piece.y}%`,
              transform: `rotate(${piece.rotation}deg)`,
              zIndex: 10,
            }}
            initial={
              isExplosion
                ? {
                    x: 0,
                    y: 0,
                    scale: 0,
                    opacity: 0,
                  }
                : {
                    opacity: 0,
                  }
            }
            animate={
              isExplosion
                ? {
                    x: [`0%`, `${(piece.x - 50) * 5}%`],
                    y: [`0%`, `${(piece.y - 50) * 5}%`],
                    scale: [0, 1, 0],
                    opacity: [0, 1, 0],
                    rotate: [piece.rotation, piece.rotation + 360],
                  }
                : {
                    y: ["-10vh", "100vh"],
                    x: [`${piece.x}%`, `${piece.x + (Math.random() * 20 - 10)}%`],
                    rotate: [piece.rotation, piece.rotation + (Math.random() * 2 - 1) * 360],
                    opacity: [0, 1, 1, 0],
                  }
            }
            transition={{
              duration: piece.duration,
              delay: piece.delay,
              ease: isExplosion ? "easeOut" : "linear",
              times: isExplosion ? [0, 0.7, 1] : [0, 0.1, 0.9, 1],
            }}
          >
            {renderShape(piece)}
          </motion.div>
        )
      })}
    </div>
  )
}
