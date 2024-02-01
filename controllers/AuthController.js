const UserModel = require('../models/UserModel');
const registeruser = async(req,res) => {
    try{
        let user = await UserModel.create({
            name : req.body.name,
            email : req.body.email,
            password : req.body.password,
            cpassword : req.body.cpassword,
        });
        return res.status(200).send({
            success : true,
            message : "User successfully register",
            user 
        })
    }catch(err){
        console.log(err);
        return false;
    }
}

module.exports = {
    registeruser
};