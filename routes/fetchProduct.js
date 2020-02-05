const express = require('express');
const Product = require('../models/products');

const router = express.Router();

router.get('/catBlanket',(req,res,next)=>{
    Product.find({productCategory: "Blanket"},(err,product)=>
    {
        console.log(product)
        if(err){
            res.json(next)
        }
        res.json(product)
    });
})

router.get('/catBracelet',(req,res,next)=>{
    Product.find({productCategory: "Bracelet"},(err,product)=>
    {
        console.log(product)
        if(err){
            res.json(next)
        }
        res.json(product)
    });
})
module.exports = router;