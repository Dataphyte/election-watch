'use client';

import Image from 'next/image';
import { ref, getDownloadURL, listAll } from 'firebase/storage';
import { storage } from '@/firebase';
import React, { useState, useEffect } from 'react';
import StateFilter from '@/components/state-filter';
import AddResult from '@/components/slide-overs/addResult';
import { stateStore } from '@/global/stateStore';

const Results = () => {
  const [InHouseImage, setInHouseImage] = useState(null);
  const [CommunityImage, setCommunityImage] = useState(null);
  const [ShowForm, setShowForm] = useState(false);
  const { selectedState, selectedLga } = stateStore();
  const [FilterData, setFilterData] = useState({});

  useEffect(() => {
    // -- always set the name and lgs -->
    setFilterData({
      ...FilterData,
      state_name: selectedState,
      lga_name: selectedLga,
    });
  }, [selectedLga, selectedState]);

  useEffect(() => {
    console.log(InHouseImage);
    console.log(CommunityImage);
  }, [InHouseImage, CommunityImage]);

  // TODO: Fetch image
  /**
   *
   * @param {('internal' | 'community')} type - type of image to be cetched
   * @returns Array of images for community and single image for internal
   */
  const handleGetImage = (type) => {
    const communityImagesPath = `community/${FilterData.state_name}-${FilterData.state_code}/${FilterData.lga_name}-${FilterData.lga_code}/${FilterData.reg_area_name}-${FilterData.reg_area_code}---${FilterData.polling_unit_name}-${FilterData.polling_unit_code}`;

    const inHouseImagesPath = `internal/${FilterData.state_name}-${FilterData.state_code}/${FilterData.lga_name}-${FilterData.lga_code}/${FilterData.reg_area_name}-${FilterData.reg_area_code}---${FilterData.polling_unit_name}-${FilterData.polling_unit_code}`;

    // -- create refs  -->
    const internalRef = ref(storage, inHouseImagesPath);
    const communityRef = ref(storage, communityImagesPath);

    // -- get both images -->
    if (
      FilterData.state_name &&
      FilterData.state_code &&
      FilterData.lga_name &&
      FilterData.reg_area_name &&
      FilterData.reg_area_code &&
      FilterData.polling_unit_name &&
      FilterData.polling_unit_code
    ) {
      listAll(communityRef)
        .then((listData) => {
          console.log(listData);
          getDownloadURL(ref(storage, listData.items[0].fullPath))
            .then((url) => setCommunityImage(url))
            .catch((error) => {
              console.log(error);
              setCommunityImage(null);
            });
        })
        .catch((error) => {
          console.log(error);
          setCommunityImage(null);
        });

      listAll(internalRef)
        .then((listData) =>
          getDownloadURL(ref(storage, listData.items[0].fullPath))
            .then((url) => setInHouseImage(url))
            .catch((error) => {
              console.log(error);
              setInHouseImage(null);
            })
        )
        .catch((error) => {
          console.log(error);
          setInHouseImage(null);
        });
    } else {
      alert('Please fill the fields correctly to See reults!!');
    }
  };

  // -- handle filter inpout change  -->
  const handleFilterChange = (target, payload) => {
    setFilterData({ ...FilterData, [target]: payload });
  };

  return (
    <div className='flex flex-col py-5 w-full gap-5 min-h-screen items-center px-3'>
      {/* -- add result slide over */}
      <AddResult state={ShowForm} setState={setShowForm} type='community' />

      <h1 className='text-2xl md:text-3xl font-bold text-blue-500 text-center'>
        Select your Polling unit to see results
      </h1>

      {/* -- state data */}
      <StateFilter />

      {/* -- details section */}
      <div className='flex flex-col w-full max-w-3xl bg-gray-300 rounded-md shadow-md px-3 md:px-12 py-4 items-center justify-center text-sm'>
        <div className='w-full gap-2 grid grid-cols-4 items-center justify-content-center pb-2'>
          {/* -- state name */}
          <div className='col-span-4 md:col-span-2 flex'>
            <p>
              State: <b>{selectedState}</b>
            </p>
          </div>

          {/* -- state code */}
          <div className='col-span-4 md:col-span-2 flex'>
            <p>
              State code:
              <input
                type='text'
                className='bg-gray-white ml-2 px-2 py-1 rounded shadow outline-0 focus:border border-indigo-500/40 text-sm'
                onChange={(e) =>
                  handleFilterChange('state_code', e.target.value)
                }
              />
            </p>
          </div>

          {/* -- lga name */}
          <div className='col-span-4 md:col-span-2 flex'>
            <p>
              Local Government Area: <b>{selectedLga}</b>
            </p>
          </div>

          {/* -- lga code */}
          <div className='col-span-4 md:col-span-2 flex'>
            <p>
              LGA code:
              <input
                type='text'
                className='bg-gray-white ml-2 px-2 py-1 rounded shadow outline-0 focus:border border-indigo-500/40 text-sm'
                onChange={(e) => handleFilterChange('lga_code', e.target.value)}
              />
            </p>
          </div>

          {/* -- Reg Area name */}
          <div className='col-span-4 md:col-span-2 flex'>
            <p>
              Reg Area:{' '}
              <input
                type='text'
                className='bg-gray-white ml-2 px-2 py-1 rounded shadow outline-0 focus:border border-indigo-500/40 text-sm'
                onChange={(e) =>
                  handleFilterChange('reg_area_name', e.target.value)
                }
              />
            </p>
          </div>

          {/* -- Reg Area code */}
          <div className='col-span-4 md:col-span-2 flex'>
            <p>
              Reg Area code:
              <input
                type='text'
                className='bg-gray-white ml-2 px-2 py-1 rounded shadow outline-0 focus:border border-indigo-500/40 text-sm'
                onChange={(e) =>
                  handleFilterChange('reg_area_code', e.target.value)
                }
              />
            </p>
          </div>

          {/* -- polling unit name */}
          <div className='col-span-4 md:col-span-2 flex'>
            <p>
              Polling Unit:{' '}
              <input
                type='text'
                className='bg-gray-white ml-2 px-2 py-1 rounded shadow outline-0 focus:border border-indigo-500/40 text-sm'
                onChange={(e) =>
                  handleFilterChange('polling_unit_name', e.target.value)
                }
              />
            </p>
          </div>

          {/* -- polling unit code */}
          <div className='col-span-4 md:col-span-2 flex'>
            <p>
              Polling unit code:
              <input
                type='text'
                className='bg-gray-white ml-2 px-2 py-1 rounded shadow outline-0 focus:border border-indigo-500/40 text-sm'
                onChange={(e) =>
                  handleFilterChange('polling_unit_code', e.target.value)
                }
              />
            </p>
          </div>
        </div>

        <button
          className='py-1 px-4 bg-indigo-500 text-gray-50 rounded hover:shadow-md border-none '
          onClick={handleGetImage}
        >
          Search polling unit
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
