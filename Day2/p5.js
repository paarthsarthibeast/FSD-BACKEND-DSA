const http = require('http');
const fs = require('fs/promises');

const server = http.createServer(async(req, res) => {
    res.statusMessage="Success";
    res.writeHead(200, {'Content-Type': 'application/json'});
    try {
        const data = await fs.readFile('./data.json', 'utf8'); // Specify 'utf8' encoding
        res.end(data); // Directly send the JSON string
    } catch (error) {
        console.error("Error reading file:", error);
        res.writeHead(500, {'Content-Type': 'text/plain'});
        res.end("Internal Server Error");
    }
});

server.listen(7000, (err) => {
    if(err){
        console.log("Errr : " + err);
    }
    console.log("Server is running on Port 7000");
});
