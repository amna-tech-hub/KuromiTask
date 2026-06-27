import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { addCategory } from '../endpoints/endpoints';
import { useNavigate } from 'react-router-dom';

function AddTodo() {
    const [userID, setUserID] = useState(localStorage.getItem('userId'));
    const queryClient = useQueryClient();
    const navigate = useNavigate(); 
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState('');
    const [toastType, setToastType] = useState('success');
    const [isSubmitting, setIsSubmitting] = useState(false);
    
    useEffect(() => {
        function handleUserId(event) {
         
            setUserID(event.detail.userId);
            queryClient.invalidateQueries({ queryKey: ['gettodo'] });
        }
        
        window.addEventListener('registeredUser', handleUserId);
        
        return () => {
            window.removeEventListener('registeredUser', handleUserId);
        };
    }, [queryClient, userID]); 

    // Auto-hide toast after 3 seconds
    useEffect(() => {
        if (showToast) {
            const timer = setTimeout(() => {
                setShowToast(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [showToast]);

    const { mutate, isLoading } = useMutation({
        mutationFn: (data) => addCategory(data),
        onSuccess: () => {
            setIsSubmitting(false);
            queryClient.invalidateQueries({ queryKey: ['gettodo'] });
            setToastMessage('New category added successfully!');
            setToastType('success');
            setShowToast(true);
            setTimeout(() => {
                navigate('/todo/getalltodo');
            }, 1500);
        },
        onError: (error) => {
            setIsSubmitting(false);
            setToastMessage('Oops! Could not add the category. Please try again!');
            setToastType('error');
            setShowToast(true);
        }
    });
    
    function handleForm(e) {
        e.preventDefault();
        setIsSubmitting(true);
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        data.userId = userID;
        mutate(data);
    }
    
    const isButtonDisabled = isLoading || isSubmitting || !userID;
    
    return (
        <>
            <div 
                className="min-h-screen flex items-center justify-center p-4 relative bg-contain bg-no-repeat"
                style={{ backgroundImage: `url('https://www.pinterest.com/pin/1078964023340375367/') ` }}
            >
                {/* Toast Notification */}
                {showToast && (
                    <div className="fixed top-4 right-4 z-50 max-w-xs w-full sm:max-w-sm md:max-w-md animate-slide-in-right">
                        <div className={`rounded-2xl shadow-2xl overflow-hidden border-2 ${
                            toastType === 'success' 
                                ? 'bg-gradient-to-r from-purple-800 to-pink-700 border-purple-300' 
                                : 'bg-gradient-to-r from-red-800 to-red-700 border-red-300'
                        }`}>
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
                            <div className={`h-1 bg-gradient-to-r ${
                                toastType === 'success' 
                                    ? 'from-purple-400 to-pink-400' 
                                    : 'from-red-400 to-orange-400'
                            } animate-shrink-width`}></div>
                        </div>
                    </div>
                )}
                
                {/* Main Card */}
                <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-8 w-full max-w-md border-4 border-purple-300">
                    
                    {/* Header Badge */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3 shadow-lg">
                        <img src="https://i.pinimg.com/1200x/44/a9/d5/44a9d51897bcd35f71bbb02fa47dc99f.jpg" width={45} className='rounded-full' alt="" />
                    </div>
                    
                    {/* Title Section */}
                    <div className="text-center mt-6 mb-8">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Add Todo Category
                        </h2>
                        <p className="text-purple-400 text-sm mt-2 flex items-center justify-center gap-2">
                            <img src="https://i.pinimg.com/736x/0d/08/a6/0d08a6eb2657d833e26eca3e1ba61089.jpg" width={40} height={40} alt="" />
                            Add a new spooky-cute category!
                            <img src="https://i.pinimg.com/736x/0d/08/a6/0d08a6eb2657d833e26eca3e1ba61089.jpg" width={40} height={40} alt="" />
                        </p>
                    </div>
                    
                    <form onSubmit={handleForm} className="space-y-5">
                        {/* Category Name Input */}
                        <div className="relative group">
                            <label className="block text-purple-700 font-semibold mb-2">
                                Category Name
                            </label>
                            <div className="relative">
                                <input 
                                    type="text" 
                                    name="categoryName" 
                                    placeholder="e.g., Kuromi's Tasks, Spooky Chores..." 
                                    required
                                    disabled={isButtonDisabled}
                                    className="w-full px-5 py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent bg-purple-50/30 text-gray-700 placeholder-purple-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                />
                            </div>
                        </div>
                        
                        {/* Hidden User ID */}
                        <input type="hidden" name="userId" value={userID || ""} />
                        
                        {/* Status Message */}
                        {!userID && (
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <p className="text-yellow-700 font-medium">Not logged in!</p>
                                        <p className="text-yellow-600 text-sm">Please login to add categories</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isButtonDisabled}
                            className="relative w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white py-3 px-4 rounded-xl hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-lg overflow-hidden mt-6 transition-all duration-300"
                        >
                            {isButtonDisabled ? (
                                <span className="flex items-center justify-center gap-3">
                                    <svg 
                                        className="animate-spin h-5 w-5 text-white" 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" 
                                        viewBox="0 0 24 24"
                                    >
                                        <circle 
                                            className="opacity-25" 
                                            cx="12" 
                                            cy="12" 
                                            r="10" 
                                            stroke="currentColor" 
                                            strokeWidth="4"
                                        />
                                        <path 
                                            className="opacity-75" 
                                            fill="currentColor" 
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        />
                                    </svg>
                                    <span>
                                        {!userID ? 'Please Login First' : 'Adding Category...'}
                                    </span>
                                </span>
                            ) : (
                                <span>
                                    Add Category
                                </span>
                            )}
                        </button>
                    </form>
                    
                    {/* Footer */}
                    <div className="mt-6 text-center text-xs text-purple-400 border-t-2 border-purple-100 pt-4">
                        <p className="italic">"Even spooky tasks deserve to be organized!"</p>
                    </div>
                </div>
            </div>
            
            {/* Custom Animations */}
            <style jsx>{`
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

export default AddTodo;