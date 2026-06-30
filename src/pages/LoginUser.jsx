import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from '../endpoints/endpoints'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
function LoginUser() {
  const queryClient = useQueryClient();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate()

  const { mutate, isLoading, data } = useMutation({
    mutationFn: (data) => loginUser(data),
    onSuccess: (data) => {
      
      if (data.success && data.user?._id) {
    
        localStorage.setItem('userId', data.user._id);
        
        window.dispatchEvent(new CustomEvent('registeredUser', {
          detail: { userId: data.user._id }
        }));
        
        queryClient.invalidateQueries({ queryKey: ['gettodo', data.user._id] });
        setErrorMessage('');
        navigate('/todo/getalltodo')
      } else {
        setErrorMessage(data.message || "Login failed! Please check your credentials.");
      }
    },
    onError: (error) => {
      setErrorMessage(" Kuromi says: Login failed! Please try again! 💀");
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    setErrorMessage('');
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    mutate(data);
  }

  return (
    <>
      <div 
        className="h-screen flex items-center justify-center p-4 relative bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: `url('https://www.pinterest.com/pin/1078964023340375367/') ` }}
      >
        
        {/* Main Card */}
        <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 w-full max-w-md border-4 border-purple-300">
          
          {/* Kuromi Header Badge */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3 shadow-lg">
            <div className="text-4xl">🐰💀</div>
          </div>
          
          {/* Title Section */}
          <div className="text-center mt-4 mb-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Welcome Back!
            </h2>
            <p className="text-purple-400 text-xs mt-1 flex items-center justify-center gap-2">
              <span>🎀</span>
              Login to Kuromi's World
              <span>💀</span>
            </p>
          </div>
          
          {/* Error Message */}
          {errorMessage && (
            <div className="mb-3 p-2 bg-red-50 border-2 border-red-300 rounded-xl">
              <div className="flex items-center gap-2 text-red-600">
                <span className="text-2xl">😭</span>
                <div>
                  <p className="font-semibold text-sm">Oopsie!</p>
                  <p className="text-xs">{errorMessage}</p>
                </div>
              </div>
            </div>
          )}
          
          {data && !data.success && data.message && !errorMessage && (
            <div className="mb-3 p-2 bg-red-50 border-2 border-red-300 rounded-xl">
              <div className="flex items-center gap-2 text-red-600">
                <span className="text-2xl">💀</span>
                <p className="text-xs">{data.message}</p>
              </div>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Email Input */}
            <div className="relative group">
              <label className="block text-purple-700 font-semibold mb-1 flex items-center gap-2">
                <span>📧</span>
                Email Address
                <span>🎀</span>
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="kuromi@spooky.com"
                  className="w-full px-4 py-2 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-purple-50/30 text-gray-700 placeholder-purple-300"
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl opacity-0 group-hover:opacity-100">
                  💌
                </div>
              </div>
            </div>
            
            {/* Password Input */}
            <div className="relative group">
              <label className="block text-purple-700 font-semibold mb-1 flex items-center gap-2">
                <span>🔮</span>
                Secret Password
                <span>💀</span>
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-2 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-purple-50/30 text-gray-700 placeholder-purple-300"
                  required
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xl opacity-0 group-hover:opacity-100">
                  👁️
                </div>
              </div>
              <p className="text-xs text-purple-400 mt-0.5 ml-2">✨ Enter your magical password!</p>
            </div>
            
            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="relative w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white py-2.5 px-4 rounded-xl hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-base overflow-hidden mt-2"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Logging into Kuromi's World...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  🎀 Login  🎀 
                </span>
              )}
            </button>
          </form>
          
          {/* Demo Credentials Hint */}
          <div className="mt-4 text-center border-t-2 border-purple-100 pt-3">
            <div className="flex justify-center gap-2 mb-1 text-xl">
              <span>🎀</span>
              <span>💀</span>
              <span>🐰</span>
              <span>💀</span>
              <span>🎀</span>
            </div>
            <p className="text-purple-400 text-xs italic">
              <Link to='/auth/forgetpassword'>Forget password?click here</Link>   
            </p>
            <div className="mt-2 text-purple-300 text-xs">
              ✨ New here? <span className="text-purple-500 font-semibold">Join Kuromi's Club</span> to start your magical journey! ✨
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default LoginUser