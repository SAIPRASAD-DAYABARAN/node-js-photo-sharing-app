const { request, response } = require("express");
const express = require("express");
const UsersRouter = express.Router();
const db = require("../models");
const bodyParser = require("body-parser");
UsersRouter.use(bodyParser.urlencoded());
UsersRouter.use(bodyParser.json()); //we're making both urlEnc and json available

UsersRouter.route('/login') //creating a route for login.(more of like an api)
.post((request, response)=>{ //cb fn
    const password = request.body.password
    const username = request.body.username
    db.user.findOne( //sequelizse syntax. findOne?
        {where:{username: username, password: password}}).then(user=>{ 
        response.send(user)
    }).catch(err=>{  //in video .catch( (error) => {})
        response.send('You don\'t have an account. Try signing up!')
    })
})

UsersRouter.route('/signUp')
.post((request, response)=>{
    // email, password, username
    const email = request.body.email
    const password = request.body.password
    const username = request.body.username

    db.user.create({email: email, username: username, password: password }).then(user=>{
      response.send(user)
    }).catch((error) => {
        response.send("You do not have an account. Try signing up!")
    })
})

module.exports = UsersRouter;