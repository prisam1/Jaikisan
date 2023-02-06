const mongoose = require("mongoose")

const CardSchema = new mongoose.Schema({
   
    cardNumber: {
        type: String,
        required: true
    },
    cardType: {
        type: String,
        enum: ["REGULAR", "SPECIAL"],
        required: true
    },
    customerName: {
        type: Date,
        required: true
    },
    status: {
          type: String,
          enum: ["ACTIVE", "INACTIVE"],
          default:"ACTIVE",
          trim:true
        
    },
    customerID :{
                type: String,
                ref: "User",
                required:true
        },
    isDeleted: {
            type:Boolean,
            default: false
          }
      
},{ timestamps: true })

module.exports = mongoose.model("Card", CardSchema)