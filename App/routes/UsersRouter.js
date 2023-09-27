const { request, response } = require("express");
const express = require("express");
const UsersRouter = express.Router();
const db = require("../models");
const bodyParser = require("body-parser");
UsersRouter.use(bodyParser.urlencoded());
UsersRouter.use(bodyParser.json()); //we're making both urlEnc and json available
const bcrypt = require('bcryptjs');
const saltRounds = 10;

UsersRouter.route('/login') //creating a route for login.(more of like an api)
.post((request, response)=>{ //cb fn
    const password = request.body.password
    const username = request.body.username
    db.user.findOne( //sequelizse syntax. findOne?
        {where:{username: username, password: password}})
        .then(async (user)=>{ 
            if (user){
                bcrypt.compare(password, user.password, (error, same) =>{ // passing a cb fn
                    if(same){
                        console.log("logged in, USER ID =", user.id)
                        request.session.userId = user.id;
                        response.redirect('/')
                    }else{
                        response.redirect('/login')
                    }
                })
            }
        //response.send(user)
        //response.redirect('/')
    }).catch(err=>{  //in video .catch( (error) => {})
        response.send('You don\'t have an account. Try signing up!')
    })
})

UsersRouter.route('/signUp')
.post(async (request, response)=>{
    // email, password, username
    const email = request.body.email
    const password = request.body.password
    const encryptedPassword = await bcrypt.hash(password, saltRounds);//since this is await, the whole fn has to be async
    const username = request.body.username

    db.user.create({email: email[0], username: username, password: encryptedPassword }).then(user=>{
      //response.send(user) //instead of sending the user, we're going to redirect the user back to /login
      response.redirect('/login');
    }).catch((error) => {
        response.send("You do not have an account. Try signing up!")
    })
})

module.exports = UsersRouter;