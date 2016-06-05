var http = require('http');
var fs = require('fs');

var server = http.createServer();
server.on('request',doRequest);
server.listen(3337);

function doRequest(req,res){
  fs.readFile('./index.html','UTF-8',doRead);
  var title = 'サンプルページ';
  var msg = 'これはプログラムで用意したメッセージです';

  function doRead(err,data){
    if(err)
      return;
    var str = data.replace(/@@@title@@@/g,title).replace(/@@@message@@@/,msg);
    res.setHeader('Content-Type','text/html');
    res.write(str);
    res.end();
  }
}
