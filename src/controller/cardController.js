

const CardModel= require("../model/CardModel")
const {checkInputsPresent,isValidNumber,isValid} =require("../valid/valid")

const createCard = async function(req,res)
{
try{ 
  if(!checkInputsPresent(req.body))
     return res.status(400).send({status: false,message: "Enter details to create your account"})

  const {cardNumber,CardType,customerName,status,CustomerID}=req.body  

 

  if(!isValid(cardNumber))
     return res.status(400).send({ status: false, message: "Date is required"})
  if(!isValid(CardType))
     return res.status(400).send({ status: false, message: "Date is required"})
 
 
  if(!isValid(customerName))
     return res.status(400).send({ status: false, message: "Date is required"})
  if(!isValidName(customerName))
     return res.status(400).send({ status: false, message: "Enter Valid Name" })
   
  if(!isValid(status))
     return res.status(400).send({ status: false, message: "Activity is required"})

  if(!isValid(CustomerID))
     return res.status(400).send({ status: false, message: "CustomerID is required"})
  if(!isValidObjectId(CustomerID))
     return res.status(400).send({ status: false, message: "Please provide valid CustomerID"})


  let cardData=await CardModel.create(req.body)

  res.status(201).send({status:true,message:"Successfully Created",data:cardData})

}

catch(err)
{
   return res.status(500).send({ status: false, message: err.message })
}
}

const CardUpdate = async function(req,res)
{
try{ 
           
  let id=req.params.id
      
  let {cardNumber,cardType,customerName,status,customerID}=req.body  

  
  if(!isValidObjectId(customerID))
     return res.status(400).send({ status: false, message: "Please provide valid CustomerID"})

if (cardNumber || cardNumber === "")   
 { 
   if(!isValid(cardNumber))
     return res.status(400).send({ status: false, message: "cardNumber should be Required"})
   
 }

 if (cardType || cardType === "")
 { 
   if(!isValid(cardType))
   return res.status(400).send({ status: false, message: "CardType should be Required"})
   
}
 
if (customerName || customerName === "")
{  if(!isValid(customerName))
     return res.status(400).send({ status: false, message: "customerName is required"})
 
}
if(status!=="ACTIVE" || status!=="INACTIVE")
          return res.status(400).send({ status: false, message: "status should be ACTIVE or INACTIVE " })      



  let update=await CardModel.findByIdAndUpdate({_id:id},{...req.body},{new:true})

  res.status(200).send({status:true,message:"Successfully Update",data:update})

}

catch(err)
{

   return res.status(500).send({ status: false, message: err.message })
}
}

const CardGet= async function(req,res)
{
try{ 
           
  let id=req.params.id

  if(!isValidObjectId(id))
     return res.status(400).send({ status: false, message: "Please provide valid CustomerId"})

  let get=await CardModel.findById({CustomerId:id})

  res.status(200).send({status:true,message:"Done",data:get})

}

catch(err)
{

   return res.status(500).send({ status: false, message: err.message })
}
}

const deleteCard = async function (req, res) {
   try {
       let customerId = req.params.Id
       if (!mongoose.Types.ObjectId.isValid(customerId)) {
           return res.status(400).send({ status: false, message: "Invalid customerId" })
       }
 
       let Card = await CardModel.findOneAndUpdate({ customerId: customerId, isDeleted: false }, { isDeleted: true, deletedAt: new Date() })
       if (Card) {
           return res.status(200).send({ status: true, message: "Card deleted successfuly" })
       }
       else {
           return res.status(404).send({ status: false, message: "Card not found" })
       }
 
   } catch (err) {
       res.status(500).send({ message: 'Error', error: err.message })
   }
 }

module.exports={createCard,CardUpdate,CardGet,deleteCard}