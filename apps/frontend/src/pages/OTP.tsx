import React from "react";
import otpimage from "../assets/otp.svg"

const OTP: React.FC = () => {
    return (
        <div>
            <div>

            </div>
            <div className="flex items-center justify-center flex-col my-32 gap-3">
                <img src={otpimage} className="w-72" alt="OTPImage" />
                <p className="text-[10px] text-[#5D6B82]">
                Please enter the 6-digits code sent to your mail
                </p>
                <div className="flex gap-2">
                    <input type="text" className="border border-[#E0E0E0] rounded-md p-2 h-11 w-14" />
                    <input type="text" className="border border-[#E0E0E0] rounded-md p-2 h-11 w-14" />
                    <input type="text" className="border border-[#E0E0E0] rounded-md p-2 h-11 w-14" />
                    <input type="text" className="border border-[#E0E0E0] rounded-md p-2 h-11 w-14" />
                    <input type="text" className="border border-[#E0E0E0] rounded-md p-2 h-11 w-14" />
                    <input type="text" className="border border-[#E0E0E0] rounded-md p-2 h-11 w-14" />
                </div>
            </div>
        </div>
    );
}

export default OTP;