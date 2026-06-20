import React from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getallsubtodo, deletesubtodo } from '../endpoints/endpoints';
import { useEffect, useState } from 'react';

function GetAllSubtodo(prop) {
    const [userid, setUserID] = useState(localStorage.getItem('userId'));
    const queryClient = useQueryClient();
    
    const data = {
        categoryName: prop.categoryname,
        userId: userid
    };

    const { mutate } = useMutation({
        mutationFn: (deleteData) => deletesubtodo({
            subtodoid: deleteData.subtodoid,
            userid: deleteData.userid,
            subtodocat: deleteData.subtodocat
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['subtodos'] });
        },
        onError: (error) => {
            alert(`Delete failed: ${error.message}`);
        }
    });

    const { data: responseData, isLoading, isError, error } = useQuery({
        queryKey: ['subtodos', userid, prop.categoryname],
        queryFn: () => getallsubtodo(data),
        enabled: !!userid && !!prop.categoryname,
    });

    useEffect(() => {
        function handleuser(event) {
            setUserID(event.detail.userId);
        }
        window.addEventListener('registeredUser', handleuser);
        return () => {
            window.removeEventListener('registeredUser', handleuser);
        };
    }, []);

    function handleDeleteSubtodo(item) {
        if (window.confirm(`Delete "${item.todoTitle}"?`)) {
            mutate({
                subtodoid: item._id,
                userid: userid,
                subtodocat: prop.categoryname
            });
        }
    }

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center p-8 min-h-[400px]">
                <div className="relative">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-400"></div>
                </div>
                <div className="text-purple-600 text-lg font-semibold mt-4">Loading your tasks...</div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="bg-gradient-to-r from-purple-100 to-pink-100 border-2 border-purple-400 text-purple-700 px-6 py-4 rounded-2xl m-4 shadow-lg">
                <div className="flex items-center gap-3">
                    <div>
                        <p className="font-bold text-lg">Oops! Something went wrong</p>
                        <p className="text-sm">{error?.message || "Failed to load subtodos"}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="min-h-screen p-4 sm:p-6 relative bg-contain bg-no-repeat bg-center"
            style={{ backgroundImage: `url('https://www.pinterest.com/pin/1078964023340375367/') ` }}
        >
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8 relative">
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent relative z-10">
                    Task List
                </h2>
                <p className="text-purple-400 text-xs sm:text-sm mt-1">Click any task to delete</p>
            </div>

            {/* Subtodos Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-7xl mx-auto">
                {responseData?.subtodo?.map(item => (
                    <div 
                        onClick={() => handleDeleteSubtodo(item)} 
                        className="group relative bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer overflow-hidden border-2 border-purple-200 hover:border-purple-400"
                        key={item._id}
                    >
                        {/* Purple Gradient Border Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl blur-sm -z-10"></div>
                        
                        {/* Card Content */}
                        <div className="relative z-10 p-4 sm:p-5">
                            {/* Icon Row */}
                            <div className="flex justify-between items-start mb-3">
                                <div className="text-2xl sm:text-3xl group-hover:scale-110 transition-transform duration-300">
                                    📋
                                </div>
                                <div className="text-xs text-purple-300 group-hover:text-purple-500 transition-colors">
                                    Click to delete
                                </div>
                            </div>
                            
                            {/* Task Title */}
                            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-3 group-hover:text-purple-600 transition-colors line-clamp-2">
                                {item.todoTitle}
                            </h3>
                            
                            {/* Delete Button Area */}
                            <div className="flex items-center justify-between mt-4 pt-3 border-t-2 border-purple-100">
                                <div className="text-xs text-purple-400">
                                    Click to delete if done
                                </div>
                                <div className="text-purple-400 group-hover:text-purple-600 transition-colors text-lg sm:text-xl">
                                    🗑️
                                </div>
                            </div>
                        </div>
                        
                        {/* Bottom Purple Bar */}
                        <div className="h-1 bg-gradient-to-r from-purple-400 to-pink-400 w-0 group-hover:w-full transition-all duration-300"></div>
                    </div>
                ))}
                
                {(!responseData?.subtodo || responseData.subtodo.length === 0) && (
                    <div className="col-span-full">
                        <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 sm:p-10 text-center border-2 border-purple-200 shadow-lg">
                            <div className="text-6xl sm:text-8xl mb-3 sm:mb-4">📭</div>
                            <h3 className="text-xl sm:text-2xl font-bold text-purple-600 mb-2">No tasks yet!</h3>
                            <p className="text-purple-500 text-sm sm:text-base">Add some tasks to get started</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default GetAllSubtodo;