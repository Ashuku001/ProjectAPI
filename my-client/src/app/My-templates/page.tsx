import { listTemplates } from '@/lib/message-helper/getRemoteTemplates'
import { Template } from '../../../types'
import Image from 'next/image'
import { getTemplatedMessageInput2 } from '@/lib/message-helper/message-helper'
import { sendMessage } from '@/lib/message-helper/sendMessage'

async function MyTemplates(request: Request) {
  const remoteTemplates: Template[] = await listTemplates()

  const approvedTemplates = remoteTemplates.filter((t) => t.status === 'APPROVED')
  const appMarketingTemplates = approvedTemplates.filter((t) => t.category === 'MARKETING')
  const appUtilitiyTemplates = approvedTemplates.filter((t) => t.category === 'UTILITY')
  const appAuthenticationTemplates = approvedTemplates.filter((t) => t.category === 'MARKETING')
  const inReviewTemplates = remoteTemplates.filter((t) => t.status === 'APPROVED')
  const rejectedTemplates = remoteTemplates.filter((t) => t.status === 'REJECTED')

  console.log("REMOTE TEMPLATES", remoteTemplates)

  console.log("components", remoteTemplates[16])


  return (
    <>
      <div>
        <button className='bg-white p-2' onClick={e => handleClick()}>Click me to send a message</button>
        <h1 className='text-2xl text-center'>Approved templates</h1>
        <hr className='w-[70%] my-3 bg-gray-300 dark:bg-gray-600' />
        <div className='flex space-x-10'>
          <div>
            <h1 className='text-[20px] font-bold'>Marketing templates</h1>
            <hr className='w-[20%] my-2' />
            <div>
              {appMarketingTemplates.map((t, i) => (
                <div key={t.id}>
                  <div>{t.name.replace('_', ' ')}</div>
                  <div className=' border border-gray-100 rounded-md max-w-[250px] h-auto p-2'>
                    {/* @ts-ignore */}
                    {t.components.map((c, i) => (
                      <div key={i}>
                        {/* @ts-ignore */}
                        {c.type === 'HEADER' && c.format === "IMAGE" && <Image className='w-full' src='/sample.jpg' alt={"Image"} width={200} height={100}/>}
                        {/* @ts-ignore */}
                        {c.type === 'HEADER' && c.format === "DOCUMENT" && <h1>DOCUMENT</h1>}
                        {/* @ts-ignore */}
                        {c.type === 'HEADER' && c.format === "TEXT" && <h1>TEXT</h1>}
                        {/* @ts-ignore */}
                        {c.type === 'BODY' && <div>{c.text}</div>}
                      </div>
                    )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h1 className='text-[20px] font-bold'>Utility</h1>
            <hr className='w-[20%] my-2' />
            <div>
              {appUtilitiyTemplates.map((t, i) => (
                <div key={t.id}>
                  <div>{t.name.replace('_', ' ')}</div>
                  <div className=' border border-gray-100 rounded-md max-w-[250px] h-auto p-2'>
                    {/* @ts-ignore */}
                    {t.components.map((c, i) => (
                      <div key={i}>
                        {/* @ts-ignore */}
                        {c.type === 'IMAGE' && <Image src='/public/sample.jpg' />}
                        {/* @ts-ignore */}
                        {c.type === 'BODY' && <div>{c.text}</div>}
                        {/* @ts-ignore */}
                        {c.type === 'BUTTONS' && <div className='font-extralight font-1xl text-gray-200'>{"buttons"}</div>}
                        {/* @ts-ignore */}
                        {c.type === 'FOOTER' && <div className='font-extralight font-1xl text-gray-200'>{c.text}</div>}
                      </div>
                    )
                    )}
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
          {rejectedTemplates.map((t, i) => (
            <div key={t.id}>{t.name.replace('_', ' ')}</div>
          ))}
        </div>
      </div>
    </>
  )
}

export default MyTemplates