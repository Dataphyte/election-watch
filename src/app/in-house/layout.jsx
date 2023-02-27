'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { superUserStore } from '@/global/superUserSTore';

const InHouseLayout = ({ children }) => {
  const { superUser } = superUserStore();
  const navigator = useRouter();

  if (!superUser || superUser === null || !superUser.user) {
    navigator.push('in-house');
  }

  // -- managhe user access -->
  //   useEffect(() => {
  //     if (!superUser || superUser === null || !superUser.user) {
  //       navigator.push('in-house');
  //     }
  //   });

  return <div>{children}</div>;
};

export default InHouseLayout;
