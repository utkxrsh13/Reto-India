const mongoose = require("mongoose");

// Define ContactInfo Schema
const ContactInfoSchema= new mongoose.Schema({
  name: String,
  phone: String,
  message: String,
});

const ContactInfo = mongoose.model('ContactInfo', ContactInfoSchema);

module.exports = ContactInfo;