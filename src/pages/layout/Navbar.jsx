import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { navlink } from '../../constants/links'
import { logoutUser } from '../../endpoints/endpoints'

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const location = useLocation()
  const isActive = (path) => {
    const isActive = location.pathname === path
    return isActive
  }

  // Check login status
  useEffect(() => {
    const checkLoginStatus = () => {
      const userId = localStorage.getItem('userId')
      setIsLoggedIn(!!userId && userId !== '')
    }
    
    checkLoginStatus()
    
    // Listen for login/logout events
    const handleUserChange = () => {
      checkLoginStatus()
    }
    
    window.addEventListener('registeredUser', handleUserChange)
    window.addEventListener('storage', handleUserChange)
    
    return () => {
      window.removeEventListener('registeredUser', handleUserChange)
      window.removeEventListener('storage', handleUserChange)
    }
  }, [])

  function handlelogout() {
    localStorage.setItem('userId', '') 
    setIsLoggedIn(false)
    window.dispatchEvent(new CustomEvent('registeredUser', {
      detail: { userId: '' }
    }));
    logoutUser()
  }

 
  return (
    <>
      <nav className="bg-black/40 backdrop-blur-md border-b-4 border-purple-300 shadow-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo Section */}
            <Link to="/" className="flex items-center">
              <img 
                src={'https://i.pinimg.com/736x/85/9f/78/859f7888cb715a097e337935ea8348bf.jpg'} 
                alt="Kuromi Logo" 
                className="h-16 w-16 object-contain rounded-full"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-1">
              {isLoggedIn && Object.entries(navlink).map(([key, value]) => {
                const active = isActive(value.path)
                return (
                  <Link
                    key={key}
                    to={value.path}
                    className={`
                      relative px-4 py-2 font-semibold rounded-lg transition-all duration-200
                      ${active 
                        ? 'bg-purple-800/60 text-pink-300 border-2 border-pink-400 shadow-lg shadow-pink-500/20' 
                        : 'text-purple-200 hover:text-white hover:bg-purple-900/30'
                      }
                    `}
                  >
                    <span>{value.title}</span>
                    {active && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-400 to-purple-400"></span>
                    )}
                  </Link>
                )
              })}
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3">
              {isLoggedIn ? (
                <button 
                  onClick={handlelogout}
                  className="hidden md:block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-5 py-2 rounded-xl shadow-md transition-all duration-200 hover:scale-105"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link 
                    to="/auth/login"
                    className="hidden md:block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-5 py-2 rounded-xl shadow-md transition-all duration-200 hover:scale-105"
                  >
                    Login
                  </Link>
                  <Link 
                    to="/auth/register-user"
                    className="hidden md:block bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold px-5 py-2 rounded-xl shadow-md transition-all duration-200 hover:scale-105"
                  >
                    Sign-up
                  </Link>
                </>
              )}

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden w-10 h-10 rounded-lg flex items-center justify-center text-2xl text-purple-200 hover:bg-purple-900/30 transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span>{isMobileMenuOpen ? '✕' : '☰'}</span>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`
        fixed top-16 left-0 w-4/5 h-[calc(100vh-4rem)] 
        bg-purple-950/95 backdrop-blur-md
        shadow-2xl border-r border-purple-300 z-40
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col p-4 gap-2 h-full justify-between">
          <div className="flex flex-col gap-2">
            {isLoggedIn ? (
              // Show nav links when logged in
              Object.entries(navlink).map(([key, value]) => {
                const active = isActive(value.path)
                return (
                  <Link
                    key={key}
                    to={value.path}
                    className={`
                      relative px-4 py-3 font-semibold rounded-lg transition-all duration-200
                      ${active 
                        ? 'bg-purple-800/60 text-pink-300 border-2 border-pink-400 shadow-lg shadow-pink-500/20' 
                        : 'text-purple-200 hover:text-white hover:bg-purple-900/30'
                      }
                    `}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <span>{value.title}</span>
                    {active && (
                      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-pink-400 to-purple-400"></span>
                    )}
                  </Link>
                )
              })
            ) : (
              // Show only Login when not logged in
              <Link
                to="/auth/login"
                className="px-4 py-3 font-semibold text-purple-200 hover:text-white hover:bg-purple-900/30 rounded-lg transition-all duration-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Action Button */}
          <div className="pb-8">
            {isLoggedIn ? (
              <button 
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  handlelogout();
                }}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-200 hover:scale-105"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/auth/login"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-xl shadow-md flex items-center justify-center transition-all duration-200 hover:scale-105"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Overlay for mobile menu */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-30 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  )
}

export default Navbar