import jwt from 'express-jwt'
import jwks from 'jwks-rsa'

const checkJwt = jwt.expressjwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`
  }),
  audience: process.env.AUTH0_AUDIENCE,
  issuer: `https://${process.env.AUTH0_DOMAIN}/`,
  algorithms: ['RS256']
})

const checkAdmin = (req, res, next) => {
  // Roles can be viewed on req.auth['sei/roles']
  // Full permissions can be viewed on req.auth.permissions
  if (req.auth.isAdmin) {
    next()
  } else {
    return res.status(401).json({ err: 'Not Authorized' })
  }
}


export { checkJwt, checkAdmin }