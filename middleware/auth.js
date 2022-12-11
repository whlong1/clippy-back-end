import jwt from 'express-jwt'
import jwks from 'jwks-rsa'

// modify middleware to find user?
// create user instance on signup

const checkJwt = jwt.expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-56chijhh78c0pcex.us.auth0.com/.well-known/jwks.json'
  }),
  audience: 'auth.ga-identity-app.com',
  issuer: 'https://dev-56chijhh78c0pcex.us.auth0.com/',
  algorithms: ['RS256']
})

export { checkJwt }