import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { addUser } from '../endpoints/endpoints'
import { useNavigate } from 'react-router-dom';

function User() {
  const [email, setEmail] = useState() 
  
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    setEmail(data.email)
    mutate(data);
  }

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const { mutate, isPending } = useMutation({
    mutationFn: (data) => addUser(data),
    onSuccess: (data) => {
      if (data?.success && data.userId) {
        localStorage.setItem('userId', data.userId);
        
        window.dispatchEvent(new CustomEvent('registeredUser', {
          detail: { userId: data.userId }
        }));
        
        queryClient.invalidateQueries({ queryKey: ['gettodo', data.userId] });
        
        navigate('/auth/verify-otp', {
          state: { email: email }
        })
      }
    },
    onError: (error) => {
      alert("Kuromi says: Registration failed! Please try again!");
    }
  });


  return (
    <>
      <div 
        className="min-h-screen flex items-center justify-center p-4 relative bg-contain bg-no-repeat"
        style={{ backgroundImage: `url('https://www.pinterest.com/pin/1078964023340375367/') ` }}
      >
        
        {/* Main Card */}
        <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md border-4 border-purple-300">
          
          {/* Kuromi Header Badge */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3 shadow-lg">
            <div className="text-4xl"><img src="https://i.pinimg.com/1200x/44/a9/d5/44a9d51897bcd35f71bbb02fa47dc99f.jpg" width={45} className='rounded-full' alt="" /></div>
          </div>
          
          {/* Title Section */}
          <div className="text-center mt-6 mb-8">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Kuromi's Club
            </h2>
            <p className="text-purple-400 text-sm mt-2 flex items-center justify-center gap-2">
             <img src="https://i.pinimg.com/736x/0d/08/a6/0d08a6eb2657d833e26eca3e1ba61089.jpg" width={40} height={40} alt="" />
              Join the spooky-cute family!
             <img src="https://i.pinimg.com/736x/0d/08/a6/0d08a6eb2657d833e26eca3e1ba61089.jpg" width={40} height={40} alt="" />
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Input */}
            <div className="relative group">
              <label className="block text-purple-700 font-semibold mb-2">
                Your Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="e.g., Kuromi, My Melody..."
                  className="w-full px-5 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-purple-50/30 text-gray-700 placeholder-purple-300"
                  required
                />
              </div>
            </div>
            
            {/* Email Input */}
            <div className="relative group">
              <label className="block text-purple-700 font-semibold mb-2">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="kuromi@spooky.com"
                  className="w-full px-5 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-purple-50/30 text-gray-700 placeholder-purple-300"
                  required
                />
              </div>
            </div>
            
            {/* Password Input */}
            <div className="relative group">
              <label className="block text-purple-700 font-semibold mb-2">
                Secret Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="w-full px-5 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-purple-50/30 text-gray-700 placeholder-purple-300"
                  required
                />
              </div>
            </div>
            
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="relative w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white py-3 px-4 rounded-xl hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg overflow-hidden mt-6"
            >
              {isPending ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Joining Kuromi's Club...
                </span>
              ) : (
                <span>
                  Join Kuromi's Club
                </span>
              )}
            </button>
          </form>
          
        </div>
      </div>
    </>
  )
}

export default User