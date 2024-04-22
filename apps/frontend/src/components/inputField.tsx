import React from 'react';

// Resuable Input Component

interface InputProps {
  name: string;
  type: string;
  //   label: string;
  placeholder: string;
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  //   label,
  placeholder,
  required,
  onChange,
}) => {
  return (
    <div className="flex flex-col first:my-10 odd:mt-10">
      {/* <label htmlFor={name}>{label}</label> */}
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        className="border-t-0 border-l-0 border-r-0 border-b-[1px] border-[#000000B2] p-1 w-72 min-[375px]:w-[330px] min-[425px]:w-96 focus:outline-none focus:border-gray-500 transition duration-500 ease-in-out text-[#000000B2]"
      />
    </div>
  );
};

export default Input;