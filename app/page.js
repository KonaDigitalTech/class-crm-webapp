'use client'
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import { toast } from "react-toastify";
import { useAppDispatch } from "@/lib/store";
import { authLogin } from "@/lib/features/auth/authSlice";
import Digital_lync from "../public/skillcapital.png";
import Curved from "../public/pinkcrm.png";

export default function Page() {
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [error, setError] = useState({});
    const router = useRouter();
    const dispatch = useAppDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({ ...loginData, [name]: value });
        setError({ ...error, [name]: "" });
    };

    const validate = () => {
        let formValid = true;
        const newError = {};

        if (!loginData.username?.trim()) {
            formValid = false;
            newError.username = "Please enter username";
        }

        if (!loginData.password?.trim()) {
            formValid = false;
            newError.password = "Please enter password";
        }

        setError(newError);
        return formValid;
    };

    const handleSubmit = () => {
      if (validate()) {
          dispatch(authLogin(loginData))
              .unwrap()
              .then((res) => {
                  if (res?.status === 200) {
                      toast.success(res?.message || "Login Successful");
                      router.push('/leads'); // Ensure this line is reached
                  } else {
                      toast.error("Unexpected response status");
                  }
              })
              .catch((err) => {
                  toast.error(err?.message || "Something went wrong");
              });
      }
  };

    return (
      <div className="flex h-screen">
        <div className="flex justify-center mt-6 md:mt-30 w-full md:w-1/2 p-6 md:p-0">
          <div className="flex flex-col justify-center w-full max-w-sm md:max-w-md lg:max-w-lg">
            <div className="flex justify-center">
              <Image src={Digital_lync} alt="SkillCapital" />
            </div>
            <div className="mt-10 bg-white border border-gray-300 p-6 rounded-lg shadow-lg">
              <div>
                <label className="block text-sm font-normal leading-6 text-gray-900">User Name</label>
                <input
                  id="username"
                  value={loginData?.username}
                  name="username"
                  type="text"
                  onChange={(e) => handleChange(e)}
                  required
                  className="block w-full rounded-lg border border-gray-300 p-1.5 text-gray-900 focus:border-sky-500 focus:outline-none h-12 sm:text-sm sm:leading-6"
                />
                <span className="text-sm text-red-600">{error["username"]}</span>
              </div>
              <div className="mt-5">
                <label className="block text-sm font-normal leading-6 text-gray-900">Password</label>
                <input
                  name="password"
                  value={loginData?.password}
                  type="password"
                  onChange={(e) => handleChange(e)}
                  required
                  className="block w-full rounded-lg border border-gray-300 p-1.5 text-gray-900 focus:border-sky-500 focus:outline-none h-12 sm:text-sm sm:leading-6"
                />
                <span className="text-sm text-red-600">{error["password"]}</span>
              </div>
              <div className="mt-9">
                <button
                  type="submit"
                  onClick={() => handleSubmit()}
                  className="flex w-full justify-center rounded-lg bg-gradient-to-r from-orange-300 to-pink-500 p-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Login
                </button>
              </div>
              <div className="flex gap-2 mt-8">
                <input type="checkbox" className="h-5 w-5" />
                <span className="font-normal text-sm text-gray-600">Remember Me</span>
              </div>
              <span className="text-gray-500 text-sm font-medium mt-24 text-center block">©2024, All rights reserved</span>
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-col justify-between w-1/2 bg-white">
          <div className="px-14 2xl:px-24 mt-10 text-center">
            <h1 className="text-[#042D60] font-bold text-[2rem] leading-[normal]">Seamlessly manage all learner data in a unified platform.</h1>
            <p className="text-[#042D60] font-normal text-lg">Centralize customer data effortlessly. Streamline communication, sales, and support for seamless growth.</p>
          </div>
          <div className="relative mt-4">
            <div className="relative h-[32.5rem] lg:h-[33rem] xl:h-[30.5rem] w-full">
              <Image src={Curved} alt="Curved" layout="fill" objectFit="cover" />
            </div>
          </div>
        </div>
      </div>
    );
}