const express=require("express");
const {body,query} =require("express-validator");

const router=express.Router();

//requiring controllers 
const product_controller=require("../controllers/product.controller");

// create student

router.get("/",query("testProductName", "Enter a valid product name").trim().not().isEmpty(),
               product_controller.fetchProductsByName);

router.get("/product",query("id", "Enter a valid product id").trim().not().isEmpty(),
                         product_controller.fetchProductById)

module.exports=router;