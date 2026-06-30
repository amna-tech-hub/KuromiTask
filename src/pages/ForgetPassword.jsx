import { useMutation } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { forgotPassword } from '../endpoints/endpoints'

function ForgetPassword() {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [successMessage, setSuccessMessage] = useState("")

    const { mutate, isPending, isError, error } = useMutation({
        mutationFn: forgotPassword,
        onSuccess(data) {
            console.log(data, " success data from forget password");
            setSuccessMessage("If this email exists, we'll send you a reset link!")
            setEmail("") // Clear email after success
        },
        onError(data) {
            console.log(data, " err from forget passwrod");
        }
    })

    function handelsubmit(e) {
        e.preventDefault()
        if (!email.trim()) {
            alert("Please enter your email")
            return
        }
        mutate(email)
    }

    return (
        <div className="min-h-screen bg-[#120f1a] flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md bg-[#1c1829] border-2 border-purple-900/40 rounded-3xl p-8 shadow-xl text-center">
                
                {/* Icon */}
                <div className="flex justify-center mb-5">
                    <div className="bg-[#252036] p-4 rounded-full border-2 border-pink-500/60 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
                        <svg
                            className="w-12 h-12 text-pink-500"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                        </svg>
                    </div>
                </div>

                <h2 className="text-2xl font-black text-white tracking-wide uppercase">
                    Forgot Password
                </h2>
                <p className="text-purple-300/60 text-sm mt-2 mb-8">
                    Enter your email to receive a reset link
                </p>

                {/* Success Message */}
                {successMessage && (
                    <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3 mb-6">
                        <p className="text-green-400 text-sm">{successMessage}</p>
                    </div>
                )}

                {/* Error Message */}
                {isError && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-6">
                        <p className="text-red-400 text-sm">
                            {error?.response?.data?.message || "Something went wrong. Please try again."}
                        </p>
                    </div>
                )}

                {/* Form */}
                <form className="space-y-6" onSubmit={handelsubmit}>
                    <div>
                        <label htmlFor="email" className="block text-left text-sm font-medium text-purple-300/80 mb-1">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onInput={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-[#252036] text-white rounded-xl border-2 border-purple-900/60 focus:border-pink-500 focus:outline-none focus:shadow-[0_0_12px_rgba(236,72,153,0.3)] transition-all duration-200 placeholder-purple-400/30"
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_auto] hover:bg-right text-white font-bold rounded-2xl shadow-[0_4px_15px_rgba(236,72,153,0.3)] transition-all duration-300 active:scale-[0.98] uppercase text-sm tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isPending ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Sending...
                            </span>
                        ) : (
                            'Send Reset Link'
                        )}
                    </button>
                </form>

                {/* Back to Login */}
                <div className="mt-6">
                    <Link
                        to="/auth/login"
                        className="text-purple-400/50 hover:text-pink-400 text-sm transition-colors"
                    >
                        ← Back to Login
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ForgetPassword