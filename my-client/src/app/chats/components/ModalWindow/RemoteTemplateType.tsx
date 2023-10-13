'use client'
import { Fragment } from 'react'
import { Tab } from '@headlessui/react'
import TemplateRadioGroup from './RemoteTemplatesRadioGroup'
const categories = ["MARKETING", "UTILITY", "AUTHENTICATION"]

function TemplateTabs() {

    return (
        <div className='h-full  w-[50%] border-r border-slate-400  overflow-y-auto'>
            <Tab.Group
                manual
                onChange={(index) => {
                    console.log("Changed selected tab to:", index)
                }}
            >
                <Tab.List className={'flex space-x-1'}>
                    {categories.map((category, i) => (
                        <Tab as={Fragment} key={i}>
                            {({ selected }) => (
                                /* Use the `selected` state to conditionally style the selected tab. */
                                <button
                                    className={
                                        `px-1 rounded-md ${selected ? 'bg-blue-500 text-white' : 'bg-transparent text-black'}`
                                    }
                                >
                                    {category.toLowerCase()}
                                </button>
                            )}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels>
                    {categories.map((category, i) => (
                        <Tab.Panel key={i} className={'h-full overflow-auto '}>
                            <TemplateRadioGroup category={category} />
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </div>
    )
}

export default TemplateTabs