const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const Employee = require("../models/employeeModel");
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');

router.get("/get-all-employees", authenticationMiddleware, async (req, res) => {
  try {
    const employees = await Employee.find({});
    res.status(200).send({
      message: "Empleados cargados correctamente",
      success: true,
      data: employees,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error buscando los empleados",
      success: false,
      error,
    });
  }
});

router.get("/get-all-users", authenticationMiddleware, async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({
      message: "Usuarios listados correctamente",
      success: true,
      data: users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error buscando los usuarios" ,
      success: false,
      error,
    });
  }
})

router.post("/change-employee-status", authenticationMiddleware, async (req, res) => {
    try {
        const {employeeId,  status} = req.body
      const employee = await Employee.findByIdAndUpdate(employeeId,{ status});
      const user = await User.findOne({_id: employee.userId})
      const unseenNotifications = user.unseenNotifications;
      unseenNotifications.push({
       type:'new-employee-request-changed',
       message: `tu cuenta de empleado cambio su estado a ${status}`,
       onClickPath:"/notifications",
      })
      user.isEmployee = status === "approved" ? true : false;
      await user.save()
      res.status(200).send({
        message:"Cambio de estado correctamente ",
        success: true,
        data:employee
      })
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Error actualizando los empleados" ,
        success: false,
        error,
      });
    }
  })
module.exports = router;