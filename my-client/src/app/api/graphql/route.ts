import { NextResponse } from "next/server"

export async function POST(req: Request) {
    const graphql_query= await req.json()

    console.log("###########",graphql_query)
    const data = await fetch("http://localhost:4000/graphql", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            query: graphql_query
        })
    })

    console.log(await data.json())

    return data

}