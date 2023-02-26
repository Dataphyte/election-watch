'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import StateFilter from '@/components/state-filter';
import AddResult from '@/components/slide-overs/addResult';

const Results = () => {
  const [ShowForm, setShowForm] = useState(false);
  const puData = {
    state: 'Anambra',
    state_code: 12345,
    lga: 'Aguata',
    lga_code: 12345,
    polling_unit: 'Motor park',
    polling_unit_code: 1234553,
  };

  return (
    <div className='flex flex-col py-5 w-full gap-5 min-h-screen items-center'>
      <AddResult state={ShowForm} setState={setShowForm} />
      <h1 className='text-2xl md:text-3xl font-bold text-blue-500 '>
        Select your Polling unit to see results
      </h1>

      {/* -- state data */}
      <StateFilter />

      {/* -- details section */}
      <div className='flex flex-col w-full max-w-3xl h-32 bg-white rounded-md shadow-md px-12 py-3 items-center justify-center'>
        <ul className='w-full gap-1 flex flex-col'>
          <li className='flex justify-between'>
            <p>
              State: <b>{puData.state}</b>
            </p>
            <p>
              code:
              <b> {puData.state_code}</b>
            </p>
          </li>

          <li className='flex justify-between'>
            <p>
              Local Government Area: <b>{puData.lga}</b>
            </p>
            <p>
              code:
              <b> {puData.lga_code}</b>
            </p>
          </li>

          <li className='flex justify-between'>
            <p>
              Polling Unit: <b>{puData.polling_unit}</b>
            </p>
            <p>
              code:
              <b> {puData.polling_unit_code}</b>
            </p>
          </li>
        </ul>

        <button className='py-1 px-4 bg-indigo-500 text-gray-50 rounded hover:shadow-md '>
          Search polling unit
        </button>
      </div>

      <section className='w-full h-[600px] grid grid-cols-2 max-w-4xl gap-10 justify-center items-center'>
        {/* -- original IRev*/}
        <div className='w-full flex flex-col h-full col-span-2 gap-4 md:col-span-1 relative items-center border border-gray-400 py-2'>
          <p className='text-base font-medium'>INEC IReV</p>
          <div className='relative w-full h-4/5 cursor-pointer'>
            <Image
              src='https://images.unsplash.com/photo-1599498448014-81d90414c50a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80'
              alt='Irev upload'
              style={{ objectFit: 'contain', objectPosition: 'center' }}
              fill
            />
          </div>
          <button className='py-1 px-3 text-gray-50 font-medium text-base bg-indigo-500 hover:shadow-md rounded transition-all duration-300 ease-out'>
            View image
          </button>
        </div>

        {/* -- community upload*/}
        <div className='w-full flex flex-col h-full col-span-2 gap-4 md:col-span-1 relative items-center border border-gray-400 py-2'>
          <p className='text-lg font-medium'>Community Upload</p>
          <div className='relative w-full h-4/5 cursor-pointer'>
            <Image
              src='https://images.unsplash.com/photo-1599498448014-81d90414c50a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80'
              alt='Irev upload'
              style={{ objectFit: 'contain', objectPosition: 'center' }}
              fill
            />
          </div>
          <button className='py-1 px-3 text-gray-50 font-medium text-base bg-indigo-500 hover:shadow-md rounded transition-all duration-300 ease-out'>
            View image
          </button>
        </div>
      </section>

      {/* -- View options */}
      <section className='w-full flex flex-col gap-5 py-12 items-center justify-center'>
        <button className='py-2 px-4 bg-orange-400 shadow rounded-md text-gray-100 text-medium'>
          View other uploads for this polling unit
        </button>
        <button
          className='py-2 px-4 bg-indigo-500 shadow rounded-md text-gray-100 text-medium'
          onClick={() => setShowForm(true)}
        >
          Upload your own proof of results
        </button>
      </section>
    </div>
  );
};

export default Results;

/**
 * state & code
 * local govt area & code
 * polling unit & code
 */
