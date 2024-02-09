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
        let categoty = await CategoryModel.find({status : 1});
        return res.status(200).send({
            success : true,
            message : "category fetch",
            categoty,
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

const categoryupdate = async(req,res) => {
    try{
        const id = req.query.id;
        let update = await CategoryModel.findByIdAndUpdate(id,{
            category : req.body.category
        })
        return res.status(200).send({
            success : true,
            message : "Category successfully update",
        })
    }catch(err){
        console.log(err);
        return false;
    }
}

//category inactive api
const categoryActive = async(req,res) => {
    try{
        let id = req.query.id;
        let status = req.body.status;
        let up = await CategoryModel.findByIdAndUpdate(id,{
            status  : status
        })
        return res.status(200).send({
            success : true,
            message : "Category successfully Deactive",
            up
        })
    }catch(err){
        console.log(err);
        return false;
    }
}

const categoryInctive = async(req,res) => {
    try{
        let id = req.query.id;
        let status = req.body.status;
        let up = await CategoryModel.findByIdAndUpdate(id,{
            status  : status
        })
        return res.status(200).send({
            success : true,
            message : "Category successfully Deactive",
            up
        })
    }catch(err){
        console.log(err);
        return false;
    }
}


//admin allcategory view
const adminallcategoryview = async(req,res) => {
    try{
        let categoty = await CategoryModel.find({status : 1});
        let categotyinactive = await CategoryModel.find({status : 0});

        return res.status(200).send({
            success : true,
            message : "category fetch",
            categoty,
            inactive : categotyinactive
        })
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    categoryadd,categoryview,categoryDelete,categoryupdate,categoryActive,adminallcategoryview,categoryInctive
};