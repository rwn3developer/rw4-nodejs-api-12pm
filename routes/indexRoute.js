const express = require('express');

const routes = express.Router();

//middleware chhe token ne verify kare chhe
const { verifyToken, adminRole} = require('../middleware/verifyToken');



const authcontroller = require('../controllers/AuthController');
const categorycontroller = require('../controllers/CategoryController');
const productcontroller = require('../controllers/ProductController');
const cartcontroller = require('../controllers/CartController');

const passport = require('passport');

const multer = require('multer');

routes.post('/login',authcontroller.login)
routes.post('/registeruser',authcontroller.registeruser);

//file upload
const storage = multer.diskStorage({
    destination : (req,file,cb) => {
        return cb(null,'uploads')
    },
    filename : (req,file,cb) => {
        return cb(null,file.originalname)
    }
})

const imageUpload = multer({storage : storage}).single('image');


//category
routes.post('/categoryadd',verifyToken,adminRole(["admin","manager"]),categorycontroller.categoryadd);
routes.get('/categoryview',verifyToken,categorycontroller.categoryview);
routes.get('/adminallcategoryview',verifyToken,adminRole(["admin"]),categorycontroller.adminallcategoryview);
routes.delete('/categoryDelete',verifyToken,adminRole(["admin","manager"]),categorycontroller.categoryDelete);
routes.put('/categoryupdate',verifyToken,adminRole(["admin","manager"]),categorycontroller.categoryupdate);
routes.put('/categoryActive',verifyToken,adminRole(["admin"]),categorycontroller.categoryActive);
routes.put('/categoryInctive',verifyToken,adminRole(["admin"]),categorycontroller.categoryInctive);


//product
routes.post('/productadd',verifyToken,adminRole(["admin","manager"]),imageUpload,productcontroller.addproduct)
routes.get('/productview',verifyToken,adminRole(["admin","manager"]),productcontroller.productview)
routes.post('/addtocart',verifyToken,cartcontroller.addtocart);
routes.get('/viewcart',verifyToken,cartcontroller.viewcart);


//admin
routes.get('/admin/adminViewcart',verifyToken,adminRole(["admin"]),cartcontroller.adminViewcart);

routes.post('/changepassword',verifyToken,authcontroller.changepassword)



module.exports = routes;