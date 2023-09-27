const express = require("express");
const PageRouter = express.Router();
const db = require("../models"); // may not be necessary but we add it anyways

//below code is copied from //routes portion of server.js and then modified

//routes
PageRouter.get("/", (request, response)=>{
    console.log(request.session.userId)
    if ( request.session.userId){
      response.render('index')
    }else{
      response.redirect()

    }
    //response.render("index"); //res.render will look in a views folder the view
})
PageRouter.get("/photo", (request, response) => { //cb fn
    console.log("/photo"); //so if somebody makes a request to /photo, it'll be logged. And then we're responding with the photo(provided they're logged in)
    if (request.session.userId){
      response.render("photo");
    }else{
      response.redirect('/login')
    }
    
    
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
  
  PageRouter.get("/logout", (request, response) => { //passing a cb fn. arrow fn
    console.log("User Logged Out - ", request.session.userId); //so that we'll know which user was logged out
    request.session.destroy(() => { // arrow fn. anonymous and nothing to pass into it
      response.redirect("/login");
    });
  });
  module.exports = PageRouter;