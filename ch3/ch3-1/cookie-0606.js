var http = require('http');
var fs = require('fs');
var url = require('url');
var ejs = require('ejs');
var cookie = require('cookie');

var server = http.createServer();
server.on('request',doRequest);
server.listen(4445);

var index = fs.readFileSync('./index.ejs','utf8');
var style = fs.readFileSync('./style.css','utf8');

function doRequest(req,res){
  var path = url.parse(req.url);

  switch(path.pathname){
    case '/':
      var msg = "クッキーはありません";
      if(req.headers.cookie != null){
        var ck = cookie.parse(req.headers.cookie);
        msg = "クッキー" + ck.lasturl + ck.lasttime;
      }
      var tmp = ejs.render(index,{
        title: "Index Page",
        msg: msg
      });
      res.setHeader('Content-Type','text/html');
      res.write(tmp);
      res.end();
      break;
    case '/favicon.ico':
      break;
    case '/time':
      var d = new Date().toDateString();
      var ck1 = cookie.serialize('lasttime',d,{
        maxAge:100
      });
      res.setHeader('Content-Type','text/plain');
      res.setHeader('Set-Cookie',ck1);
      res.write('SET LAST TIME COOKIE');
      res.end();
      break;
    case '/style.css':
      res.setHeader('Content-Type','text/css');
      res.write(style);
      res.end();
      break;
    default:
      var ck1 = cookie.serialize('lasturl',path.pathname,{
        maxAge:100
      });
      res.setHeader('Set-Cookie',ck1);
      res.setHeader('Content-Type','text/plain');
      res.write('SET LAST URL COOKIE');
      res.end();
      break;
  }
}

console.log('Server Running');
