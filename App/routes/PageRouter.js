const express = require("express");
const PageRouter = express.Router();
const db = require("../models"); // may not be necessary but we add it anyways

//below code is copied from //routes portion of server.js and then modified

PageRouter.get("/", (request, response)=>{
    response.render("index"); //res.render will look in a views folder the view
})
PageRouter.get("/photo", (request, response) => { //cb fn
    console.log("/photo");
    response.render("photo");
  });
  //above

  PageRouter.get("/login", (request, response) => {
    console.log("/LOGGING IN!");
    response.render("login");
  });
  PageRouter.get("/signUp", (request, response) => {
    console.log("/signUp");
    response.render("signUp");
  });
  
  module.exports = PageRouter;