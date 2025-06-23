const mongoose = require("mongoose")

const LocationSchema = new mongoose.Schema({
    email:String,
    location:[
        {
            area:String,
            city:String,
            state:String,
            pincode:String,
        }
    ]
})

const Location = mongoose.model("Location",LocationSchema)

module.exports = Location