import { useMutation, useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { forgotPassword, resetPassword, verifyresettoken } from '../endpoints/endpoints';

function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ⬇️ YOUR LOGIC - UNCHANGED
  const { data, isError, isLoading } = useQuery({
    queryKey: ['token'],
    queryFn: () => verifyresettoken(token)
  });

  console.log(data?.email, " your data from the reset");
  let email = data?.email;

  const { mutate, isPending, isSuccess, error } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      alert('Password reset successfully!');
    },
    onError: (err) => {
      console.error(err);
    }
  });

  function handleFormSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formdata = Object.fromEntries(formData);
    const payload = {
      formdata,
      token,
      email
    }
    if (formdata.password !== formdata.confirmpassword) {
      alert("Passwords do not match!");
      return;
    }
    mutate(payload);
  }

  const location = useLocation();
  // ⬆️ YOUR LOGIC - UNCHANGED

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#120f1a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-purple-300/60">Verifying your reset link...</p>
        </div>
      </div>
    );
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
          Reset Password
        </h2>
        <p className="text-purple-300/60 text-sm mt-2 mb-8">
          Enter your new credentials below
        </p>

        {/* Email Display */}
        <div className="bg-[#252036] p-3 rounded-xl mb-6">
          <p className="text-purple-300/60 text-xs uppercase tracking-wider">Resetting for</p>
          <p className="text-pink-400 font-semibold mt-1">{email || 'No email provided'}</p>
        </div>

        {/* ⬇️ YOUR FORM - STYLED ONLY */}
        <form className="space-y-6" onSubmit={handleFormSubmit}>
          
          {/* New Password */}
          <div className="relative">
            <label htmlFor="password" className="block text-left text-sm font-medium text-purple-300/80 mb-1">
              New Password
            </label>
            <div className="relative">
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-[#252036] text-white rounded-xl border-2 border-purple-900/60 focus:border-pink-500 focus:outline-none focus:shadow-[0_0_12px_rgba(236,72,153,0.3)] transition-all duration-200 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-pink-400 transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <label htmlFor="confirmpassword" className="block text-left text-sm font-medium text-purple-300/80 mb-1">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmpassword"
                name="confirmpassword"
                type={showConfirmPassword ? "text" : "password"}
                required
                placeholder="••••••••"
                className="w-full px-4 py-3 bg-[#252036] text-white rounded-xl border-2 border-purple-900/60 focus:border-pink-500 focus:outline-none focus:shadow-[0_0_12px_rgba(236,72,153,0.3)] transition-all duration-200 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-purple-400 hover:text-pink-400 transition-colors"
              >
                {showConfirmPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Error Message - YOUR LOGIC */}
          {isError && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-3">
              <p className="text-red-400 text-sm">
                {error?.message || "Something went wrong. Please try again."}
              </p>
            </div>
          )}

          {/* Success Message - YOUR LOGIC */}
          {isSuccess && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-3">
              <p className="text-green-400 text-sm">
                Password updated successfully!
              </p>
            </div>
          )}

          {/* Submit Button - YOUR LOGIC */}
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
                Updating...
              </span>
            ) : (
              'Reset Password'
            )}
          </button>
        </form>

        {/* Back to Login */}
        <div className="mt-6">
          <button
            onClick={() => navigate('/auth/login')}
            className="text-purple-400/50 hover:text-pink-400 text-sm transition-colors"
          >
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;