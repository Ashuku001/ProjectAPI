'use client'
import { listTemplates } from '@/lib/message-helper/getRemoteTemplates'
import { useQuery } from '@apollo/client'
import { GetSettingDocument } from '../../../__gql__/graphql'
import { useEffect, useState } from 'react'
import { RemoteTemplateObj, SettingType } from '../../../types'
import Template from './components/Template'

function MyTemplates(request: Request) {
  const { data, loading, error } = useQuery(GetSettingDocument)
  const [remoteTemplates, setTemplates] = useState<RemoteTemplateObj[]>()

  const setting = data?.setting


  const approvedTemplates = remoteTemplates?.filter((t) => t.status === 'APPROVED')
  const appMarketingTemplates = approvedTemplates?.filter((t) => t.category === 'MARKETING')
  const appUtilitiyTemplates = approvedTemplates?.filter((t) => t.category === 'UTILITY')
  const appAuthenticationTemplates = approvedTemplates?.filter((t) => t.category === 'AUTHENTICATION')
  const inReviewTemplates = remoteTemplates?.filter((t) => t.status === 'REVIEW')
  const rejectedTemplates = remoteTemplates?.filter((t) => t.status === 'REJECTED')

  // console.log("REMOTE TEMPLATES", remoteTemplates)

  // if (remoteTemplates) {
  //   // console.log("components", remoteTemplates[16])
  //   console.log("#############marketing###################", remoteTemplates)
  //   remoteTemplates.forEach((template) => {
  //     templatePreviewUI((templatePreviewObj(template) as unknown) as PreviewObj)
  //   })
  // }

  useEffect(() => {
    const getTemplates = async () => {
      const result = await listTemplates(setting as SettingType)
      setTemplates(result)
      // console.log(result)
      return
    }
    getTemplates()
  }, [loading, setting])


  return (
    <>
      <div>
        <h1 className='text-2xl text-center'>Approved templates</h1>
        <hr className='w-[70%] my-3 bg-gray-300 dark:bg-gray-600' />
        <div className='flex space-x-10'>
          <div>
            <h1 className='text-[20px] font-bold'>Marketing templates</h1>
            <hr className='w-[20%] my-2' />
            <div>
              {appMarketingTemplates?.map((template) => (
                <div key={template.id}>
                  <div>{template.name.replace('_', ' ')}</div>
                  <div className=' border border-gray-100 rounded-md max-w-[250px] md:max-w-[350px] h-auto p-2'>
                    <Template template={template} />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h1 className='text-[20px] font-bold'>Utility</h1>
            <hr className='w-[20%] my-2' />
            <div>
              {appUtilitiyTemplates?.map((template, i) => (
                <div key={template.id}>
                  <div>{template.name.replace('_', ' ')}</div>
                  <div className=' border border-gray-100 rounded-md max-w-[250px] md:max-w-[350px]  h-auto p-2'>
                    <Template template={template} />
                  </div>
                </div>

              ))}
            </div>
          </div>
        </div>
      </div>

      <div>
        <h1 className='text-2xl'>Rejected templates</h1>
        <div className='text-red-300'>
          {rejectedTemplates?.map((t, i) => (
            <div key={t.id}>{t.name.replace('_', ' ')}</div>
          ))}
        </div>
      </div>
    </>
  )
}

export default MyTemplates