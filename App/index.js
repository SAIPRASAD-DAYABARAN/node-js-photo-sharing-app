const express = require('express');
const app = express() //intializing express in a new var

const port = 8080;
//create a new app listener
app.listen(port, ()=>{

})

app.get('/', (request, response)=>{ //passing a callback fn to get route
    response.json({ //responding with json, so this would be like an API for eg. and it's builtin
        "Hosting": "Kinsta"

    })
})
console.log(`Listening on $(port)`);