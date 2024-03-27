import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT,
    mongodbUri: process.env.MONGODB,
    jwtSecret: process.env.JWT_SECRET,
    adminName:process.env.ADMIN_NAME,
    adminLastname: process.env.ADMIN_LASTNAME,
    adminEmail:process.env.ADMIN_EMAIL,
    adminPassword:process.env.ADMIN_PASSWORD,
    adminRole:process.env.ADMIN_ROLE,
    cookeSecret: process.env.COOKIE_SECRET
  }