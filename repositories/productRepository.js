const productModel = require('./../models/product.model')

const get = (options) => {
    const {pageSize,pageNumber}=options
    const projections = { _id: 1, __v: 0, createdDate: 0 }
    return productModel.find({}, projections).skip((pageNumber-1)*pageSize).limit(pageSize)
}

const getCount=()=>{
    return productModel.count()
}

const post = (data) => {
    const product = new productModel(data)
    return product.save()
}

const getById = (id) => {
    const projections = { _id: 1, __v: 0, createdDate: 0 }
    return productModel.findById({ _id: id }, projections)
}

const put = (id, data) => {
    delete data._id;
    const options={runValidators:true}

    return productModel.updateOne({ _id: id }, {
        $set: {
            category:data.category,
            subCategory:data.subCategory,
            brand: data.brand,
            model: data.model,
            description: data.description,
            price: data.price,
            discount: data.discount,
            inStock: data.inStock
        }
    },options)
}

const patch=(id,data)=>{
    delete data._id;
    const updatedObj={}
    const options={runValidators:true}
    for (let key in data){
        updatedObj[key]=data[key]
    }
    return productModel.updateOne({_id:id},{$set:updatedObj},options)
}

const remove=(id)=>{
    return productModel.deleteOne({_id:id})
}

module.exports = {
    get,
    post,
    getById,
    put,
    patch,
    remove,
    getCount
}