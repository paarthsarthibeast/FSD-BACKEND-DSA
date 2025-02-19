const http = require('http')
const server = http.createServer((req,res) => {
    res.writeHead(200,{'Content-Type':'text/plain'});
    if(req.url == '/home'){
        res.end("Welcome to the Home Page");
    }
    else if(req.url == '/about'){
        res.end("This is the About Page");
    }
    else if(req.url == '/contact'){
        res.end("Contact Us Page");
    }
    else{
        // req.writeHead(404);
        res.end("Page Not Found");
    }
});

server.listen(9000, (err) => {
    if(err) throw err;
    else{
        console.log("Server Running at Port http://localhost:9000");
    }
});