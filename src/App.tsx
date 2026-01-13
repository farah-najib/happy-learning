import { useState } from 'react'
import { AlphabetGrid } from './components/AlphabetGrid'
import { Header } from './components/Header'
import { Navigation } from './components/Navigation'
import { VowelLearning } from './components/VowelLearning'
import { Footer } from './components/Footer'

export default function App() {
  const [activeTab, setActiveTab] = useState<
    'bokstäver' | 'vokaler' | 'konsonanter' | 'vokal-lära'
  >('bokstäver')

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F7F7F7' }}>
      <Header />
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="container mx-auto px-4 py-8">
        {activeTab === 'vokal-lära' ? (
          <VowelLearning />
        ) : (
          <AlphabetGrid activeTab={activeTab} />
        )}
      </main>
      <Footer />
    </div>
  )
}
