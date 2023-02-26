import React from 'react';
import stateData from '@/assets/state_data.json';

const StateCard = () => {
  const states = stateReducer(stateData);
  console.log(states);
  return (
    <div className='text-black w-full min-h-full flex  items-center gap-5 justify-evenly '>
      {states &&
        states.map((data, idx) => (
          <div
            className='w-[50%] h-[250px] border-red-500 border rounded-md '
            key={idx}
          ></div>
        ))}
    </div>
  );
};

export default StateCard;

const stateReducer = (args) => {
  let result = [];

  // -- choose 3 random numbers from 36 -->
  while (result.length < 3) {
    const current = args[Math.floor(Math.random() * 36) + 1];
    !result.includes(current) && result.push(current);
  }

  return result;
};
