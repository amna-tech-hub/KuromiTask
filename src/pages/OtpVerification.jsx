import { useMutation } from "@tanstack/react-query";
import React, { useRef } from "react";
import { otpDataSubmition } from "../endpoints/endpoints";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OtpVerification() {
  const [userotp, setotp] = useState(["", "", "", "", "", ""]);
  const location = useLocation();
  const navigate = useNavigate();
  const email = location?.state?.email;
  
  const Ref = useRef([]);
  useEffect(() => {
    if (!email) {
      navigate("/auth/register-user");
    }
  }, [email, navigate]); // Runs when email changes
  const { mutate,isError } = useMutation({
    mutationFn: otpDataSubmition,
    onSuccess(data) {
      if(data.sucess){
      navigate("/todo/addtodo");

      }
      else{
      navigate("/auth/register-user");

      }
 
    
    },
  });

  function handleFormSubmit(e) {
    e.preventDefault();
    console.log(userotp.join(""));

    mutate({
      email: email,
      otp: userotp.join(""),
    });
  }
useEffect(()=>{
  
Ref.current[0].focus()
},[])
  return (
    <div className="min-h-screen bg-[#120f1a] flex flex-col justify-center items-center p-4">
      {/* Main Card Container */}
      <div className="w-full max-w-md bg-[#1c1829] border-2 border-purple-900/40 rounded-3xl p-8 shadow-xl text-center">
        {/* Kuromi Skull Pin Accent */}
        <div className="flex justify-center mb-5">
          <div className="bg-[#252036] p-4 rounded-full border-2 border-pink-500/60 shadow-[0_0_15px_rgba(236,72,153,0.3)]">
            <svg
              className="w-12 h-12 text-pink-500"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 2c-4.963 0-9 4.037-9 9 0 3.204 1.681 6.012 4.204 7.625l-.704 2.115c-.143.43.177.86.632.86h9.736c.455 0 .775-.43.632-.86l-.704-2.115C19.319 17.012 21 14.204 21 11c0-4.963-4.037-9-9-9zm-3.5 11c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5zm3.5 4c-1.105 0-2-.895-2-2h4c0 1.105-.895 2-2 2zm3.5-5c-.828 0-1.5-.672-1.5-1.5s.672-1.5 1.5-1.5 1.5.672 1.5 1.5-.672 1.5-1.5 1.5z" />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-black text-white tracking-wide uppercase">
          Security Check
        </h2>
        <p className="text-purple-300/60 text-sm mt-2 mb-8">
          Enter the secret verification code
        </p>

        <form className="space-y-8" onSubmit={handleFormSubmit}>
          {/* Inputs Row */}
          <div className="flex justify-center gap-2 max-w-xs mx-auto">
            {[...Array(6)].map((_, index) => (
              <input
                key={index}
                name={index}
                onKeyDown={(e)=>{
                  console.log(e.key," kry");
                  
                        if (e.key=='Backspace' && index > 0) {
                                        Ref.current[index - 1].focus();

                  }
                  if(e.key=='ArrowLeft'  && index>0){
                    Ref.current[index-1].focus()
                  }
                   if(e.key=='ArrowRight'  && index<5){
                    Ref.current[index+1].focus()
                  }

                }}
                onInput={(e) => {
                  const newOtp = [...userotp];
                  newOtp[index] = e.target.value;
                  setotp(newOtp);

                  if (e.target.value && index < 5) {
                    Ref.current[index + 1].focus();
                    console.log(e.key," key");
                    
                  }
                 
                  
                }}
                ref={(e) => (Ref.current[index] = e)}
                
                type="text"
                maxLength="1"
                className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 bg-[#252036] text-pink-400 border-purple-900/60 transition-all duration-200 outline-none focus:border-pink-500 focus:text-pink-300 focus:shadow-[0_0_12px_rgba(236,72,153,0.5)]
                "
              />
            ))}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_auto] hover:bg-right text-white font-bold rounded-2xl shadow-[0_4px_15px_rgba(236,72,153,0.3)] transition-all duration-300 active:scale-[0.98] uppercase text-sm tracking-wider"
          >
            Verify Code
          </button>
        </form>

        {/* Footer Actions */}
        <div className="mt-8 text-xs text-purple-400/50">
          Didn't receive the code?
          <button
            type="button"
            className="text-pink-400 hover:text-pink-300 hover:underline font-semibold bg-transparent border-none cursor-pointer"
          >
            Resend Code
          </button>
        </div>
      </div>
    </div>
  );
}
