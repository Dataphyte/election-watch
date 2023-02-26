'use client';
import { useState, useEffect } from 'react';
import StateData from '@/assets/state_data.json';
import Map from '@/components/maps/map';
import classes from '@/utils/classnames';
import StateCard from '@/components/stateCards/stateCard';

export default function Home() {
  const [selectedState, setSelectedState] = useState(null);

  // TODO: change this to vote data from API or other data source
  const votesData = [
    { name: 'APC', votes: 23456, color: 'text-green-600', bg: 'bg-green-600' },
    {
      name: 'LP',
      votes: 23453456,
      color: 'text-indigo-600',
      bg: 'bg-indigo-600',
    },
    { name: 'PDP', votes: 2345678, color: 'text-rose-600', bg: 'bg-rose-600' },
  ];

  useEffect(() => {
    console.log(selectedState);
    console.log(StateData.filter((data) => data.name === selectedState));
  }, [selectedState]);

  return (
    <main className='flex flex-col items-center w-full h-screen px-10 pt-6 gap-4'>
      <h1 className='font-bold text-4xl text-blue-500'>
        2023 Election Results
      </h1>

      {/* -- Top parties section */}
      <div className='w-full items-center justify-center flex gap-8 font-medium text-gray-700'>
        {votesData.map((data, idx) => (
          <div className='flex flex-col py-1 px-3 w-44 h-12 bg-white rounded-md shadow relative' key={idx}>
            <div
              className={classes('w-1 h-full absolute left-0 top-0', data.bg)}
            />
            <p className={classes('font-black text-sm', data.color)}>
              {data.name}
            </p>
            <p className='text-xs'>
              current votes - <b>{data.votes}</b>
            </p>
          </div>
        ))}
      </div>

      {/* -- ############################ */}
      {/* -- select filter */}
      {/* -- ############################ */}
      <section className='flex gap-4 items-center text-sm'>
        <p>Filter your results</p>
        {/* -- select state */}
        <select
          onChange={(e) => setSelectedState(e.target.value)}
          className='border border-gray-400 py-1 px-3 rounded'
        >
          <option selected disabled hidden value=''>
            Select by state
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
          onChange={(e) =>
            console.log({ state: selectedState, lga: e.target.value })
          }
        >
          <option selected hidden value='' disabled>
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

      {/* -- ############################ */}
      {/* -- data cards*/}
      {/* -- ############################ */}
      <section className='w-full bg-white rounded shadow-md min-h-[300px] px-4 py-3 flex'>
        <StateCard />
              
      </section>

      {/* -- ############################ */}
      {/* -- Maps*/}
      {/* -- ############################ */}
      <div className='w-full h-[80vh] min-h-[800px] flex items-center justy-center overflow-hidden'>
        <Map />
      </div>
    </main>
  );
}
