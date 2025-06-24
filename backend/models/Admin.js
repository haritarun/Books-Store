const mongoose = require("mongoose");

// Schema Definition
const AdminSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
});

// Create Model
const Admin = mongoose.model("Admin", AdminSchema, 'admins'); // Explicitly map to 'admins' collection
module.exports = Admin;
