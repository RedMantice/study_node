var http = require('http');
var fs = require('fs');

var server = http.createServer();
server.on('request',doRequest);
server.listen(1337);

function doRequest(req,res){
  fs.readFile('./index.html','UTF-8',doRead);

  function doRead(err,data){
    res.setHeader('Content-Type','text/html');
    res.write(data);
    res.end();
  }
}
