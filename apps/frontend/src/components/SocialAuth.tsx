import React from "react";

interface SocialProps {
    text: string
    image: string
}

const SocialAuth: React.FC<SocialProps> = ({
    text,
    image
}) => {
    return (
        <button
        className="border border-[#151515] w-full flex items-center justify-center px-4 py-2 rounded-md bg-white hover:bg-gray-100 transition-colors duration-200 font-medium text-[#151515]"
      >
        <img src={image} alt="Social Auth Icon" className="h-5 w-5 mr-6" />
        {text}
      </button>
    )
}

export default SocialAuth