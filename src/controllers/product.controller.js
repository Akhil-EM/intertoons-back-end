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

exports.fetchProductByName=(req,res)=>{
     //throw validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty())  return res.json({status:"error",message:{errors: errors.array()}});

    msSql.connect(config,(err)=>{
         if(err){
            console.log(err);
            return res.json({status:"error",message:"server error"});
         } 
          // create Request object
          var request = new msSql.Request();
          
          let product=req.body.testProductName;
          // query to the database and get the records
          request.query(`exec spSearchProducts ${product}`, function (_err,_date_set) {
              
              if (_err){
                console.log(_err)
                return res.json({status:"error",message:"server error"});
              } 
   
              // send records as a response
              //console.log(typeof Object.entries(_date_set.recordsets) )
              res.json({status:"success",message:{products:_date_set.recordsets[0]}})
              
              
          });
   })

    
    
};
  