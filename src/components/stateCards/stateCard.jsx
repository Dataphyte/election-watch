'use client';

import React, { useCallback } from 'react';
import stateData from '@/assets/state_data.json';

const StateCard = () => {
  const states = useCallback(stateReducer(stateData), []);

  console.log(states);
  return (
    <div className='text-black w-full min-h-full flex  items-center gap-5 justify-evenly '>
      {states &&
        states.map((data, idx) => (
          <div
            className='w-[50%] h-[250px] border-red-500 border rounded-md p-3'
            key={idx}
          >
            <h1 className='font-bold text-blue-900 text-lg'>{data.name}</h1>
            <section className='flex justify-between items-start gap-[40px] mt-2'>
              <h1 className='flex-0'>Party</h1>
              <h1 className='flex-0'>Percentage</h1>
              <h1 className='flex-1 border-black'>Votes</h1>
            </section>
          </div>
        ))}
    </div>
  );
};

export default React.memo(StateCard);

const stateReducer = (args) => {
  let result = [];

  // -- choose 3 random numbers from 36 -->
  while (result.length < 3) {
    const current = args[Math.floor(Math.random() * 36) + 1];
    !result.includes(current) && result.push(current);
  }

  return result;
};
