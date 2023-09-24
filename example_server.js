const http = require('http');
const fs = require('fs')
const homePage = fs.readFileSync("index.html");
const aboutPage = fs.readFileSync("about.html");
const contactPage = fs.readFileSync("contact.html");
const notFoundPage = fs.readFileSync("notfound.html");
const server = http.createServer((request, response) =>{
        if (request.url === "/about") response.end(aboutPage);
        else if( request.url === "/contact") 
            response.end(contactPage);
        else if( request.url === "/")
            response.end(homePage);
        else {
            response.writeHead(404)
            response.end('Page Not Found')
        }
    }
);//fs.readFileSync enables us to read the contents of a specific file which we return as a response
server.listen(8080)
console.log("Server running on http://localhost:8080")
//adding this at the end coz otherwise we would see a blank line and not "listening.." and it would look like its hanging