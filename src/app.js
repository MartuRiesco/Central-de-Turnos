import path from 'path';
import indexRouter from './routes/api/index.router.js'
import userRouter from './routes/api/user.router.js'
import authRouter from './routes/api/auth.router.js'
import passport from 'passport';
import cookieParser from 'cookie-parser';
import { __dirname, app } from './utils.js';
import{ init as initPassportConfig }from './config/passport.config.js'
import config from './config.js';
import expressCompression from 'express-compression'

 app.use(expressCompression())
 app.use((error, req, res, next) => {
  const message = `😨 Ah ocurrido un error desconocido: ${error.message}`;
  res.status(500).json({ status: 'error', message });
});
const COOKIE_SECRET = config.cookeSecret;

app.use(cookieParser(COOKIE_SECRET));
initPassportConfig()
app.use(passport.initialize()); 

app.use('/', userRouter, authRouter )



export default app