const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
        <h1 style="
            background: linear-gradient(to right, #ff7e5f, #feb47b);
            color: white;
            font-family: Arial, sans-serif;
            font-size: 24px;
            padding: 20px;
            text-align: center;
            border-radius: 10px;
        ">Hello World</h1>
    `);
});

server.listen(9000, (err) => {
    if (err)
        console.log(err);
    console.log('Server is running at http://localhost:9000');
});
