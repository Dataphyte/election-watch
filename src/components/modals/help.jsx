import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';

export default function HelpModal({ state, setState }) {
  return (
    <Transition.Root show={state} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setState}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-5xl sm:p-6 gap-3 flex flex-col'>
                <div className='flex justify-between'>
                  <h3 className='text-xl font-bold text-blue-600'>
                    HOW TO USE
                  </h3>
                  <p
                    className='text-rose-600 text-medium cursor-pointer'
                    onClick={() => setState(false)}
                  >
                    X close
                  </p>
                </div>

                <div className='w-full flex flex-col gap-3'>
                  {helpData.map((data, idx) => (
                    <div key={idx} className='w-full flex flex-col'>
                      <p className='text-base font-medium text-blue-700'>
                        {data.question}
                      </p>
                      <p className='text-sm text-gray-700'>{data.answer}</p>
                    </div>
                  ))}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

const helpData = [
  {
    question: 'How do I view results',
    answer:
      'The fields at the top section of the results page allow you to enter the details of the polling unit you are interested in as written on the result papers and then click on the search polling unit button',
  },
  {
    question: 'How do I upload a result image?',
    answer:
      'Scroll down to the bottom of the results page and click on the "upload your own prrof of results" button. Fill in the form as shown on the election result you are about to upload then selct the result you wish to upload and click on "upload proof". You have only 1 chance to upload a proof so proof read it to be sure of accuracy',
  },
];
