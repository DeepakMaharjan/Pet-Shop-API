const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const userRouter = require('./routes/users');
const uploadUserProfile = require('./routes/uploadUserImg');
const productRouter = require('./routes/products');
const uploadProductImg = require('./routes/uploadProductImg');
const fetchProductDetails = require('./routes/fetchProduct');
const buyProduct = require('./routes/buyProduct');
const dotenv = require('dotenv').config();
const auth = require('./auth');
const cors = require('cors');

const app = express();
app.use(morgan('tiny'));
app.use(express.json());
app.options('*', cors());
app.use(express.urlencoded({extended: true }));

app.use(express.static(__dirname + "/public"));

mongoose.connect(process.env.URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
    .then((db) => {
        console.log("Successfully connected to MongodB server");
    }, (err) => console.log(err));

    app.use(cors());

    app.use('/users', userRouter);
    app.use('/uploadProfile', uploadUserProfile);
    app.use('/fetchProducts', fetchProductDetails);
    

    app.use('/products', productRouter);
    app.use('/uploadProductImg', uploadProductImg);
    app.use('/buyProducts', buyProduct);
    app.use(auth.verifyUser);

    
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.statusCode = 500;
        res.json({ status: err.message });
    });
    
    app.listen(process.env.PORT, () => {
        console.log(`App is running at localhost:${process.env.PORT}`);
    });
