import React, { useEffect, useState } from 'react'
import '../styles/TableComponent.css'
import PanelLayout from './PanelLayout'
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

const VowelTable: React.FC = () => {
  const [data, setData] = useState<ClassificationData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const BASE_URL = import.meta.env.VITE_BASE_URL
  // Fetch data from JSON
  useEffect(() => {
    fetch(`${BASE_URL}/api/vowels`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        return res.json()
      })
      .then((data) => setData(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  // Sync vowel heights to mini-table heights
  useEffect(() => {
    const syncHeights = () => {
      const vowels = document.querySelectorAll<HTMLElement>('.vowel')
      const tables = document.querySelectorAll<HTMLElement>('.mini-table')

      vowels.forEach((vowel, i) => {
        const table = tables[i]
        if (table) {
          vowel.style.height = `${table.offsetHeight}px`
        }
      })
    }

    // Run after rendering
    const timeout = setTimeout(syncHeights, 100)

    // Adjust on resize
    window.addEventListener('resize', syncHeights)
    return () => {
      clearTimeout(timeout)
      window.removeEventListener('resize', syncHeights)
    }
  }, [data])

  // Play audio for vowel or word
  const playSound = (url: string) => {
    if (!url) return
    const audio = new Audio(url)
    audio.play()
  }

  if (loading) return <p>Loading vowel data...</p>
  if (error) return <p>Error: {error}</p>

  return (
    <div className="main">
      <PanelLayout />
      <p className="PageTitle">Svenska vokaler</p>
      <div className="container">
        <div className="table">
          {/* Headers */}
          <div className="header first">Classification</div>
          <div className="header second">Vowel</div>
          <div className="header third">
            <div className="third-header-flex">
              <div className="third-title">Pronunciation</div>
              <div className="third-row">
                <div>Kort</div>
                <div>Långt</div>
              </div>
            </div>
          </div>

          {/* Table rows */}
          {data.map((group) => (
            <React.Fragment key={group.type}>
              {/* Classification */}
              <div className="cell">{group.type}</div>

              {/* Vowels */}
              <div className="second-cell">
                <div className="second-grid">
                  {group.vowels.map((v) => (
                    <div
                      className="vowel"
                      key={v.vowel}
                      onClick={() => playSound(v.sound_url)}
                      title={`Play sound for ${v.vowel.toUpperCase()}`}
                    >
                      {v.vowel}
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini-tables for short/long words */}
              <div className="third-cell">
                {group.vowels.map((v) => (
                  <div className="mini-table" key={v.vowel}>
                    <div className="mini-row">
                      <div className="word-column">
                        {v.words.short.map((word, i) => (
                          <div
                            className="word-item"
                            key={i}
                            onClick={() => playSound(word.sound_url)}
                            title={`Play sound for ${word.text}`}
                          >
                            <strong>{word.text}</strong>
                          </div>
                        ))}
                      </div>
                      <div className="word-column">
                        {v.words.long.map((word, i) => (
                          <div
                            className="word-item"
                            key={i}
                            onClick={() => playSound(word.sound_url)}
                            title={`Play sound for ${word.text}`}
                          >
                            <strong>{word.text}</strong>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}

export default VowelTable
