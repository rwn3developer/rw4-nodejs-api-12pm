const CategoryModel = require('../models/CategoryModel');
const categoryadd = async(req,res) => {
    try{

        let dupcategory = await CategoryModel.findOne({category : req.body.category});
        if(dupcategory){
            return res.status(200).send({
                success : true,
                message : "Category allready added",
            })
        }

        let category = await CategoryModel.create({
            category : req.body.category,
        });
        return res.status(200).send({
            success : true,
            message : "Category successfully add",
            category 
        })
    }catch(err){
        console.log(err);
        return false;
    }
}

const categoryview = async(req,res) => {
    try{
        let categoty = await CategoryModel.find({});
        return res.status(200).send({
            success : true,
            message : "category fetch",
            categoty
        })
    }catch(err){
        console.log(err);
        return false;
    }
}

const categoryDelete = async(req,res) => {
    try{
        let deleteData = await CategoryModel.findByIdAndDelete(req.query.id);
        return res.status(200).send({
            success : true,
            message : "Category successfully delete"
        })
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    categoryadd,categoryview,categoryDelete
};