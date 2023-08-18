
// 1. Blocking: Xử lý tuần tự
console.log("1. Blocking");
const fs = require('fs');
// Read a file
const input = fs.readFileSync('./Input/input.txt','utf-8');
console.log(input);
// Write a file
const output = `${input}. I am a programer`;
fs.writeFileSync('./Output/output.txt',output);
console.log("Write a file end.");

// 2. Non-Blocking: Không xử lý tuần tự 
console.log("2. Non-Blocking");
fs.readFile('./Input/input.txt',function(err,data){
    if (err) return console.error(err);
    console.log(data.toString());
})
console.log("Write a file end.");
