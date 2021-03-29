  //mini express app
const exp = require("express")
const adminApiObj = exp.Router();
const bcryptjs=require("bcryptjs")

require("dotenv").config()

adminApiObj.use(exp.json())

const errorHandler=require("express-async-handler")

const jwt=require("jsonwebtoken")

//import validate token middleware
const validateToken=require("./middlewares/verifyToken")



//http://localhost:3000/admin/getadmins
adminApiObj.get("/getadmins",errorHandler( async (req, res) => {

    //get user collec obj
    let adminCollObj = req.app.get("adminCollObj")

   
        let adminsArray = await adminCollObj.find().toArray()

        res.send({ message: adminsArray })


        res.send({ message: err.message })
    


}))






//http://localhost:3000/admin/getadmin/:username

adminApiObj.get("/getadmin/:username",validateToken,errorHandler( async (req, res) => {
    //get admin collec obj
    let adminCollObj = req.app.get("adminCollObj")

    let admin = await adminCollObj.findOne({ username: req.params.username });

    res.send({ message: admin })

}))



//http://localhost:3000/admin/createadmin
adminApiObj.post("/createadmin",errorHandler( async (req, res) => {

    let adminCollObj = req.app.get("adminCollObj")

    //get admin obj from client
    let adminObj = req.body;
    console.log(adminObj)
    //search for admin in db with username of client obj
    let adminObjFromDb = await adminCollObj.findOne({ username: adminObj.username })

    //if admin is already existed
    if (adminObjFromDb != null) {
        res.send({ message: "admin already existed" })
    }
    //if admin is not existed
    else {
        //hash u r password
        let hashedPw=await bcryptjs.hash(adminObj.password,7)

        //replace pws
        adminObj.password=hashedPw;
        
        let result = await adminCollObj.insertOne(adminObj)

        res.send({ message: "admin created" })
    }

}))




//user login route
adminApiObj.post("/login",errorHandler(async (req,res)=>{   
   
    let adminCollObj = req.app.get("adminCollObj")
    let credObj=req.body;
    
    //verify user
    let adminFromDb=await  adminCollObj.findOne({username:credObj.username})
    console.log(adminFromDb)  
    //if admin username not existed
    if(adminFromDb==null){
        res.send({message:"Invalid username"})
    }
    //if    admin  user is existed, then compare passwords
    else{
        //compare passwords
       let result=await bcryptjs.compare(credObj.password, adminFromDb.password)

       //if passwords not matched
       if(result==false){
           res.send({message:"Invalid password"})
       }
       //if pws are matched
       else{
            //create a json token and sign it
         let signedToken=await  jwt.sign({username:adminFromDb.username},process.env.SECRET,{expiresIn: 10})

            //send signed token to client
            res.send({message:"login success",token:signedToken,username:adminFromDb.username})

       }
    }
}))







//export 
module.exports = adminApiObj;