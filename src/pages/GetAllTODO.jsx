import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { getTodos, deletetodo } from '../endpoints/endpoints'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import kuramihero from '../assets/kuramiLogo.png'

function GetAllTODO() {
    const [userid, setUserID] = useState(localStorage.getItem('userId'))
    const navigate = useNavigate()
    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['gettodo', userid],
        queryFn: () => getTodos(userid),
        enabled: !!userid
    })
    const queryClient = useQueryClient()
    const { mutate, isPending } = useMutation({
        mutationFn: deletetodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['gettodo', userid] });
        },
        onError: (error) => {
            console.error('Failed to delete category:', error);
        },
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

    function handledeletedtodo(item) {
       
        mutate(item)
    }

    return (
        <div className="min-h-screen p-4 sm:p-6 md:p-8" style={{ backgroundColor: '#808080' }}>
            <div className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col lg:flex-row justify-between items-center mb-8 sm:mb-12 gap-4">
                    <div className="flex-1 flex justify-start">
                        <img src={kuramihero} alt="Kuromi" className="w-16 sm:w-20 md:w-24 h-auto" />
                    </div>
                    <div className="text-center flex-1 bg-white/90 backdrop-blur-sm rounded-2xl px-4 sm:px-6 py-3 sm:py-4 shadow-lg border-2 border-pink-300">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 text-pink-600">
                            Kuromi's Categories
                        </h1>
                        <p className="text-purple-600 text-xs sm:text-sm md:text-base font-medium">
                            Choose a category to see your spooky-cute tasks!
                        </p>
                    </div>
                    <div className="flex-1 flex justify-end">
                        <button
                            onClick={() => navigate('/todo/addtodo')}
                            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-4 sm:px-6 py-2.5 rounded-xl font-semibold text-sm sm:text-base shadow-md transition-all duration-200 hover:shadow-lg hover:scale-105"
                        >
                            + Add Category
                        </button>
                    </div>
                </div>

                {/* Loading State */}
                {isLoading && (
                    <div className="flex flex-col justify-center items-center py-16">
                        <div className="w-16 h-16 sm:w-20 sm:h-20 border-4 border-pink-400 border-t-transparent rounded-full animate-spin" />
                        <p className="text-white mt-4 text-base sm:text-lg font-semibold">Loading...</p>
                        <p className="text-gray-300 text-xs sm:text-sm mt-1">Getting your categories</p>
                    </div>
                )}

                {/* Error State */}
                {isError && (
                    <div className="bg-red-100/90 backdrop-blur-sm border-2 border-red-400 text-red-700 px-4 sm:px-6 py-4 rounded-2xl text-center max-w-md mx-auto">
                        <p className="font-bold text-base sm:text-lg">Oops! Something went wrong</p>
                        <p className="text-sm mt-1">{error?.message || 'Failed to load categories'}</p>
                        <p className="text-xs mt-2 text-red-600">Please try again!</p>
                    </div>
                )}

                {/* Content */}
                {!isLoading && !isError && (
                    <>
                        {userid && userid !== '' ? (
                            <>
                                {/* Categories Grid */}
                                <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                                    {data?.todocat?.map((item) => (
                                        <div
                                            key={item._id}
                                            className="group bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-pink-200 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                                        >
                                            <div className="p-4 sm:p-6">
                                                <div className="flex items-start justify-between mb-4">
                                                    <div className="flex items-center gap-3 flex-1 min-w-0">
                                                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-pink-100 to-purple-100 flex items-center justify-center text-2xl flex-shrink-0">
                                                            📋
                                                        </div>
                                                        <h3 className="text-lg sm:text-xl font-bold text-purple-700 truncate">
                                                            {item.categoryName}
                                                        </h3>
                                                    </div>
                                                    <button
                                                        onClick={() => handledeletedtodo(item)}
                                                        disabled={isPending}
                                                        className="text-gray-400 hover:text-red-500 transition-colors duration-200 p-1.5 hover:bg-red-50 rounded-full flex-shrink-0 ml-2"
                                                        aria-label="Delete category"
                                                    >
                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>

                                                <Link
                                                    to={`/todo/getsubtodo/${item.categoryName}`}
                                                    className="inline-flex items-center justify-center w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition-all duration-200 shadow-md hover:shadow-lg"
                                                >
                                                    View Tasks
                                                    <span className="ml-2">→</span>
                                                </Link>
                                            </div>
                                            <div className="h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-b-2xl" />
                                        </div>
                                    ))}
                                </div>

                                {/* Empty State */}
                                {data?.todocat?.length === 0 && (
                                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 text-center border-2 border-pink-200 max-w-md mx-auto shadow-lg">
                                        <div className="text-5xl mb-4">📭</div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-purple-700 mb-2">No Categories Yet!</h3>
                                        <p className="text-purple-600 text-sm sm:text-base mb-3 sm:mb-4">Create your first category to get started</p>
                                        <p className="text-purple-400 text-xs sm:text-sm">Click the "Add Category" button to get started!</p>
                                    </div>
                                )}
                            </>
                        ) : (
                            /* Login Required Section */
                            <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4">
                                <div className="relative max-w-2xl w-full">
                                    <div className="relative bg-white/95 backdrop-blur-sm rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-pink-200 shadow-2xl">
                                        <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 opacity-20">
                                            <div className="w-full h-full rounded-full bg-gradient-to-br from-pink-400 to-purple-400" />
                                        </div>
                                        <div className="text-center relative z-10">
                                            <div className="text-5xl sm:text-6xl mb-4">🎀</div>
                                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-purple-700 mb-3 sm:mb-4">
                                                Welcome to Kuromi's World!
                                            </h2>
                                            <div className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                                                <p className="text-base sm:text-lg text-purple-600">
                                                    To explore the magical categories and spooky-cute tasks
                                                </p>
                                                <div className="flex items-center justify-center gap-3">
                                                    <span className="text-purple-600 text-base sm:text-lg font-medium">Please login first</span>
                                                </div>
                                                <p className="text-xs sm:text-sm text-purple-400">
                                                    Unlock your personalized Kuromi experience
                                                </p>
                                            </div>
                                            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-4 sm:mt-6">
                                                <Link
                                                    to="/auth/login"
                                                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold rounded-2xl shadow-lg text-sm sm:text-base transition-all duration-200 hover:shadow-xl hover:scale-105"
                                                >
                                                    Login Now
                                                </Link>
                                                <Link
                                                    to="/auth/register"
                                                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-pink-50 border-2 border-pink-300 hover:bg-pink-100 text-purple-700 font-semibold rounded-2xl text-sm sm:text-base transition-all duration-200 hover:shadow-md"
                                                >
                                                    Create Account
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-center mt-4 sm:mt-6 text-gray-300 text-xs sm:text-sm">
                                        Join Kuromi's spooky-cute adventure!
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default GetAllTODO