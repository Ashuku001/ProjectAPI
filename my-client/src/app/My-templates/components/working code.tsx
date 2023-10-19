import { PrevContent, PreviewObj, RemoteTemplateObj } from "../../../types"

export const templatePreviewObj = (template: RemoteTemplateObj) => {

    let previewUI: PreviewObj = {}
    console.log("template name>>>>>>>>>>>>>>>>>>>>>>", template.name)
  
    const components = template.components
    // console.log(`template ${template.name} its component type >>>>>>>>>>>>>`)
    components.forEach((component) => {
      if (component.type === "HEADER") {
        console.log("Header component>>>>>>>>>>>>>>>", component)
        let content: PrevContent = {}
        switch (component.format) {
          case "IMAGE":
            content.dynamic = { type: "file", format: "IMAGE", inputs: [`<input className='flex flex-col space-y-2 w-full' type="file"  image hidden />`,] }
            break;
          case "DOCUMENT":
            content.dynamic = { type: "file", format: "DOCUMENT", inputs: [`<input className='flex flex-col space-y-2 w-full' type="file"  hidden />`] }
            break;
          case "VIDEO":
            content.dynamic = { type: "file", format: "VIDEO", inputs: [`<input className='flex flex-col space-y-2 w-full' type="file"  hidden />`] }
            break;
          case "LOCATION":
            content.dynamic = { type: "file", format: "LOCATION", inputs: [`<input className='flex flex-col space-y-2 w-full' type="file"  hidden />`] }
            break;
          case "TEXT":
            if (component.example) {
              let inputs: string[] = []
              console.log("Header examples", component.example.header_text)
              for (let i = 0; i < component.example.header_text.length; i++) {
                inputs.push(`<input type: "text" placeholder: ${component.example.header_text[0][i]} />`)
              }
              content.dynamic = { type: 'text', inputs: inputs }
              content.static = { type: "text", paragraph: `<p>${component.text}</p>` }
            }
            break;
          default:
            console.log("no header")
        }
        previewUI.HEADER = content
      }
  
      if (component.type === "BODY") {
        let content: PrevContent = {}
        if (component.example) {
          let inputs: string[] = []
          console.log("Body examples", component.example.body_text)
          for (let i = 0; i < component.example.body_text[0].length; i++) {
            inputs.push(`<input type:"text" className="bg-slate-200 dark:bg-gray-700 rounded-lg px-4 py-2 outline-none w-full flex-1 pr-8 cursor-auto mb-2" placeholder:"${component.example.body_text[0][i]}" />`)
          }
          content.dynamic = { type: 'text', inputs: inputs }
          content.static = { type: "text", paragraph: `<p>${component.text}</p>` }
        }
        previewUI.BODY = content
      }
  
      if (component.type === "FOOTER") {
        let content: PrevContent = {}
        content.static = component.text
        previewUI.FOOTER = content
      }
  
      if (component.type === "BUTTONS") {
        let content: PrevContent = {}
        content.static = component.buttons
        previewUI.BUTTONS = content
      }
    })

    console.log("THE PREVIEW UI>>>>>>>>>>>>", previewUI)
    return previewUI
  }



  import { PreviewObj } from "../../../types"

const concateInputs = (inputs: string[]) => {
    let results = ''
    inputs.forEach((input) => {
        results += input
    })
    return results
}

export const templatePreviewUI = (previewObj: PreviewObj) => {
    let content = "<div className={'flex flex-col space-y-2'}>"
    if (previewObj.HEADER) {
        if (previewObj.HEADER.dynamic) {
            const type = previewObj.HEADER.dynamic.type
            if (type === 'text') {
                content.concat(`<input type='text'/>`)
            }
            if (type === 'file') {
                const format = previewObj.HEADER.dynamic.format
                let inputs = ''

                switch (format) {
                    case "IMAGE":
                        inputs = concateInputs(previewObj?.HEADER?.dynamic?.inputs)
                        content += inputs
                        break;
                    case "DOCUMENT":
                        inputs = concateInputs(previewObj?.HEADER?.dynamic?.inputs)
                        content += inputs
                        break;
                    case "VIDEO":
                        inputs = concateInputs(previewObj?.HEADER?.dynamic?.inputs)
                        content += inputs
                        break;
                    case "LOCATION":
                        inputs = concateInputs(previewObj?.HEADER?.dynamic?.inputs)
                        content += inputs
                        break;
                    case "TEXT":
                        inputs = concateInputs(previewObj?.HEADER?.dynamic?.inputs)
                        content += inputs
                        break;
                    default:
                        console.log("no header")
                }
            }
        }
        // if (previewObj.HEADER.static) {
        //   content += previewObj.HEADER.static.paragraph
        // }
    }

    if (previewObj.BODY) {
        if (previewObj.BODY.dynamic) {
            const type = previewObj.BODY.dynamic.type
            if (type === "text") {
                const inputs = concateInputs(previewObj?.BODY?.dynamic?.inputs)
                content += inputs
            }
        }
    }
    content += '</div>'
    console.log("The content for the UI", content)
    return content
}


import { RemoteTemplateObj } from '../../../../types'
import { templatePreviewObj } from '@/lib/generateTemplatePreview/tempalatePreviewObject'
import { templatePreviewUI } from '@/lib/generateTemplatePreview/templatePreviewUI'
import parser from 'html-react-parser'
import { useRef } from 'react'

type Props = {
    template: RemoteTemplateObj
}

function Template({ template }: Props) {
    const imagePickerRef = useRef<HTMLInputElement>(null)
    
    const content =  templatePreviewUI(templatePreviewObj(template))

    return (
        parser(content)
    )
}

export default Template