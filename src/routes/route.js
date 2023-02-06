const express  = require("express")
const router =express.Router()
const {Createuser,CustomerUpdate,CustomerGet,deleteCustomer}= require("../controller/customerController")
const {createCard,CardUpdate,CardGet,deleteCard} = require("../controller/cardController")



router.post("/Createuser",Createuser)
router.put("/CustomerUpdate",CustomerUpdate)
router.get("/CustomerGet/:id",CustomerGet)
router.delete('/deleteCustomer/:id', deleteCustomer)


router.post("/createCard",createCard)
router.put("/CardUpdate/:id",CardUpdate)
router.get('/CardGet/:id', CardGet)
router.delete('/deleteCard/:id', deleteCard)



router.all("/*",(req,res)=>{res.status(400).send({status:false,message:"Invalid path params"})})

module.exports = router