import React from 'react';
import Image from 'next/image';
import StateFilter from '@/components/state-filter';

const Results = () => {
  const puData = {
    state: 'Anambra',
    state_code: 12345,
    lga: 'Aguata',
    lga_code: 12345,
    polling_unit: 'Motor park',
    polling_unit_code: 1234553,
  };
  return (
    <div className='flex flex-col px-10 py-5 w-full gap-5 h-screen'>
      {/* -- details section */}
      <div className='flex w-full max-w-xl h-32 bg-white rounded-md shadow-md px-12 py-3 items-center justify-center'>
        <ul className='w-full'>
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
      </div>

      {/* -- state data */}
      <StateFilter />

      <section className='w-full h-[800px] grid grid-cols-2'>
        {/* -- original IRev*/}
        <div className='w-1/2 flex col-span-2 md:col-span-1 relative'>
          <Image
            src='https://images.unsplash.com/photo-1599498448014-81d90414c50a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80'
            alt='Irev upload'
            fill
          />
        </div>

        {/* -- community upload*/}
        <div className='w-1/2 flex col-span-2 md:col-span-1 relative'>
          <Image
            src='https://images.unsplash.com/photo-1599498448014-81d90414c50a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=686&q=80'
            alt='Irev upload'
            fill
          />
        </div>
      </section>

      {/* -- View options */}
      <section className='w-full bg-white flex flex-col gap-2 py-2 items-center justify-center'>
        <button className='py-1 px-4 bg-orange-400 shadow rounded-md text-gray-100 text-medium'>
          View other uploads for this polling unit
        </button>
        <button className='py-1 px-4 bg-indigo-500 shadow rounded-md text-gray-100 text-medium'>
          Upload your own proof of election{' '}
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
