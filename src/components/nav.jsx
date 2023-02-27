import React from 'react';

const Nav = () => {
  return (
    <nav className='w-full h-16 bg-white px-16 py-2 flex items-center justify-between shadow-sm border-b'>
      <p className='text-xl font-bold text-blue-500'>ELECTION RESULT WATCH</p>

      <ul className='flex gap-4 text-sm items-center'>
        <li className='nav-links'>Home</li>
        <li className='nav-links'>Maps</li>
        <li className='nav-links'>Results</li>
      </ul>
    </nav>
  );
};

export default Nav;
