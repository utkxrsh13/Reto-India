const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
    name: String,
    TotalOrders:Number,
    address: String,
    PinCode:Number
    
});

const Customer = mongoose.model('Customer', CustomerSchema);
module.exports = Customer;
