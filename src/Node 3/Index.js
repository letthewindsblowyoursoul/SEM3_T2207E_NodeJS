const fs = require('fs')

fs.readFile('./Files/start.txt', 'utf-8', (err, data1) => {
    console.log(`${data1}`);
    fs.readFile(`./Files/${data1}.txt`, 'utf-8', (err, data2) => {
        console.log(data2)
    });
});
console.log('Start read file');