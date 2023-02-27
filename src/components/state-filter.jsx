'use client';

import React from 'react';
import { stateStore } from '@/global/stateStore';
import StateData from '@/assets/state_data.json';

const StateFilter = () => {
  //  TODO: MAke the select option default show again

  const { selectedState, setSelectedState, setSelectedLga } = stateStore();
  return (
    <>
      {/* -- ############################ */}
      {/* -- select filter */}
      {/* -- ############################ */}
      <section className='flex flex-col md:flex-row gap-4 items-center text-sm'>
        <p>Filter your results</p>
        {/* -- select state */}
        <select
          onChange={(e) => setSelectedState(e.target.value)}
          className='border border-gray-400 py-1 px-3 rounded'
        >
          <option selected hidden disabled>
            Select by State
          </option>
          {StateData.map((data, idx) => (
            <option key={idx} value={data.name}>
              {data.name}
            </option>
          ))}
        </select>

        {/* -- select lga */}
        <select
          className='border border-gray-400 py-1 px-3 rounded'
          onChange={(e) => setSelectedLga(e.target.value)}
        >
          <option selected hidden disabled>
            Select a state to see LGA
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
