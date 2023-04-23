const mongoose = require("mongoose");

async function connection() {
  await mongoose.connect("mongodb+srv://akshatsaini497:akshat09@cluster0.3vlwasl.mongodb.net/akshat?retryWrites=true&w=majority");
  const Schemaaa = new mongoose.Schema({    
    Name: String,
    Email: String,
    Phone: String,
    Password: String,
    image:String,
    About:String
  });
  return mongoose.models.aki || mongoose.model('aki',Schemaaa)
}
module.exports=connection