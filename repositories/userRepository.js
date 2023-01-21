const userModel=require('./../models/user.model')

// const get=()=>{
//  const data=userModel.find()
//  return data
// }

const create=(data)=>{
    const user=new userModel(data)
    return user.save()
}

const getByUsername=(username)=>{
    const projections={_id:0,confirmPassword:0,createdDate:0,updatedDate:0,__v:0}
    return userModel.findOne({username:username},projections)
}

module.exports={
    // get,
    create,
    getByUsername,
}