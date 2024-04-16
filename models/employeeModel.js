const mongoose = require('mongoose');
const { type } = require('os');
const { stringify } = require('uuid');

const employeeSchema = new mongoose.Schema(
{
    userId: {
        type: String,
        required: true
    },
    name: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String, 
        required: true 
    },
    specialization: { 
        type: String, 
        required: true 
    },
    timings: {
        type: Array,
        required: true
    },
    status:{
        type: String,
        default: 'pending'
    }
},
{
    timestamps: true
});

const employeeModel = mongoose.model('employees', employeeSchema);

module.exports = employeeModel;