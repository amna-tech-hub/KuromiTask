import { useMutation } from "@tanstack/react-query";
import React, { useState,useEffect } from "react";
import { resendOtp } from "../endpoints/endpoints";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function ResendOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location?.state;
  
  const [message, setMessage] = useState("");
  const [cooldown, setCooldown] = useState(0);

  // Mutation for resending OTP
  const { mutate, isLoading } = useMutation({
    mutationFn: resendOtp,
    onSuccess(data) {
      setMessage("OTP sent successfully! Check your email.");
      // Start cooldown
      setCooldown(30);
      // Navigate back to verification after 2 seconds
      setTimeout(() => {
        navigate("/auth/verify-otp", { state: { email } });
      }, 2000);
    },
    onError(error) {
      setMessage(error?.response?.data?.message || "Failed to send OTP");
    }
  });

  // Cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  function handleResend(e) {
    e.preventDefault();
    if (cooldown === 0 && !isLoading) {
      mutate({ email });
    }
  }

  return (
    <div className="min-h-screen bg-[#120f1a] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md bg-[#1c1829] border-2 border-purple-900/40 rounded-3xl p-8 shadow-xl text-center">
        {/* Icon */}
        <div className="flex justify-center mb-5">
          <div className="bg-[#252036] p-4 rounded-full border-2 border-pink-500/60 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
            <svg className="w-12 h-12 text-pink-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c-4.963 0-9 4.037-9 9 0 3.204 1.681 6.012 4.204 7.625l-.704 2.115c-.143.43.177.86.632.86h9.736c.455 0 .775-.43.632-.86l-.704-2.115C19.319 17.012 21 14.204 21 11c0-4.963-4.037-9-9-9zm-3.5 11c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm3.5 4c-1.105 0-2-.895-2-2h4c0 1.105-.895 2-2 2zm3.5-5c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5z" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-black text-white tracking-wide uppercase">
          Resend Code
        </h2>
        <p className="text-purple-300/60 text-sm mt-2 mb-8">
          Send a new verification code to your email
        </p>

        {/* Email display */}
        <div className="bg-[#252036] p-3 rounded-xl mb-6">
          <p className="text-purple-300/60 text-sm">Sending to:</p>
          <p className="text-pink-400 font-semibold">{email || "No email provided"}</p>
        </div>

        {/* Message display */}
        {message && (
          <div className={`p-3 rounded-xl mb-4 ${
            message.includes("success") 
              ? "bg-green-500/20 text-green-400" 
              : "bg-red-500/20 text-red-400"
          }`}>
            {message}
          </div>
        )}

        {/* Resend Button */}
        <form onSubmit={handleResend}>
          <button
            type="submit"
            disabled={cooldown > 0 || isLoading}
            className={`w-full py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_auto] hover:bg-right text-white font-bold rounded-2xl shadow-[0_4px_15px_rgba(236,72,153,0.3)] transition-all duration-300 active:scale-[0.98] uppercase text-sm tracking-wider ${
              (cooldown > 0 || isLoading) ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {isLoading 
              ? "Sending..." 
              : cooldown > 0 
                ? `Resend (${cooldown}s)` 
                : "Resend Code"}
          </button>
        </form>

        {/* Back to verification */}
        <div className="mt-6">
          <Link
            to="/auth/verify-otp"
            state={{ email }}
            className="text-purple-400/50 hover:text-pink-400 text-sm"
          >
            ← Back to Verification
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ResendOtp;