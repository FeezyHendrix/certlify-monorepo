import React, { useState, useRef, FormEvent } from "react";
import otpimage from "../assets/otp.svg";
import curve from "../assets/curve.svg";

const OTP: React.FC = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newOtp = [...otp];
    const value = e.target.value.replace(/\D/g, ""); 
    newOtp[index] = value.slice(0, 1); 
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && otp[index] === "") {
        inputRefs.current[index - 1]?.focus();
      }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpValue = otp.join("");
    // Send the OTP value to the backend server
    console.log("OTP value:", otpValue);
  };

  return (
    <div>
      <div className="hidden lg:block h-1/2">
        <img src={curve} className="w-60" alt="" />
      </div>
      <div className="flex items-center justify-center flex-col my-32 lg:-mt-20 md:my-24 px-6 gap-3">
        <img src={otpimage} className="w-72 md:w-[350px]" alt="OTPImage" />
        <p className="text-[10px] text-[#5D6B82] md:text-sm">
          Please enter the 6-digits code sent to your mail
        </p>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2">
          <div className="flex gap-2">
              {otp.slice(0, 3).map((value, index) => (
                <input
                  key={index}
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  value={value}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputRefs.current[index] = el)}
                  className="border-t-0 border-r-0 border-l-0 border-[3px] border-[#7A8699] rounded-sm p-2 h-11 lg:w-14 w-10 focus:outline-none text-center text-xl font-semibold"
                />
              ))}
            </div>
            <div className="inline-flex items-center text-4xl">-</div>
            <div className="flex gap-2">
              {otp.slice(3, 6).map((value, index) => (
                <input
                  key={index + 3}
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  value={value}
                  onChange={(e) => handleChange(e, index + 3)}
                  onKeyDown={(e) => handleKeyDown(e, index + 3)}
                  ref={(el) => (inputRefs.current[index + 3] = el)}
                  className="border-t-0 border-r-0 border-l-0 border-[3px] border-[#7A8699] rounded-sm p-2 h-11 lg:w-14 w-10 focus:outline-none text-center text-xl font-semibold"
                />
              ))}
            </div>
          </div>
          <div className="mt-6 w-full px-6">
            <button type="submit" className="w-full py-3 px-6 border bg-[#151515] text-white rounded-lg text-base">
              Confirm
            </button>
          </div>
        </form>
        <div>
          <p className="text-[#5D6B82] font-normal">
            Didn't receive a code? <span className="text-[#4285F4]"> Resend code </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default OTP;