const express = require('express');
const Product = require('../models/products');

const router = express.Router();

router.route('/')
    .get((req,res,next)=>{
        Product.find({adminId: req.user._id})
            .then((products) => {
                res.json(products);
            })
            .catch((err) => next(err));
    })

    .post((req,res,next) => {
        let products = new Product(req.body);

        products.adminId = req.user._id;
        products.save()
            .then((products) => {
                res.statusCode = 201;
                res.json(products);
            }).catch(next);
    })

    .put((req,res) => {
        res.statusCode = 405;
        res.json({message: "Invalid method for update data."})
    })

    .delete((req,res,next) => {
        Product.deleteMany({ adminId: req.user._id})
            .then((reply) => {
                res.json(reply);
            })
            .catch(next);
    })


router.route('/:id')
    .get((req,res,next) => {
        Product.findOne({adminId: req.user._id, _id: req.params.id})
            .then((products) => {
                if(products == null)
                    throw new Error("No product found!")
                    res.json(products);
            }).catch(next);
    })

    .post((req,res) => {
        res.statusCode = 405;
        res.json({message: "Invalid method for inserting data."})
    })

    .put((req,res,next) => {
        Product.findOneAndUpdate({
            adminId: req.user._id,
            _id: req.params.id
        },
        {
            $set: req.body
        },
        {
            new: true
        })
        .then((reply) => {
            if(reply == null)
                throw new Error ("Product not found!");
                res.json(reply);  
        }).catch(next);
    })

    module.exports = router;