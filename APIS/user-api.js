 //mini express app
const exp = require("express")
const userApiObj = exp.Router();
const bcryptjs=require("bcryptjs")

require("dotenv").config()

userApiObj.use(exp.json())

const errorHandler=require("express-async-handler")

const jwt=require("jsonwebtoken")

//import validate token middleware
const validateToken=require("./middlewares/verifyToken")



//http://localhost:3000/user/getusers
userApiObj.get("/getusers",errorHandler( async (req, res) => {

    //get user collec obj
    let userCollObj = req.app.get("userCollObj")

   
        let usersArray = await userCollObj.find().toArray()

        res.send({ message: usersArray })


        res.send({ message: err.message })
    


}))






//http://localhost:3000/user/getuser/username

userApiObj.get("/getuser/:username",validateToken,errorHandler( async (req, res) => {
    //get user collec obj
    let userCollObj = req.app.get("userCollObj")

    let user = await userCollObj.findOne({ username: req.params.username });

    res.send({ message: user })

}))




userApiObj.post("/createuser",errorHandler( async (req, res) => {

    let userCollObj = req.app.get("userCollObj")

    //get user obj from client
    let userObj = req.body;
    console.log(userObj)
    //search for user in db with username of client obj
    let userObjFromDb = await userCollObj.findOne({ username: userObj.username })

    //if user is already existed
    if (userObjFromDb != null) {
        res.send({ message: "user already existed" })
    }
    //if user is not existed
    else {
        //hash u r password
        let hashedPw=await bcryptjs.hash(userObj.password,7)

        //replace pws
        userObj.password=hashedPw;
        
        let result = await userCollObj.insertOne(userObj)

        res.send({ message: "user created" })
    }

}))




//user login route
userApiObj.post("/login",errorHandler(async (req,res)=>{   
   
    let userCollObj = req.app.get("userCollObj")
    let credObj=req.body;
    
    //verify user
    let userFromDb=await  userCollObj.findOne({username:credObj.username})

    //if username not existed
    if(userFromDb==null){
        res.send({message:"Invalid username"})
    }
    //if user is existed, then compare passwords
    else{
        //compare passwords
       let result=await bcryptjs.compare(credObj.password, userFromDb.password)

       //if passwords not matched
       if(result==false){
           res.send({message:"Invalid password"})
       }
       //if pws are matched
       else{
            //create a json token and sign it
         let signedToken=await  jwt.sign({username:userFromDb.username},process.env.SECRET,{expiresIn: 600})

            //send signed token to client
            res.send({message:"login success",token:signedToken,username:userFromDb.username})

       }
    }
}))







//export 
module.exports = userApiObj;