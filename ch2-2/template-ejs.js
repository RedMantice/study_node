var http = require('http');
var fs = require('fs');
var url = require('url');
var ejs = require('ejs');

var server = http.createServer();
server.on('request',doRequest);
server.listen(5555);

var index = fs.readFileSync('./index.ejs','utf8');
console.log(index);
var style = fs.readFileSync('./style.css','utf8');
var datas = [
  {'name':'太郎','mail':'taro@yamada','tel':'090-9999-9999'},
  {'name':'花小','mail':'hanako@flower','tel':'080-8888-8888'},
  {'name':'イチロー','mail':'ichiro@baseball','tel':'070-7777-7777'}
];

function doRequest(req,res){
  var path = url.parse(req.url);
  switch(path.pathname){
    case '/':
      var tmp = ejs.render(index,{
        title:"Index Page",
        msg:"これはサンプルページです",
        datas:datas
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
      res.end('ERROR!');
      break;
  }
}

console.log(2222);
