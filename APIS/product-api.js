 //mini express app
const exp = require("express")
const productApiObj = exp.Router();
const bcryptjs=require("bcryptjs")

require("dotenv").config()

productApiObj.use(exp.json())

const errorHandler=require("express-async-handler")

const jwt=require("jsonwebtoken")

//import cloudinary
const cloudinary = require("cloudinary").v2

//multer
const multer = require("multer")

//storage
//cloudinary-multer
const { CloudinaryStorage } = require("multer-storage-cloudinary")


cloudinary.config({
    cloud_name:"dwsvq7biq",
    api_key:"599346735511973",
    api_secret:"5gEISKZNIXcJzooSehidSO5UOrc"
   });


//Configure cloudinary storage settings
const storage = new CloudinaryStorage({
 cloudinary: cloudinary,
 params:async (req, file) => {
 return {
 folder: 'assignment', 
 public_id: file.fieldname + '-' + Date.now()
 }},
});

   //To configure multer middleware
var upload = multer({ storage: storage });


//import validate token middleware
const validateToken=require("./middlewares/verifyToken")



//http://localhost:3000/user/getusers
productApiObj.get("/getproducts",errorHandler( async (req, res) => {

    //get user collec obj
    let productCollObj = req.app.get("productCollObj")

   
        let productsArray = await productCollObj.find().toArray()

        res.send({ message: productsArray })

}))






//http://localhost:3000/user/getuser/username

productApiObj.get("/getproduct/:productid",validateToken,errorHandler( async (req, res) => {
    //get user collec obj
    let productCollObj = req.app.get("productCollObj")

    let product = await productCollObj.findOne({ productid: req.params.productid });

    res.send({ message: product })

}))




productApiObj.post("/createproduct",upload.single('photo'),errorHandler( async (req, res) => {

    let productCollObj = req.app.get("productCollObj")

    //get user obj from client
    

    req.body=JSON.parse(req.body.productObj)
    req.body.image=req.file.path;
    let productObj = req.body;

    //search for user in db with username of client obj
    let productObjFromDb = await productCollObj.findOne({ productid : productObj.productid })

    //if user is already existed
    if (productObjFromDb != null) {
        res.send({ message: "product already existed" })
    }
    //if user is not existed
    else {
    
        let result = await productCollObj.insertOne(productObj)

        res.send({ message: "product created" })
    }

}))



/*

//user login route
productApiObj.post("/login",errorHandler(async (req,res)=>{   
   
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
         let signedToken=await  jwt.sign({username:userFromDb.username},process.env.SECRET,{expiresIn: 10})

            //send signed token to client
            res.send({message:"login success",token:signedToken,username:userFromDb.username})

       }
    }
}))





*/

//export 
module.exports = productApiObj;
