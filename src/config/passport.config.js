import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
  import { JWT_SECRET } from '../utils.js';


const opts = {
    jwtFromRequest: ExtractJwt.fromExtractors([coookieExtractor]),
  secretOrKey: JWT_SECRET,
};
function coookieExtractor(req) {
  let token = null;
  /* let cartId = null; */
  if (req && req.signedCookies) {
    token = req.signedCookies['access_token'];
    /* cartId = req.signedCookies['cart_id']; */
  }
  console.log('token..', token);
  return token ;
}
export const init = () => {
  passport.use('jwt', new JwtStrategy(opts, (payload, done) => {
    return done(null, payload);
  }));
};