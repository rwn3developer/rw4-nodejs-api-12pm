const express = require('express');

const routes = express.Router();

//middleware chhe token ne verify kare chhe
const { verifyToken } = require('../middleware/verifyToken');


const authcontroller = require('../controllers/AuthController');
const categorycontroller = require('../controllers/CategoryController');

const passport = require('passport');

routes.post('/login',passport.authenticate('jwt', { session: false }),authcontroller.login)
routes.post('/registeruser',authcontroller.registeruser);


//category
routes.post('/categoryadd',categorycontroller.categoryadd);
routes.get('/categoryview',verifyToken,categorycontroller.categoryview);


module.exports = routes;