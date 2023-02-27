'use client';

import React, { useState, useEffet } from 'react';
import { useUploadStore } from '@/global/uploadStore';
import AddResult from '@/components/slide-overs/addResult';
import { useRouter } from 'next/navigation';

const InHouseHome = () => {
  const navigator = useRouter();
  const [openForm, setOpenForm] = useState(false);
  const { setPages } = useUploadStore();

  return (
    <div className='flex flex-col gap-4 w-full h-screen items-center justify-center'>
      <AddResult type='internal' state={openForm} setState={setOpenForm} />
      <button
        onClick={() => setOpenForm(true)}
        className='px-4 py-2 text-2xl font-bold text-white bg-teal-500 rounded shadow'
      >
        Upload an image
      </button>

      <button
        className='px-4 py-2 text-2xl font-bold text-white bg-orange-500/90 rounded shadow'
        onClick={() => {
          setPages(0);
        }}
      >
        Reset upload button
      </button>

      <button
        className='px-4 py-2 text-2xl font-bold text-white bg-indigo-500/90 rounded shadow'
        onClick={() => {
          navigator.push('results');
        }}
      >
        View Results
      </button>
    </div>
  );
};

export default InHouseHome;
