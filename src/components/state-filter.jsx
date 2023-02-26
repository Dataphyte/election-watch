'use client';

import React from 'react';
import { stateStore } from '@/global/stateStore';
import StateData from '@/assets/state_data.json';

const StateFilter = () => {
  //  TODO: MAke the select option default show again

  const { selectedState, setSelectedState } = stateStore();
  return (
    <>
      {/* -- ############################ */}
      {/* -- select filter */}
      {/* -- ############################ */}
      <section className='flex gap-4 items-center text-sm'>
        <p>Filter your results</p>
        {/* -- select state */}
        <select
          defaultValue={'Select by State'}
          onChange={(e) => setSelectedState(e.target.value)}
          className='border border-gray-400 py-1 px-3 rounded'
        >
          {StateData.map((data, idx) => (
            <option key={idx} value={data.name}>
              {data.name}
            </option>
          ))}
        </select>

        {/* -- select lga */}
        <select
          defaultValue={'Selected a state to see LGA'}
          className='border border-gray-400 py-1 px-3 rounded'
          onChange={(e) =>
            console.log({ state: selectedState, lga: e.target.value })
          }
        >
          <option hidden value='' disabled>
            Selected a state to see LGA
          </option>
          {selectedState &&
            StateData.filter((data) => data.name === selectedState)[0].lgas.map(
              (data, idx) => (
                <option value={data} key={idx}>
                  {data}
                </option>
              )
            )}
        </select>
      </section>
    </>
  );
};

export default StateFilter;
