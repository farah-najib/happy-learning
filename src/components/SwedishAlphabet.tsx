import PanelLayout from './PanelLayout'
import { useState, useEffect } from 'react'

interface AlphabetEntry {
  uppercase: string
  lowercase: string
  name: string
  sound_url: string
  image: string
  isVowel: boolean
}

const SwedishAlphabet: React.FC = () => {
  const [alphabetData, setAlphabetData] = useState<AlphabetEntry[]>([])
  const [flipped, setFlipped] = useState<{ [key: string]: boolean }>({})
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

  const playSound = (url: string) => {
    const audio = new Audio(url)
    audio.play()
  }

  const handleClick = (letter: AlphabetEntry) => {
    playSound(letter.sound_url)
    setFlipped((prev) => ({
      ...prev,
      [letter.uppercase]: !prev[letter.uppercase]
    }))
  }

  if (loading) return <p>Loading alphabet...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="main">
      <PanelLayout />
      <p className="PageTitle">Svenska bokstäver</p>

      <div className="container">
        {alphabetData.map((letter) => (
          <figure
            key={letter.uppercase}
            className={`cursor-pointer ${
              flipped[letter.uppercase] ? 'flipped' : ''
            }`}
            onClick={() => handleClick(letter)}
          >
            <div className="content">
              <div className={`front ${letter.isVowel ? 'vowel-card' : ''}`}>
                <img src={`${BASE_URL}/${letter.image}`} alt={letter.uppercase} />
                <figcaption>
                  {letter.uppercase} {letter.lowercase}
                </figcaption>
              </div>
              <div className="back">
                {letter.uppercase} {letter.lowercase}
              </div>
            </div>
          </figure>
        ))}
      </div>
    </div>
  )
}

export default SwedishAlphabet
