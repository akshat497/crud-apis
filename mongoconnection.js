var {MongoClient}=require("mongodb")
var url="mongodb+srv://akshatsaini497:akshat09@cluster0.3vlwasl.mongodb.net?retryWrites=true&w=majority"
const database="akshat"
const client=new MongoClient(url)

async function getConnection(){
    let result=await client.connect()
    let db=result.db(database)
    console.log(db)
     return db.collection("akis")
    // let collection=db.collection("aki")
    // let response=await collection.find().toArray()
    // console.log(response)
   
 }
 module.exports=getConnection