var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

var server = http.createServer();
server.on('request',doRequest);
server.listen(4444);

function doRequest(req,res){
  var path = url.parse(req.url);

  switch (path.pathname) {
    case '/':
      fs.readFile('./index.html','UTF-8',function(err,data){
        if(err)
          return;
        var str = data.replace(/@@@@/,'何か書いて');
        res.write(str);
        res.end();
      });
      break;
    case '/form':
      if(req.method == 'POST'){
        var reqBody = '';
        req.on('data',function(data){
          reqBody += data;
        });
        req.on('end',function(){
          var form = qs.parse(reqBody);
          var input1 = form.input1;
          fs.readFile('./index.html','UTF-8',function(err,data){
            if(err)
              return;
            var str = data.replace(/@@@@/,'あなたは['+input1+']と入力しました');
            res.setHeader('Content-Type','text/html');
            res.write(str);
            res.end();
          });
        });
      } else {
        res.setHeader('Content-Type','text/plain');
        res.end("ERROR! - Can't get-");
      }
      break;
    default:
      res.setHeader('Content-Type','text/plain');
      res.end("ERROR! - No Page-");
      break;
  }
}
console.log('Server running at http://127.0.0.1:4444');
