const productModel = require('./../models/product.model')

const getSortBy = (sort) => {
    switch (sort.toLowerCase()) {
        case 'category': return 'category';
        case 'subCategory': return 'subCategory';
        case 'brand': return 'brand';
        case 'model': return 'model';
        case 'price': return 'price';
        case 'discount': return 'discount';
        default: return 'updatedDate'

    }
}

const getSortDirection = (direction) => {
    switch (direction.toLowerCase()) {
        case 'asc':
        case 'ascending': return 1;

        case 'dsc':
        case 'desc':
        case 'descending': return -1;

        default: return -1
    }
}


const get = (options) => {
    const { pageSize, pageNumber, sort, direction, categorySearch, subCategorySearch,productSearch } = options

    const sortByField = getSortBy(sort)
    const sortByDirection = getSortDirection(direction)

    const projections = { _id: 1, __v: 0, createdDate: 0 }

    const filter = {
        $and: [{ category: new RegExp(categorySearch, 'i') },{ subCategory: new RegExp(subCategorySearch, 'i') },
        { $or: [{ brand: new RegExp(productSearch, 'i') }, { model: new RegExp(productSearch, 'i') }] }]
    }
    return productModel.find(filter, projections)
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .sort({ [sortByField]: sortByDirection })
}

const getCount = (options) => {
    const { productSearch, categorySearch,subCategorySearch } = options

    const filter = {
        $and: [{ category: new RegExp(categorySearch, 'i') },{ subCategory: new RegExp(subCategorySearch, 'i') },
        { $or: [{ brand: new RegExp(productSearch, 'i') }, { model: new RegExp(productSearch, 'i') }] }]
    }
    return productModel.count(filter)
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
    const options = { runValidators: true }

    return productModel.updateOne({ _id: id }, {
        $set: {
            category: data.category,
            subCategory: data.subCategory,
            brand: data.brand,
            model: data.model,
            description: data.description,
            price: data.price,
            discount: data.discount,
            inStock: data.inStock
        }
    }, options)
}

const patch = (id, data) => {
    delete data._id;
    const updatedObj = {}
    const options = { runValidators: true }
    for (let key in data) {
        updatedObj[key] = data[key]
    }
    return productModel.updateOne({ _id: id }, { $set: updatedObj }, options)
}

const remove = (id) => {
    return productModel.deleteOne({ _id: id })
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