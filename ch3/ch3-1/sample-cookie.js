var http = require('http');
var fs = require('fs');
var url = require('url');
var ejs = require('ejs');

var index = fs.readFileSync('./index.ejs','utf8');
var style = fs.readFileSync('./style.css','utf8');

var server = http.createServer();
server.on('request',doRequest);
server.listen(4445);

function doRequest(req,res){
  var path = url.parse(req.url);
  switch(path.pathname){
    case '/':
      var ck = req.headers.cookie;
      var tmp = ejs.render(index,{
        title:"Index Page",
        msg:"クッキー" + ck
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
    case '/favicon.ico':
      console.log('icon');
      break
    default:
      res.setHeader('Content-Type','text/plain');
      res.setHeader('Set-Cookie',['lasturl=' +path.pathname,'aaaa']);
      res.end();
      break;
  }
}

console.log('Server running');
