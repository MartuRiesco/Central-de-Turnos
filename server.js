const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
app.use(express.json());
const userRoute = require('./routes/userRoute')
const adminRoute = require('./routes/adminRoute')
const employeeRoute = require('./routes/employeeRoute')

app.use(express.static(path.join(__dirname, '../turnos/build')));

// Ruta principal para servir el frontend
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../turnos/build/index.html'));
});
app.use('/api/user', userRoute);
app.use('/api/admin', adminRoute);
app.use('/api/employee', employeeRoute);

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running on port: ${port}`));