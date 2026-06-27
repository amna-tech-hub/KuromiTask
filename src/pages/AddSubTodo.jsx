import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addsubtodo } from '../endpoints/endpoints';
import GetAllSubtodo from './GetAllSubtodo';

function AddSubTodo() {
  const queryClient = useQueryClient();
  const param = useParams();
  const [userid, setUserID] = useState(localStorage.getItem('userId'));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  

  useEffect(() => {
    function handleUserId(event) {
      setUserID(event.detail.userId);
    }
    
    window.addEventListener('registeredUser', handleUserId);
    return () => {
      window.removeEventListener('registeredUser', handleUserId);
    };
  }, []);

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const { mutate } = useMutation({
    mutationFn: (data) => addsubtodo({
      ...data,
      userId: userid,
      categoryname: param.categoryname
    }),
    onSuccess: () => {
      setIsSubmitting(false);
      setToastMessage('Task added successfully!');
      setShowToast(true);
      queryClient.invalidateQueries({ queryKey: ['subtodos'] });
    },
    onError: (error) => {
      setToastMessage(`Error: ${error.message}`);
      setShowToast(true);
      setIsSubmitting(false);
    }
  });

  function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    mutate(data);
    e.target.reset();
  }

  return (
    <>
      <div 
        className="min-h-screen p-4 relative bg-contain bg-no-repeat bg-center"
        style={{ backgroundImage: `url('https://www.pinterest.com/pin/1078964023340375367/') ` }}
      >
        {/* Toast Notification */}
        {showToast && (
          <div className="fixed top-4 right-4 z-50 max-w-xs w-full sm:max-w-sm md:max-w-md">
            <div className="bg-gradient-to-r from-purple-800 to-pink-700 rounded-2xl shadow-2xl overflow-hidden border-2 border-purple-300">
              <div className="flex items-center gap-3 p-3 sm:p-4">
                <div className="flex-1">
                  <p className="text-white font-semibold text-sm sm:text-base">{toastMessage}</p>
                </div>
                <button 
                  onClick={() => setShowToast(false)}
                  className="text-purple-300 hover:text-white text-lg sm:text-xl"
                >
                  ✕
                </button>
              </div>
              <div className="h-1 bg-gradient-to-r from-purple-400 to-pink-400 animate-shrink-width"></div>
            </div>
          </div>
        )}
        
        <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
          {/* Add Subtodo Form Card */}
          <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md mx-auto border-4 border-purple-300">
            {/* Header Badge */}
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3 shadow-lg">
              <img src="https://i.pinimg.com/1200x/44/a9/d5/44a9d51897bcd35f71bbb02fa47dc99f.jpg" width={45} className='rounded-full' alt="" />
            </div>
            
            {/* Title Section */}
            <div className="text-center mt-6 mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Add Subtodo
              </h2>
              <p className="text-purple-400 text-sm mt-2 flex items-center justify-center gap-2">
                <img src="https://i.pinimg.com/736x/0d/08/a6/0d08a6eb2657d833e26eca3e1ba61089.jpg" width={40} height={40} alt="" />
                Create a spooky-cute subtodo!
                <img src="https://i.pinimg.com/736x/0d/08/a6/0d08a6eb2657d833e26eca3e1ba61089.jpg" width={40} height={40} alt="" />
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Todo Title Input */}
              <div className="relative group">
                <label className="block text-purple-700 font-semibold mb-2">
                  Task Title
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="todoTitle" 
                    placeholder="e.g., Draw spooky art, Bake cookies..."
                    required
                    disabled={isSubmitting}
                    className="w-full px-5 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-purple-50/30 text-gray-700 placeholder-purple-300 disabled:opacity-50"
                  />
                </div>
              </div>
              
              {/* Category Name Display */}
              <div className="relative">
                <label className="block text-purple-700 font-semibold mb-2">
                  Category
                </label>
                <div className="relative">
                  <input 
                    type="text" 
                    name="categoryname" 
                    value={param.categoryname || "Loading..."} 
                    readOnly
                    className="w-full px-5 py-3 border-2 border-purple-200 rounded-xl bg-gradient-to-r from-purple-50 to-pink-50 text-purple-600 cursor-not-allowed font-semibold"
                  />
                </div>
              </div>
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !userid}
                className="relative w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white py-3 px-4 rounded-xl hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg overflow-hidden mt-6"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Adding Task...
                  </span>
                ) : (
                  <span>
                    Add Task
                  </span>
                )}
              </button>
            </form>
          </div>
          
          {/* Display All Subtodos */}
          <div className="mt-8">
            <GetAllSubtodo categoryname={param.categoryname} />
          </div>
        </div>
      </div>
      
      {/* Custom Animations */}
      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s linear infinite;
        }
        
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }
        
        @keyframes shrink-width {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
        .animate-shrink-width {
          animation: shrink-width 3s linear forwards;
        }
      `}</style>
    </>
  );
}

export default AddSubTodo;