const express = require('express');

const routes = express.Router();

//middleware chhe token ne verify kare chhe
const { verifyToken, adminRole} = require('../middleware/verifyToken');



const authcontroller = require('../controllers/AuthController');
const categorycontroller = require('../controllers/CategoryController');

const passport = require('passport');

routes.post('/login',authcontroller.login)
routes.post('/registeruser',authcontroller.registeruser);


//category
routes.post('/categoryadd',verifyToken,adminRole(["admin","manager"]),categorycontroller.categoryadd);
routes.get('/categoryview',verifyToken,categorycontroller.categoryview);
routes.get('/adminallcategoryview',verifyToken,adminRole(["admin"]),categorycontroller.adminallcategoryview);
routes.delete('/categoryDelete',verifyToken,adminRole(["admin"]),categorycontroller.categoryDelete);
routes.put('/categoryupdate',verifyToken,adminRole(["admin","manager"]),categorycontroller.categoryupdate);
routes.put('/categoryActive',verifyToken,adminRole(["admin"]),categorycontroller.categoryActive);
routes.put('/categoryInctive',verifyToken,adminRole(["admin"]),categorycontroller.categoryInctive);


module.exports = routes;