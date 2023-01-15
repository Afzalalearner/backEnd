const productModel = require('../models/product.model');
const productRepository=require('./../repositories/productRepository')

const hasValidationError=(err)=>{
    return err&&err.message&&err.message.indexOf('validation failed')>-1
}

const formatErrors=(errors)=>{

    let errorResponse=[];
    for (let key in errors){
        const err={

            field:errors[key].path,
            message:errors[key].message
        }
        errorResponse.push(err)
    }

    return errorResponse;
}

const get=async (req,res)=>{
    try{
        const data=await productRepository.get()
        res.status(200)
        res.json(data)
    }catch(err){
        res.status(500)
        res.send('Internal Server Error...')
    }
}

const post=async (req,res)=>{
try{
const data=req.body;
data.createdDate=Date.now()
await productRepository.post(data)
res.status(201)
res.send()

}catch(err){
    console.error(err)
    if(hasValidationError(err)){
        res.status(400)
        res.json(formatErrors(err.errors))
        return
    }
    res.status(500)
    console.log(err)
    res.send('Internal Server Error....')
}

}

const getById=async (req,res)=>{
    try{

        const id=req.params.id;
        const data=await productRepository.getById(id)
        res.status(200)
        res.json(data)
    }catch(err){
        res.status(500)
        res.send('Internal Server Error')
    }
}

const put = async (req, res) => {
    try {

        const data = req.body;
        const id = req.params.id;
        await productRepository.put(id,data)
        res.status(200)
        res.send('Record Updated Successfully')

    } catch (err) {
        console.log(err)
        res.status(500)
        res.send('Internal Server Error')
    }

}

const patch=async (req,res)=>{
    try{
        const data=req.body;
        const id=req.params.id;
        await productRepository.patch(id,data)
        res.status(200)
        res.send('Record Updated Successfully')
    }catch(err){
        console.log(err)
        res.status(500)
        res.send('Internal Server Error')
    }
        

}

const remove=async (req,res)=>{
    try{

        const id=req.params.id;
        await productRepository.remove(id)
        res.status(204)
        res.send()


    

    }catch(err){
        res.status(500)
        res.send('Internal Server Error')
    }


}
module.exports={
    get,
    post,
    getById,
    put,
    patch,
    remove
}