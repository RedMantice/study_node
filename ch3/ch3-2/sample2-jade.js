var http = require('http');
var fs = require('fs');
var url = require('url');
var jade = require('jade');
var qs = require('querystring');

var server = http.createServer();
server.on('request',doRequest);
server.listen(8888);

var index2 = fs.readFileSync('./index2.jade','utf8');
var style = fs.readFileSync('./style.css','utf8');


function doRequest(req,res){
  var path = url.parse(req.url);
  switch (path.pathname) {
    case '/index2':
      var fn = jade.compile(index2);
      if(req.method == 'POST'){
        var reqbody = '';
        req.on('data',function(data){
          reqbody += data;
        });
        req.on('end',function(){
          var form = qs.parse(reqbody);
          var tmp = fn({
            title:"Index Page",
            msg:"your data:",
            form:form
          });
          res.setHeader('Content-Type','text/html');
          res.write(tmp);
          res.end();
        });
      } else {
        var tmp = fn({
          title:"Index Page",
          msg:"enter your data",
          form:{myname:'',mail:'',age:''}
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
    case 'favicon.ico':
      break;
    default:
      console.log(path.pathname);
      break;
  }
}
console.log('Server Running');
