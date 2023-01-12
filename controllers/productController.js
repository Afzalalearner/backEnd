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

module.exports={
    get,
    post,
}