import React from 'react'

function Footer() {
  return (
    <footer className="w-full  pt-2 pb-2 border-t-2 border-purple-400/30">
      <div className="max-w-6xl mx-auto px-4">
        {/* Main content container */}
        <div className="flex flex-col items-center justify-center space-y-1">
          
          {/* Emoji decoration row */}
          <div className="flex items-center justify-center gap-1 text-2xl text-purple-700">
            <span>🎀</span>
            <span>💀</span>
            <span>🐰</span>
            <span>💀</span>
            <span>🎀</span>
          </div>

          {/* Quote with decorative elements */}
          <div className="flex items-center justify-center gap-3 text-center">
            <span className="text-purple-400/40 text-2xl">"</span>
            <p className="text-purple-300 text-sm md:text-base font-light tracking-wide italic">
              Every category is a new adventure!
            </p>
            <span className="text-purple-700/40 text-2xl">"</span>
          </div>

          {/* Attribution */}
          <div className="flex items-center justify-center gap-2 text-xs text-purple-400/60">
            <span>—</span>
            <span className="flex items-center gap-1">
              Kuromi
              <span className="text-sm">💜</span>
            </span>
            <span>—</span>
          </div>
        
        </div>
      </div>
    </footer>
  )
}

export default Footer