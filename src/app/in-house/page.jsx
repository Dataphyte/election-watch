'use client';

import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { superUserStore } from '@/global/superUserStore';
import { signInWithEmailAndPassword } from 'firebase/auth';

const InHouse = () => {
  const navigator = useRouter();
  const [User, setUser] = useState();
  const [FormData, setFormData] = useState({});
  const { setSuperUser } = superUserStore();

  // -- hanlde form change -->
  const handleFormChange = (target, payload) => {
    setFormData({ ...FormData, [target]: payload });
  };

  // -- handle login -->
  const handleLogin = (e) => {
    e.preventDefault();

    if (FormData.email && FormData.password) {
      signInWithEmailAndPassword(auth, FormData.email, FormData.password)
        .then((userCredentials) => {
          setUser(userCredentials);
          setSuperUser(userCredentials);
          navigator.push('in-house/home');
        })
        .catch((error) => {
          alert('Failed to login');
          console.log(error);
        });
    } else {
      alert('FIll in the fields please.');
    }
  };

  // -- monitor the user -->
  //   useEffect(() => {
  //     console.log(User);
  //   }, [User]);

  return (
    <div className='w-full h-screen min-h-[800px] flex items-center justify-center px-4'>
      <form className='flex w-full max-w-xl flex-col items-center justify center bg-white py-20 px-3 md:px-16 shadow-lg rounded gap-4'>
        <p className='text-2xl font-bold uppercase text-blue-600'>
          ELECTION WATCH
        </p>

        <input
          type='email'
          placeholder='Email'
          className='w-full max-w-md border px-3 py-3 text-lg font-medium rounded-md shadow outline-none text-gray-700 focus:border-indigo-500/50 duration-300 transition-all ease-out'
          onChange={(e) => handleFormChange('email', e.target.value)}
        />

        <input
          type='password'
          placeholder='password'
          className='w-full max-w-md border px-3 py-3 text-lg font-medium rounded-md shadow outline-none text-gray-700 focus:border-indigo-500/60 duration-300 transition-all ease-out'
          onChange={(e) => handleFormChange('password', e.target.value)}
        />

        <button
          className='py-3 px-3 text-gray-50 w-full mt-3 bg-indigo-500 cursor-pointer rounded shadow'
          onClick={handleLogin}
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default InHouse;
