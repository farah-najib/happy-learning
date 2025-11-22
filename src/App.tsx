import './styles/App.css'
import { useState, useEffect } from 'react'
import SwedishAlphabet from './components/SwedishAlphabet'
import VowelTable from './components/VowelTable'

// import GooeyDots from './components/GooeyDots'
import { Routes, Route } from 'react-router'
import About from './components/About'
function App() {
  const [, setShowApp] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowApp(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* <>{showApp?<SwedishAlphabet/>:<GooeyDots/>}</> */}
      <header>
        <ul>
          <li>
            <a href="https://github.com/farah-najib/happy-learning">Github </a>
          </li>
          <li>
            <a href="/about">
              <i className="fas fa-user-alt"></i> About
            </a>
          </li>
        </ul>

        <span className="title-holder">
          <a href="/">
            <span className="title">Happy Learning</span>
          </a>
        </span>
      </header>
      <div className="app">
        <Routes>
          <Route path="/" element={<SwedishAlphabet />} />
          <Route path="/vowel" element={<VowelTable />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>
    </>
  )
}

export default App
