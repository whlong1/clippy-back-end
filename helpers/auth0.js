import auth0 from "auth0"

const { ManagementClient } = auth0

const auth0MgmtApi = new ManagementClient({
  domain: 'dev-56chijhh78c0pcex.us.auth0.com',
  clientId: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  scope: 'read:users update:users'
})

export { auth0MgmtApi }