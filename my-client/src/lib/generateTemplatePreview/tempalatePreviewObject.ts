import { PrevContent, PreviewObj, RemoteTemplateObj } from "../../../types"

interface InputElement {
  type: string;
  placeholder?: string;
}

export const templatePreviewObj = (template: RemoteTemplateObj) => {

  let previewUI: PreviewObj = {}
  console.log("template name>>>>>>>>>>>>>>>>>>>>>>", template.name)

  const components = template.components
  components.forEach((component) => {
    if (component.type === "HEADER") {
      console.log("Header component>>>>>>>>>>>>>>>", component)
      let content: PrevContent = {}
      if (component.example) {
        let inputs: InputElement[] = []
        inputs.push({ type: component.format === 'TEXT' ? 'text' : 'file', placeholder: `${component.example.header_text}`})
        const { example, ...rest1 } = component
        const { type, ...rest2 } = rest1
        const { format, ...rest3 } = rest2
        content.dynamic = { inputs:inputs, type: component.format === 'TEXT' ? 'text' : 'file', format: component.format, content: rest3 }
      } else {
        const { type, ...rest } = component
        content.static = { type: component.format === 'TEXT' ? 'paragraph' : 'notParagraph', content: rest }
      }
      previewUI.HEADER = content
    }

    if (component.type === "BODY") {
      console.log("Component body", component)
      let content: PrevContent = {}
      if (component.example) {
        let inputs: InputElement[] = []
        if (component.example.body_text[0].length !== 0) {
          for (let i = 0; i < component.example.body_text[0].length; i++) {
            inputs.push({ type: 'text', placeholder: `${component.example.body_text[0][i]}` })
          }
        }
        const { example, ...rest } = component
        content.dynamic = { inputs: inputs, content: rest }
      } else {
        const { type, ...rest } = component
        content.static = { type: component.text !== undefined ? 'paragraph' : 'notParagraph', content: rest }
      }
      previewUI.BODY = content
    }

    if (component.type === "FOOTER") {
      let content: PrevContent = {}
      content.static = { type: 'paragraph', content: component }
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