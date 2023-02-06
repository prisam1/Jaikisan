const CustomerModel = require("../model/CustomerModel")
const moment= require("moment")

const {checkInputsPresent,isValid,isValidName,isValidMobile,validateEmail} =require("../valid/valid")

const Createuser= async function(req,res)
{
  try{
       if(!checkInputsPresent(req.body))
           return res.status(400).send({status: false,message: "Enter details"})

          let {firstname,lasttname,email,mobile,DOB,adress,customerID,status}=req.body     

        if(!isValid(firstname))
          return res.status(400).send({ status: false, message: "Name is required" })

        if(!isValidName(firstname))
          return res.status(400).send({ status: false, message: "Enter Valid Name" })
        
        if(!isValid(lasttname))
          return res.status(400).send({ status: false, message: "Name is required" })

        if(!isValidName(lasttname))
          return res.status(400).send({ status: false, message: "Enter Valid Name" })  

        if(!isValid(email))
          return res.status(400).send({ status: false, message: "Email is required" })

        if(!validateEmail(email))
          return res.status(400).send({ status: false, message: "Enter Valid Email" })
        
        if(!isValid(mobile))
          return res.status(400).send({ status: false, message: "Phone Number is required" })

        if(!isValidMobile(mobile))
          return res.status(400).send({ status: false, message: "Enter a Valid Phone Number" })  

        if(!isValid(DOB))
          return res.status(400).send({ status: false, message: "Date of birth is required" })

        let date = moment(DOB)
        
        if (date > Date.now()) {
                    return res.status(400).send({ status: false, message: "please provide valid date of birth " })
                }
            
        if(!isValid(adress))
            return res.status(400).send({ status: false, message: "adress Number is required" })
  
        
        if(!isValid(customerID))
            return res.status(400).send({ status: false, message: "customerID Number is required" })
  
        if(!isValid(status))
          return res.status(400).send({ status: false, message: "status Number is required" })

        if(!isValidMobile(mobile))
          return res.status(400).send({ status: false, message: "Enter a Valid Phone Number" })   

        if(status!=="ACTIVE" || status!=="INACTIVE")
          return res.status(400).send({ status: false, message: "status should be ACTIVE or INACTIVE " })      


       let Customerdata= await CustomerModel.create(req.body)
          
       return res.status(201).send({status:true,Message:"Successful",data:Customerdata})    

  }

  catch(err)
  {
    return res.status(500).send({status: false, message: err.message})
  }


}

const CustomerUpdate = async function(req,res)
{
try{ 
           
  let id=req.params.id
      
  let {firstname,lasttname,email,mobile,DOB,adress,customerID,status}=req.body  

  
  if(!isValidObjectId(customerID))
     return res.status(400).send({ status: false, message: "Please provide valid CustomerID"})

if (firstname || firstname === "")   
 { 
   if(!isValid(firstname))
     return res.status(400).send({ status: false, message: "firstname should be Required"})

   if(!isValidName(lasttname))
          return res.status(400).send({ status: false, message: "Enter Valid Name" })  

 }

 if (lasttname || lasttname === "")
 { 
   if(!isValid(lasttname))
      return res.status(400).send({ status: false, message: "lasttname should be Required"})

   if(!isValidName(lasttname))
      return res.status(400).send({ status: false, message: "Enter Valid Name" })  

}
 
if (email || email === "")
{  if(!isValid(email))
     return res.status(400).send({ status: false, message: "email is required"})

     if(!validateEmail(email))
     return res.status(400).send({ status: false, message: "Enter Valid Email" })

}

if (mobile || mobile === "")
{  if(!isValid(mobile))
     return res.status(400).send({ status: false, message: "mobile is required"})

   if(!isValidMobile(mobile))
     return res.status(400).send({ status: false, message: "Enter a Valid Phone Number" })

}
let date = moment(DOB)
if (DOB || DOB === "")
{  if(!isValid(DOB))
     return res.status(400).send({ status: false, message: "DOB is required"})

         if (date > Date.now()) {
             return res.status(400).send({ status: false, message: "please provide valid date of birth " })
         }
   
}
if (adress || adress === "")
{  if(!isValid(email))
     return res.status(400).send({ status: false, message: "adress is required"})
 
}

if(status!=="ACTIVE" || status!=="INACTIVE")
return res.status(400).send({ status: false, message: "status should be ACTIVE or INACTIVE " })      


  let update=await CustomerModel.findByIdAndUpdate({_id:id},{...req.body},{new:true})

  res.status(200).send({status:true,message:"Successfully Update",data:update})

}

catch(err)
{

   return res.status(500).send({ status: false, message: err.message })
}
}


const CustomerGet= async function(req,res)
{
try{ 
           
  let id=req.params.id

  if(!isValidObjectId(id))
     return res.status(400).send({ status: false, message: "Please provide valid CustomerId"})

  let get=await CustomerModel.findById({CustomerId:id})

  res.status(200).send({status:true,message:"Done",data:get})

}

catch(err)
{

   return res.status(500).send({ status: false, message: err.message })
}
}

const deleteCustomer = async function (req, res) {
  try {
      let customerId = req.params.Id
      if (!mongoose.Types.ObjectId.isValid(customerId)) {
          return res.status(400).send({ status: false, message: "Invalid customerId" })
      }

      let customer = await CustomerModel.findOneAndUpdate({ customerId: customerId, isDeleted: false }, { isDeleted: true, deletedAt: new Date() })
      if (customer) {
          return res.status(200).send({ status: true, message: "Customer deleted successfuly" })
      }
      else {
          return res.status(404).send({ status: false, message: "Customer not found" })
      }

  } catch (err) {
      res.status(500).send({ message: 'Error', error: err.message })
  }
}
module.exports={Createuser,CustomerUpdate,CustomerGet,deleteCustomer}



