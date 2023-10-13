import { NextResponse } from 'next/server'
import { NextApiResponse } from 'next'
// an api request to get the list of all templates in my business account
// export async function POST(req:){

// }
export async function POST(request: Request, res: Response) {
  // a request to get all the templates from that business account
  const { setting } = await request.json()
  let data
  if (setting) {
    console.log("In api route", setting)
    try {
      const res = await fetch(
        `https://graph.facebook.com/${setting.API_VERSION}/${setting.BUSINESS_ACCOUNT_ID}/message_templates`
        + '?limit=1000',
        {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${setting.ACCESS_TOKEN}`,
            'Content-Type': 'application/json'
          }
        }
      )

      data = await res.json()
      // console.log("THE TEMPLATES", data)
      // res.json()


    } catch (error) {
      console.log('FAILED TO OBTAIN REMOTE TEMPLATES')
      console.log(error)
    }
  }

  return await NextResponse.json({ data })

}
