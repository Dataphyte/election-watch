'use client';

import Image from 'next/image';
import { ref } from 'firebase/storage';
import { storage } from '@/firebase';
import React, { useState, useEffect } from 'react';
import StateFilter from '@/components/state-filter';
import AddResult from '@/components/slide-overs/addResult';
import { stateStore } from '@/global/stateStore';

const Results = () => {
  const [ShowForm, setShowForm] = useState(false);
  const { selectedState, selectedLga } = stateStore();
  const [FilterData, setFilterData] = useState({});

  useEffect(() => {
    // -- always set the name and lgs -->
    setFilterData({
      ...FilterData,
      state_name: selectedState,
      lga_name: selectedLga,
    });
  }, [selectedLga, selectedState]);

  useEffect(() => {
    console.log(FilterData);
  }, [FilterData]);

  // TODO: Fetch image
  const handleGetImage = () => {};

  // -- handle filter inpout change  -->
  const handleFilterChange = (target, payload) => {
    setFilterData({ ...FilterData, [target]: payload });
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
      <div className='flex flex-col w-full max-w-3xl bg-gray-300 rounded-md shadow-md px-12 py-4 items-center justify-center'>
        <div className='w-full gap-2 grid grid-cols-4 items-center justify-content-center pb-2'>
          {/* -- state name */}
          <div className='col-span-4 md:col-span-2 flex'>
            <p>
              State: <b>{selectedState}</b>
            </p>
          </div>

          {/* -- state code */}
          <div className='col-span-4 md:col-span-2 flex'>
            <p>
              State code:
              <input
                type='text'
                className='bg-gray-white ml-2 px-2 py-1 rounded shadow outline-0 focus:border border-indigo-500/40'
                onChange={(e) =>
                  handleFilterChange('state_code', e.target.value)
                }
              />
            </p>
          </div>

          {/* -- lga name */}
          <div className='col-span-4 md:col-span-2 flex'>
            <p>
              Local Government Area: <b>{selectedLga}</b>
            </p>
          </div>

          {/* -- lga code */}
          <div className='col-span-4 md:col-span-2 flex'>
            <p>
              LGA code:
              <input
                type='text'
                className='bg-gray-white ml-2 px-2 py-1 rounded shadow outline-0 focus:border border-indigo-500/40'
                onChange={(e) => handleFilterChange('lga_code', e.target.value)}
              />
            </p>
          </div>

          {/* -- polling unit name */}

          <div className='col-span-4 md:col-span-2 flex'>
            <p>
              Polling Unit:{' '}
              <input
                type='text'
                className='bg-gray-white ml-2 px-2 py-1 rounded shadow outline-0 focus:border border-indigo-500/40'
                onChange={(e) =>
                  handleFilterChange('polling_unit_name', e.target.value)
                }
              />
            </p>
          </div>

          {/* -- polling unit code */}
          <div className='col-span-4 md:col-span-2 flex'>
            <p>
              Polling unit code:
              <input
                type='text'
                className='bg-gray-white ml-2 px-2 py-1 rounded shadow outline-0 focus:border border-indigo-500/40'
                onChange={(e) =>
                  handleFilterChange('polling_unit_code', e.target.value)
                }
              />
            </p>
          </div>
        </div>

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
