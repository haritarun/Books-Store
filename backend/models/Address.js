const mongoose=require('mongoose')

const AddresSchema = new mongoose.Schema({
    email:String,
    array:[
        {
            fullName:String,
            phoneNo:Number,
            area:String,
            city:String,
            state:String,
            zipCode:Number,
        }
    ]

})

const Address = mongoose.model("Address",AddresSchema)

module.exports = Address 