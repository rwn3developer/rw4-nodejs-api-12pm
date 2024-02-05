const express = require('express');

const routes = express.Router();

//middleware chhe token ne verify kare chhe
const { verifyToken, adminRole } = require('../middleware/verifyToken');



const authcontroller = require('../controllers/AuthController');
const categorycontroller = require('../controllers/CategoryController');

const passport = require('passport');

routes.post('/login',authcontroller.login)
routes.post('/registeruser',authcontroller.registeruser);


//category
routes.post('/categoryadd',verifyToken,adminRole("admin"),categorycontroller.categoryadd);
routes.get('/categoryview',verifyToken,categorycontroller.categoryview);


module.exports = routes;