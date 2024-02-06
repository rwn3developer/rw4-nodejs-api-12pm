const express = require('express');

const routes = express.Router();

//middleware chhe token ne verify kare chhe
const { verifyToken, adminRole, managerRole } = require('../middleware/verifyToken');



const authcontroller = require('../controllers/AuthController');
const categorycontroller = require('../controllers/CategoryController');

const passport = require('passport');

routes.post('/login',authcontroller.login)
routes.post('/registeruser',authcontroller.registeruser);


//category
routes.post('/categoryadd',verifyToken,adminRole(["admin","manager"]),categorycontroller.categoryadd);
routes.get('/categoryview',verifyToken,managerRole('manager'),categorycontroller.categoryview);
routes.delete('/categoryDelete',verifyToken,adminRole(["admin"]),categorycontroller.categoryDelete);


module.exports = routes;