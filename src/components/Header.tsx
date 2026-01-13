import { SmilePlus } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-primary text-primary-foreground shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <SmilePlus className="w-8 h-8" />
            <h1 className="text-3xl font-bold animate-typewriter">
              Happy learning!
            </h1>
          </div>
       
        </div>
      </div>
    </header>
  )
}
