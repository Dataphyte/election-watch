'use client';

import Image from 'next/image';
import { storage } from '@/firebase';
import React, { useState, useEffect } from 'react';
import AddResult from '@/components/slide-overs/addResult';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import PuSelector from '@/components/puSelector';
import { puStore } from '@/global/puStore';
import { extractor } from '@/utils/pu-extractor';

const Results = () => {
  const [InHouseImage, setInHouseImage] = useState(null);
  const [CommunityImage, setCommunityImage] = useState(null);
  const [ShowForm, setShowForm] = useState(false);
  const { pu } = puStore();

  // useEffect(() => {
  //   console.log(InHouseImage);
  //   console.log(CommunityImage);
  // }, [InHouseImage, CommunityImage]);

  // TODO: Fetch image
  /**
   *
   * @param {('internal' | 'community')} type - type of image to be cetched
   * @returns Array of images for community and single image for internal
   */
  const handleGetImage = (type) => {
    const data = extractor(pu);
    console.log(data);
    const communityImagesPath = `community/state-${data[0]}/lga-${data[1]}/reg-${data[2]}/pu-${data[3]}`;

    const inHouseImagesPath = `internal/state-${data[0]}/lga-${data[1]}/reg-${data[2]}/pu-${data[3]}`;

    // -- create refs  -->
    const internalRef = ref(storage, inHouseImagesPath);
    const communityRef = ref(storage, communityImagesPath);

    // -- get both images -->
    if (data.length === 4 && data[3].length === 3) {
      listAll(communityRef)
        .then((listData) => {
          console.log(listData);
          getDownloadURL(ref(storage, listData.items[0].fullPath))
            .then((url) => setCommunityImage(url))
            .catch((error) => {
              alert('Error getting community file');
              setCommunityImage(null);
            });
        })
        .catch((error) => {
          alert('No community data for polling unit');
          setCommunityImage(null);
        });

      listAll(internalRef)
        .then((listData) => {
          console.log(listData);
          getDownloadURL(ref(storage, listData.items[0].fullPath))
            .then((url) => setInHouseImage(url))
            .catch((error) => {
              alert('Error getting IRev data file');
              setInHouseImage(null);
            });
        })
        .catch((error) => {
          alert('No Irev data for polling unit');
          setInHouseImage(null);
        });
    } else {
      alert('Please fill the fields correctly to See reults!!');
    }
  };

  return (
    <div className='flex flex-col py-5 w-full gap-5 min-h-screen items-center px-3'>
      {/* -- add result slide over */}
      <AddResult state={ShowForm} setState={setShowForm} type='community' />

      <h1 className='text-2xl md:text-3xl font-bold text-blue-500 text-center'>
        Select your Polling unit to see results
      </h1>

      {/* -- details section */}
      <div className='flex flex-col w-full max-w-3xl bg-gray-300 rounded-md shadow-md px-3 md:px-12 py-4 items-center justify-center text-sm gap-3'>
        <PuSelector />

        <button
          className='py-1 px-3 rounded shadow-md bg-indigo-500 text-gray-50'
          onClick={handleGetImage}
        >
          Search for PU
        </button>
      </div>

      <section className='w-full min-h-[600px] grid grid-cols-2 max-w-4xl gap-10 justify-center items-center'>
        {/* -- original IRev*/}
        <div className='w-full flex flex-col h-full min-h-[600px] col-span-2 gap-4 md:col-span-1 relative items-center border border-gray-400 py-2'>
          <p className='text-base font-medium'>INEC IReV</p>
          <div className='relative w-full h-4/5 flex items-center justify-center'>
            {InHouseImage && (
              <Image
                src={InHouseImage}
                alt='INEC upload'
                style={{ objectFit: 'contain', objectPosition: 'center' }}
                fill
              />
            )}
            {!InHouseImage && <p>No in-House uploads</p>}
          </div>
          {InHouseImage && (
            <button className='py-1 px-3 text-gray-50 font-medium text-base bg-indigo-500 hover:shadow-md rounded transition-all duration-300 ease-out'>
              View image
            </button>
          )}
        </div>

        {/* -- community upload*/}
        <div className='w-full flex flex-col h-full col-span-2 gap-4 md:col-span-1 relative items-center border border-gray-400 py-2 min-h-[600px] '>
          <p className='text-lg font-medium'>Community Upload</p>
          <div className='relative w-full h-4/5 flex items-center justify-center'>
            {CommunityImage && (
              <Image
                src={CommunityImage}
                alt='Community upload'
                style={{ objectFit: 'contain', objectPosition: 'center' }}
                fill
              />
            )}
            {!CommunityImage && <p>No Community uploads</p>}
          </div>
          {CommunityImage && (
            <button className='py-1 px-3 text-gray-50 font-medium text-base bg-indigo-500 hover:shadow-md rounded transition-all duration-300 ease-out'>
              View image
            </button>
          )}
        </div>
      </section>

      {/* -- View options */}
      <section className='w-full flex flex-col gap-5 py-12 items-center justify-center'>
        <button className='py-2 px-4 bg-orange-400 shadow rounded-md text-gray-100 text-medium'>
          View other uploads for this polling unit
        </button>
        <button
          className='py-2 px-4 bg-indigo-500 shadow rounded-md text-gray-100 text-medium'
          onClick={() => setShowForm(true)}
        >
          Upload your own proof of results
        </button>
      </section>
    </div>
  );
};

export default Results;

/**
 * state & code
 * local govt area & code
 * polling unit & code
 */
