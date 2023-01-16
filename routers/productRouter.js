const express=require('express')
const router=express.Router()
const productController=require('./../controllers/productController')

router.get('/',productController.get)
router.get('/:id',productController.getById)
router.post('/',productController.post)
router.put('/:id',productController.put)
router.patch('/:id',productController.patch)
router.delete('/:id',productController.remove)
router.get('/page/:page/limit/:limit',productController.get)
router.get('/page/:page',productController.get)


module.exports=router;