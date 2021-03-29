//import express module
const exp = require("express")
const app = exp();
require("dotenv").config()

//import path module
const path=require("path")

//merge this server with dist folder
app.use(exp.static(path.join(__dirname,'dist/Assignment')))


const mc = require("mongodb").MongoClient;

//import api objects
const userApiObj = require("./APIS/user-api")
const adminApiObj = require("./APIS/admin-api")
const productApiObj = require("./APIS/product-api")
//forwarding req obj to API routes
app.use("/user", userApiObj)
app.use("/admin", adminApiObj)
app.use("/product", productApiObj)

//connect to db server
const dburl = process.env.DBURL;
mc.connect(dburl, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
        console.log("err in db connect ", err)
    }
    else {
        //get database object
        const databaseobj = client.db("Assignment")

        //get collection
        const userCollObj = databaseobj.collection("usercollection");
        const adminCollObj = databaseobj.collection("admincollection")
        const productCollObj = databaseobj.collection("productcollection")

        //share it tp APIS
        app.set("userCollObj", userCollObj)
        app.set("adminCollObj", adminCollObj)
        app.set("productCollObj", productCollObj)
        console.log("Connected to DB")

    }
})

//invalid paths
app.use((req,res,next)=>{
    res.send({message:`${req.url} is not valid`})

})
//error handler middle ware to check syntax errors
app.use((err,req,res,next)=>{
    res.send({message:"Error occurred",reason:err.message})
})

//server on port number 3000
//const port = process.env.PORT;
app.listen(3000,()=>{
    console.log("Web server listening on port 3000")
})
