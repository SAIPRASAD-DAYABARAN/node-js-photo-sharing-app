const express = require('express');
const app = new express();
const db = require('./models');
//we only have to say ./models because pulling from index.js, and index.js is defining the model i.e., our database
const bodyParser = require('body-parser');
const logger = require("morgan");
const expressSession = require('express-session');

app.use(expressSession({
    secret: 'Drew Loves Kinsta'
}))

global.loggedIn = null; //nobody's logged in by default
app.use("*", (request, response, next) => { // * - any route
  loggedIn = request.session.userId; //and since this is middleware its got the third call(p/m?) next, so we're gonna include next fn at the end.
  next();
});

app.use(bodyParser.json()) //we've added bodyParser with the ability to parse json
app.use(logger("dev"));
app.use(express.static('public')) // this line will enable everything in /public to be served up as a static file
app.set("view engine", "ejs");

//we need to require the foll before we can use them
const PhotosRouter = require('./routes/PhotosRouter')
const UsersRouter = require('./routes/UsersRouter')
const CommentsRouter = require('./routes/CommentsRouter')
const PageRouter = require('./routes/PageRouter')
app.use('/images', PhotosRouter)
app.use('/comments', CommentsRouter)
app.use('/users', UsersRouter)
app.use('/', PageRouter)

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
