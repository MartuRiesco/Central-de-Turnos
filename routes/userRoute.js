const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const Employee = require('../models/employeeModel')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticationMiddleware = require('../middlewares/authenticationMiddleware');

router.post('/register', async(req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if(userExists) {
          return res
            .status(200)
            .send({ message: 'Usuario ya registrado.', success: false })
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newuser = new User(req.body);
        await newuser.save();
        res
            .status(200)
            .send({ message: 'Usuario creado exitosamente!', success: true })
    } catch (error) {
        res
            .status(500)
            .send({ message: 'Error creando al usuario.', success: false, error })
    }
});

router.post('/login', async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if(!user) {
            return res
                .status(200)
                .send({ message: 'No existe el usuario', success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if(!isMatch) {
            return res
                .status(200)
                .send({ message: 'Password is incorrect', success: false });
        } else {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '1d'
            });
            res
                .status(200)
                .send({ message: 'Login successful', success: true, data: token })
        }
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ message: 'Error logging in', success: false, error})
    }
});

router.post('/get-user-info-by-id', authenticationMiddleware, async(req, res) => {
    try {

        const user = await User.findOne({ _id: req.body.userId });
        console.log(req.body.userId);
        if(!user) {
            return res
                .status(200)
                .send({ message: 'No existe el usuario', success: true, data: user })
        } else {
            res
                .status(200)
                .send({ success: true, data: {
                    name: user.name,
                    email: user.email
                }})
        }
    } catch (error) {
        res
         .status(500)
         .send({ message: 'Error obteniendo información', success: false, error })
    }
})
router.post('/apply-employee-account',authenticationMiddleware, async(req, res) => {
    try {
       const newEmployee =  new Employee({...req.body, status: 'pending'});
       await newEmployee.save()
       const adminUser = await User.findOne({isAdmin: true})
       
       const unseenNotifications = adminUser.unseenNotifications;
       unseenNotifications.push({
        type:'new-employee-request',
        message: `${newEmployee.name} solicitó permiso para la cuenta de empleado`,
        data:{
            employeeId: newEmployee._id,
            name: newEmployee.name
        }, 
        onClickPath: '/admin/employeeslist'
       })
       await User.findByIdAndUpdate(adminUser._id, {unseenNotifications})
       res.status(200).send({ success:true, message: 'Cuenta de empledo solicitada correctamente'})
    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ message: 'Error solicitando la cuenta de empleado.', success: false, error })
    }
});
router.post('/mark-all-notifications-as-seen',authenticationMiddleware, async(req, res) => {
    try {
        const user = await User.findOne( {_id: req.body.userId})
        const unseenNotifications = user.unseenNotifications;
        const seenNotifications = user.seenNotifications;
        seenNotifications.push(...unseenNotifications);
        user.unseenNotifications = [];
        user.seenNotifications= seenNotifications
        const updateUser = await User.findByIdAndUpdate(user._id, user);
        updateUser.password = undefined;
        res.status(200).send({
            success: true, 
            message: "Todas las notificaciones leidas",
            data: updateUser,
        })

    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ message: 'Error solicitando la cuenta de empleado.', success: false, error })
    }
});
router.post('/delete-all-notifications',authenticationMiddleware, async(req, res) => {
    try {
        const user = await User.findOne( {_id: req.body.userId})
        user.seenNotifications = []
        user.unseenNotifications = [];
        const updateUser = await user.save();
        updateUser.password = undefined;
        res.status(200).send({
            success: true, 
            message: "Todas las notificaciones leidas",
            data: updateUser,
        })

    } catch (error) {
        console.log(error);
        res
            .status(500)
            .send({ message: 'Error solicitando la cuenta de empleado.', success: false, error })
    }
});



module.exports = router;

