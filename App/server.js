const express = require('express');
const app = new express();
const db = require('./models');
//we only have to say ./models because pulling from index.js, and index.js is defining the model i.e., our database
const bodyParser = require('body-parser');

app.use(bodyParser.json()) //we've added bodyParser with the ability to parse json
app.use(express.static('public')) // this line will enable everything in /public to be served up as a static file
app.set("view engine", "ejs");


//db
//connecting to our db
const sqlPort = 3306; //3306 or 3307 by default
db.sequelize
    .sync({}) //sync connects our db and makes it update
    .then(()=>{ //passing an anonymous arrow function to then
        app.listen(sqlPort, ()=>{
            console.log(
                `Mariadb Connection Successful - http://localhost:${sqlPort}.`
            );
        });
        
    })
    .catch((error) =>{ //callback
        console.error("Unable to connect to the db", error)
    });

//server
const port = 8080;
app.listen(port, ()=>{
    console.log(`Serving photo app on http://localhost:${port}`);
}) 

//routes
//we should create a GET request route for the whole path
app.get("/", (request, response)=>{
    response.render("index"); //res.render will look in a views folder the view
})