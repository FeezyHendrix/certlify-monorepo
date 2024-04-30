import React from 'react';
import Header from '../components/header';
import line from '../assets/line.svg';
import circle from '../assets/circle.svg';
import circle2 from '../assets/circle2.svg';
import line2 from '../assets/line2.svg';
import certificate from '../assets/certificate.svg';

const LandingPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="bg-black pt-8 flex justify-between">
        <div className="relative">
          <img src={line} className="absolute bottom-4 top-11" alt="Line" />
          <img src={circle} className="" alt="Circle" />
        </div>
        <div className="pt-10 flex flex-col w-full border-x-[0.75px] border-gradient bg-gradient-to-b from-[#000000] to-10% via-[#000000] to-[#042C6F] to-5% mx-2">
          <h1 className="text-white font-monument-extended text-[16px] text-center">
            Effortless Certificate Management
          </h1>
          <div className="px-10 py-6">
            <p className="text-white text-center text-base leading-snug font-normal">
              Easily generate your certificates and share them at your
              convenience. Anywhere, anytime and anyday
            </p>
          </div>
          <div className="flex justify-center pt-2 pb-10">
            <button className="bg-[#FFFFFF] text-black w-1/3 py-2 font-medium text-base rounded-lg">
              Get Started
            </button>
          </div>
        </div>
        <div className="relative">
          <img src={line2} alt="Line2" />
          <img src={circle2} className="absolute top-36" alt="" />
        </div>
      </div>
      <div className="bg-black py-14 px-4 ">
        <div className="block md:hidden pb-4">
          <h1 className="text-white font-monument-extended text-[16px] text-center">
            user-friendly platform for generating and distributing certificates
          </h1>
        </div>
        <div>
          <div className="flex justify-center">
            <img src={certificate} alt="Certificate" />
          </div>
          <div className="flex justify-center px-12 py-4">
            <p className="text-white text-center text-sm font-normal">
              Introducing our user-friendly certificate generation and
              distribution platform. Effortlessly create custom certificates and
              distribute them to your participants with just a few clicks. Say
              goodbye to manual processes and hello to streamlined certificate
              management. Simplify your workflow and save time today!
              <div className="mt-6">
                <button className="py-2 px-6 font-medium button-border rounded-xl inline-flex items-center gap-1 justify-center">
                  Learn more
                  <svg
                    width="17"
                    height="18"
                    viewBox="0 0 17 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M2.7998 9.00025C2.7998 8.65613 3.07877 8.37717 3.42288 8.37717L12.2605 8.37717L8.80641 5.08784C8.55836 4.84933 8.55062 4.4549 8.78913 4.20685C9.02764 3.9588 9.42208 3.95106 9.67013 4.18957L14.2394 8.55111C14.3615 8.66859 14.4306 8.83076 14.4306 9.00025C14.4306 9.16973 14.3615 9.33191 14.2394 9.44938L9.67013 13.8109C9.42208 14.0494 9.02764 14.0417 8.78913 13.7936C8.55062 13.5456 8.55836 13.1512 8.80641 12.9127L12.2605 9.62332L3.42288 9.62332C3.07877 9.62332 2.7998 9.34436 2.7998 9.00025Z"
                      fill="#FEFEFE"
                    />
                  </svg>
                </button>
              </div>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default LandingPage;
