const express=require("express");
const {body} =require("express-validator");

const router=express.Router();

//requiring controllers 
const product_controller=require("../controllers/product.controller");

// create student

router.post("/",body("testProductName", "Enter a valid product name").trim().not().isEmpty(),
              product_controller.fetchProductByName);


module.exports=router;