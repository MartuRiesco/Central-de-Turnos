import { Router } from 'express';
import userModel from '../../models/user.model.js';
import bcrypt from 'bcryptjs';

const router = Router();
router.post('/register', async (req, res) => {
    try {
        const userExists = await userModel.findOne({ email: req.body.email });
        console.log('userExists', userExists);
        if(userExists) {
          return res.status(200).send({ message: 'Usuario ya registrado.', success: false })
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;
        const newuser = new User(req.body);
        await newuser.save();
        res.status(200).send({ message: 'Usuario creado exitosamente!', success: true })
    } catch (error) {
        res.status(500).send({ message: 'Error creando al usuario.', success: false, error })
    }
});

router.post('/login', async (req, res) => {
  try {

  } catch (error) {
    
  }
});


export default router;
