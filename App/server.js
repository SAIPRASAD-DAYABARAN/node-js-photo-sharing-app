const express = require('express');
const app = new express();
const port = 8080;
app.use(express.static('public')) // this line will enable everything in /public to be served up as a static file
app.set("view engine", "ejs");
app.listen(port, ()=>{
    console.log(`Serving photo app on http://localhost:${port}`);
}) 
//we should create a GET request route for the whole path
app.get("/", (request, response)=>{
    response.render("index"); //res.render will look in a views folder the view
})