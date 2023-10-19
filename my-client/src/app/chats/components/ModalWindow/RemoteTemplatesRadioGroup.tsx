import { useState, useEffect } from 'react'
import { RadioGroup } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { useQuery } from '@apollo/client'
import { GetSettingDocument } from '../../../../../__gql__/graphql'
import { listTemplates } from '@/lib/message-helper/getRemoteTemplates'
import { SettingType } from '../../../../../types'
import LoadingComponent from '@/app/components/LoadingComponent'


type Props = {
    category: string
}

function TemplateRadioGroup({ category }: Props) {
    const { data, loading, error } = useQuery(GetSettingDocument)
    const [remoteTemplates, setTemplates] = useState()

    // make this type generic
    let [template, setTemplate] = useState()
    console.log("Selected template",template)


    const setting = data?.setting

    let allTemplates = {}


    // console.log("Settings on the client at remote template radion groupt", setting)
    //@ts-ignore
    allTemplates["MARKETING"] = remoteTemplates?.filter((t) => t.category === 'MARKETING')
    //@ts-ignore
    allTemplates["UTILITY"] = remoteTemplates?.filter((t) => t.category === 'UTILITY')
    //@ts-ignore
    allTemplates["AUTHENTICATION"] = remoteTemplates?.filter((t) => t.category === 'AUTHENTICATION')
    // console.log(allTemplates)
    //@ts-ignore
    const templates: string[] = allTemplates[`${category}`]
    // console.log("Category templates", templates)


    useEffect(() => {
        const getTemplates = async () => {
            const result = await listTemplates(setting as SettingType)
            setTemplates(result)
            console.log(result)
            return
        }
        getTemplates()
    }, [loading])

    return (
        <>
            {loading
                ? <LoadingComponent />
                : <RadioGroup value={template} onChange={(e) => setTemplate(e)} className='sticky flex flex-col items-start h-full pr-1  py-1 overflow-y-auto'>
                    {templates?.length === 0
                        ? <div>No templates provide a route to create templates</div>
                        : templates?.map((template, i) =>
                            <RadioGroup.Option
                                key={i}
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
                                                    {/* @ts-ignore */}
                                                    <span>{template?.name?.replace('_', ' ')}</span>
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
            }
        </>
    )
}

export default TemplateRadioGroup