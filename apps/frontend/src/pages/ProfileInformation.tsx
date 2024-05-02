import React from "react";
import authImage from "../assets/authImage.svg"
import loginImage from "../assets/login.svg"


const ProfileInformation: React.FC = () => {
    return (
        <div className="flex flex-col lg:flex-row">
            <div className="lg:flex hidden">
                <img src={authImage} className="md:w-screen lg:h-full md:h-1/2" alt="Sign Up" />
            </div>
            <div className="flex flex-col mt-16 lg:mt-20 md:px-32 lg:px-52 bg-white rounded-t-2xl p-10 gap-4 w-full">
                <div className="flex justify-start items-start flex-col gap-4">
                    <img src={loginImage} className="h-14" alt="Certlify"/>
                    <h1 className="text-xl font-medium ">
                        Profile Information
                    </h1>
                    <p className="text-sm text-[#5D6B82] leading-tight">
                        Enter the email associated with your account and a link to reset your password will  be sent to you.
                    </p>
                </div>
                <div className="flex flex-col mt-4">
                    <label htmlFor="email" className="text-sm text-[#5D6B82] mb-4">Email</label>
                    <input type="email" name="email" id="email" className="border border-[#E0E0E0] rounded-md p-2 h-11" />
                </div>
                <button type="submit" className="w-full p-2 border bg-[#151515] text-white rounded-lg text-base">
                    Reset Password
                </button>
            </div>
        </div>
    );
}

export default ProfileInformation;