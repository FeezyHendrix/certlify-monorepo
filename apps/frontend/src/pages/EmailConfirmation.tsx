import React from "react";
import abstract from "../assets/emailabstract.svg";
import curve from "../assets/curve.svg";
import logo from "../assets/textlogo.svg";

const EmailConfirmation: React.FC = () => {
    return (
        <div>
             <div className="hidden lg:block h-1/2">
        <img src={curve} className="w-60" alt="" />
      </div>
      <div className="flex items-center justify-center flex-col my-32 lg:-mt-28 md:my-24 px-6 gap-3 ">
        <div className="pb-10">
        <img src={logo} className="" alt="Certlify" />
        </div>
        <img src={abstract} alt="Abstract Illustration" />
        <div className="md:w-1/4">
        <p className="text-[#5D6B82] text-sm text-center">
        A link has been sent to the email associated with your account please proceed to check your mail
        </p>
        </div>
      </div>
        </div>
    );
}

export default EmailConfirmation;