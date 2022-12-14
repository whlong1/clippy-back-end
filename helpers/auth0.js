import axios from 'axios'

async function getAccessToken() {
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    data: {
      grant_type: "client_credentials",
      client_id: process.env.CLIENT_ID,
      audience: `https://${process.env.AUTH0_DOMAIN}/api/v2/`,
      client_secret: process.env.CLIENT_SECRET,
    }
  }
  const response = await axios(options)
  return response.data.access_token
}

export { getAccessToken }