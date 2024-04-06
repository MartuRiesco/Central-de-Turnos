const mongoose = require('mongoose');
const { stringify } = require('uuid');

const appointmentSchema = new mongoose.Schema(
{
    userId: { 
        type: String, 
        required: true 
    },
    employeeId: { 
        type: String, 
        required: true 
    },
    employeeInfo: { 
        type: Object, 
        required: true 
    },
    userInfo: {
        type: Object,
        required: true 
    },
    date: {
        type: String,
        required: true 
    },
    time: {
        type: String,
        required:true
    },
    status: {
        type: String,
        default: "pending",
        required:true
    }
},
{
    timestamps: true
});

const appointmentModel = mongoose.model('appointments', appointmentSchema);

module.exports = appointmentModel;