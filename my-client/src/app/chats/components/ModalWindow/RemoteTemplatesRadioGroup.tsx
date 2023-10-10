import { useState } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'

const allTemplates = {
    Marketing: ['template 1', 'template 2', 'template 3',
        'template 4', 'template 5', 'template 6', 'template 7', 'template 8',
        'template 9', 'template 10', 'template 11', 'template 12', 'template 13', 'template 14',
        'template 15', 'template 16', 'template 17', 'template 18'],
    Utility: ['template 7', 'template 8',
        'template 9', 'template 10', 'template 11', 'template 12', 'template 13', 'template 14',
        'template 15', 'template 16', 'template 17', 'template 18'],
    Authentication: ['template 18', 'template 8',
        'template 9', 'template 10', 'template 11', 'template 12', 'template 13', 'template 14',
        'template 15', 'template 16', 'template 17'],
    Service: [
        'template 11', 'template 12', 'template 13', 'template 14',
        'template 15', 'template 16', 'template 17'
    ]
}

type Props = {
    type: string
}

function TemplateRadioGroup({ type }: Props) {
    //@ts-ignore
    const templates: string[] = allTemplates[`${type}`]
    let [template, setTemplate] = useState('')

    return (
        <RadioGroup value={template} onChange={e => setTemplate(e)} className='sticky flex flex-col items-start h-full pr-1  py-1 overflow-y-auto'>
            {templates.map((template) =>
                <RadioGroup.Option
                    value={template}
                    className={({ active, checked }) =>
                        `${active ? "ring-1 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-200" : ""}
                                     ${checked ? `${'bg-blue-200'} "bg-opacity-75 text-white"` : "bg-slate-300"}
                                    relative flex cursor-pointer rounded-lg px-1 shadow-md focus:outline-none w-full  py-2 my-1`
                    }
                >
                    {({ checked }) => (
                        <div className="flex w-full items-center justify-between">
                            <div className="flex items-center">
                                <div className="text-sm">
                                    <RadioGroup.Label
                                        as='p'
                                        className={`font-medium ${checked ? "text-white" : "text-gray-500"}`}
                                    >
                                        <span>{template}</span>
                                    </RadioGroup.Label>
                                </div>
                            </div>
                            {checked && (
                                <div className="shrink-0 text-white">
                                    <CheckCircleIcon className="h-6 w-6" />
                                </div>
                            )}
                        </div>
                    )}
                </RadioGroup.Option>
            )}
        </RadioGroup>
    )
}

export default TemplateRadioGroup