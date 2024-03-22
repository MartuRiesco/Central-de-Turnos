import Router from 'express'
import passport from 'passport';
import UserModel from '../../models/user.model.js'
import {  authenticationMiddleware, authorizationMiddleware, createHash} from '../../utils.js';


const router = Router()

router.get('/users',
/* authenticationMiddleware('jwt'), authorizationMiddleware('admin') ,*/ async (req, res) => {
    try{
      const users = await UserModel.find({});
      const datas = buildResponse(users)
    res.json({ users: datas });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener usuarios' });
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


router.post('/users',
 /*  passport.authenticate('jwt', { session: false }), */
  /* authPolicies(['admin']), */
  async (req, res) => {
    const {
      first_name,
      last_name,
      email,
      password,
    } = req.body;
    if (
      !first_name ||
      !last_name ||
      !email ||
      !password
    ) {
      return res.status(400).json({ message: 'Todos los campos son requeridos 😨' });
    }
    let user = await UserModel.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Correo ya registrado 😨. Intenta recuperar tu contraseña 😁.' });
    }
    user = await UserModel.create({
      first_name,
      last_name,
      email,
      password: createHash(password),
    });
  
    res.status(201).json({ message: 'Usuario creado correctamente 👽' });
  });

router.get('/users/:uid',
  /* passport.authenticate('jwt', { session: false }), */
  /* authPolicies(['admin']), */
  async (req, res) => {
    const { uid } = req.params;
    const user = await UserModel.findById(uid);
    if (!user) {
      return res.status(404).json({ message: `No se encontró el usuario ${uid} 👽` });
    }
    res.status(200).json(user);
  });

router.put('/users/:uid',
authenticationMiddleware('jwt'),
/*   authPolicies(['admin']), */
  async (req, res) => {
    const { params: { uid }, body } = req;
    const { first_name, last_name, dni, email } = body;
    const data = { first_name, last_name, dni, email };
    const user = await UserModel.findById(uid);
    if (!user) {
      return res.status(404).json({ message: `No se encontró el usuario ${uid} 👽` });
    }
    await UserModel.updateOne({ _id: uid }, { $set: data });
    res.status(200).json({ message: 'Usuario actualizado con éxito 👽' });
  });

router.delete('/users/:uid',
authenticationMiddleware('jwt'), authorizationMiddleware('admin'),
  async (req, res) => {
    const { uid } = req.params;
    const user = await UserModel.findById(uid);
    if (!user) {
      return res.status(404).json({ message: `No se encontró el usuario ${uid} 👽` });
    }
    await UserModel.deleteOne({ _id: uid });
    res.status(200).json({ message: 'Usuario eliminado con éxito 👽' })
  });

  router.delete('/users',authenticationMiddleware('jwt'), authorizationMiddleware('admin'), async (req, res) => {
    try {
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      const inactiveUsers = await UserModel.find({ 
        last_connection: { $lt: twoDaysAgo } });
       const userDetleted = await UserModel.deleteMany({ _id: { $in: inactiveUsers.map(user => user._id) } });
       console.log(userDetleted);
 console.log('in',inactiveUsers);
       inactiveUsers.forEach(user => {
        const emailService = EmailService.getInstance();
         emailService.sendDeleteEmail(user);
      });
  
      res.status(200).json({ message: `Usuarios inactivos eliminados exitosamente.` });
    } catch (error) {
      console.error('Error al limpiar usuarios inactivos:', error);
      res.status(500).json({ message: 'Error al limpiar usuarios inactivos.' });
    }
  });
export default router;