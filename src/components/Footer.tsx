import { Heart, BookOpen, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'

export function Footer() {
  return (
    <footer className="mt-16 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          {/* Main Content */}
          <div className="flex flex-col items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              <h3 className="text-2xl">Svenska Alfabetet</h3>
              <Sparkles className="w-6 h-6" />
            </div>

            <p className="text-white/90 max-w-2xl">
              Lär dig svenska alfabetet på ett roligt och interaktivt sätt!
              Perfekt för barn som vill lära sig bokstäver, vokaler och uttal.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4"
            >
              <div className="text-3xl mb-2">🎵</div>
              <h4 className="mb-1">Uttalsguide</h4>
              <p className="text-sm text-white/80">
                Lyssna på varje bokstav och ord
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4"
            >
              <div className="text-3xl mb-2">📚</div>
              <h4 className="mb-1">Många Exempel</h4>
              <p className="text-sm text-white/80">
                Lär med verkliga svenska ord
              </p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-4"
            >
              <div className="text-3xl mb-2">✨</div>
              <h4 className="mb-1">Interaktiv Lärning</h4>
              <p className="text-sm text-white/80">
                Rolig och engagerande design
              </p>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/20 pt-6">
           

            <p className="text-white/70 text-sm mt-3">
              © 2026 Happy learning !
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
