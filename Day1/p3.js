const fs = require('fs');

const data = "I am new Data File";

fs.writeFileSync("data.txt",data);