import { useState, useEffect } from 'react'
import { LetterCard } from './LetterCard'

interface AlphabetGridProps {
  activeTab: 'bokstäver' | 'vokaler' | 'konsonanter'
}

interface AlphabetEntry {
  uppercase: string
  lowercase: string
  name: string
  sound_url: string
  image: string
  isVowel: boolean
}

export function AlphabetGrid({ activeTab }: AlphabetGridProps) {
  const [alphabetData, setAlphabetData] = useState<AlphabetEntry[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const BASE_URL = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    const fetchAlphabet = async () => {
      try {
        const response = await fetch(`${BASE_URL}/api/alphabet`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const result = await response.json()
        setAlphabetData(result.swedish_alphabet)
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Unexpected error'
        setError(message)
      } finally {
        setLoading(false)
      }
    }

    fetchAlphabet()
  }, [BASE_URL])

  if (loading) return <p className="text-center">Loading...</p>
  if (error) return <p className="text-center text-red-500">{error}</p>

  // Filter tabs
  const filteredData =
    activeTab === 'vokaler'
      ? alphabetData.filter((item) => item.isVowel)
      : activeTab === 'konsonanter'
      ? alphabetData.filter((item) => !item.isVowel)
      : alphabetData

  return (
    <div>
      {/* Page headings */}
      <div className="text-center mb-8">
        <h2 className="text-4xl mb-2">
          {activeTab === 'bokstäver' && '🎨 Lär dig Svenska Alfabetet! 🎨'}
          {activeTab === 'vokaler' && '🎵 Vokalerna 🎵'}
          {activeTab === 'konsonanter' && '🎪 Konsonanterna 🎪'}
        </h2>

        <p className="text-gray-600">
          {activeTab === 'bokstäver' &&
            'Klicka på varje kort för att höra bokstaven!'}
          {activeTab === 'vokaler' &&
            'A, E, I, O, U, Y, Å, Ä, Ö - De svenska vokalerna!'}
          {activeTab === 'konsonanter' &&
            'Alla andra bokstäver är konsonanter!'}
        </p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {filteredData.map((letter, index) => (
          <LetterCard
            key={letter.uppercase}
            uppercase={letter.uppercase}
            lowercase={letter.lowercase}
            image={`${BASE_URL}/public/${letter.image}`}
            soundUrl={letter.sound_url}
            color={
              letter.isVowel
                ? 'from-blue-400 to-purple-400'
                : 'from-green-400 to-teal-400'
            }
            delay={index * 0.05}
          />
        ))}
      </div>
    </div>
  )
}
