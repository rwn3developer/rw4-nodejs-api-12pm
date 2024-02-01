const express = require('express');

const routes = express.Router();

const authcontroller = require('../controllers/AuthController');
const categorycontroller = require('../controllers/CategoryController');


routes.post('/registeruser',authcontroller.registeruser);


//category
routes.post('/categoryadd',categorycontroller.categoryadd);
routes.get('/categoryview',categorycontroller.categoryview);


module.exports = routes;