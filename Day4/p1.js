const http = require('http');
const fs = require('fs');

const filePath = 'data.json'; // Use existing file

// Function to read data from JSON file
const readData = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        return []; // Return empty array if file doesn't exist or is empty
    }
};

// Function to write data to JSON file
const writeData = (data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
};

const server = http.createServer(async (req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });

    if (req.url === '/getdata' && req.method === 'GET') {
        const users = readData();
        res.end(JSON.stringify(users));
    }

    if (req.url === '/setdata' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk;
        });
        req.on('end', () => {
            let users = readData();
            let data = JSON.parse(body);
            users.push(data);
            writeData(users);
            console.log("Received data:", data);
            res.end(JSON.stringify({ message: "Data saved successfully" }));
        });
    }
});

server.listen(9000, (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('Server is running on port 9000');
});