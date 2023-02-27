'use client';

import { storage } from '@/firebase';
import { ref, uploadBytes } from 'firebase/storage';
import { useUploadStore } from '@/global/uploadStore';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { superUserStore } from '@/global/superUserStore';
import { Fragment, useRef, useState, useEffect } from 'react';
import { extractor } from '@/utils/pu-extractor';
import PuSelector from '../puSelector';
import { puStore } from '@/global/puStore';

export default function AddResult({ state, setState, type }) {
  const imageRef = useRef();
  const [SelectedFile, setSelectedFile] = useState(null);
  const { pages, setPages } = useUploadStore();
  const { superUser } = superUserStore();
  const { pu } = puStore();

  // -- habdle form value change -->

  // -- handlefile upload  -->
  const handleFileUpload = (e) => {
    e.preventDefault();
    const data = extractor(pu);

    if (data.length === 4 && data[3].length === 3) {
      const storageRef = ref(
        storage,
        `${type}/state-${data[0]}/lga-${data[1]}/reg-${data[2]}/pu-${data[3]}/${SelectedFile.name}`
      );

      uploadBytes(storageRef, SelectedFile).then((snapshot) => {
        // TODO: uncomment this line for production
        alert('Upload success!');
        type === 'community' && !superUser && setPages(1);
        setState(false);
      });
    } else {
      alert('Please check the PU code for errors');
    }
  };

  return (
    <Transition.Root show={state} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setState}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                  <div className='flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl'>
                    <div className='px-4 sm:px-6'>
                      <div className='flex items-start justify-between'>
                        <Dialog.Title className='text-base font-semibold leading-6 text-gray-900'>
                          Add new polling data
                        </Dialog.Title>
                        <div className='ml-3 flex h-7 items-center'>
                          <button
                            type='button'
                            className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                            onClick={() => setState(false)}
                          >
                            <span className='sr-only'>Close panel</span>
                            <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                      {/* Replace with your content */}
                      <form className='w-full h-auto py-1 grid grid-cols-4 gap-4'>
                        {/* -- state name */}
                        <div className='form-container'>
                          <PuSelector />
                        </div>
                        <div className='form-container'>
                          <label>
                            Enter your phone number if you wish to be contacted
                          </label>
                          <input type='tel' className='form-inputs' />
                        </div>

                        {/* -- separator */}
                        <div className='w-full col-span-4 h-[2px] bg-gray-200 mt-5' />
                        {/* -- Add image */}
                        <div className='col-span-4 mt-5'>
                          <input
                            type='file'
                            className='hidden'
                            accept='image/*'
                            ref={imageRef}
                            onChange={(e) => setSelectedFile(e.target.files[0])}
                          />
                          <div
                            className='py-2 px-3 rounded shadow-md bg-indigo-500 text-gray-50 w-max cursor-pointer'
                            onClick={() => imageRef.current.click()}
                          >
                            <p>Select image</p>
                          </div>
                          <p className='text-gray-700 text-sm mt-3'>
                            &bull;&nbsp;
                            {SelectedFile !== null
                              ? `${SelectedFile.name} -->  ${Math.round(
                                  SelectedFile.size / 1000
                                )}kb`
                              : 'No file selected'}
                          </p>
                        </div>

                        {/* -- upload to cloud */}
                        {pages === 0 || superUser ? (
                          <button
                            className='col-span-4 bg-indigo-600 text-white font-medium text-lg py-2 mt-12 rounded shadow-md hover:shadow-lg transition-all duration-300 ease-out'
                            onClick={handleFileUpload}
                          >
                            Upload proof
                          </button>
                        ) : (
                          ''
                        )}

                        {pages === 1 && !superUser && (
                          <p className='col-span-4 text-teal-500 font-medium mt-12'>
                            Thank you for your submission
                          </p>
                        )}
                      </form>
                      {/* /End replace */}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
