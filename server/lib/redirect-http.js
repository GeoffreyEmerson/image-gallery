/*

# This code causes heroku requests to redirect from http to https.

If express directly https, you could check req.secure, but on heroku
we are behind proxy and our server is never https.

On heroku, they will set the 'x-forwarded-proto' header to communicate
what incoming protocol was used.

*/

module.exports = function getRedirectHttp() {
  return function redirectHttp(req, res, next) {

    // if https, call next
    if(req.headers['x-forwarded-proto'] === 'https') next();

    // otherwise redirect to same url but with https instead of http
    else res.redirect(`https://${req.hostname}${req.url}`);

  };
};
