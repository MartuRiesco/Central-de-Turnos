const express = require('express');
const app = express();
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
app.use(express.json());
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const employeeRoute = require('./routes/employeeRoute')


app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/employee', employeeRoute);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port: ${port}`));