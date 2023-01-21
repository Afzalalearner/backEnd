const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{type:String,required:[true,'Username is Mandatory'],minlength:[3,'Minimum 3 Characters'],maxlength:[100,'Maximum 20 Characters'],unique:true,trim:true},
    password:{type:String,required:[true,'Password is Mandatory'],minlength:[6,'Minimum 3 Characters'],trim:true},
    confirmPassword:{type:String,required:[true,'Confirm Password is Mandatory'],minlength:[6,'Minimum 3 Characters'],trim:true},
    
    email:{type:String,required:[true,'email is Mandatory'],minlength:[3,'Minimum 3 Characters'],maxlength:[100,'Maximum 20 Characters'],trim:true},
    firstName:{type:String,required:[true,'First Name is Mandatory'],minlength:[3,'Minimum 3 Characters'],maxlength:[20,'Maximum 20 Characters'],trim:true},
    lastName:{type:String,required:[true,'Last Name is Mandatory'],minlength:[3,'Minimum 3 Characters'],maxlength:[20,'Maximum 20 Characters'],trim:true},
    role:{type:Number,default:1},
    createdDate:{type:Date},
    updatedDate:{type:Date,default:Date.now}
    
})

const userModel=mongoose.model('user',userSchema)

module.exports=userModel