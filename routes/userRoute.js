const express = require('express');
const router = express.Router();
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
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

module.exports = router;

