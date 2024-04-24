import React from "react";
import { useState } from "react";
import authImage from "../assets/authImage.svg"
import textLogo from "../assets/textlogo.svg"
import Input from "../components/inputField";
import { signUpField } from "../constants/authForm";

interface Field {
    name: string;
    type: string;
    label: string;
    placeholder: string;
    required: boolean;
}

const SignUp: React.FC = () => {
    const fields: Field[] = signUpField;
    let fieldState: { [key: string]: string } = {};

    fields.forEach((field: Field) => {
        fieldState = {
          ...fieldState,
          [field.name]: '',
        };
      });

      const [form, setForm] = useState(fieldState)
      const handleChange= (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        })
      }

    return (
        <div className="flex justify-center">
            <div className="hidden">
                <img src={authImage} alt="Sign Up" />
            </div>
            <div className="flex flex-col ">
                <img src={textLogo} alt="Certlify" />
                <form action="">
                    {fields.map((field: Field, index: number) => (
                        <Input
                            key={index}
                            name={field.name}
                            type={field.type}
                            label={field.label}
                            placeholder={field.placeholder}
                            required={field.required}
                            onChange={handleChange}
                        />
                    ))}
                </form>
            </div>
        </div>
    );
}

export default SignUp;