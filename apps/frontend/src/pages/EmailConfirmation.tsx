import React from "react";
// import abstract from "../assets/emailabstract.svg";
import curve from "../assets/curve.svg";

const EmailConfirmation: React.FC = () => {
    return (
        <div>
             <div className="hidden lg:block h-1/2">
        <img src={curve} className="w-60" alt="" />
      </div>
        </div>
    )
}

export default EmailConfirmation;