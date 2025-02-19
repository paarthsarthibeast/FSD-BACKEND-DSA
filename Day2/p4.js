const http = require('http');
const Users = [
    {id:1,name:"Paarth",age:21},
    {id:2,name:"Jane",age:25},
    {id:3,name:"Mike",age:30},
];
// const fs = require('fs/promises');

const server = http.createServer((req,res) => {
    res.writeHead(200,{"Content-Type":"application/json"});
    const names = Users.map((user) => {
        return user.name;
    });
    res.end(JSON.stringify(names));
});

server.listen(9001, () => {
    console.log("Server is running on port 9001");
});