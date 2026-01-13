
import { motion } from 'motion/react'
import { Volume2 } from 'lucide-react'

interface Example {
  type: 'short' | 'long'
  word: string
  sound_url: string
}

interface VowelCardProps {
  vowel: string
  examples: Example[]
  color: string
  isSelected: boolean
  onClick: () => void
  delay: number
}

export function VowelCard({
  vowel,
  examples,
  color,
  isSelected,
  onClick,
  delay
}: VowelCardProps) {
  const shortExamples = examples.filter((ex) => ex.type === 'short')
  const longExamples = examples.filter((ex) => ex.type === 'long')
  const maxRows = Math.max(shortExamples.length, longExamples.length)

  const speakWord = (url: string) => {
    if (!url) return
    const audio = new Audio(url)
    audio.play()
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      className="h-full"
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        onClick={onClick}
        className={`relative cursor-pointer h-full ${
          isSelected ? 'ring-4 ring-yellow-400 ring-offset-2' : ''
        }`}
      >
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-white transition-all duration-300 hover:shadow-2xl h-full flex flex-col">
          {/* Vowel Header */}
          <div
            className={`relative bg-gradient-to-br ${color} p-4 text-center`}
          >
            <motion.div
              animate={isSelected ? { scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 0.5 }}
              className="text-4xl text-white"
            >
              {vowel.toUpperCase()}
            </motion.div>
          </div>

          {/* Table */}
          <div className="flex-1 overflow-auto">
            <table className="w-full h-full">
              <thead>
                <tr className="bg-gray-100 border-b-2 border-gray-300">
                  <th className="w-1/2 px-3 py-2 text-blue-700 font-bold text-sm border-r border-gray-300">
                    Kort vokal
                  </th>
                  <th className="w-1/2 px-3 py-2 text-purple-700 font-bold text-sm">
                    Långt vokal
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: maxRows }).map((_, rowIdx) => (
                  <tr
                    key={rowIdx}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    {/* Short vowel cell */}
                    <td className="w-1/2 px-2 py-2 border-r border-gray-200">
                      {shortExamples[rowIdx] ? (
                        <motion.button
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: rowIdx * 0.05 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            speakWord(shortExamples[rowIdx].sound_url)
                          }}
                          className="w-full text-left px-2 py-1.5 rounded bg-blue-50 hover:bg-blue-100 border border-blue-200 transition-all hover:scale-105 flex items-center gap-1 text-sm"
                        >
                          <Volume2 className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">
                            {shortExamples[rowIdx].word}
                          </span>
                        </motion.button>
                      ) : null}
                    </td>

                    {/* Long vowel cell */}
                    <td className="w-1/2 px-2 py-2">
                      {longExamples[rowIdx] ? (
                        <motion.button
                          initial={{ opacity: 0, y: -5 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: rowIdx * 0.05 }}
                          onClick={(e) => {
                            e.stopPropagation()
                            speakWord(longExamples[rowIdx].sound_url)
                          }}
                          className="w-full text-left px-2 py-1.5 rounded bg-purple-50 hover:bg-purple-100 border border-purple-200 transition-all hover:scale-105 flex items-center gap-1 text-sm"
                        >
                          <Volume2 className="w-3 h-3 flex-shrink-0" />
                          <span className="truncate">
                            {longExamples[rowIdx].word}
                          </span>
                        </motion.button>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
