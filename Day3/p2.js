const http = require('http');

Users = []

const server = http.createServer( async (req, res) => {
    res.writeHead(200,{'Content-Type': 'application/json'});
    if(req.url === '/getdata' && req.method === 'GET'){
        // const data = {name:"keshav",age:30};
        res.end(JSON.stringify(Users));
    }
    if(req.url === '/setdata' && req.method === 'POST'){
        let body = '';
        req.on('data',chunk =>{
            body += chunk;
        });
        req.on('end',() =>{
            let data = JSON.parse(body);
            Users.push(data);
            console.log("received data:",data);
            res.end(JSON.stringify({message:"data sent successfully"}))
        });
    }

}
);


server.listen(9000, (err) => {
    if(err){
        console.error(err);
        return;
    }   
    console.log('Server is running on port 9000');
}
);