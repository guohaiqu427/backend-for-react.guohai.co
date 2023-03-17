const express = require("express")
const mongoose = require ("mongoose") 
const user = require("./routes/user")
const auth = require("./routes/auth")
const category = require("./routes/category")
const decker =  require("./routes/decker")
const tag =  require("./routes/tag")

const config = require("config")

if(!config.get("jwtPrivateKey")) {
    console.log("private key not set")
    process.exit(1)
}

const app =  express() 
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/react-backend")
    .then(()=> {console.log("connected...")})
    .catch(()=> {console.log("somthing went...")})


app.use("/api/users", user)
app.use("/api/auth", auth)
app.use("/api/category", category)
app.use("/api/decker", decker)
app.use("/api/tag", tag)


app.listen(3000, () => {
    console.log("listening on port 3000")
} )