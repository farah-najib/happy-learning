import { useState, useEffect } from 'react'
import { VowelCard } from './VowelCard'
import { motion } from 'motion/react'
import { Volume2, Sparkles } from 'lucide-react'

interface Word {
  text: string
  sound_url: string
}

interface WordPair {
  short: Word[]
  long: Word[]
}

interface VowelData {
  vowel: string
  sound_url: string
  words: WordPair
}

interface ClassificationData {
  type: string
  vowels: VowelData[]
}

export function VowelLearning() {
  const [data, setData] = useState<ClassificationData[]>([])
  const [selectedVowel, setSelectedVowel] = useState<string | null>(null)
  const BASE_URL = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    fetch(`${BASE_URL}/api/vowels`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        return res.json()
      })
      .then(setData)
      .catch(console.error)
  }, [])

  const speakWord = (url: string) => {
    if (!url) return
    const audio = new Audio(url)
    audio.play()
  }

  return (
    <div className="max-w-7xl mx-auto px-4">
      {/* Title Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full shadow-lg mb-4">
          <Volume2 className="w-8 h-8" />
          <h1 className="text-4xl">Svenska Vokaler</h1>
          <Sparkles className="w-8 h-8" />
        </div>
        <p className="text-xl text-gray-700 mt-4">
          Lär dig skillnaden mellan hårda och mjuka vokaler! 🎵
        </p>
        <p className="text-gray-600 mt-2">
          Klicka på varje vokal för att höra uttalet och se exempel!
        </p>
      </motion.div>

      {/* Vowel Sections */}
      {data.map((group) => (
        <motion.div
          key={group.type}
          initial={{ opacity: 0, x: group.type === 'Hårda' ? -50 : 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div
                className={`${
                  group.type === 'Hårda'
                    ? 'bg-gradient-to-r from-red-400 to-orange-400'
                    : 'bg-gradient-to-r from-purple-400 to-pink-400'
                } text-white px-6 py-3 rounded-full`}
              >
                <h2 className="text-2xl">
                  {group.type === 'Hårda'
                    ? '🔥 Hårda Vokaler'
                    : '🌸 Mjuka Vokaler'}
                </h2>
              </div>
              <p className="text-gray-600">
                {group.vowels.map((v) => v.vowel).join(', ')} -{' '}
                {group.type === 'Hårda'
                  ? 'Starka och kraftfulla!'
                  : 'Mjuka och vänliga!'}
              </p>
            </div>

            <div
              className={`grid grid-cols-2 gap-4 ${
                group.type === 'Hårda' ? 'md:grid-cols-4' : 'md:grid-cols-5'
              }`}
            >
              {group.vowels.map((vowel, index) => (
                <VowelCard
                  key={vowel.vowel}
                  vowel={vowel.vowel}
                  examples={[
                    ...vowel.words.short.map((w) => ({
                      type: 'short' as const,
                      word: w.text,
                      sound_url: w.sound_url
                    })),
                    ...vowel.words.long.map((w) => ({
                      type: 'long' as const,
                      word: w.text,
                      sound_url: w.sound_url
                    }))
                  ]}
                  color={
                    group.type === 'Hårda'
                      ? 'from-red-400 to-pink-500'
                      : 'from-purple-400 to-pink-500'
                  }
                  isSelected={selectedVowel === vowel.vowel}
                  onClick={() => {
                    setSelectedVowel(vowel.vowel)
                    speakWord(vowel.sound_url)
                  }}
                  delay={index * 0.1}
                />
              ))}
            </div>

            {/* Tips Section */}
            <div
              className={`mt-6 p-4 rounded-2xl border-2 ${
                group.type === 'Hårda'
                  ? 'bg-orange-50 border-orange-200'
                  : 'bg-purple-50 border-purple-200'
              }`}
            >
              <p className="text-gray-700">
                💡 <strong>Tips:</strong>{' '}
                {group.type === 'Hårda'
                  ? 'Hårda vokaler låter kraftfulla och starka!'
                  : 'Mjuka vokaler låter mjukare och mer melodiska!'}
              </p>
            </div>
          </div>
        </motion.div>
      ))}

      {/* Fun Facts Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-12 bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 rounded-3xl p-8 shadow-xl"
      >
        <h3 className="text-2xl mb-4 text-center">🎯 Roliga Fakta!</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6">
            <h4 className="text-xl mb-2">📏 Kort vs Långt Uttal</h4>
            <p className="text-gray-700">
              Samma vokal kan låta olika beroende på om den är kort eller lång.
              Lyssna noga på skillnaden!
            </p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6">
            <h4 className="text-xl mb-2">🌟 Speciella Vokaler</h4>
            <p className="text-gray-700">
              Å, Ä och Ö är speciella för svenska! De finns inte i engelska
              alfabetet.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
