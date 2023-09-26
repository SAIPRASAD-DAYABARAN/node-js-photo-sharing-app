const express = require('express');
const PhotosRouter = express.Router();
const db = require('../models'); //coz one dir above
const multer = require('multer');

const fileStorageEngine = multer.diskStorage({
    destination: (request, file, callback) => { //we say, if it's a file it needs to be stored in /public/images and update filename by appending date
      callback(null, "./public/images"); 
    },
    filename: (request, file, callback) => {
      callback(null, Date.now() + "--" + file.originalname);
    },
  });
  const uploadFilter = function (request, file, callback) { //look at the mime types(jpeg, png,..) for this image
      
      const fileType = file.mimetype.split('/');
      
      if (fileType[0] === "image") { //if the first word is image, allow otherwise callback error
        callback(null, true)
      }else{
        callback("You are trying to upload a file that is not an image. Go back and try again", false)
      }
  };
  
  const upload = multer({  //then we're gonna call upload, its gonna filter the file and store it. It's gonna call filestoreEngine and uploadFilter individually
    fileFilter: uploadFilter,
    storage: fileStorageEngine
  });

  PhotosRouter.route("/")
  .get((request, response) => { //passing cb fn inside of get
    db.photo //if you do get, we'll search our db
      .findAll()
      .then((photos) => { //any found photos, were gonna pass those
        console.log("GET IMAGES");
        response.redirect('/');
      })
      .catch((error) => { //arrow fn
        response.send(error);
      });
  })

  PhotosRouter.route("/")
  .post(upload.single("photo"), (request, response) => { //passing cb fn
    const title = request.body.title; //1st var from req
    const mediaLocation = request.file.filename;
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== "jpeg") {
      response.send("Only photos are allowed, press go back to try again")
    }else{
    db.photo //sequelizse syntax?
      .create({ title: title, mediaLocation: mediaLocation }) //variable: property
      .then((photo) => { //arrow fn
        console.log("POST IMAGES");
        response.send(photo);
      })
      .catch((error) => {
        response.send(error);
      });
  }})

  module.exports = PhotosRouter; 
  
  
  //this should resolve the middleware error we got before(givern UserRouter.js and CommentsRouter.js are populatted)