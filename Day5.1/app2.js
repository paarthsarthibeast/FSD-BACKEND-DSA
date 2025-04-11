const express = require('express');
const fs = require('fs/promises');

const app = express();
let users= [];
app.use(express.json());

const readdata= async()=>{
    users = JSON.parse(await fs.readFile('./data.json','utf8'));
}

const writehead=async ()=>{
    await fs.writeFile('./data.json',JSON.stringify(users));
}


app.get('/getdata', async (req,res)=>{
    readdata();
    res.json(users);
})

app.post('/users',(req,res)=>{
    const {name,age}=req.body;
    const newid= users.length>0?users[users.length].id+1:1;
    const newuser= {id:newid, name, age};
    users.push(newuser);
    writehead();
    res.status(200).json({message: 'user registersuccess', data: newuser});
})

app.listen(9000,(e)=>{
    if(e)
        console.log(e)
    console.log("Server is running on http://localhost:9000/");
})