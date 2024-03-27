import express from "express";
import path from 'path';
import config from "./config.js";
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken';
import passport from 'passport';

export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../public')));
export const createHash = (password) => {
    console.log('Password in createHash:', password);
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  };
  export const isPasswordValid =  (password, user) => {
    try {
      console.log('Input Password:', password);
      console.log('Stored Password:', user.password);
      return  bcrypt.compareSync(password, user.password);
    } catch (error) {
      console.error('Error comparing passwords:', error);
      return false;
    }
  };
  export const JWT_SECRET =  config.jwtSecret
  
  export const tokenGenerator = (user, cartId) => {
    const {
      _id: id,
      first_name,
      last_name,
      email,
      role,
    } = user;
    const payload = {
      id,
      first_name,
      last_name,
      email,
      role: user.role,
      cartId
    };
    const token = JWT.sign(payload, JWT_SECRET, { expiresIn: '1d' });
   return token
   } 
  
  
  export const verifyToken = (token) => {
    return new Promise((resolve, reject) => {
      JWT.verify(token, JWT_SECRET, (error, payload) => {
        if (error) { 
          return reject(error)
        }
        resolve(payload);
      });
    });
  }

  export const authMiddleware = (req, res, next) => {
      try {
        const token = req.header['authorization'].split(" ")[1];
        JWT.verify(token, JWT_SECRET, (error, decoded) => {
          if(err) {
            return res.status(401).send({
              message: "Auth failed",
              succes: false
            });
          } else {
            req.body.userId = decoded.id;
            next();
          }
        })
      } catch (error) {
          return res.status(401).send({
            message: "Auth failed",
            succes: false
          });
      }
  }
  export const authenticationMiddleware = (strategy) => (req, res, next) => {
    passport.authenticate(strategy, function(error, payload, info) {
      if (error) {
        return next(error);
      }
      if (!payload) {
        return res.status(401).json({ message: info.message ? info.message : info.toString() });
      }
      req.user = payload;
      next();
    })(req, res, next);
  };
  export const authorizationMiddleware = (requiredRoles) => (req, res, next) => {
    req.logger.info('user rol', req.user);
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const userRole = req.user.role
    const userEmail = req.user.email
    if (!requiredRoles.includes(userRole)) {
      return res.status(403).json({ message: 'No permissions' });
    }
    
    next();
  };

  export class Exception extends Error{
    constructor(message, status){
      super(message);
      this.statusCode =status
    }
  }


export {app}