import React from 'react';
import authImage from '../assets/authImage.svg';
import Input from '../components/inputField';
import { useState } from 'react';
import {
  occupationList,
  industryList,
  profileForm,
} from '../constants/profileForm';

interface Field {
  name: string;
  type: string;
  label: string;
  // placeholder: string;
  required: boolean;
}

const ProfileInformation: React.FC = () => {
  const fields: Field[] = profileForm;
  let fieldState: { [key: string]: string } = {};

  fields.forEach((field: Field) => {
    fieldState = {
      ...fieldState,
      [field.name]: '',
    };
  });

  const [form, setForm] = useState(fieldState);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div className="flex flex-col lg:flex-row">
      <div className="lg:flex hidden">
        <img
          src={authImage}
          className="md:w-screen lg:h-full md:h-1/2"
          alt="Sign Up"
        />
      </div>
      <div className="flex flex-col mt-16 lg:mt-20 md:px-32 lg:px-52 bg-white rounded-t-2xl p-10 gap-4 w-full">
        <h1 className="text-2xl font-medium">Profile Information</h1>
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
          <div className="pt-4 flex flex-col">
            <label
              htmlFor="occupation"
              className="text-xs py-2 text-[#151515] font-medium"
            >
              Industry/Sector
            </label>
            <select
              name="occupation"
              id="occupation"
              className="border-[0.5px] border-[#A6AEBB] h-10 rounded-sm w-full bg-transparent"
            >
              <option value="" selected={true}></option>
              {industryList.map((industry, index) => (
                <option key={index} value={industry.value}>
                  {industry.label}
                </option>
              ))}
            </select>
          </div>
          <div className="pt-4 flex flex-col">
            <label
              htmlFor="industry"
              className="text-xs py-2 text-[#151515] font-medium"
            >
              Occupation
            </label>
            <select
              name="industry"
              id="industry"
              className="border-[0.5px] border-[#A6AEBB] h-10 rounded-sm w-full bg-transparent"
            >
              <option value="" selected={true}></option>
              {occupationList.map((occupation, index) => (
                <option key={index} value={occupation.label}>
                  {occupation.label}
                </option>
              ))}
            </select>
          </div>
          <div className="my-6">
            <button
              type="submit"
              className="w-full p-2 border bg-[#151515] text-white rounded-lg text-base"
            >
              Finish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileInformation;
