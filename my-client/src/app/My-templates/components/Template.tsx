import { RemoteTemplateObj, StaticButton, StaticContent } from '../../../../types'
import { templatePreviewObj } from '@/lib/generateTemplatePreview/tempalatePreviewObject'
// import { templatePreviewUI } from '@/lib/generateTemplatePreview/templatePreviewUI'
import parser from 'html-react-parser'
import { useRef } from 'react'
import DynamicHeader from './DynamicHeader'
import TextDynamicHeader from './TextDynamicHeader'
import DynamicBody from './DynamicBody'
import { PhoneIcon } from '@heroicons/react/24/outline'
import HTMLReactParser from 'html-react-parser'

type Props = {
  template: RemoteTemplateObj
}

interface IconsType {
  [key: string]: any
}

function Template({ template }: Props) {
  const imagePickerRef = useRef<HTMLInputElement>(null)
  const icons: IconsType  = { PHONE_NUMBER: <PhoneIcon className='h-4 w-4' />, URL: "URL icon", QUICK_REPLY: "" }

  const content = templatePreviewObj(template)
  const header = content?.HEADER
  const body = content?.BODY
  const footer = content?.FOOTER
  const buttons = content?.BUTTONS

  console.log("%%%%%%%%%%%%%%%%%%%%5",buttons)
  return (
    <div>
      {header !== undefined &&
        <>
          {header?.static !== undefined &&
            <>
              {header?.static?.type === 'paragraph' &&
                <>
                  {header?.static?.content?.format === 'TEXT' &&
                    <h1 className='text-[18px] font-bold'>{header?.static?.content?.text}</h1>
                  }
                </>
              }
            </>
          }
          {header?.dynamic !== undefined &&
            <>
              {header?.dynamic?.type === 'file' &&
                <>
                  <DynamicHeader format={header?.dynamic?.format as string} />
                </>
              }
              {header?.dynamic?.type === 'text' &&
                <>
                  <TextDynamicHeader dynamic={header?.dynamic} />
                </>
              }
            </>
          }
        </>
      }
      {body !== undefined &&
        <>
          {body?.static !== undefined &&
            <>
              {body?.static?.type === 'paragraph' &&
                <p>{body?.static?.content?.text}</p>
              }
            </>
          }
          {body?.dynamic !== undefined &&
            <>
              {body?.dynamic?.content !== undefined &&
                <DynamicBody dynamic={body?.dynamic} />
              }
            </>
          }
        </>
      }
      {footer !== undefined &&
        <>
          <p className='text-slate-500'>{footer?.static?.content?.text}</p>
        </>
      }
      {buttons !== undefined &&

        <div>
          <div className='border-b-[1px] border-gray-500'></div>
          {buttons?.buttons !== undefined &&
            <>
              {buttons?.buttons &&
                <p>{buttons?.buttons?.map((btn : StaticButton, i: number) => (
                  <button key={i} className='w-full py-2 my-0 border-b-[1px] border-gray-500 flex items-center justify-center space-x-4'> <span>{icons[btn.type]}</span>{btn.text}</button>
                ))}</p>
              }
            </>
          }
        </div>
      }
    </div>
  )
}

export default Template