import React from 'react';

// Resuable Input Component

interface InputProps {
  name: string;
  type: string;
  label: string;
  placeholder?: string;
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  label,
  // placeholder,
  required,
  onChange,
}) => {
  return (
    <div className="flex flex-col even:pt-4">
      <label htmlFor={name} className='text-xs py-2 text-[#151515] font-medium'>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        // placeholder={placeholder}
        required={required}
        onChange={onChange}
        className="border-[0.5px] border-[#A6AEBB] h-10 rounded-sm w-full"
      />
    </div>
  );
};

export default Input;
