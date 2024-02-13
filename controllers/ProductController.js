const productModel = require('../models/ProductModel');
const categoryModel = require('../models/CategoryModel');

const addproduct = async(req,res) => {
    try{
        let product = await productModel.create({
            name : req.body.name,
            price : req.body.price,
            qty : req.body.qty,
            description : req.body.description,
            image : req.file.path,
            categoryId : req.body.categoryId
        })
        return res.send({
            success : true,
            message : "product successfully add",
            product
        })
    }catch(err){
        console.log(err);
        return false;
    }
}

const productview = async(req,res) => {
    try{
        let product = await productModel.find({}).populate("categoryId");
        return res.status(200).send({
            "success" : true,
            "message" : "product successfully fetched",
            "product length" : product.length,
            "product" : product
        })

        // //category wise record join using aggregate
        // let product = await categoryModel.aggregate([
        //     {
        //         $lookup: {
        //             from: "products",
        //             localField: "_id",
        //             foreignField: "categoryId",
        //             as: "product"
        //         }
        //     }
        // ])
        // return res.status(200).send({
        //     product
        // })

        //product wise record join using aggregate
        //  let product = await productModel.aggregate([
        //     {
        //         $lookup: {
        //             from: "categories",
        //             localField: "categoryId",
        //             foreignField: "_id",
        //             as: "category"
        //         },
        //     },
        //     {
        //         $match : {name : "vivo"}
        //     }
        // ])
        // return res.status(200).send({
        //     product
        // })

    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    addproduct,productview
}