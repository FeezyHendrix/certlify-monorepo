import React from 'react';

// Resuable Input Component

interface InputProps {
  name: string;
  type: string;
  label: string;
  placeholder: string;
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  name,
  type,
  label,
  placeholder,
  required,
  onChange,
}) => {
  return (
    <div className="flex flex-col first:my-10 odd:mt-10">
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        className=""
      />
    </div>
  );
};

export default Input;
