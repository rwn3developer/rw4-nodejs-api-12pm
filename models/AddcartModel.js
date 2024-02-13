const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    price : {
        type : Number,
        required : true
    },
    qty : {
        type : Number,
        required : true
    },
    description : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    },
    categoryId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'category'
    },
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    }
})

const cart = mongoose.model('cart',cartSchema);
module.exports = cart;