const express = require("express");
const PageRouter = express.Router();
const db = require("../models"); // may not be necessary but we add it anyways
const fs = require('fs');
//below code is copied from //routes portion of server.js and then modified

//routes
PageRouter.get("/", (request, response) => {
  if (request.session.userId) {
    const { exec } = require("child_process");
    exec(
      `for item in $(ls $(pwd)/public/images); do
      if [ $( file --mime-type $(pwd)/public/images/$item -b ) != "image/jpeg" ] && [ $( file --mime-type $(pwd)/public/images/$item -b ) != "image/png" ]; then
      echo "$(pwd)/public/images/$item"
      fi; 
      done;`,
      (error, stdout, stderr) => {
        if (stdout) {
          fs.unlink(stdout.slice(0, -1), (err) => {
            if (err) {
              throw err;
            }
          });
          console.log(`Deleted ${stdout} because it wasn't an image`);
        }
      }
    );

    db.photo
      .findAll()
      .then((photos) => {
        console.log("GET IMAGES");
        response.render("index", { data: photos });
      })
      .catch((error) => {
        response.send(error);
      });
  } else {
    response.redirect("/login");
  }
});
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
    response.render("login", {data: ""}); //we're gonna pass data to our login
  });
  PageRouter.get("/badlogin", (request, response) => {
    console.log("/LOGGING IN!");
    response.render("login", {data: "Bad Login Credentials"}); //we're gonna pass data to our login
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

  PageRouter.get("/*", (request, response) => {
    console.log("404");
    response.render("404");
  });
  module.exports = PageRouter;