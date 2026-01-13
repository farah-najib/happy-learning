import { BookOpen, Volume2, Music, GraduationCap } from 'lucide-react'

interface NavigationProps {
  activeTab: 'bokstäver' | 'vokaler' | 'konsonanter' | 'vokal-lära'
  setActiveTab: (
    tab: 'bokstäver' | 'vokaler' | 'konsonanter' | 'vokal-lära'
  ) => void
}

export function Navigation({ activeTab, setActiveTab }: NavigationProps) {
  const tabs = [
    { id: 'bokstäver' as const, label: 'Alla Bokstäver', icon: BookOpen },
    { id: 'vokaler' as const, label: 'Vokaler', icon: Volume2 },
    { id: 'konsonanter' as const, label: 'Konsonanter', icon: Music },
    { id: 'vokal-lära' as const, label: 'Vokal Lära', icon: GraduationCap }
  ]

  return (
    <nav className="bg-background/80 backdrop-blur-sm shadow-md sticky top-0 z-10">
      <div className="container mx-auto px-4">
        <div className="flex gap-2 py-4 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-primary to-accent text-primary-foreground shadow-lg scale-105'
                    : 'bg-muted text-muted-foreground hover:bg-accent/20'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
