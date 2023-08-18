// Bất đồng bộ 
const fs = require('fs')

// Blocking Code
var data = fs.readFileSync('./Files/start.txt');

console.log(data.toString());
console.log("Program Ended");
// Non blocking code
// fs.readFile('./Files/start.txt', 'utf-8', (err, data1) => {
//     console.log(`${data1}`);
//     fs.readFile(`./Files/${data1}.txt`, 'utf-8', (err, data2) => {
//         console.log(data2)
//     });
// });
// console.log('Start read file');