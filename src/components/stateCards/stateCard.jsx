'use client';

import React, { useCallback } from 'react';
import stateData from '@/assets/state_data.json';

const StateCard = () => {
  const states = useCallback(stateReducer(stateData), []);
  const people = [
    {
      party: 'LP',
      percentage: 48,
      votes: 23456,
      progressText: 'text-indigo-600',
      progressBg: 'bg-indigo-600'
    },
    {
      party: 'PDP',
      percentage: 25,
      votes: 23456,
      progressText: 'text-rose-600',
      progressBg: 'bg-rose-600'
    },
    {
      party: 'APC',
      percentage: 15,
      votes: 23456,
      progressText: 'text-green-600',
      progressBg: 'bg-green-600'
    },
    // More people...
  ];

  return (
    <div className='text-black w-full min-h-full flex  items-center gap-5 justify-evenly '>
      {states &&
        states.map((data, idx) => (
          <div
            className='w-[50%] h-[250px] border rounded-md p-3 bg-white shadow-md'
            key={idx}
          >
            <h1 className='font-bold text-blue-900 text-lg'>{data.name}</h1>

            <section className='flex justify-between items-start'>
              <div className='px-4 sm:px-6 lg:px-8 w-full'>
                <div className='flow-root'>
                  <table className='min-w-full divide-y divide-gray-300'>
                    <thead>
                      <tr>
                        <th
                          scope='col'
                          className='py-1 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 lg:pl-8'
                        >
                          Party
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                        >
                          Percentage
                        </th>
                        <th
                          scope='col'
                          className='px-3 py-3.5 text-left text-sm font-semibold text-gray-900'
                        >
                          Votes
                        </th>
                      </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200 bg-white'>
                      {people
                        .sort((a, b) => a.percentage + b.percentage)
                        .map((person) => (
                          <tr key={person.party}>
                            <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8'>
                              {person.party}
                            </td>
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                              <div className='flex items-center'>
                                <p className={person.progressText}>{person.percentage}%&nbsp;&nbsp;</p>
                               <div  className="flex w-full h-3 bg-gray-400">
                                  <div max={100} className={person.progressBg}  style={{ width: `${person.percentage}%`}} />
                               </div>
                              </div>
                            </td>
                            <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                              {person.votes}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
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
