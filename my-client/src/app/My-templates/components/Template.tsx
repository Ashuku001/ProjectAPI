import { RemoteTemplateObj } from '../../../../types'
import { templatePreviewObj } from '@/lib/generateTemplatePreview/tempalatePreviewObject'
// import { templatePreviewUI } from '@/lib/generateTemplatePreview/templatePreviewUI'
import parser from 'html-react-parser'
import { useRef } from 'react'
import DynamicHeader from './DynamicHeader'
import TextDynamicHeader from './TextDynamicHeader'
import DynamicBody from './DynamicBody'

type Props = {
  template: RemoteTemplateObj
}

function Template({ template }: Props) {
  const imagePickerRef = useRef<HTMLInputElement>(null)

  const content = templatePreviewObj(template)
  const header = content?.HEADER
  const body = content?.BODY
  const footer = content?.FOOTER
  const buttons = content?.BUTTONS

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
    </div>
  )
}

export default Template