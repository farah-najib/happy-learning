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
          <div className="flex gap-4">
            <a
              href="#"
              className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
            >
              Om oss
            </a>
            <a
              href="#"
              className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all"
            >
              Github
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
