var http = require('http');


http.createServer(function(req,res){
      // Send the HTTP header 
   // HTTP Status: 200 : OK
   // Content Type: text/plain
   console.log("Url request:" + req.url);
    res.writeHead(200,{'Content-Type': 'text/plain'});

    res.end("Hello world");
}).listen(9001);


console.log('Server running at http://localhost:9001/');