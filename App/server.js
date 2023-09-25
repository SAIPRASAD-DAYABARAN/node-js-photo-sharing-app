const express = require('express');
const app = new express();
const port = 8080;
app.use(express.static('public')) // this line will enable everything in /public to be served up as a static file
app.listen(port, ()=>{
    console.log(`Serving photo app on http://localhost:${port}`);
}) 