const mongoose = require('mongoose');

const OrderInfoSchema = new mongoose.Schema({
    image: String,
    title: String,
    TrackingId: String,
    Price: Number,
    Status: String,
});

const OrderInfo = mongoose.model('OrderInfo', OrderInfoSchema);
module.exports = OrderInfo;
