import { SettingType } from "../../../types"
export async function listTemplates(setting: SettingType){
    console.log("######## settings in listTemplates", setting)
    const res = await fetch(`http://localhost:3000/api/get-remote-templates`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({setting})
    })
    console.log("response in listTemplates()",res)

    let {data} = await res.json()
    console.log("The data now",data)

    if(data){
        return data.data
    } 
}