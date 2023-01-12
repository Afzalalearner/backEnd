const productModel=require('./../models/product.model')

const get=()=>{
    return productModel.find()
}

const post=(data)=>{
    const product=new productModel(data)
    return product.save()
}

module.exports={
    get,
    post,
}