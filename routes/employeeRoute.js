const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Employee = require("../models/employeeModel");
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');


router.post("/get-employee-info-by-userid", authenticationMiddleware, async (req, res) => {
    try {
        const employee = await Employee.findOne({userId: req.body.userId})
        res.status(200).send({
            success:true, 
            message: "Informacion del empleado ",
            data: employee
        })
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error buscando la informacion de los empleados" ,
        success: false,
        error,
      });
    }
  })


  router.post("/update-employee-profile", authenticationMiddleware, async (req, res) => {
    try {
        const employee = await Employee.findOneAndUpdate({userId: req.body.userId}, req.body)
        res.status(200).send({
            success:true, 
            message: "Informacion del empleado actualizada correctamente ",
            data: employee
        })
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error actualizando la informacion de los empleados" ,
        success: false,
        error,
      });
    }
  })
module.exports = router;