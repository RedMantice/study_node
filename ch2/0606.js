var http = require('http');
var fs = require('fs');

var server = http.createServer();


server.on('request',doRequest);
server.listen(1234);
function doRequest(req,res){
  fs.readFile('./index.html','UTF-8',doRead);

  function doRead(err,data){
    if(err){
      return;
    }
    res.setHeader('Content-Type','text/html');
    res.write(data);
    res.end();
  }

}
