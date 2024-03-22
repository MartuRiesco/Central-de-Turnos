import { Router } from 'express';
import UserModel from '../../models/user.model.js';
import { createHash, isPasswordValid, tokenGenerator } from "../../utils.js";
import CartDAO from '../../Dao/Cart.dao.js';
import AuthController from '../../controller/auth.controller.js';



const router = Router();

router.post('/auth/register', async (req, res) => {

  const {
    body: { name, email, password, role },
  } = req;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required', success:false });
  }
  let user = await UserModel.findOne({ email });
  if (user) {
    return res.status(200).json({ message: 'Already registered user', success:false });
  }
  user = await UserModel.create({
    name,
    email,
    password: createHash(password),
    role
  });
  const cartDao = new CartDAO();
  await cartDao.createCart({ user: user._id });
  res.status(201).json({ message: 'Usuario creado con éxito', success:true });
});

router.post('/auth/login', async (req, res) => {
try {
 const token = await AuthController.login(req.body)
 console.log('token', token);
  res
  .cookie('access_token', token, { maxAge: 1000*60*30, httpOnly: true, signed: true })
  .status(200)
  .json({message:'ingreso exitoso', success: true})
} catch (error) {
  res.status(400).json({message: error.message})
  
}})

 
router.post('/auth/recovery-password', async (req, res) => {
try {
  console.log('user', req.body);
  const user = await AuthController.recovery(req.body)
  console.log('userUP', user);
  res
  .status(200)
  .json({message:'contraseña actualizada con exito'})
} catch (error) {
  res.status(400).json({message: error.message})
  
}
});
router.post('/auth/restore-password', async (req, res) => {
  try {
    const user = await AuthController.restorePassword(req.body)
    res
    .status(200)
    .json({message:'contraseña actualizada con exito'});
  } catch (error) {
    res.status(400).json({message: error.message})
    
  }
  
})


export default router;