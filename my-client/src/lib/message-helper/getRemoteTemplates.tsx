import { NextResponse } from "next/server"
export async function listTemplates(){
    console.log("########")
    const res = await fetch(`${process.env.URL}/api/get-remote-templates`, {
        method: 'get',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    const data = await res.json()

    return data.data.data

}