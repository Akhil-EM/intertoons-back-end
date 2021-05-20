
const express=require("express");
const cors=require("cors");

const path = require('path');

const app=express();
const PORT=process.env.PORT || 6060;

// initialize app
app.set("views", path.join(__dirname, "..", "views"));
app.set('view engine', 'ejs');
app.use(cors());
app.use(express.json());







///app base 
app.get("/",(req,res)=>{
    res.json({status:"success",message:"node js application is working"});
});

//routers
app.use("/products",require("../src/routers/product.router"));

// open application on port
app.listen(PORT,()=>{
     console.log(`app is running at port ${PORT}`);
});



