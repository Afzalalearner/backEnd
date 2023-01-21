const express=require('express')
const { rawListeners } = require('../models/product.model')
const router=express.Router()
const productController=require('./../controllers/productController')
const upload=require('./../utils/uploads')
const auth=require('./../utils/auth')


router.get('/',productController.get)
router.get('/:id',productController.getById)
router.post('/',upload.single('image'),productController.post)
router.put('/:id',productController.put)
router.patch('/:id',productController.patch)
router.delete('/:id',auth.authorize,productController.remove)
router.get('/page/:page/limit/:limit',productController.get)
router.get('/page/:page',productController.get)


module.exports=router;