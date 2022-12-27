import jwt from 'express-jwt'
import jwks from 'jwks-rsa'

const checkJwt = jwt.expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://dev-56chijhh78c0pcex.us.auth0.com/.well-known/jwks.json'
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
})

const checkAdmin = (req, res, next) => {
  console.log(req.auth)
  next()
}

export { checkJwt, checkAdmin }