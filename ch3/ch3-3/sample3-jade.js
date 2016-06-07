var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');
var jade = require('jade');

var index = fs.readFileSync('./index.jade','utf8');
var index2 = fs.readFileSync('./index2.jade','utf8');
var style = fs.readFileSync('./style.css','utf8');

var datas = [];

var server = http.createServer();
server.on('request',doRequest);
server.listen(2222);

function doRequest(req,res){
  var path = url.parse(req.url);
  var fn = jade.compile(index,{
    filename: 'include',
    rootpath: __dirname
  });
  var fn2 = jade.compile(index2,{
    filename: 'include',
    rootpath: __dirname
  });
  switch(path.pathname){
    case '/':
      if(req.method == "POST"){
        var reqBody = '';
        req.on('data',function(data){
          reqBody += data;
        });
        req.on('end',function(){
          var form = qs.parse(reqBody);
          datas.push(form);
          var tmp = fn({
            title: 'Index Page',
            msg: 'your data',
            form: form,
            datas: datas
          });
          res.setHeader('Content-Type','text/html');
          res.write(tmp);
          res.end();
        });
      } else{
        var tmp = fn({
          title: 'Index Page',
          msg: 'フォームを入力して',
          form: null,
          datas: datas
        });
        res.setHeader('Content-Type','text/html');
        res.write(tmp);
        res.end();
      }
      break;
    case '/style.css':
      res.setHeader('Content-Type','text/css');
      res.write(style);
      res.end();
      break;
    case '/favicon.ico':
      break;
    case '/index2':
      var tmp = fn();
      res.setHeader('Content-Type','text/html');
      res.write(tmp);
      res.end();
    default:
      console.log(path.pathname);
      res.setHeader('Content-Type','text/plain');
      res.write('NO CONTENTS');
      res.end();
      break;
  }
}
