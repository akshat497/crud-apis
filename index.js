const express = require("express");
const connection = require("./MongooseConnect");
const connection2=require("./mongoconnection")
const cors = require("cors");
const dotenv = require("dotenv").config();
const fast2sms = require('fast-two-sms');
const app = express();
var port=process.env.PORT || 5000
app.use(express.json({limit: '200mb'}));
app.use(cors());

app.post("/insert", async (req, res) => {
  const { Name, Phone, Email, Password,image,About } = req.body;
  const ProductModel = await connection();
  let data = new ProductModel({
    Name: Name,
    Phone: Phone,
    Email: Email,
    Password: Password,
    image:image,
    About:About
  });
  let result = await data.save();
  res.send(result);
});
app.delete("/delete", async (req, res) => {
  const { _id } = req.body;
  const ProductModel = await connection();
  var data = ProductModel.deleteOne({ _id:_id });
  let result = await data.deleteOne();
  res.send(result);
});
app.get("/fetch", async (req, res) => {
  const ProductModel = await connection();
  var data = await ProductModel.find();
  res.send(data);
});
app.post("/update", async (req, res) => {
  const {_id} = req.body;
  const ProductModel = await connection();
  var myquery = { _id:_id };
  var newvalues = { $set: req.body };
  var data = await ProductModel.updateOne(myquery, newvalues);
  res.send(data);
});
app.post('/expiresms', async (req, res)=>{
  const {Phone,OTP}= await req.body;
  fast2sms.sendMessage({
    authorization:process.env.API_KEY,
    message:OTP,
    numbers:[Phone]
  });
  res.json("SUCCESSFULL");
});

app.put('/updatem',async(req,res)=>{
       
  let collection=await connection2()
  const {Name}=req.body
  var myquery = {Name:Name};
   var newvalues = { $set: req.body};
  let result=await collection.updateOne(myquery,newvalues)
  res.send(result)
 
})
app.listen(port,()=>{
  console.log(`listening at port number ${port}`)
});
