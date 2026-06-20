import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react';
import { addCategory } from '../endpoints/endpoints';
import { useNavigate } from 'react-router-dom';

function AddTodo() {
    const [userID, setUserID] = useState(localStorage.getItem('userId'));
    const queryClient = useQueryClient();
    const navigate = useNavigate(); 
    
    useEffect(() => {
        function handleUserId(event) {
            console.log(event, "your event");
            console.log(userID, "hook user id ");
            console.log(event.detail.userId, "event user id");
            setUserID(event.detail.userId);
            queryClient.invalidateQueries({ queryKey: ['gettodo'] });
        }
        
        window.addEventListener('registeredUser', handleUserId);
        
        return () => {
            window.removeEventListener('registeredUser', handleUserId);
        };
    }, [queryClient, userID]); 

    const { mutate, isLoading } = useMutation({
        mutationFn: (data) => addCategory(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gettodo'] });
            alert("New category added successfully!");
            navigate('/todo/getalltodo');
        },
        onError: (error) => {
            console.log(error);
            alert("Oops! Could not add the category. Please try again!");
        }
    });
    
    function handleForm(e) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        data.userId = userID;
        mutate(data);
    }
    
    return (
        <>
            <div 
                className="min-h-screen flex items-center justify-center p-4 relative bg-contain bg-no-repeat bg-center"
                style={{ backgroundImage: `url('https://www.pinterest.com/pin/1078964023340375367/') ` }}
            >
                {/* Main Card */}
                <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 w-full max-w-md border-4 border-purple-300">
                    
                    {/* Header Badge */}
                    <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2 sm:p-3 shadow-lg">
                        <div className="text-3xl sm:text-4xl">+</div>
                    </div>
                    
                    <div className="text-center mt-4 sm:mt-6 mb-4 sm:mb-6">
                        <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                            Add Todo Category
                        </h2>
                        <p className="text-purple-400 text-xs sm:text-sm mt-1 sm:mt-2">Add a new spooky-cute category!</p>
                    </div>
                    
                    <form onSubmit={handleForm} className="space-y-4 sm:space-y-5">
                        {/* Category Name Input */}
                        <div className="relative">
                            <label className="block text-purple-700 font-semibold mb-1 sm:mb-2 text-sm sm:text-base">
                                Category Name
                            </label>
                            <div className="relative group">
                                <input 
                                    type="text" 
                                    name="categoryName" 
                                    placeholder="e.g., Kuromi's Tasks, Spooky Chores..." 
                                    required
                                    className="w-full px-4 sm:px-5 py-2 sm:py-3 border-2 border-purple-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all bg-purple-50/30 text-gray-700 placeholder-purple-300 text-sm sm:text-base"
                                />
                            </div>
                            <p className="text-xs text-purple-400 mt-1 ml-2">Give your category a name!</p>
                        </div>
                        
                        {/* Hidden User ID */}
                        <input type="hidden" name="userId" value={userID || ""} />
                        
                        {/* Status Message */}
                        {!userID && (
                            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 sm:p-4 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <div>
                                        <p className="text-yellow-700 font-medium text-sm sm:text-base">Not logged in!</p>
                                        <p className="text-yellow-600 text-xs sm:text-sm">Please login to add categories</p>
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isLoading || !userID}
                            className="relative w-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 text-white py-2.5 sm:py-3 px-4 rounded-xl hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed font-bold text-base sm:text-lg overflow-hidden group mt-2"
                        >
                            <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Adding Category...
                                </span>
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    Add Category
                                </span>
                            )}
                        </button>
                    </form>
                    
                    {/* Footer */}
                    <div className="mt-4 sm:mt-6 text-center text-xs text-purple-400 border-t-2 border-purple-100 pt-3 sm:pt-4">
                        <p className="italic">"Even spooky tasks deserve to be organized!"</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default AddTodo;