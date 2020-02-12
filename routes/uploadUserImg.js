const express = require('express');
const multer = require('multer');
const path = require("path");

const storage = multer.diskStorage({
    destination: "./public/uploads/users",
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

const uploadUserImgRouter = express.Router();

uploadUserImgRouter.route('/')
    .post(upload.single('profileImage'), (req, res) => {    
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(req.file);
    });

module.exports = uploadUserImgRouter;