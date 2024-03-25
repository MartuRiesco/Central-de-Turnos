/* import { Router } from 'express';
import UserModel from '../../models/user.model.js';
import { createHash, isPasswordValid, tokenGenerator, authenticationMiddleware } from "../../utils.js";
import CartDAO from '../../Dao/Cart.dao.js';
import AuthController from '../../controller/auth.controller.js';

const router = Router();

router.post('/auth/register', async (req, res) => {
  const {
    body: { name, email, password, role },
  } = req;
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Todos los campos son necesarios', success:false });
  }
  let user = await UserModel.findOne({ email });
  if (user) {
    return res.status(200).json({ message: 'Correo ya registrado', success:false });
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
  .json( {message:'Ingreso exitoso', success: true} );
} catch (error) {
  res.status(400).json({message: error.message});
}});

router.post('/user',
authenticationMiddleware('jwt'), async (req, res) => {
    try {
      const { uid } = req.user;
      const user = await UserModel.findOne({ _id: uid });
      console.log('user', user);
      const datas = buildResponse(user)
    res.send({ user: datas });
  } catch (error) {
    res.status(500).send({ message: 'Error al obtener usuarios' });
  }
  });

  const buildResponse = (data) => {
    const usersData = data.map(user => ({
      id: user.id,
      name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    }));
    return usersData;
  };  

router.post('/auth/user', authenticationMiddleware('jwt'), async (req, res) => {
  try {
    const { uid } = req.user;
    console.log('uid', { _id: uid});
    const user = await UserModel.findOne({ _id: uid });
    console.log('user', user);
    if (!user) {
      return res
        .status(200)
        .json({ message: 'No se encontró el usuario', success: false });
    }
      res.status(200).send({ success: true, data: {
        name: user.name,
        email: user.email
      }});
  } catch (error) {
      res
        .status(500)
        .send({ message: 'Error obteniendo el usuario', success: false, error })
  }
    
    
  });

 
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
});

/* router.post('/auth/user-by-id', authenticationMiddleware('jwt'), async(req, res) => {
  try {
    
  } catch (error) {
    
  }
}) */


/* export default router; */