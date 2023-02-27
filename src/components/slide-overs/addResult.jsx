'use client';

import { storage } from '@/firebase';
import stateData from '@/assets/state_data.json';
import { ref, uploadBytes } from 'firebase/storage';
import { useUploadStore } from '@/global/uploadStore';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { superUserStore } from '@/global/superUserStore';
import { Fragment, useRef, useState, useEffect } from 'react';

export default function AddResult({ state, setState, type }) {
  const imageRef = useRef();
  const [SelectedFile, setSelectedFile] = useState(null);
  const [FormData, setFormData] = useState({ state_name: 'Abuja' });
  const { pages, setPages } = useUploadStore();
  const { superUser } = superUserStore();

  useEffect(() => {
    SelectedFile && console.log(SelectedFile);
  }, [SelectedFile]);

  // -- habdle form value change -->
  const handleFormInput = (target, payload) => {
    setFormData({ ...FormData, [target]: payload });
  };

  useEffect(() => {
    console.log(FormData);
  }, [FormData]);

  // -- handlefile upload  -->
  const handleFileUpload = (e) => {
    e.preventDefault();
    if (
      FormData.state_name &&
      FormData.state_code &&
      FormData.lga_name &&
      FormData.polling_unit_name &&
      FormData.polling_unit_code
    ) {
      const storageRef = ref(
        storage,
        `${type}/${FormData.state_name}-${FormData.state_code}/${FormData.lga_name}-${FormData.lga_code}/${FormData.polling_unit_name}-${FormData.polling_unit_code}/${SelectedFile.name}`
      );

      uploadBytes(storageRef, SelectedFile).then((snapshot) => {
        // TODO: uncomment this line for production
        type === 'community' && setPages(1);
      });
    } else {
      alert('Please complete the form to upload image!!');
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
                      <form className='w-full h-auto py-1 grid grid-cols-4 gap-2'>
                        {/* -- state name */}
                        <div className='form-container'>
                          <label
                            htmlFor='last-name'
                            className='block text-sm font-medium text-gray-700'
                          >
                            State name
                          </label>
                          <div className='mt-1'>
                            <select
                              className='form-inputs cursor-pointer'
                              onChange={(e) =>
                                handleFormInput('state_name', e.target.value)
                              }
                            >
                              <option selected disabled value='none'>
                                Select state
                              </option>
                              {stateData.map((state) => (
                                <option key={state.name} value={state.name}>
                                  {state.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* -- state code */}
                        <div className='form-container'>
                          <label
                            htmlFor='last-name'
                            className='block text-sm font-medium text-gray-700'
                          >
                            State code
                          </label>
                          <div className='mt-1'>
                            <input
                              type='text'
                              name='state-name'
                              id='state-name'
                              className='form-inputs'
                              onChange={(e) =>
                                handleFormInput('state_code', e.target.value)
                              }
                            />
                          </div>
                        </div>

                        {/* -- lga name */}
                        <div className='form-container'>
                          <label
                            htmlFor='last-name'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Local Govt Area
                          </label>
                          <div className='mt-1'>
                            <select
                              className='form-inputs cursor-pointer'
                              onChange={(e) =>
                                handleFormInput('lga_name', e.target.value)
                              }
                            >
                              <option selected disabled value='none'>
                                Select LGA
                              </option>
                              {FormData.state_name &&
                                stateData
                                  .filter(
                                    (state) =>
                                      state.name === FormData.state_name
                                  )[0]
                                  .lgas.map((lga) => (
                                    <option key={lga} value={lga}>
                                      {lga}
                                    </option>
                                  ))}
                            </select>
                          </div>
                        </div>

                        {/* -- lga code */}
                        <div className='form-container'>
                          <label
                            htmlFor='last-name'
                            className='block text-sm font-medium text-gray-700'
                          >
                            LGA code
                          </label>
                          <div className='mt-1'>
                            <input
                              type='text'
                              name='state-name'
                              id='state-name'
                              className='form-inputs'
                              onChange={(e) =>
                                handleFormInput('lga_code', e.target.value)
                              }
                            />
                          </div>
                        </div>

                        {/* -- polling unit name */}
                        <div className='form-container'>
                          <label
                            htmlFor='polling-unit-name'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Polling Unit Name
                          </label>
                          <div className='mt-1'>
                            <input
                              type='text'
                              name='polling-unit-name'
                              id='polling-unit-name'
                              className='form-inputs'
                              onChange={(e) =>
                                handleFormInput(
                                  'polling_unit_name',
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </div>

                        {/* -- polling unit code */}
                        <div className='form-container'>
                          <label
                            htmlFor='polling-unit-code'
                            className='block text-sm font-medium text-gray-700'
                          >
                            Polling unit code
                          </label>
                          <div className='mt-1'>
                            <input
                              type='text'
                              name='polling-unit-code'
                              id='polling-unit-code'
                              className='form-inputs'
                              onChange={(e) =>
                                handleFormInput(
                                  'polling_unit_code',
                                  e.target.value
                                )
                              }
                            />
                          </div>
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
