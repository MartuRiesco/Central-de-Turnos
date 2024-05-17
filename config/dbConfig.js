const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://centraldeturnos77:V0vCZNexFmf0xwrd@cluster0.sc16ej2.mongodb.net/turnos'

);

const connection = mongoose.connection;


connection.on('connected', () => { 
    console.log('Database connected');
});

connection.on('error', (error) => {
    console.log('Error in MongoDb connection', error);
});

module.exports = mongoose;


