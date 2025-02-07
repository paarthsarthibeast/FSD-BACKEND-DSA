const fs = require('fs')

console.log('create new directory')

const path = fs.mkdir('MyFolder',{recursive: true},(err)=>{
    if(err){
        console.log('an error occured',err);
        return;
    }
    console.log("directory created")
})