import { useState } from 'react'
import { Volume2, Star } from 'lucide-react'
import { ImageWithFallback } from './ImageWithFallback'
import { motion } from 'motion/react'

interface LetterCardProps {
  uppercase: string
  lowercase: string
  image: string
  color: string
  delay: number
  soundUrl: string

}

export function LetterCard({
  uppercase,
  lowercase,
  image,
  delay,
  soundUrl
}: LetterCardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [showStars, setShowStars] = useState(false)

  const handleClick = () => {
    setIsFlipped(!isFlipped)
    setShowStars(true)
    setTimeout(() => setShowStars(false), 1000)

    const audio = new Audio(soundUrl)
    audio.play().catch(console.error)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="relative"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleClick}
        className="cursor-pointer"
      >
        {/* ---- POLAROID 3D FLIP CARD ---- */}
        <div className="relative w-[230px] h-[300px] [perspective:1000px] mx-auto">
          <div
            className={`
              relative w-full h-full
              transition-transform duration-700
              [transform-style:preserve-3d]
              ${isFlipped ? '[transform:rotateY(180deg)]' : ''}
            `}
          >
            {/* FRONT — Polaroid Style */}
            <div
              className="
                absolute inset-0
                bg-white
                rounded-md
                shadow-[0_4px_12px_rgba(0,0,0,0.25)]
                border border-gray-200
                [backface-visibility:hidden]
                flex flex-col
                p-3
              "
            >
              {/* Polaroid photo window */}
              <div className="bg-white rounded-sm overflow-hidden border border-gray-300 shadow-inner h-[70%]">
                <ImageWithFallback
                  src={image}
                  alt={uppercase}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Caption area */}
              <div className="flex flex-col items-center justify-center h-[30%] pt-3">
                <div className="text-5xl font-bold">{uppercase}</div>
                <div className="text-gray-600 text-lg italic">{lowercase}</div>
              </div>

              {/* Sound icon */}
              <div className="absolute top-2 right-2 bg-black/80 text-white rounded-full p-2 shadow">
                <Volume2 className="w-4 h-4" />
              </div>
            </div>

            {/* BACK — Simple Polaroid Back */}
            <div
              className="
                absolute inset-0
                bg-white text-gray-700
                rounded-md
                shadow-[0_4px_12px_rgba(0,0,0,0.25)]
                border border-gray-200
                [transform:rotateY(180deg)]
                [backface-visibility:hidden]
                flex items-center justify-center
                text-7xl font-bold
              "
            >
              {uppercase}{lowercase}
            </div>
          </div>
        </div>

        {/* ---- STAR BURST EFFECT ---- */}
        {showStars && (
          <>
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 1, scale: 0, x: 0, y: 0 }}
                animate={{
                  opacity: 0,
                  scale: 1.5,
                  x: (Math.random() - 0.5) * 100,
                  y: (Math.random() - 0.5) * 100
                }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="absolute top-1/2 left-1/2 pointer-events-none"
              >
                <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
              </motion.div>
            ))}
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
