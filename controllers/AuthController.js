const UserModel = require('../models/UserModel');

var jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');

const login =  async(req,res) => {
    try{
        let user = await UserModel.findOne({email : req.body.email});
        if(!user || user.password != req.body.password){
            return res.status(200).send({
                success : true,
                message : "Email and password not valid"
            })
        }
        let token = await jwt.sign({user : user},"rnw4",{expiresIn : '1hr'})
        return res.status(200).send({
            success  : true,
            message : "Token is here",
            token
        })
    }catch(err){
        console.log(err);
        return false;
    }
}

const registeruser = async(req,res) => {
    try{
        if(!req.body.name){
            return res.status(200).send({
                success : true,
                message : "Name is required"
            })
        }
        if(!req.body.email){
            return res.status(200).send({
                success : true,
                message : "Email is required"
            })
        }
        if(!req.body.password){
            return res.status(200).send({
                success : true,
                message : "Password is required"
            })
        }
        if(!req.body.cpassword){
            return res.status(200).send({
                success : true,
                message : "Confirm password is required"
            })
        }
        let dupuser = await UserModel.findOne({email : req.body.email});
        if(dupuser){
            return res.status(200).send({
                success : false,
                message : "user is alreay register"
            })
        }
        if(req.body.password == req.body.cpassword){
            let user = await UserModel.create({
                name : req.body.name,
                email : req.body.email,
                password : req.body.password,
                cpassword : req.body.cpassword,
                role : "user"
            });
            return res.status(200).send({
                success : true,
                message : "User successfully register",
                user 
            })
        }else{
            return res.status(200).send({
                success : true,
                message : "password and confirm password not match"
            })
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const changepassword = async(req,res) => {
    try{
        let email = req.body.email;
        let chekUser = await UserModel.findOne({email : req.body.email});
        if(!chekUser){
            return res.status(200).send({
                success : false,
                message : "Email not valid"
            })
        }
        let newpassword = req.body.confirmpassword;
        let confirmpassword = req.body.confirmpassword;
        if(newpassword == confirmpassword){
            
        }else{
            return res.status(200).send({
                success : true,
                message : "password and confirm password not match"
            })
        }

    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    registeruser,login,changepassword
};