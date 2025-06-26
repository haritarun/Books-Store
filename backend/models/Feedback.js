const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : {
        type:String,
    },
    phoneNumber : String,
    messageType:{
        type: String,   
        required: true
    },
    message : String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Feedback = mongoose.model("Feedback", FeedbackSchema, 'feedbacks'); 
module.exports = Feedback;