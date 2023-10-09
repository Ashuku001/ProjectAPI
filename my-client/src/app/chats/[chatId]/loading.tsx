import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function loading() {
    return (
        <div className='flex-1 bg-slate-300 dark:bg-slate-800 h-full'>
            <div className='flex justify-between items-center w-full cursor-pointer'>
                <div className='flex justify-between items-center space-x-4 p-4'>
                    <Skeleton count={1} circle={true} width={'40px'} height={'40px'} />
                    <Skeleton count={2} />
                </div>
                <div className="flex justify-between items-center">
                    <Skeleton circle={true} className='w-[40px] h-[40px]' />
                    <div className="w-[40px] h-[40px] flex justify-center items-center">
                        <Skeleton />
                    </div>
                </div>
            </div>
            <div className="h-[68vh] overflow-y-scroll">
                        <div className=' space-y-5  flex flex-col w-full'>
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className='flex flex-row'>
                                    <div className={`border rounded-r-lg md:rounded-lg p-5 w-[200px] md:w-[350px] lg:w-[500px] ]${(i % 2) == 0 ? 'ml-[20%]' : 'mr-[20%]'}`}>
                                        <p className='font-bold'>
                                            <Skeleton />
                                        </p>
                                        <Skeleton count={Math.floor(Math.random() * 5) + 1} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        {/* <div className='w-[200px] md:w-[350px] lg:w-[500px ]'>
                            {[...Array(10)].map((item) => (
                                <div key={item} className="p-5 border rounded-2xl">
                                    <Skeleton />
                                    <Skeleton count={2} />
                                    <br />
                                    <Skeleton count={1} />
                                </div>
                            ))}
                        </div> */}
            </div>
            <div className='flex flex-row items-center justify-center'>
                <Skeleton count={1} circle={true} width={'40px'} height={'40px'} />
                <Skeleton count={1} height={'40px'} />
                <Skeleton count={1} circle={true} width={'40px'} height={'40px'} />
            </div>
        </div>
    )
}

export default loading