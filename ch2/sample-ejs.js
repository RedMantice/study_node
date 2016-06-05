var http = require('http');
var fs = require('fs');
var url = require('url');
var ejs = require('ejs');

var index = fs.readFileSync('./index.ejs','utf8');
var style = fs.readFileSync('./style.css','utf8');

var server = http.createServer();
server.on('request',doRequest);
server.listen(2222);

function doRequest(req,res){
  var path = url.parse(req.url);
  switch(path.pathname){
    case '/':
      var tmp = ejs.render(index,{
        title:"index page",
        msg:"これはタイトルページです"
      });
      res.setHeader('Content-Type','text/html');
      res.write(tmp);
      res.end();
      break;
    case '/style.css':
      res.setHeader('Content-Type','text/css');
      res.write(style);
      res.end();
      break;
    default:
      res.setHeader('Content-Type','text/plain');
      res.write('ERROR');
      res.end();
      break;
  }
}
console.log('Server Running at http://127.0.0.1:2222');
