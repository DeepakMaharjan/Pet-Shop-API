const express = require('express');
const multer = require('multer');
const path = require("path");
const auth = require("../auth");

const storage = multer.diskStorage({
    destination: "./public/uploads/products",
    filename: (req, file, callback) => {
        let ext = path.extname(file.originalname);
        callback(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
});

const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error("You can upload only image files!"), false);
    }
    cb(null, true);
};

const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
})

const uploadProductImgRouter = express.Router();

uploadProductImgRouter.route('/')
    .post(upload.single('productImage'),auth.verifyUser, (req, res) => {    
        res.json(req.file);
    });

module.exports = uploadProductImgRouter;