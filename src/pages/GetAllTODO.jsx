import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { getTodos } from '../endpoints/endpoints'
import { useState } from 'react'
import AddSubTodo from './AddSubTodo'
import { Link, useNavigate } from 'react-router-dom'

function GetAllTODO() {
    const [userid, setUserID] = useState(localStorage.getItem('userId'))
    const navigate = useNavigate()
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['gettodo', userid],
        queryFn: () => getTodos(userid),
        enabled: !!userid 
    })
    
    useEffect(() => {
        function handleuser(event) {
            setUserID(event.detail.userId)
        }
        window.addEventListener('registeredUser', handleuser)
        return () => {
            window.removeEventListener('registeredUser', handleuser)
        }
    }, [])

    return (
        <>
            <div 
                className="min-h-screen p-4 sm:p-6 md:p-8 relative bg-contain bg-no-repeat bg-center"
                style={{ backgroundImage: `url('https://www.pinterest.com/pin/1078964023340375367/') ` }}
            >
                <div className="max-w-6xl mx-auto relative z-10">
                    {/* Header Section with Add Button */}
                    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 sm:mb-12 gap-4">
                        <div className="flex-1"></div>
                        <div className="text-center flex-1">
                            <div className="relative ">
                                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2 sm:mb-3">
                                    Kuromi's Categories
                                </h1>
                            </div>
                            <p className="text-purple-600 text-sm sm:text-base md:text-lg">
                                Choose a category to see your spooky-cute tasks!
                            </p>
                        </div>
                        <div className="flex-1 flex justify-end">
                            <button
                                onClick={() => navigate('/todo/addtodo')}
                                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 sm:px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 flex items-center gap-2 text-sm sm:text-base"
                            >
                                <span className="text-xl">+</span>
                                Add Category
                            </button>
                        </div>
                    </div>

                    {/* Loading State */}
                    {isLoading && (
                        <div className="flex flex-col justify-center items-center py-16">
                            <div className="relative">
                                <div className="animate-spin rounded-full h-16 w-16 sm:h-20 sm:w-20 border-b-4 border-purple-400"></div>
                            </div>
                            <p className="text-purple-600 mt-4 text-base sm:text-lg font-semibold">Loading...</p>
                            <p className="text-purple-400 text-xs sm:text-sm mt-1">Getting your categories</p>
                        </div>
                    )}

                    {/* Error State */}
                    {isError && (
                        <div className="bg-red-100/90 backdrop-blur-sm border-2 border-red-400 text-red-700 px-4 sm:px-6 py-4 rounded-2xl relative text-center max-w-md mx-auto">
                            <p className="font-bold text-base sm:text-lg">Oops! Something went wrong</p>
                            <p className="text-sm mt-1">{error?.message || "Failed to load categories"}</p>
                            <p className="text-xs mt-2 text-red-600">Please try again!</p>
                        </div>
                    )}

                    {/* Categories Grid */}
                    {!isLoading && !isError && (
                        <>
                        {userid !=='' && userid !== null ? (
                            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                {data?.todocat?.map((item, index) => (
                                    <div 
                                        key={item._id} 
                                        className="group relative transform transition-all duration-300 hover:scale-105"
                                    >
                                        {/* Card Glow Effect */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
                                        
                                        {/* Card Content */}
                                        <div className="relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border-2 border-purple-200 hover:border-purple-400 transition-all duration-300">
                                            <div className="p-4 sm:p-6 text-center relative z-10">
                                                {/* Category Icon */}
                                                <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 transform group-hover:scale-110 transition-transform duration-300">
                                                    {index % 3 === 0 ? '📁' : index % 3 === 1 ? '📂' : '📋'}
                                                </div>
                                                
                                                {/* Category Name */}
                                                <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3 sm:mb-4">
                                                    {item.categoryName}
                                                </h3>
                                                
                                                {/* View Button */}
                                                <Link 
                                                    to={`/todo/getsubtodo/${item.categoryName}`}
                                                    className="relative inline-flex items-center justify-center w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200 font-semibold group overflow-hidden text-sm sm:text-base"
                                                >
                                                    <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
                                                    <span className="flex items-center gap-2">
                                                        View Tasks
                                                    </span>
                                                </Link>
                                            </div>
                                            
                                            {/* Bottom Border Animation */}
                                            <div className="h-1 bg-gradient-to-r from-purple-400 to-pink-400 w-0 group-hover:w-full transition-all duration-300"></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            /* Login Required Section */
                            <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4">
                                {/* Main Card Container */}
                                <div className="relative max-w-2xl w-full">
                                    {/* Main Card */}
                                    <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-purple-300 shadow-2xl">
                                        
                                        {/* Content */}
                                        <div className="text-center relative z-10">
                                         
                                            
                                            {/* Title */}
                                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 mb-3 sm:mb-4">
                                                Welcome to Kuromi's World!
                                            </h2>
                                            
                                            {/* Description */}
                                            <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                                                <p className="text-base sm:text-lg text-purple-600">
                                                    To explore the magical categories and spooky-cute tasks
                                                </p>
                                                <div className="flex items-center justify-center gap-3">
                                                    <span className="text-purple-600 text-base sm:text-lg">Please login first</span>
                                                </div>
                                                <p className="text-xs sm:text-sm text-purple-400">
                                                    Unlock your personalized Kuromi experience
                                                </p>
                                            </div>
                                            
                                            {/* Action Buttons */}
                                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
                                                <Link 
                                                    to='/auth/login'
                                                    className="group relative w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden text-sm sm:text-base"
                                                >
                                                    <span className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                                                    <span className="relative flex items-center justify-center gap-3">
                                                        Login Now
                                                    </span>
                                                </Link>
                                                
                                                <Link 
                                                    to='/auth/register'
                                                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-purple-50 border-2 border-purple-300 text-purple-700 font-semibold rounded-2xl hover:bg-purple-100 transition-all duration-300 text-sm sm:text-base"
                                                >
                                                    Create Account
                                                </Link>
                                            </div>
                                            
                                          
                                        </div>
                                    </div>
                                    
                                    {/* Bottom Decorative Text */}
                                    <div className="text-center mt-4 sm:mt-6 text-purple-400 text-xs sm:text-sm">
                                        Join Kuromi's spooky-cute adventure!
                                    </div>
                                </div>
                            </div>
                        )}
                            <></>
                            {/* Empty State */}
                            {data?.todocat?.length === 0 && userid && (
                                <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 sm:p-12 text-center border-2 border-purple-300 max-w-md mx-auto">
                                    <div className="text-6xl sm:text-8xl mb-3 sm:mb-4">📭</div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-purple-700 mb-2">No Categories Yet!</h3>
                                    <p className="text-purple-600 text-sm sm:text-base mb-3 sm:mb-4">Create your first category to get started</p>
                                    <p className="text-purple-400 text-xs sm:text-sm mt-3 sm:mt-4">Click the "Add Category" button to get started!</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}

export default GetAllTODO