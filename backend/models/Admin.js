const mongoose = require("mongoose");

const AdminSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { 
    type: String, 
    unique: true
 },
  password: String,
});

const Admin = mongoose.model("Admin", AdminSchema,'admins');
module.exports = Admin;