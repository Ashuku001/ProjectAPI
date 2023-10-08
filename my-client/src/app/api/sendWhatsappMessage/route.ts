import { NextResponse } from "next/server";


export async function POST(request: Request) {
    try {
        const { data } = await request.json()
        const response = await fetch(`https://graph.facebook.com/${process.env.API_VERSION}/${process.env.PHONE_NUMBER_ID}/messages`, {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: data
        })

        const result = await response.json()

        console.log("RESULT", result)

        return NextResponse.json(result)

    } catch (error) {
        console.log("Failed to send message")
        console.log("ERROR.>>>>>>>>>>>>..", error)
    }




}
