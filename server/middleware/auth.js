// // const { expressjwt: jwt } = require("express-jwt");
// // const jwksRsa = require("jwks-rsa");

// // const requireAuth = jwt({
// //   secret: jwksRsa.expressJwtSecret({
// //     cache: true,
// //     rateLimit: true,
// //     jwksRequestsPerMinute: 5,
//       jwksUri: `https://dev-ck4nx3l57ptykeyg.us.auth0.com/.well-known/jwks.json`,

// //   }),
// //   audience: "http://collect-and-swap/api",
// //   issuer: `https://dev-ck4nx3l57ptykeyg.us.auth0.com/`,
// //   algorithms: ["RS256"],
// // });

const requireAuth = (req, res, next) => next();

module.exports = { requireAuth };
