const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({
    brand:{type:String,required:[true,'Brand is Mandatory'],minlength:[3,'Minimum 3 characters'],maxlength:[20,'Maximum 20 Characters']},
    model:{type:String,required:[true,'Model is Mandatory'],minlength:[3,'Minimum 3 characters'],maxlength:[20,'Maximum 20 Characters']},
    description:{type:String,required:[true,'Description is Mandatory'],minlength:[3,'Minimum 3 characters']},
    price:{type:Number},
    discount:{type:Number},
    inStock:{type:Boolean},
    createdDate:{type:Date},
    updatedDate:{type:Date,default:Date.now}
})

const productModel=mongoose.model('product',productSchema)

module.exports=productModel;