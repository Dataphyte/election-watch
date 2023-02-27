'use client';

import AddResult from '@/components/slide-overs/addResult';
import React, { useState, useEffet } from 'react';

const InHouseHome = () => {
  const [openForm, setOpenForm] = useState(false);
  return (
    <div className='flex w-full h-screen items-center justify-center'>
      <AddResult type='internal' state={openForm} setState={setOpenForm} />
      <button
        onClick={() => setOpenForm(true)}
        className='px-4 py-2 text-2xl font-bold text-white bg-teal-500 rounded shadow'
      >
        Upload an image
      </button>
    </div>
  );
};

export default InHouseHome;
