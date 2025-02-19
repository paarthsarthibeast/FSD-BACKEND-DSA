const http = require('http');
// const fs = require('fs/promises');

const server = http.createServer(async(req,res) => {
    const data = await fetch("https://dummyjson.com/products");
    const jsonData = await data.json();
    const products = jsonData.products;
    // res.statusCode = 200;
    res.writeHead(200,{"Content-Type":"application/json"});
    // res.setHeader('Content-Type' , 'application/json');
    const titles = products.map((ele) => {
        return ele.title;
    });
    res.end(JSON.stringify(titles));
})

server.listen(9000, (err) => {
    if(err){
        throw err;
    }
    else{
        console.log('Server is running at http://localhost:9000');
    }
})