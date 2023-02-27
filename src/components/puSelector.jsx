'use client';

import React from 'react';
import { puStore } from '@/global/puStore';

const PuSelector = () => {
  const { pu, setPu } = puStore();

  return (
    <div className='flex'>
      <form className='flex flex-col gap-2 '>
        <label className='text-lg font-medium'>Enter PU number</label>
        <input
          type='text'
          value={pu}
          placeholder='XX-XX-XX-XXX'
          className='form-inputs'
          onChange={(e) => setPu(e.target.value)}
        />
      </form>
    </div>
  );
};

export default PuSelector;
