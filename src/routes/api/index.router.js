import Router from 'express'


const router = Router()
router.get('/', async(req,res)=>{
console.log('hola mundo')
})

export default router