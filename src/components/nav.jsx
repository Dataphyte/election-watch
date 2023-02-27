'use client';

import React, { useState } from 'react';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import HelpModal from './modals/help';

const Nav = () => {
  const [OpenHelp, setOpenHelp] = useState(false);

  return (
    <nav className='w-full h-16 bg-white px-2 md:px-16 py-2 flex items-center justify-between shadow-sm border-b'>
      <HelpModal state={OpenHelp} setState={setOpenHelp} />
      <p className='text-lg font-bold text-blue-500'>ELECTION RESULT WATCH</p>

      <p
        className='cursor-pointer text-white rounded shadow bg-blue-500 font-bold flex items-center w-max gap-1 py-1 px-3 justify-center'
        onClick={() => setOpenHelp(true)}
      >
        <InformationCircleIcon className='w-5' />
        Help
      </p>
    </nav>
  );
};

export default Nav;
