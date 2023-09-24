const http = require('http');
const server = http.createServer(
    (request, response) =>{
        if (request.url == '/about')
            response.end( 'The about page');
        else if( request.url == '/login')
            response.end( 'Logged in!');
        else if( request.url == '/logout')
            response.end( 'Logged out!');
        else {
            response.writeHead(404)
            response.end('Page Not Found')
        }
    }
);
server.listen(8080)
console.log("Server running on http://localhost:8080")
//adding this at the end coz otherwise we would see a blank line and not "listening.." and it would look like its hanging