import React from 'react';
import Header from '../components/header';
import line from '../assets/line.svg';
import circle from '../assets/circle.svg';
import circle2 from '../assets/circle2.svg';
import line2 from '../assets/line2.svg';

const LandingPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="bg-black pt-8 flex justify-between">
        <div className="relative">
          <img src={line} className="absolute bottom-4 top-11" alt="Line" />
          <img src={circle} className="" alt="Circle" />
        </div>
        <div className='pt-10 flex flex-col w-full border-x-[0.75px] border-gradient bg-gradient-to-br from-[rgba(0,0,0,0.052)] via-[rgba(209,25,25,0.05)] to-[rgba(166,174,187,0)] mx-2'>
        <h1 className="text-white font-monument-extended text-[16px] text-center">Welcome to the Certifcate Generator</h1>
        <div className='px-10 py-6'>
            <p className='text-white text-center text-base leading-snug font-normal'>
            Easily generate your certificates and share them at your convenience. Anywhere, anytime and anyday 
            </p>
        </div>
        </div>
        <div className="relative">
          <img src={line2} alt="Line2" />
          <img src={circle2} className='absolute top-36' alt="" />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
