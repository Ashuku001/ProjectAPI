'use client'
import { FormEvent, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModal } from '../../store/localStore'
import { useReactiveVar } from '@apollo/client'
import TemplateTabs from './RemoteTemplateType'



function MyDialog() {
    // const [isOpen, closeModal] = useModal((state) => [state.isOpen, state.closeModal])
    let isOpen = useReactiveVar(useModal)[0]
    console.log("IS OPEN VALUE", isOpen)

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
    }

    return (
        // Use the `Transition` component at the root level
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog
                as="form" className={"relative z-10"}
                onSubmit={handleSubmit}
                onClose={e => useModal([false])}>
                {/*
          Use one Transition.Child to apply one transition to the backdrop...
        */}
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>

                <div className='fixed inset-0 '>
                    <div className='flex min-h-[70v] fixed bottom-0 right-0 justify-center items-center px-2 md:px-10 text-center'>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Panel className={'w-[100vw] md:w-[80vw] lg:w-[70vw]  transform-hidden rounded-lg bg-slate-200 dark:bg-slate-500 align-middle shadow-xl transtion-all p-3'}>
                                <Dialog.Title className={'text-center text-[20px] font-sans font-bold'}>Choose a template to send</Dialog.Title>
                                <Dialog.Description className={'my-2'}>
                                    Your active templates
                                </Dialog.Description>
                                <div className='w-full h-[55vh] overflow-y-hidden  flex flex-row'>
                                    <TemplateTabs/>
                                    <div className='flex-1 p-2 w-[50%]'>
                                        <h1 className='text-center'>The preview</h1>
                                        <div>
                                            The template detail
                                        </div>
                                    </div>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <button onClick={() => useModal([false])} className='inline-flex justify-center rounded-md border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focust-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed'>Cancel</button>
                                    <button onClick={() => useModal([false])} className='inline-flex justify-center rounded-md border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focust-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed'>Send</button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>

            </Dialog>
        </Transition>
    )
}

export default MyDialog


// function MyDialog() {
//     // const [isOpen, closeModal] = useModal((state) => [state.isOpen, state.closeModal])
//     let isOpen = useReactiveVar(useModal)[0]
//     console.log("IS OPEN VALUE", isOpen)

//     return (
//         <Transition appear show={isOpen} as={Fragment} >
//             <Transition.Child
//                 as={Fragment}
//                 enter="ease-out duration-300"
//                 enterFrom="opacity-0 scale-95"
//                 enterTo="opacity-100 scale-100"
//                 leave="ease-in duration-200"
//                 leaveFrom="opacity-100 scale-100"
//                 leaveTo="opacity-0 scale-95"
//             >
//                 <Dialog as='form' open={isOpen} onClose={() => useModal([false])} className={'relative z-10'} >
//                     {/* transition the backdrop */}
//                     <Transition.Child
//                         as={Fragment}
//                         enter="ease-out duration-300"
//                         enterFrom="opacity-0"
//                         enterTo="opacity-100"
//                         leave="ease-in duration-200"
//                         leaveFrom="opacity-100"
//                         leaveTo="opacity-0"

//                     >
//                         <div className="fixed inset-0 bg-black bg-opacity-25" />
//                     </Transition.Child>
// <Dialog.Panel className={'w-full  transform-hidden rounded-lg bg-slate-200 dark:bg-slate-500 p-3 text-left align-middle shadow-xl transtion-all'}>
//     <Dialog.Title className={'text-center text-[20px] font-sans font-bold'}>Choose a template to send</Dialog.Title>
//     <Dialog.Description>
//         Your active templates
//     </Dialog.Description>
//     <div className='w-full h-[44vh] overflow-y-hidden  flex flex-row'>
//         <div className=' h-full overflow-y-auto w-[50%]'>
//             <ul className='sticky flex flex-col border-r border-slate-400 h-full'>
//                 <li>template 1</li>
//                 <li>template 2</li>
//                 <li>template 3</li>
//                 <li>template 4</li>
//                 <li>template 5</li>
//                 <li>template 5</li>
//                 <li>template 5</li>
//                 <li>template 3</li>
//                 <li>template 4</li>
//                 <li>template 5</li>
//                 <li>template 5</li>
//                 <li>template 5</li>
//                 <li>template 3</li>
//                 <li>template 4</li>
//                 <li>template 5</li>
//                 <li>template 5</li>
//                 <li>template 5</li>
//             </ul>
//         </div>
//         <div className='flex-1 p-2 w-[50%]'>
//             <h1 className='text-center'>The preview</h1>
//             <div>
//                 The template detail
//             </div>
//         </div>
//     </div>
//     <div className='flex justify-between items-center'>
//         <button onClick={() => useModal([false])}>Cancel</button>
//         <button onClick={() => useModal([false])}>Send</button>
//     </div>
// </Dialog.Panel>
//                 </Dialog>
//             </Transition.Child>
//         </Transition>
//     )
// }

// export default MyDialog