const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    firstname: {  
              type: String, 
              required: true,
              trim: true 
          },
    lastname: {  
            type: String, 
            required: true,
            trim: true 
        },

    mobile: {  
              type: String,
              required: true,
              trim: true 
            },
    DOB: {
              type: Date,
              required: true
          },
    email: { 
            type: String,
            required: true,
            unique: true, 
            trim: true 
           },
    address: { 
                 type: String,
                 required: true,
                  
             },
    customerID: { 
              type: String,
              required: true,
              unique: true,      
          },  
    customerID: { 
            type: String,
            required: true,
             
        },     
    status: { 
          type: String,
          enum: ["ACTIVE", "INACTIVE"],
          trim:true,
          default:"ACTIVE"
           
      },      
    isDeleted: {
      type:Boolean,
      default: false
    }
       
}, { timestamps: true })

module.exports = mongoose.model('Customer', customerSchema)