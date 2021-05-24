//adding config var
require("dotenv").config();

const {  validationResult } = require('express-validator');
const msSql=require("mssql");

// ms sql connection 
var config = {
    user:process.env.USER,
    password:process.env.PASSWORD,
    server:process.env.SERVER, 
    database:process.env.DATABASE,
    options: {
        encrypt: true, // for azure
        trustServerCertificate:true 
     }};



exports.fetchProductsByName=(req,res)=>{
     //throw validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty())  return res.json({status:"error",message:{errors: errors.array()}});
    
    try{
      msSql.connect(config,(err)=>{
          if(err){
              console.log(err);
              return res.json({status:"error",message:"server error"});
          } 
            // create Request object
            var request = new msSql.Request();
            
            let product=req.query.testProductName;
            // query to the database and get the records 
            // request.query(`exec spSearchProducts ${product}`, function (_err,_data_set) {
            request.query(`exec spSearchProducts '${product}'`, function (_err,_data_set) {
                
                if (_err){
                  console.log(_err)
                  return res.json({status:"error",message:"server error2"});
                } 
                
                let products_arr=_data_set.recordsets[0];
                let images_arr=_data_set.recordsets[1];

                let merged_array=products_arr.map(x => Object.assign(x, images_arr.find(y => y.productId == x.productId)));
                console.log(merged_array)
              
                res.json({status:"success",message:{products:merged_array}});

              
                
                
            });
      })
    }catch(err){
      console.log(err);
      res.json({status:"error",message:"server error"})
    }

    
    
};
  

exports.fetchProductById=(req,res)=>{
  //throw validation errors
 const errors = validationResult(req);
 if (!errors.isEmpty())  return res.json({status:"error",message:{errors: errors.array()}});

 msSql.connect(config,(err)=>{
    if(err){
      console.log(err);
      return res.json({status:"error",message:"server error"});
    }
  
    var request=new msSql.Request();
    var id=req.query.id;
    
    try{
      request.query(`exec spProductDetailsById ${id}`,(_err,_data)=>{
         console.log(_data.recordsets);
         res.json({status:"success",message:{productInfo:_data.recordsets}});
      })
    }
    catch(err){
      console.log(err);
      return res.json({status:"error",message:"server error"});
    }

 })
 
 
};