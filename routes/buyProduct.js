const express = require('express');
const Buy = require('../models/buy');
const auth = require('../auth');

const router = express.Router();

router.route('/')
    .get(auth.verifyUser,(req,res,next)=>{
        Buy.find({userId: req.user._id})
            .then((buy) => {
                res.json(buy);
            })
            .catch((err) => next(err));
    })


    .post(auth.verifyUser,(req,res,next) => {

        let buy = new Buy(req.body);

        buy.userId = req.user._id;
        buy.save()
            .then((buy) => {
                res.statusCode = 201;
                res.json(buy);
            }).catch(next);
    })

    .put((req,res) => {
        res.statusCode = 405;
        res.json({message: "Invalid method for update data."})
    })

    .delete((req,res,next) => {
        Buy.deleteMany({ userId: req.user._id})
            .then((reply) => {
                res.json(reply);
            })
            .catch(next);
    })


router.route('/:id')
    .get((req,res,next) => {
        Buy.findOne({userId: req.user._id, _id: req.params.id})
            .then((buy) => {
                if(buy == null)
                    throw new Error("No Buy found!")
                    res.json(buy);
            }).catch(next);
    })

    .delete((req,res,next) => {
        Buy.findByIdAndDelete({_id: req.params.id})
            .then((reply) => {
                res.json(reply);
            })
            .catch(next);
    })


    .post((req,res) => {
        res.statusCode = 405;
        res.json({message: "Invalid method for inserting data."})
    })

    .put((req,res,next) => {
        Buy.findOneAndUpdate({
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
                throw new Error ("Buy not found!");
                res.json(reply);  
        }).catch(next);
    })

    

    module.exports = router;