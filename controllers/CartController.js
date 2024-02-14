const addCart = require('../models/AddcartModel');
const productModel = require('../models/ProductModel');

const addtocart = async(req,res) => {
    try{
        let product = await productModel.findById(req.body.productId);
       let cart = await addCart.create({
            name: product.name,
            price : product.price,
            qty : product.qty,
            description : product.description,
            image : product.image,
            categoryId : product.categoryId,
            userId : req.body.userId
       })
       return res.status(200).send({
            success : true,
            message : "Product successfully add to cart",
            cart
       })
    }catch(err){
        console.log(err);
        return false;
    }
}

const viewcart = async(req,res) => {
    try{    
        let cart = await addCart.find({}).populate("userId","name email").populate("categoryId");

        let record = cart.filter((val)=>{
            return val.userId._id == req.user.user._id
        })
        
        let sum = 0;
       let finalToal = record.map((final)=>{
            return sum = sum + final.price * final.qty
       })
       
        return res.status(200).send({
            success : true,
            message : "cart fetch",
            length : record.length,
            total : sum,
            record
           
        })
    }catch(err){
        console.log(err);
        return false;
    }
}

const adminViewcart = async(req,res) => {
    try{
        let cart = await addCart.find({});
        return res.status(200).send({
            success : true,
            message : "admin all user cart fetch",
            cart
        })
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    addtocart,viewcart,adminViewcart
}