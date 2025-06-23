// const mongoose = require("mongoose");

// const MessageSchema = new mongoose.Schema({
//   sender: String,  
//   receiver: String, 
//   array:[
//     {
//         message: String,
//         sender:String,
//         timestamp: { type: Date, default: Date.now }
//     }
//     ],
    
// });
// const Message = mongoose.model("Message", MessageSchema);

// module.exports=Message
const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  username: String,
  to: String,
  message: String,
  timestamp: { 
    type: Date, 
    default: Date.now 
  },
}, {
  timestamps: true,  
});

const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;