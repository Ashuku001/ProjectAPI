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
