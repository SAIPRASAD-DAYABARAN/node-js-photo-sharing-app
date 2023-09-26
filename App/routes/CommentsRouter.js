const express = require("express");
const CommentsRouter = express.Router();
const db = require("../models");
//we dont really need body parser for this route?

CommentsRouter.route('/')
.post((request, response)=>{ //cb fn. and arrow fn for our callback
    const userId = request.body.userId;
    const photoId = request.body.photoId;
    const content = request.body.content
    db.comment.create({
        userId: userId, photoId: photoId, content: content
    }).then(
        (comment)=>{ // pass a comment to our cb arrow fn
      response.send(comment)
    }).catch((error) =>{
        response.send(error)
    })
})

CommentsRouter.route('/:photoId') //special route. going to get our route based off of a photoID (every photo based off of our PhotosModel.js is gonna have a photoID)
.get((request, response)=>{ //any GET to a /#no at the photosroute will give you the photo that you requested 
    const photoId = request.params.photoId
    db.comment.findAll({where:{photoId: photoId}}) // typically, when you pullup a photo, you pull up all comments related to that one photo
    .then((comment) =>{
        response.send(comment)
    }).catch((err)=>{ //if it fails, we gotta catch it
        response.send(err)
    })
})

module.exports = CommentsRouter;

