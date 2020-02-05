const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
const router = express.Router();
const auth = require('../auth');

router.post('/signup', (req, res, next) => {
    let password = req.body.password;
    bcrypt.hash(password, 10, function(err,hash){
        if(err){
            let err = new Error('Could not hash password');
            err.status = 500;
            return next(err);
        }

        User.create({
            profileImage: req.body.profileImage,
            username: req.body.username,
            phoneNo: req.body.phoneNo,
            email: req.body.email,
            password: hash,
            gender: req.body.gender,
            address: req.body.address,
        }).then((user) => {
            let token = jwt.sign({_id: user._id}, process.env.SECRET);
            res.json({status: "Signup Success!", token: token});
        }).catch(next);
    });
});

router.post('/login', (req, res, next) => {
    User.findOne({ email: req.body.email })
        
        .then((user) => {
            if (user == null) {
                let err = new Error('Email address not found!');
                err.status = 401;
                return next(err);
            } else {
                
                bcrypt.compare(req.body.password, user.password)
                    .then((isMatch) => {
                        if (!isMatch) {
                            let err = new Error('Password does not match!');
                            err.status = 401;
                            return next(err);
                        }
                        let token = jwt.sign({ _id: user._id }, process.env.SECRET);
                        res.json({ status: 'Login success!', token: token });
                    }).catch(next);
            }
        }).catch(next);
})

router.get('/me',auth.verifyUser,(req,res,next)=>{
   User.findById({_id: req.user._id})
   .then((result) => {
       res.json(result)
   })
   .catch(next)
});

router.get('/user',auth.verifyUser,(req,res,next)=>{
    User.find({admin:false})
    .then((result)=>{
        res.json(result)
    })
    .catch(next)
})

router.put('/updateProfile', auth.verifyUser,(req,res,next) => {
    User.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if(!err){
            res.json({ status: 'Profile Updated'});
        } else {
            Console.log('Error' + err);
            res.json('Error while update!');
        }
    });
});

module.exports = router;