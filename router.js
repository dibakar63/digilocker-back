const router=require('express').Router();
const authController=require('./controller')
const recipe=require('./dataController')

router.post('/register',authController.registerController)
router.post('/add',recipe.addData)
router.get('/data',recipe.getAllData)
router.get('/data/:id',recipe.getById);
router.put('/update/:id',recipe.updateData)
router.delete('/:id',recipe.deleteData)
router.post('/login',authController.loginController)


module.exports=router;