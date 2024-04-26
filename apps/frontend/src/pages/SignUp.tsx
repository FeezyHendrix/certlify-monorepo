import React from "react";
import { useState } from "react";
import authImage from "../assets/authImage.svg"
import SocialAuth from "../components/socialAuth";
import google from "../assets/Google.svg";
import github from "../assets/github.svg";
import { Link } from "react-router-dom";
import textLogo from "../assets/textlogo.svg"
import Input from "../components/inputField";
import { signUpField } from "../constants/authForm";

interface Field {
    name: string;
    type: string;
    label: string;
    // placeholder: string;
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
        <div className="flex flex-col lg:flex-row">
            <div className="lg:flex hidden">
                <img src={authImage} className="md:w-screen lg:h-full md:h-1/2" alt="Sign Up" />
            </div>
            <div className="flex flex-col mt-20 lg:-m-[0] lg:px-52 md:px-32 bg-white rounded-t-2xl p-10 gap-4 w-full">
                <div className="flex justify-start items-start">
                <img src={textLogo} className="h-8" alt="Certlify"/>
                </div>
                <form action="">
                    {fields.map((field: Field, index: number) => (
                        <Input
                            key={index}
                            name={field.name}
                            type={field.type}
                            label={field.label}
                            // placeholder={field.placeholder}
                            required={field.required}
                            onChange={handleChange}
                        />
                    ))}
                    <div className="my-6">
                    <button type="submit" className="w-full p-2 border bg-[#151515] text-white rounded-lg text-base">
                        Sign Up
                    </button>
                    </div>
                    <p className="text-center text-xs font-normal text-[#5D6B82]">
                        Already have an account?{' '}
                        <Link to="/login" className="text-[#4285F4]">
                            Sign in
                        </Link>
                    </p>
                    <div className="flex flex-row gap-3 items-center justify-center mt-2">
                        <hr className="w-[120px]" />
                        <p className="text-xs">or</p>
                        <hr className="w-[120px]" />
                    </div>
                    <div className="flex flex-col gap-6 my-4">
                    <SocialAuth
                    text="Sign Up With Google"
                    image={google}
                    />
                    <SocialAuth
                    text="Sign Up With Github"
                    image={github}
                    />
                    </div>
                    
                </form>
            </div>
        </div>
    );
}

export default SignUp;