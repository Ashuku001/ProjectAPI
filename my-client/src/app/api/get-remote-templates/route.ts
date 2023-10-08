import { NextResponse } from 'next/server'

// an api request to get the list of all templates in my business account
export async function GET(request: Request) {
  // a request to get all the templates from that business account
  try {
    const res = await fetch(
      `https://graph.facebook.com/${process.env.API_VERSION}/${process.env.BUSINESS_ACCOUNT_ID}/message_templates`
      + '?limit=1000',
      {
        method: 'get',
        headers: {
          'Authorization': `Bearer ${process.env.ACCESS_TOKEN}`,
          'Content-Type': 'application/json'
        }
      }
    )
    
    const data = await res.json()
    console.log("THE TEMPLATES", data)

    return NextResponse.json({data})

    } catch (error) {
      console.log('FAILED TO OBTAIN REMOTE TEMPLATES')
      console.log(error)
  }


}
